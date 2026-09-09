import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../AppState';
import PrimaryButton from '../components/PrimaryButton';
import TestBanner from '../components/TestBanner';
import { fontSize, radius, spacing } from '../theme';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'timeout';

// Point this at your own Testsigma Mock Server endpoint if you have one -
// any reachable JSON endpoint works for exercising throttled/offline runs.
const ENDPOINT = 'https://jsonplaceholder.typicode.com/todos/1';
const CLIENT_TIMEOUT_MS = 5000;

export default function NetworkScreen() {
  const { colors } = useAppState();
  const [status, setStatus] = useState<Status>('idle');
  const [resultText, setResultText] = useState<string | null>(null);

  const fetchData = async () => {
    setStatus('loading');
    setResultText(null);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);
    try {
      const response = await fetch(ENDPOINT, { signal: controller.signal });
      clearTimeout(timer);
      if (!response.ok) {
        setStatus('error');
        setResultText(`Server responded with HTTP ${response.status}`);
        return;
      }
      const json = await response.json();
      setStatus('success');
      setResultText(JSON.stringify(json, null, 2));
    } catch (err: any) {
      clearTimeout(timer);
      if (err?.name === 'AbortError') {
        setStatus('timeout');
        setResultText(`No response within ${CLIENT_TIMEOUT_MS / 1000}s - likely throttled or offline.`);
      } else {
        setStatus('error');
        setResultText(err?.message ?? 'Unknown network error');
      }
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <TestBanner />
      <ScrollView contentContainerStyle={styles.content}>
        <Text testID="pageTitleLabel" style={[styles.title, { color: colors.ink }]}>
          Network
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Fetches a small JSON payload with a {CLIENT_TIMEOUT_MS / 1000}s client-side timeout.
          Throttle or disable the network at the test-lab level (Testsigma / BrowserStack / Sauce
          Labs network-condition capability) and re-run to see the timeout state below.
        </Text>

        <PrimaryButton testID="fetchDataButton" label="FETCH DATA" onPress={fetchData} loading={status === 'loading'} />

        {status === 'loading' ? (
          <Text testID="loadingSpinnerText" style={[styles.status, { color: colors.muted }]}>
            Loading\u2026
          </Text>
        ) : null}

        {status === 'success' ? (
          <View style={[styles.resultBox, { backgroundColor: colors.card, borderColor: colors.success }]}>
            <Text testID="dataLoadedText" style={[styles.resultText, { color: colors.ink }]}>
              {resultText}
            </Text>
          </View>
        ) : null}

        {(status === 'error' || status === 'timeout') ? (
          <View
            testID="networkErrorBanner"
            style={[styles.resultBox, { backgroundColor: colors.warningBg, borderColor: colors.danger }]}>
            <Text style={[styles.resultText, { color: colors.danger }]}>{resultText}</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: spacing.lg },
  title: { fontSize: fontSize.xl, fontWeight: '800', marginBottom: spacing.xs },
  subtitle: { fontSize: fontSize.sm, lineHeight: 18, marginBottom: spacing.md },
  status: { marginTop: spacing.md, fontSize: fontSize.sm },
  resultBox: { marginTop: spacing.md, padding: spacing.md, borderRadius: radius.md, borderWidth: 1 },
  resultText: { fontSize: fontSize.xs, fontFamily: 'Courier' },
});
