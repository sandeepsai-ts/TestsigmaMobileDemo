import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../AppState';
import Header from '../components/Header';
import ToggleSwitch from '../components/ToggleSwitch';
import { fontSize, radius, spacing } from '../theme';

type Props = { onBack: () => void };

export default function SettingsScreen({ onBack }: Props) {
  const { colors, isDarkMode, toggleDarkMode, notificationsEnabled, toggleNotifications } =
    useAppState();
  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <Header title="Settings" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.ink }]}>Dark Mode</Text>
          <ToggleSwitch testID="themeToggle" value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>
        <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.ink }]}>Notifications</Text>
          <ToggleSwitch
            testID="notificationsToggle"
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  label: { fontSize: fontSize.md, fontWeight: '600' },
});
