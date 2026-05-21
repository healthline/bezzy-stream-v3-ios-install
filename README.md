# DEP Stage iOS Install

Static GitHub Pages installer for the DEP Stage iOS enterprise build.

## Update the build

Replace `dep-release.ipa` with a new enterprise-signed IPA, then update
`manifest.plist` and `index.html` if the version, build number, or bundle
identifier changed.

The install URL is:

```text
https://healthline.github.io/bezzy-stream-v3-ios-install/
```

First-time enterprise installs require testers to trust `Healthline Networks, Inc.`
in iOS Settings.
