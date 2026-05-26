# DEP Stage App Install

Static Netlify installer for the DEP Stage enterprise iOS build and Android APK.

## Update the builds

Replace `dep-release.ipa` with a new enterprise-signed IPA and replace
the local `dep-stage.apk` artifact with the Android stage release APK. Then update
`manifest.plist` and `index.html` if the version, build number, bundle
identifier, or timestamps changed.

For Android, use a release-stage APK with the JS bundle embedded. Do not publish
the debug/e2e APK output, because that build path requires Metro at runtime.

`dep-stage.apk` is intentionally ignored by Git because the current DEP APK is
larger than GitHub's 100 MB file limit. Deploy it to Netlify from the local
artifact instead of committing it.

The installer page is:

```text
https://bezzy-stream-v3-app-install.netlify.app/
```

The direct iOS install URL is:

```text
itms-services://?action=download-manifest&url=https://bezzy-stream-v3-app-install.netlify.app/manifest.plist
```

The Android APK URL is:

```text
https://bezzy-stream-v3-app-install.netlify.app/dep-stage.apk
```

First-time iOS enterprise installs require testers to trust `Healthline Networks,
Inc.` in iOS Settings:

```text
Settings > General > VPN & Device Management > Enterprise App > Healthline Networks, Inc. > Trust
```

Android installs may require testers to allow the browser to install unknown
apps before opening the downloaded APK.

iOS does not allow OTA installs to open the app automatically. The page includes
a manual `dephealthline://` open link for use after install and trust are
complete.
