# OS 26/27 device coverage audit

Audit date: 2026-08-23

This is a read-only audit of the current checkout. Canonical JSON, source HTML,
and existing worker changes were not modified. Intel Mac identities are excluded
from the target set.

## Sources

- [Apple: iPhone models compatible with iOS 26](https://support.apple.com/en-in/guide/iphone/iphe3fa5df43/26/ios/26)
- [Apple: iPadOS 26 compatibility](https://support.apple.com/en-us/123706)
- [Apple: macOS Tahoe 26 compatibility](https://support.apple.com/en-mide/122867)
- [Apple: watchOS 26 compatibility](https://support.apple.com/en-gb/108926)
- [Apple: iOS 27](https://www.apple.com/os/ios/)
- [Apple: iPadOS 27](https://www.apple.com/uk/os/ipados/)
- [Apple: macOS 27 Golden Gate](https://www.apple.com/os/macos/?version=no-hero)
- [Apple: watchOS 27](https://www.apple.com/ca/os/watchos/)
- [Apple: tvOS 26 Apple TV guide](https://support.apple.com/guide/tv/welcome/26/tvos/26)
- [Apple: visionOS 26 security content](https://support.apple.com/en-us/125115)
- [Apple Developer: Xcode 27 system requirements](https://developer.apple.com/xcode/system-requirements/)

OS 27 pages are preview material as of the audit date. Apple gives exact model
lists for iPhone, iPad, and Watch, but gives macOS 27 as Apple-silicon family
rules. The Mac findings below expand those rules to the concrete models present
in Apple’s macOS 26 list and Apple-silicon generations represented by the local
catalogue.

## Results

| Section | Canonical devices | OS 26 target coverage | OS 27 target coverage |
| --- | ---: | --- | --- |
| iPhone | 38 | Complete: all 31 supported identities present; 7 older extra identities | Complete: all 31 supported identities present; 7 older extra identities |
| iPad | 40 | Complete: all supported generations present; older unsupported generations are extra | Complete: all supported identities present; older unsupported generations are extra |
| Mac | 49 | Incomplete: 3 Apple-silicon MacBook Pro identities absent | Incomplete: at least 4 Apple-silicon MacBook Pro generation identities absent |
| Apple Watch | 17 | Complete identity coverage: Series 6+, SE 2+, Ultra and later present | Complete identity coverage: SE 3, Series 9–11, Ultra 2–3 present |
| Apple TV | 1 | Incomplete: Apple’s tvOS 26 guide supports Apple TV HD and Apple TV 4K; canonical data contains only one Apple TV 4K identity | Provisional: Apple has not published a complete tvOS 27 model matrix; Apple TV HD remains absent from the current catalogue |
| Vision | 1 | No separate Apple model list was found on Apple’s OS 26 pages; local current product exists | Same limitation; local current product exists |

### Missing Mac identities

These concrete identities are absent from `public/data/mac/mac.json` but are
within Apple’s supported Apple-silicon Mac set:

- MacBook Pro 14-inch (2021, M1 Pro or M1 Max)
- MacBook Pro 16-inch (2021, M1 Pro or M1 Max)
- MacBook Pro 16-inch (2023, M2 Pro or M2 Max)
- MacBook Pro 16-inch (2023, M3 Pro or M3 Max)

The first three are explicitly represented by Apple’s macOS Tahoe 26 compatibility
list. The fourth is included by Apple’s macOS 27 rule, “MacBook Pro with Apple
silicon introduced in 2020 or later,” but is not represented in the canonical
Mac JSON. The existing canonical 14-inch M3 family entry is present; no 14-inch
M3 gap was counted.

Apple’s OS 27 pages provide exact lists for iPhone, iPad, and Watch, but do not
provide complete model-by-model matrices for every platform. Therefore OS 27
findings are definitive where Apple publishes an exact list and provisional where
they depend on Apple’s family-level Mac rule or lack a tvOS 27 matrix. Apple’s
Apple Intelligence hardware requirements are feature requirements, not a
substitute for OS-installation compatibility.

Intel Mac entries in the canonical data were deliberately not counted as gaps or
targets: Intel MacBook Air, Intel MacBook Pro, Intel Mac mini, Intel iMac, iMac
Pro, and Intel Mac Pro.

## Watch path and data completeness

- Present: `public/data/apple-watch/apple-watch.json`.
- Not present: `public/data/watch/watch.json`; this is not the canonical path used
  by the current data layout.
- Present source inputs: seven files under `data/tmp/watch/` (`watch.html` through
  `watch7.html`).
- Present canonical Watch assets: 136 files under
  `public/data/apple-watch/images/`.
- A separate legacy asset directory exists at
  `public/data/watch/images/images/`; it contains 112 files and is not referenced
  by the canonical Watch JSON according to the handoff context.

The Watch JSON is structurally present and identity-complete for OS 26/27, but it
is not semantically dense. At the audited snapshot, all 17 Watch identities have
empty `configurations` and `storageOptions`; all 17 also have empty `cameras` and
`accessories`. Five older identities have null `priceAud`, and ten identities have
empty `overviewImages`. These are extraction-completeness findings, not missing
device identities.

## Scope boundary

This audit verifies device identity coverage against Apple’s published OS
compatibility sets. It does not prove that every field, colour, configuration,
price, image variant, or accessory is complete. It also does not treat schema
validity or image-reference existence as proof of semantic completeness.
