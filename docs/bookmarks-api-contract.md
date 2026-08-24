# Bookmarks API contract

This document defines the HTTP contract between the Fumadocs UI and the
separate Vapor service. The service is versioned under `/api/v1` and uses
PostgreSQL. The UI must not read or write PostgreSQL directly.

## Conventions

- Base URL: configured by the UI as `NEXT_PUBLIC_BOOKMARKS_API_URL`.
- JSON requests use `Content-Type: application/json`.
- JSON responses use `Content-Type: application/json`.
- IDs are opaque strings. The service must not require the UI to understand
  database IDs.
- Device identity is the pair `category` and `deviceId`. `deviceId` must
  match the canonical data identifier used by the UI.
- Usernames are case-sensitive opaque strings. The service must not impose a
  character-class or email-format rule. It may enforce a documented maximum
  length of 255 Unicode characters and must reject blank values.
- Passwords are never returned, logged, or stored in plaintext. The service
  hashes them with a memory-hard password hash such as Argon2id.
- All timestamps are ISO 8601 UTC strings.

## Authentication

### Create account

`POST /api/v1/auth/register`

Request:

```json
{
	"username": "example-user",
	"password": "correct horse battery staple"
}
```

Response `201 Created`:

```json
{
	"user": {
		"id": "user_01H...",
		"username": "example-user"
	},
	"session": {
		"token": "opaque-bearer-token",
		"expiresAt": "2026-09-23T00:00:00Z"
	}
}
```

The username is unique. Registration is atomic: the account and initial
session are either both created or neither is created.

### Log in

`POST /api/v1/auth/login`

Request:

```json
{
	"username": "example-user",
	"password": "correct horse battery staple"
}
```

Response `200 OK` has the same shape as registration. Invalid credentials
return the same generic `401` response regardless of whether the username or
password was wrong.

### Current user

`GET /api/v1/auth/me`

Requires a bearer token. Response `200 OK`:

```json
{
	"user": {
		"id": "user_01H...",
		"username": "example-user"
	}
}
```

### Bearer token handling

Send the token on protected requests:

```http
Authorization: Bearer opaque-bearer-token
```

Tokens are opaque random values. The service stores only a cryptographic hash
of each token, plus its user, creation time, expiration time, and optional
revocation time. Tokens expire after the configured session lifetime; the
initial deployment may use 30 days. There is no refresh-token endpoint in
this contract. A client whose token expires must log in again.

The UI stores the token in its chosen client-side session mechanism and must
not put it in a URL or query string. HTTPS is required outside local
development.

## Bookmarks

Every bookmark endpoint requires authentication. A user can have at most one
bookmark for a given `(category, deviceId)` pair.

### List bookmarks

`GET /api/v1/bookmarks`

Response `200 OK`:

```json
{
	"bookmarks": [
		{
			"category": "iphone",
			"deviceId": "iphone-17-pro-max",
			"createdAt": "2026-08-24T08:00:00Z"
		}
	]
}
```

The list belongs only to the authenticated user. The service may return it in
creation order; the UI owns presentation sorting. The initial contract does
not require pagination because the expected list is small.

### Add bookmark

`PUT /api/v1/bookmarks/{category}/{deviceId}`

No request body is required. Response `201 Created` when a bookmark is newly
created:

```json
{
	"bookmark": {
		"category": "iphone",
		"deviceId": "iphone-17-pro-max",
		"createdAt": "2026-08-24T08:00:00Z"
	}
}
```

The operation is idempotent. If the bookmark already exists, return `200 OK`
with the existing bookmark rather than creating a duplicate.

### Remove bookmark

`DELETE /api/v1/bookmarks/{category}/{deviceId}`

Response `204 No Content` whether the bookmark existed or was already absent.
This prevents stale UI state from turning an idempotent action into an error.

`category` and `deviceId` must be safely URL-decoded path segments. The server
must reject empty values, path traversal, and values that do not fit its
allowed identifier length without querying unrelated records.

## Errors

All non-2xx JSON responses use this shape:

```json
{
	"error": {
		"code": "validation_failed",
		"message": "The request could not be accepted.",
		"fields": {
			"username": "Username is required."
		},
		"requestId": "req_01H..."
	}
}
```

`fields` is optional and contains field-level messages only for validation
errors. `requestId` is returned whenever available and must be included in
server logs. Messages must not expose whether an account exists, password
hashes, SQL errors, or other sensitive implementation details.

Required status/code mappings:

| Status | Code                  | Meaning                                                                               |
| ------ | --------------------- | ------------------------------------------------------------------------------------- |
| `400`  | `invalid_json`        | Malformed JSON or an invalid request body.                                            |
| `401`  | `unauthorized`        | Missing, expired, revoked, or invalid bearer token; login failure uses the same code. |
| `403`  | `forbidden`           | Authenticated user is not allowed to perform the operation.                           |
| `404`  | `not_found`           | Requested route or resource does not exist.                                           |
| `409`  | `username_taken`      | Registration conflicts with an existing username.                                     |
| `422`  | `validation_failed`   | JSON is valid but fields fail validation.                                             |
| `429`  | `rate_limited`        | Authentication or another endpoint is rate limited.                                   |
| `500`  | `internal_error`      | Unexpected server failure.                                                            |
| `503`  | `service_unavailable` | The service or database is temporarily unavailable.                                   |

## CORS

The service must allow only configured origins, supplied through deployment
configuration such as `CORS_ALLOWED_ORIGINS`. It must not use `*` together
with credentials.

For browser requests, allow:

- Origins listed in `CORS_ALLOWED_ORIGINS`.
- Methods `GET`, `PUT`, `DELETE`, `POST`, and `OPTIONS`.
- Request headers `Authorization` and `Content-Type`.
- Response header `X-Request-ID` if exposed.
- Credentials only if the implementation later adds cookie sessions; bearer
  token requests do not require credentialed CORS.

Handle preflight `OPTIONS` requests without authentication and return the
configured CORS headers. Local development may allow the known Next dev
origin, such as `http://localhost:3000`; production origins must be explicit.

## PostgreSQL assumptions

The service uses PostgreSQL through Vapor/Fluent. The minimum logical tables
are:

- `users`: opaque ID, unique username, password hash, created timestamp.
- `sessions`: opaque ID, token hash, user ID, created/expiry/revoked
  timestamps, and an index on token hash.
- `bookmarks`: opaque ID, user ID, category, device ID, created timestamp, and
  a unique constraint on `(user_id, category, device_id)`.

Usernames should use a type that preserves the submitted Unicode string. The
service must define and consistently apply its equality/collation behavior;
the simplest initial rule is exact string equality with a unique index.

Foreign keys from sessions and bookmarks to users must be enforced. Deleting
an account, if account deletion is added later, should cascade its sessions
and bookmarks. Registration, login session creation, and bookmark writes must
use transactions where more than one row is affected.

The database URL, TLS requirements, migration settings, session lifetime, and
CORS origins are deployment configuration, not values hard-coded in the UI.
