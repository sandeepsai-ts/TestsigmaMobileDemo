# Testsigma Mobile Demo App

One React Native codebase that ships as an **identical** Android app and iOS app,
purpose-built as a Testsigma test/demo target. Every screen carries a `testID`,
which React Native maps to `resource-id` on Android and `accessibilityIdentifier`
on iOS - so the same locator finds the same element on both platforms.

**Why "identical" is actually true here, not just a goal:** every screen is built
from this project's own hand-rolled components (`Header`, `TabBar`, `ToggleSwitch`,
`Toast`, `PrimaryButton`) instead of each OS's native chrome. Native `Switch`,
`Alert.alert`, and tab bars render differently on iOS vs Android by design - this
app never uses them, so there is nothing left to diverge.

## What's inside

| Screen | Exercises | Key `testID`s |
|---|---|---|
| Login | Validation | `usernameInput`, `passwordInput`, `loginButton`, `loginErrorText` |
| Home -> Item Detail | Navigation (list -> push -> back) | `itemsListView`, `itemRow-*`, `headerBackButton`, `quantityIncrementButton` |
| Gestures | Swipe, long-press, pinch-zoom, drag-reorder, pull-to-refresh | `swipeCarousel`, `longPressCard`, `pinchZoomImage`, `dragReorderList`, `pullToRefreshControl` |
| Network | Network throttling (client-side timeout) | `fetchDataButton`, `dataLoadedText`, `networkErrorBanner` |
| Geolocation | Geolocation | `requestLocationButton`, `latitudeText`, `longitudeText` |
| Web View | Mobile Web / native<->webview context switch | `webViewScreen` |
| More -> Settings | Toggles/state | `themeToggle`, `notificationsToggle` |
| More -> Biometric | Simulated biometric login | `simulateBiometricSuccessButton`, `biometricResultText` |
| More -> Push Notifications | Simulated push | `sendTestNotificationButton` |
| More -> About | Static info | `appVersionText`, `platformNameText` |

`/web/index.html` is a small standalone page for Testsigma's separate **Mobile
Web** application type, and doubles as the target for the in-app WebView screen.

## Already verified in the build sandbox

- `npm install` - clean, 866 packages resolved
- `npx tsc --noEmit` - zero type errors
- `npx eslint` - zero errors (a few harmless inline-style style warnings)
- `npx jest` - the full app renders successfully in the test renderer

What was **not** verified here, and can't be: actually compiling the Android
APK or iOS IPA. That needs the Android SDK and Xcode, neither of which exist in
this build sandbox (network is allow-listed to a handful of domains that
exclude Google's Maven and Apple's developer services). That's exactly what
the GitHub Actions workflows below are for - they run on real Android/macOS
runners with full internet access.

## Getting this onto GitHub - no command line required

**Install GitHub Desktop** (free, GUI only): https://desktop.github.com

