# OS 26 / OS 27 device coverage source audit

Date: 2026-08-23

Scope: Apple hardware supported by iOS, iPadOS, watchOS, macOS, tvOS, or visionOS 26 and 27. Intel Macs are excluded. This is a read-only comparison; canonical JSON and source inputs were not changed.

## Authoritative Apple sources

- [iOS 26 compatibility](https://support.apple.com/en-us/123705): iPhone 11 and later, including iPhone SE (2nd generation and later).
- [iPadOS 26 compatibility](https://support.apple.com/es-es/123706): iPad Pro 11-inch (1st generation and later), iPad Pro 12.9-inch (3rd generation and later), iPad Air (3rd generation and later), iPad (8th generation and later), and iPad mini (5th generation and later), including the newer M-series, A16, and A17 Pro models.
- [watchOS 26 Apple Watch models](https://support.apple.com/en-ie/guide/watch/apd2054d0d5b/watchos): Apple Watch Series 6 and later, Apple Watch SE (2nd generation and later), and Apple Watch Ultra, Ultra 2, and Ultra 3.
- [macOS Tahoe 26 compatibility](https://support.apple.com/en-mide/122867): Apple silicon MacBook Air and MacBook Pro models from 2020 onward, Mac mini from 2020 onward, iMac from 2020 onward, Mac Studio from 2022 onward, Mac Pro from 2023 onward, and MacBook Neo. The page also lists some Intel Macs; they are explicitly excluded from this audit.
- [tvOS 26 Apple TV guide](https://support.apple.com/guide/tv/welcome/26/tvos/26): all Apple TV HD and Apple TV 4K models can update to tvOS 26.
- [Apple security releases](https://support.apple.com/en-us/100100): corroborates the OS 26 device floors, including iPhone 11 and later, the iPadOS 26 model families, Apple Watch Series 6 and later, Apple TV HD and Apple TV 4K, and Apple Vision Pro.
- [visionOS 26 security content](https://support.apple.com/en-us/125115): identifies Apple Vision Pro as the supported hardware platform. Apple Vision Pro is currently the only Apple visionOS hardware family, so there is no separate multi-model matrix.

## Repository comparison

The handoff context reports 157 canonical devices across eight sections. The current files under `public/data` contain the OS 26-supported model families for iPhone, iPad, Apple Watch, non-Intel Mac, and Vision Pro, plus older historical devices. The Apple Watch JSON is present at `public/data/apple-watch/apple-watch.json`; the source inputs are present under `data/tmp/watch/watch.html` through `watch7.html`.

One confirmed catalogue gap is Apple TV HD: `public/data/apple-tv/apple-tv.json` contains one Apple TV 4K entry, while Apple’s tvOS 26 guide explicitly supports Apple TV HD as well as every Apple TV 4K model. Whether Apple TV generations are intentionally collapsed into the project’s product identity model must be resolved before treating this as an extraction defect.

The Mac JSON contains Intel entries, including Intel MacBook Air, MacBook Pro, iMac, iMac Pro, Mac mini, and Mac Pro identities. They are outside the requested OS 26/27 target set and must not be counted as supported targets. The non-Intel entries cover Apple’s OS 26 Mac families visible in the current canonical file.

## OS 27 status and caveat

Apple has announced iOS 27, iPadOS 27, macOS 27, watchOS 27, tvOS 27, and visionOS 27, but no authoritative Apple consumer support page was found that lists complete model-by-model compatibility for all six platforms.

Available first-party evidence includes [Apple’s WWDC26 announcement](https://www.apple.com/uk/newsroom/2026/06/apple-unveils-next-generation-of-apple-intelligence-siri-ai-and-more/) and [Xcode 27 system requirements](https://developer.apple.com/xcode/system-requirements/). These establish the OS/SDK release context and feature hardware requirements, not a complete installation-compatibility catalogue. Apple’s Apple Intelligence requirements are stricter than general OS compatibility and must not be used as a substitute for it.

The current evidence therefore supports a definitive OS 26 audit, but not a definitive OS 27 model-completeness claim. OS 27 coverage should remain marked provisional until Apple publishes platform-specific compatibility lists. tvOS 27 is especially unresolved; tvOS 26’s Apple TV HD and Apple TV 4K statement is the latest explicit hardware compatibility evidence.

## Audit conclusion

- OS 26: iPhone, iPad, Apple Watch, non-Intel Mac, and Vision Pro coverage is present at the product-family level; Apple TV HD is the confirmed missing supported family in the current canonical catalogue.
- Intel Macs: excluded from the target catalogue even though macOS Tahoe 26 supports a limited Intel subset.
- OS 27: no complete authoritative model matrix exists in the sources reviewed. Do not claim that the current JSON is complete for OS 27.
- Data integrity caveat: schema validity and image-reference existence do not prove semantic completeness. The handoff context separately records sparse Apple Watch fields and should be treated as a data-density issue, not evidence that the watch JSON is missing.
