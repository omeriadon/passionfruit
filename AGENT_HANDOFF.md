# Passionfruit replacement-agent handoff

This file is a current-state handoff for an agent taking over the Passionfruit
catalogue, UI, and bookmark-service work. Inspect the repositories and verify
these claims before changing anything. Do not assume the handoff is newer than
the checkout.

## Original objective

Finish the Apple catalogue and build the first Fumadocs-based UI.

- `/` must remain the original starter landing page.
- `/docs` is the documentation landing page.
- Primary category routes are `/docs/<category>`.
- Device detail routes are `/docs/<category>/<device-id>`.
- iPad accessories are nested under `/docs/ipad/accessories`, with detail routes.
- Each primary category has an independent schema and data type. Do not restore
  the old universal device schema.
- Tables must be sortable, searchable, and support hiding/restoring columns.
- Models are newest-first with a strength ordering that places Pro Max/Ultra/Pro
  above base/mini variants.
- Detail views show structured data thoughtfully, include colour/image switching,
  and expose bookmark state.
- Auth is username/password only. No email, names, reset, or social auth.
- Bookmarks require an account.
- User-authored notes are separate from harvested JSON.
- The server is a separate Vapor/PostgreSQL repository and must be deploy-ready,
  but no production deployment is performed here.

## Repositories and branches

### Catalogue foundation

- Path: `/Users/omeriadon/Documents/passionfruit`
- Branch: `add-data`
- Remote: `origin/add-data`
- Current pushed commit: `405d12b`
- Worktree is clean.

The foundation contains independent schemas and canonical data for AirPods,
Apple TV, Apple Watch, HomePod, iPad, iPhone, Mac, and Vision. It also contains
Apple Pencil, Magic Keyboard, AirTag, and Apple display datasets under
`public/data/other/`.

Stable validator:

```sh
cd /Users/omeriadon/Documents/passionfruit
node scripts/validate-data.mjs
```

Current gate result: 12 datasets valid, 161 primary devices, 9 accessories, 3
additional products, 485 image references, and zero invalid image files.

Important data decisions:

- Apple TV HD is intentionally excluded.
- Intel Macs were not added by the correction, although historical Intel records
  already remain in the Mac catalogue.
- Apple Watch has no camera/storage/accessory facts in this dataset.
- AirPods has no colours, no summary array, a typed form factor, typed audio
  technology, typed claims, and microphone counts.
- Arrays are non-nullable; booleans are non-nullable.
- The old `.scratch/final-validate.mjs` was deleted during cleanup. Use
  `scripts/validate-data.mjs`.

### UI worktree

- Path: `/Users/omeriadon/Documents/passionfruit-first-ui`
- Branch: `data/first-ui`
- Remote: `origin/data/first-ui`
- Current pushed commit: `7a42055`
- Worktree was clean at handoff.

Run:

```sh
cd /Users/omeriadon/Documents/passionfruit-first-ui
bun run types:check
bun run build
```

The UI currently contains:

- Fumadocs `DocsLayout` with top-level category tabs.
- Original `/` landing page restored from `add-data`.
- `/docs`, category routes, device routes, and iPad accessory routes.
- `src/components/catalog/` table, detail, colour selector, and accessory UI.
- `src/lib/catalog/` category configuration, sorting, and value rendering.
- 173 separate notes under `content/device-notes/` with safe defaults.
- `src/lib/auth/` API client and `AuthProvider`.
- `src/components/auth/` blurred full-screen username/password dialog.
- `.env.example` with `NEXT_PUBLIC_BOOKMARKS_API_URL=http://localhost:8080`.

The local browser verification used the API on port 8081, so start the UI as:

```sh
NEXT_PUBLIC_BOOKMARKS_API_URL=http://localhost:8081 bun run dev
```

The UI was verified for routes, top tabs, tables, search, column hide/restore,
detail rendering, colour image switching, note rendering, auth-dialog opening,
and clean hydration on detail pages.

Known UI follow-up:

- The newer AirTag and Apple display datasets exist in `add-data`, but the first
  UI currently loads the eight primary categories plus Pencil and Keyboard. Decide
  whether AirTag and displays should become additional top-level tabs or their own
  secondary sections, then wire them deliberately.
- The browser login form has not been submitted with generated credentials. The
  dialog opening and all non-sensitive states were tested. Do not enter a password
  through the browser without the required action-time authorization.
- The Fumadocs build emits only the normal `metadataBase` warning.

## Bookmark API repository

- Path: `/Users/omeriadon/Documents/passionfruit-bookmarks-server`
- Branch: `main`
- Remote repository: `omeriadon/passionfruit-bookmarks-server`
- Current pushed commit: `fa2a183`

The server uses Vapor, Fluent, FluentPostgresDriver, JWTKit, and BCrypt. Routes:

- `GET /health`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/me` with Bearer token
- `GET /api/v1/bookmarks` with Bearer token
- `POST /api/v1/bookmarks` with `{ "category": "ipad", "deviceID": "..." }`
- `DELETE /api/v1/bookmarks/:bookmarkUUID` with Bearer token

The server returns a direct auth response:

```json
{ "token": "...", "user": { "id": "...", "username": "..." } }
```

Bookmark list/create responses are direct arrays/objects, not wrapped in
`bookmarks` or `bookmark`. The UI client was corrected to this contract in
commit `28a8805`.

Local PostgreSQL test command:

```sh
cd /Users/omeriadon/Documents/passionfruit-bookmarks-server
TEST_DATABASE_URL='postgresql://omeriadon@localhost:5432/passionfruit_bookmarks_test' \
TEST_JWT_SECRET='a-local-test-secret-of-at-least-32-characters' \
swift test
```

Result: 5/5 integration tests passed, including registration, normalized
duplicate usernames, login failure/success, auth rejection, bookmark CRUD,
duplicate prevention, and user isolation.

Local runtime command:

```sh
PORT=8081 \
DATABASE_URL='postgresql://omeriadon@localhost:5432/passionfruit_bookmarks_dev' \
JWT_SECRET='a-local-runtime-secret-of-at-least-32-characters' \
AUTO_MIGRATE=true \
swift run Run
```

The server README migration command was corrected to `swift run Run migrate`;
there is no `--yes` flag.

## Fumadocs references

The implementation was based on the current official Fumadocs patterns:

- Docs layout: https://www.fumadocs.dev/docs/ui/layouts/docs
- Tabs: https://www.fumadocs.dev/docs/ui/components/tabs
- Docs page: https://www.fumadocs.dev/docs/ui/layouts/page

The current layout uses `DocsLayout` top-level `tabs` with route-aware URLs and
keeps iPad accessory sections nested below iPad.

## Handoff sequence

1. Inspect all three repositories and confirm pushed commits.
2. Start PostgreSQL, the Vapor server on 8081, and the Next app on 3000.
3. Run `swift test`, `node scripts/validate-data.mjs`, `bun run types:check`, and
   `bun run build`.
4. Use the browser to exercise every public route, table controls, detail views,
   image switching, notes, and auth-dialog behavior.
5. Complete the browser login/bookmark submission only after the required
   action-time authorization to transmit generated credentials.
6. Recheck worktrees, commit atomic fixes, and push each intended branch/repo.

Do not commit credentials, local database URLs containing passwords, browser
state, generated `.next` output, or unrelated worktree changes.
