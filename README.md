# DEP Stage iOS Install

Static GitHub Pages installer for the DEP Stage iOS enterprise build.

## Update the build

Replace `dep-release.ipa` with a new enterprise-signed IPA, then update
`manifest.plist` and `index.html` if the version, build number, or bundle
identifier changed.

The installer page is:

```text
https://bezzy-stream-v3-ios-install.netlify.app/
```

The direct install URL is:

```text
itms-services://?action=download-manifest&url=https://bezzy-stream-v3-ios-install.netlify.app/manifest.plist
```

First-time enterprise installs require testers to trust `Healthline Networks, Inc.`
in iOS Settings:

```text
Settings > General > VPN & Device Management > Enterprise App > Healthline Networks, Inc. > Trust
```

iOS does not allow OTA installs to open the app automatically. The page includes
a manual `dephealthline://` open link for use after install and trust are complete.
