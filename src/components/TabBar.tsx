import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppState } from '../AppState';
import { fontSize, spacing } from '../theme';

export type TabKey = 'home' | 'gestures' | 'network' | 'location' | 'web' | 'more';

const TABS: { key: TabKey; label: string; icon: string; testID: string }[] = [
  { key: 'home', label: 'Home', icon: '\u2302', testID: 'tabHome' },
  { key: 'gestures', label: 'Gestures', icon: '\u270B', testID: 'tabGestures' },
  { key: 'network', label: 'Network', icon: '\u21C5', testID: 'tabNetwork' },
  { key: 'location', label: 'Location', icon: '\u25C9', testID: 'tabLocation' },
  { key: 'web', label: 'Web', icon: '\u25A2', testID: 'tabWeb' },
  { key: 'more', label: 'More', icon: '\u2261', testID: 'tabMore' },
];

type Props = {
  active: TabKey;
  onSelect: (key: TabKey) => void;
};

export default function TabBar({ active, onSelect }: Props) {
  const { colors } = useAppState();
  return (
    <View style={[styles.bar, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
      {TABS.map(tab => {
        const isActive = tab.key === active;
        const tint = isActive ? colors.accent : colors.muted;
        return (
          <TouchableOpacity
            key={tab.key}
            testID={tab.testID}
            style={styles.tab}
            onPress={() => onSelect(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}>
            <Text style={[styles.icon, { color: tint }]}>{tab.icon}</Text>
            <Text style={[styles.label, { color: tint, fontWeight: isActive ? '700' : '500' }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontSize: fontSize.xs,
  },
});
