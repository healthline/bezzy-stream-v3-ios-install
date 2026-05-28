# Bezzy Stage Installs

Static Netlify installer hosting enterprise iOS builds and Android APKs for
authorized internal testers. Currently hosts two apps:

- Bezzy Depression (`com.healthline.dep-stage`)
- Bezzy Psoriasis  (`com.healthline.pso-stage`)

The page is:

```text
https://bezzy-stream-v3-app-install.netlify.app/
```

## Update an app's builds

Per app, replace the IPA + APK and update `index.html` if the version, build
number, or timestamps changed. Update the corresponding manifest only if the
bundle id, version, or IPA URL changed.

| App | iOS IPA            | Android APK          | iOS manifest         |
| --- | ------------------ | -------------------- | -------------------- |
| dep | `dep-release.ipa`  | `dep-stage.apk`      | `manifest.plist`     |
| pso | `pso-release.ipa`  | `pso-stage.apk`      | `pso-manifest.plist` |

For Android, use a release-stage APK with the JS bundle embedded. Do not
publish the debug/e2e APK output, because that build path requires Metro at
runtime.

`dep-stage.apk` and `pso-stage.apk` are intentionally ignored by Git because
APKs exceed GitHub's 100 MB file limit. Deploy them to Netlify from the local
artifacts instead of committing.

## Direct install URLs

iOS:

```text
itms-services://?action=download-manifest&url=https://bezzy-stream-v3-app-install.netlify.app/manifest.plist
itms-services://?action=download-manifest&url=https://bezzy-stream-v3-app-install.netlify.app/pso-manifest.plist
```

Android APK:

```text
https://bezzy-stream-v3-app-install.netlify.app/dep-stage.apk
https://bezzy-stream-v3-app-install.netlify.app/pso-stage.apk
```

## iOS enterprise trust

First-time iOS enterprise installs require testers to trust
`Healthline Networks, Inc.` in iOS Settings:

```text
Settings > General > VPN & Device Management > Enterprise App > Healthline Networks, Inc. > Trust
```

Trust is per device, not per app, so trusting once covers both Bezzy apps on
the same device.

## Android side-loading

Android may require testers to allow the browser to install unknown apps the
first time. There is no enterprise-trust step for the APK path.

## Open links

iOS does not allow OTA installs to open the app automatically. The page
includes manual deep links for use after install and trust are complete:

- `dephealthline://`
- `psohealthline://`
