# DEP Stage iOS Install

Static GitHub Pages installer for the DEP Stage iOS enterprise build.

## Update the build

Replace `dep-release.ipa` with a new enterprise-signed IPA, then update
`manifest.plist` and `index.html` if the version, build number, or bundle
identifier changed.

GitHub Pages is blocked for public repositories in the `healthline` org. Until
that setting changes or these files are mirrored to another static host, use this
direct install URL:

```text
itms-services://?action=download-manifest&url=https://raw.githubusercontent.com/healthline/bezzy-stream-v3-ios-install/main/manifest.plist
```

First-time enterprise installs require testers to trust `Healthline Networks, Inc.`
in iOS Settings.
