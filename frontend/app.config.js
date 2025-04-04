//Replace com.anonymous.learnadoodle with a unique identifier when you’re preparing for the App Store/Play Store. Use a reverse-domain style (e.g., com.yourname.learnadoodle).
//Make sure the assets (icon.png, splash.png, adaptive-icon.png, favicon.png) exist in the assets/ directory. Otherwise, comment them out for now.
//If you’re using EAS (Expo Application Services) to build, you’ll want to fill in the correct projectId under extra.eas.
// app.config.js
export default {
  name: "Learnadoodle",
  slug: "learnadoodle",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png", // Make sure this exists or comment out too
  userInterfaceStyle: "light",
  // splash: {
  //   image: "./assets/splash.png",
  //   resizeMode: "contain",
  //   backgroundColor: "#ffffff"
  // },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "com.anonymous.learnadoodle",
    supportsTablet: true
  },
  android: {
    package: "com.anonymous.learnadoodle",
    // adaptiveIcon: {
    //   foregroundImage: "./assets/adaptive-icon.png",
    //   backgroundColor: "#ffffff"
    // }
  },
  web: {
    // favicon: "./assets/favicon.png"
  },
  extra: {
    eas: {
      projectId: "your-eas-project-id-if-applying-eas"
    }
  }
};
