import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppState } from '../AppState';
import TestBanner from '../components/TestBanner';
import { fontSize, radius, spacing } from '../theme';

export type MoreDestination = 'settings' | 'biometric' | 'pushNotifications' | 'about';

type Props = {
  onNavigate: (dest: MoreDestination) => void;
  onLogout: () => void;
};

const MENU: { key: MoreDestination; label: string; icon: string; testID: string }[] = [
  { key: 'settings', label: 'Settings', icon: '\u2699', testID: 'menuSettingsRow' },
  { key: 'biometric', label: 'Biometric Login', icon: '\u25C9', testID: 'menuBiometricRow' },
  { key: 'pushNotifications', label: 'Push Notifications', icon: '\u2709', testID: 'menuPushRow' },
  { key: 'about', label: 'About', icon: '\u2139', testID: 'menuAboutRow' },
];

export default function MoreScreen({ onNavigate, onLogout }: Props) {
  const { colors, username } = useAppState();
  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <TestBanner />
      <ScrollView contentContainerStyle={styles.content}>
        <Text testID="pageTitleLabel" style={[styles.title, { color: colors.ink }]}>
          More
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>Signed in as {username}</Text>

        {MENU.map(item => (
          <TouchableOpacity
            key={item.key}
            testID={item.testID}
            style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => onNavigate(item.key)}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={[styles.label, { color: colors.ink }]}>{item.label}</Text>
            <Text style={[styles.chevron, { color: colors.muted }]}>{'\u203A'}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          testID="logoutButton"
          style={[styles.row, styles.logoutRow, { borderColor: colors.danger }]}
          onPress={onLogout}>
          <Text style={[styles.label, { color: colors.danger, textAlign: 'center', flex: 1 }]}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: spacing.md },
  title: { fontSize: fontSize.xl, fontWeight: '800', marginBottom: 2 },
  subtitle: { fontSize: fontSize.sm, marginBottom: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  icon: { fontSize: 18, width: 32 },
  label: { fontSize: fontSize.md, fontWeight: '600', flex: 1 },
  chevron: { fontSize: 18 },
  logoutRow: { marginTop: spacing.md, backgroundColor: 'transparent' },
});