1. **Add the local folder** - GitHub Desktop -> File -> Add Local Repository ->
   browse to this unzipped `TestsigmaMobileDemo` folder -> Add Repository.
   (It's already a git repo with one commit, so Desktop will recognize it immediately.)
2. **Publish it** - click the blue **Publish repository** button top-right.
   Untick "Keep this code private" if you want the free/unlimited GitHub
   Actions minutes that come with public repos (macOS runners burn private-repo
   minutes 10x faster - see the earlier build guide for the numbers). Click
   **Publish Repository**.
3. That's it - the push happens through the GUI. Android builds start
   automatically (see below); iOS needs one more one-time step first.

## Enabling the Android build (fully automatic, no secrets)

Nothing to do. `build-android.yml` runs on every push to `main` and needs no
setup. To get the APK:

1. On GitHub.com, open your repository -> **Actions** tab.
2. Click the **Build Android APK** run (it starts automatically after publish).
3. Scroll to the bottom of the run's summary page -> **Artifacts** ->
   download `android-debug-apk`. Unzip it to get `app-debug.apk`.

## Enabling the iOS build (one manual step, then automatic)

Apple gives no way to sign an app for free without a human logging into Xcode
at least once - there is no equivalent of the Android debug keystore. This is
the one part of this whole pipeline that needs a real Mac with Xcode, done
once:

1. On any Mac, open this project's `ios/TestsigmaMobileDemo.xcodeproj` in Xcode
   (run `pod install` inside `ios/` first if Xcode asks for a workspace).
2. Xcode -> Settings -> Accounts -> sign in with **any free Apple ID** (no paid
   Developer Program needed). It will show as "(Personal Team)".
3. Select the app target -> **Signing & Capabilities** -> check **Automatically
   manage signing** -> pick your Personal Team.
4. Build once for **Any iOS Device (arm64)** (Product -> Build). Xcode silently
   creates a Development certificate and provisioning profile.
5. Xcode -> Settings -> Accounts -> your account -> **Manage Certificates** ->
   right-click the new certificate -> **Export Certificate...** -> set a
   password -> save as `cert.p12`.
6. In Finder, go to `~/Library/MobileDevice/Provisioning Profiles/` and copy out
   the newest `.mobileprovision` file.
7. In Terminal (this one step needs a terminal, just to base64-encode two
   files - there's no GUI equivalent):
   ```
   base64 -i cert.p12 | pbcopy
   ```
   Paste the result into a new GitHub secret (see below). Repeat for the
   `.mobileprovision` file.
8. On GitHub.com: repository -> **Settings** -> **Secrets and variables** ->
   **Actions** -> **New repository secret**. Add these four:
   - `IOS_CERT_P12_BASE64` - the base64 text from `cert.p12`
   - `IOS_CERT_PASSWORD` - the password you set in step 5
   - `IOS_PROFILE_BASE64` - the base64 text from the `.mobileprovision` file
   - `IOS_PROFILE_NAME` - the exact profile name shown in Xcode's Signing pane
     (e.g. "iOS Team Provisioning Profile: com.yourteam.TestsigmaMobileDemo")
9. Go to **Actions** tab -> **Build iOS IPA** -> **Run workflow** (or just push
   a commit). Download the `ios-ipa` artifact the same way as the Android one.

**Why the resulting IPA still works without paying Apple $99/year:** Testsigma,
BrowserStack, and Sauce Labs all re-sign every uploaded iOS app with their own
provisioning profile before installing it on their devices - confirmed directly
from each platform's documentation. A Development export from a free Personal
Team is exactly what they expect; nothing about the 7-day on-device expiry
applies once they've re-signed it.

**Maintenance note:** if a future iOS build ever fails on a code-signing step,
that's the signal to repeat steps 1-8 once - the free certificate needs
occasional refreshing (roughly monthly is a safe cadence).

## Publishing the Mobile Web page

`deploy-web.yml` runs automatically whenever `/web` changes. To turn it on:

1. Repository -> **Settings** -> **Pages** -> under "Build and deployment",
   set Source to **GitHub Actions**.
2. Push a commit (or re-run the workflow from the **Actions** tab) - the page
   publishes to `https://<your-username>.github.io/<repo-name>/`.
3. Open `src/screens/WebViewScreen.tsx` and replace the `MOBILE_WEB_URL`
   constant with that URL, then commit again so the in-app WebView screen
   points at your own page instead of the placeholder.

## Wiring it into Testsigma

Same steps as the earlier build guide: create an **Android Native App**
application (upload the APK), an **iOS Native App** application (upload the
IPA - Development export, as above), and a **Mobile Web** application (point at
the GitHub Pages URL). Record against the uploaded builds with Testsigma's
Mobile Recorder - every element has a stable `testID`-based locator on both
platforms.

## What's simulated, and why

- **Biometric login** and **push notifications** are simulated (a button that
  shows a deterministic success/failure state) rather than wired to real
  Face ID/Touch ID APIs or Firebase/APNs. Real push needs a backend project
  per platform; real biometric prompts can't be triggered deterministically in
  an automated run anyway. Both are clearly labelled as simulated on-screen.
- **Gestures** (pinch, drag-reorder) are built from core React Native APIs
  (`PanResponder`, `Animated`) rather than a third-party gesture library, to
  keep the dependency surface - and therefore the CI build risk - as small as
  possible.
