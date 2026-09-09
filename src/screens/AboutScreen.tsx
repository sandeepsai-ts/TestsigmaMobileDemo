import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../AppState';
import Header from '../components/Header';
import { fontSize, radius, spacing } from '../theme';
import pkg from '../../package.json';

type Props = { onBack: () => void };

export default function AboutScreen({ onBack }: Props) {
  const { colors } = useAppState();
  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <Header title="About" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Row label="App Name" value={pkg.name} colors={colors} />
          <Row label="Version" value={pkg.version} valueTestID="appVersionText" colors={colors} />
          <Row label="Platform" value={Platform.OS} valueTestID="platformNameText" colors={colors} />
          <Row label="Platform Version" value={String(Platform.Version)} colors={colors} />
        </View>
        <Text style={[styles.disclaimer, { color: colors.muted }]}>
          This is a Testsigma demo/test application. It is not a real product and contains no
          real user data, real payments, or real push infrastructure.
        </Text>
      </ScrollView>
    </View>
  );
}

function Row({
  label,
  value,
  valueTestID,
  colors,
}: {
  label: string;
  value: string;
  valueTestID?: string;
  colors: any;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, { color: colors.muted }]}>{label}</Text>
      <Text testID={valueTestID} style={[styles.rowValue, { color: colors.ink }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: spacing.lg },
  card: { borderWidth: 1, borderRadius: radius.md, padding: spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.xs },
  rowLabel: { fontSize: fontSize.sm },
  rowValue: { fontSize: fontSize.sm, fontWeight: '700' },
  disclaimer: { fontSize: fontSize.xs, marginTop: spacing.lg, lineHeight: 16, textAlign: 'center' },
});
