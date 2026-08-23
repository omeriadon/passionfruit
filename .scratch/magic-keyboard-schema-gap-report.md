# Magic Keyboard schema gap report

The existing shared accessory contract is intentionally minimal. Its `accessory`
definition supports only `id`, `displayName`, `category`, and optional
`capabilities`. It does not support the evidence-backed fields required by the
Magic Keyboard page.

## Required shared-contract additions

1. Add a standalone accessory collection at the root of the shared contract.
   The current root accepts only `devices`; it cannot validate
   `public/data/other/<group>/<group>.json`. Add an optional `accessoryGroups`
   array whose items reference `accessoryGroup`.

2. Extend `$defs.accessory` with these optional properties:

   - `priceAud`: `number | null`, minimum `0`
   - `colors`: array of the existing `color` definition
   - `images`: array of the existing `image` definition
   - `compatibleDeviceIds`: unique array of lowercase hyphenated strings
   - `sourceUrl`: URI string
   - `sourceNotes`: string

3. Keep the existing required base properties unchanged:
   `id`, `displayName`, and `category`. `capabilities` remains an optional
   array of strings.

4. Use `compatibleDeviceIds` for reverse compatibility links from an
   accessory to canonical device IDs. The current `accessoryReference` shape
   only supports device-to-accessory links and cannot represent this relation.

5. After the shared schema is updated, add matching `accessoryReference`
   entries to the compatible iPad records. This worker did not edit iPad JSON.

## Current local implementation

`public/data/other/magic-keyboard/magic-keyboard.schema.json` defines the
group-local superset needed to validate the extracted data without changing the
shared schemas concurrently. The canonical group JSON uses the existing base
accessory fields and the proposed additions.
