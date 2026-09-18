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
- Usernames are stored as-given and matched case-insensitively via a
  normalized (lowercased) form with a unique index. They must be 1–64
  characters after trimming; the service must reject blank values. It must
  not impose a character-class or email-format rule.
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

### Change username

`PATCH /api/v1/auth/username`

Request:

```json
{
	"username": "new-name"
}
```

Response `200 OK` returns `{ "user": ... }` with the updated username. A
normalized collision with another account returns `409 username_taken`.
Blank or over-long values return `422 validation_failed`.

### Change password

`PATCH /api/v1/auth/password`

Request:

```json
{
	"currentPassword": "correct horse battery staple",
	"newPassword": "even more correct horse battery staple"
}
```

Response `200 OK` returns `{ "user": ... }`. A wrong current password
returns `401 unauthorized`. A new password shorter than 8 characters returns
`422 validation_failed`.

### Delete account

`DELETE /api/v1/auth/account`

Response `204 No Content`. Removes the account together with its bookmarks,
owned devices, saved category order, and sessions. The username becomes
available for reuse.

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

## Owned devices

A user can mark devices as their own, independent of bookmarks. Every owned
endpoint requires authentication. A user can have at most one owned record
for a given `(category, deviceId)` pair.

### List owned devices

`GET /api/v1/owned`

Response `200 OK`:

```json
{
	"owned": [
		{
			"category": "iphone",
			"deviceId": "iphone-17-pro-max",
			"createdAt": "2026-08-24T08:00:00Z"
		}
	]
}
```

### Mark device as owned

`PUT /api/v1/owned/{category}/{deviceId}`

No request body is required. Response `201 Created` when newly created,
`200 OK` with the existing record when already owned (idempotent).

### Remove owned device

`DELETE /api/v1/owned/{category}/{deviceId}`

Response `204 No Content` whether the record existed or was already absent.

## Category order

Each user may store a preferred ordering of device categories, applied by
the UI to sidebars and device groupings. Every endpoint requires
authentication.

### Get category order

`GET /api/v1/preferences/order`

Response `200 OK`:

```json
{
	"order": ["iphone", "mac", "ipad"]
}
```

Defaults to `[]`, meaning the catalogue's built-in order applies. Slugs the
catalogue no longer contains are ignored by the UI.

### Set category order

`PUT /api/v1/preferences/order`

Request:

```json
{
	"order": ["iphone", "mac", "ipad"]
}
```

Replaces the whole order in one transaction and returns it. At most 32
entries; entries are trimmed, must be non-empty, and duplicates collapse to
the first occurrence. Violations return `422 validation_failed`.

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
- Methods `GET`, `PUT`, `DELETE`, `POST`, `PATCH`, and `OPTIONS`.
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
- `owned_devices`: same shape as `bookmarks`, for devices the user owns.
- `category_orders`: opaque ID, user ID, category, integer position, and a
  unique constraint on `(user_id, category)`.

Usernames should use a type that preserves the submitted Unicode string. The
service must define and consistently apply its equality/collation behavior;
the simplest initial rule is exact string equality with a unique index.

Foreign keys from sessions, bookmarks, owned devices, and category orders to
users must be enforced. Deleting an account cascades to its sessions,
bookmarks, owned devices, and category order. Registration, login session
creation, and bookmark writes must
use transactions where more than one row is affected.

The database URL, TLS requirements, migration settings, session lifetime, and
CORS origins are deployment configuration, not values hard-coded in the UI.
