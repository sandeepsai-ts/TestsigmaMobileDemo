/**
 * Testsigma Mobile Demo App
 * A disclosed test/demo app for exercising Testsigma's mobile automation:
 * navigation, validation, gestures, network handling, geolocation, and
 * mobile web - identical on Android and iOS by design (single codebase,
 * zero platform-native chrome).
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStateProvider, useAppState } from './src/AppState';
import AppNavigator from './src/navigation/AppNavigator';

function Root() {
  const { isDarkMode, colors } = useAppState();
  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <Root />
      </AppStateProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
