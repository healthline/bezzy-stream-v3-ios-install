# Bezzy Stage Installs

Static Netlify installer hosting enterprise iOS builds and Android APKs for
authorized internal testers. Hosts all 10 Bezzy stage apps.

Page: https://bezzy-stream-v3-app-install.netlify.app/

## Apps

| App | iOS bundle id | IPA | APK | iOS manifest |
| --- | --- | --- | --- | --- |
| Bezzy Depression | com.healthline.dep-stage | dep-release.ipa | dep-stage.apk | manifest.plist |
| Bezzy Psoriasis | com.healthline.pso-stage | pso-release.ipa | pso-stage.apk | pso-manifest.plist |
| Bezzy Breast Cancer | com.healthline.bc-stage | bcbuddy-release.ipa | bcbuddy-stage.apk | bcbuddy-manifest.plist |
| Bezzy COPD | com.healthline.copd-stage | copd-release.ipa | copd-stage.apk | copd-manifest.plist |
| Bezzy IBD | com.healthline.ibd-stage | ibd-release.ipa | ibd-stage.apk | ibd-manifest.plist |
| Bezzy Migraine | com.healthline.mig-stage | mig-release.ipa | mig-stage.apk | mig-manifest.plist |
| Bezzy MS | com.healthline.ms-stage | msbuddy-release.ipa | msbuddy-stage.apk | msbuddy-manifest.plist |
| Bezzy Psoriatic Arthritis | com.healthline.psa-stage | psa-release.ipa | psa-stage.apk | psa-manifest.plist |
| Bezzy RA | com.healthline.ra-stage | ra-release.ipa | ra-stage.apk | ra-manifest.plist |
| Bezzy Type 2 Diabetes | com.healthline.t2d-stage | t2d-release.ipa | t2d-stage.apk | t2d-manifest.plist |

`index.html` renders all apps from the `APPS` array in its inline script; add or
update an entry there when an app changes. Each app also needs its `*-display-image.png`
(57px) + `*-full-size-image.png` (512px) icons and its `*-manifest.plist`.

## Updating builds

Per app: replace the IPA + APK, bump the version/build in the `APPS` array (and
the `bundle-version` in that app's manifest if it changed).

- iOS IPA: `fastlane build_with_stage_profile` (or `rn_stage`) per app.
- Android APK: `assembleStageRelease`. **Force a fresh JS bundle** for core JS
  changes — gradle does not treat the workspace-symlinked `healthline-cares-core`
  as a bundle-task input, so clear the bundle outputs and pass `--no-build-cache`:
  ```
  rm -rf <app>/android/app/build/generated/assets/createBundleStageReleaseJsAndAssets \
         <app>/android/app/build/intermediates/assets/stageRelease
  ./gradlew assembleStageRelease --no-build-cache
  ```
  If gradle fails with "No matching variant of project :shopify_flash-list",
  also clear stale autolinking: `rm -rf <app>/android/build/generated/autolinking <app>/android/.cxx`.

APKs (`*-stage.apk`) are git-ignored (exceed GitHub's 100 MB limit) and deploy to
Netlify from the local artifacts via `netlify deploy --prod --dir .`.

## iOS enterprise trust

First install requires trusting `Healthline Networks, Inc.` in
Settings > General > VPN & Device Management. Trust is per device, not per app.

## Deploy

```
git add <ipas> index.html *-manifest.plist *-display-image.png *-full-size-image.png _headers .gitignore README.md
git commit -m "..."
git push
netlify deploy --prod --dir . --no-build
```
