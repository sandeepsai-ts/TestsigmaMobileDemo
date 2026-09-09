import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useAppState } from '../AppState';
import TestBanner from '../components/TestBanner';
import { fontSize, spacing } from '../theme';

// Replace with your own GitHub Pages URL once /web is deployed (see README).
// Kept as a real, always-reachable placeholder in the meantime so the
// screen always has something to render.
export const MOBILE_WEB_URL = 'https://example.com';

export default function WebViewScreen() {
  const { colors } = useAppState();
  const [loading, setLoading] = useState(true);

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <TestBanner />
      <View style={[styles.addressBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text testID="webAddressText" style={[styles.addressText, { color: colors.muted }]} numberOfLines={1}>
          {'\uD83D\uDD12 '}
          {MOBILE_WEB_URL}
        </Text>
      </View>
      {loading ? (
        <Text testID="webLoadingText" style={[styles.loading, { color: colors.muted }]}>
          Loading page\u2026
        </Text>
      ) : null}
      <WebView
        testID="webViewScreen"
        source={{ uri: MOBILE_WEB_URL }}
        style={styles.webview}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  addressBar: {
    margin: spacing.md,
    marginBottom: 0,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
  },
  addressText: { fontSize: fontSize.xs },
  loading: { textAlign: 'center', marginTop: spacing.sm, fontSize: fontSize.sm },
  webview: { flex: 1, marginTop: spacing.sm },
});
