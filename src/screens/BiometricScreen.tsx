import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../AppState';
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';
import { fontSize, radius, spacing } from '../theme';

type Props = { onBack: () => void };

// Simulated only, on purpose: a real Face ID / fingerprint prompt needs an
// extra native dependency (e.g. react-native-biometrics) and can't be
// triggered deterministically in automated test runs anyway. This screen
// gives Testsigma a stable, always-repeatable "success" and "failure" path
// to automate instead.
export default function BiometricScreen({ onBack }: Props) {
  const { colors } = useAppState();
  const [result, setResult] = useState<'idle' | 'success' | 'failure'>('idle');

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <Header title="Biometric Login" onBack={onBack} />
      <View style={styles.content}>
        <View style={[styles.icon, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={styles.iconText}>{'\u25C9'}</Text>
        </View>
        <Text style={[styles.hint, { color: colors.muted }]}>
          Simulated prompt - not a real Face ID / Touch ID / fingerprint call.
        </Text>
        <PrimaryButton
          testID="simulateBiometricSuccessButton"
          label="SIMULATE SUCCESSFUL SCAN"
          onPress={() => setResult('success')}
        />
        <PrimaryButton
          testID="simulateBiometricFailureButton"
          label="SIMULATE FAILED SCAN"
          variant="secondary"
          onPress={() => setResult('failure')}
        />
        {result === 'success' ? (
          <Text testID="biometricResultText" style={[styles.result, { color: colors.success }]}>
            Authenticated successfully.
          </Text>
        ) : null}
        {result === 'failure' ? (
          <Text testID="biometricResultText" style={[styles.result, { color: colors.danger }]}>
            Authentication failed. Try again.
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: spacing.lg, alignItems: 'center' },
  icon: {
    width: 80,
    height: 80,
    borderRadius: radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  iconText: { fontSize: 36 },
  hint: { fontSize: fontSize.sm, textAlign: 'center', marginBottom: spacing.lg },
  result: { marginTop: spacing.md, fontSize: fontSize.md, fontWeight: '700' },
});
