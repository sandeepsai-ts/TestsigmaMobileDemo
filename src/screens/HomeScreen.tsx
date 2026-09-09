import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppState } from '../AppState';
import TestBanner from '../components/TestBanner';
import { DEMO_ITEMS } from '../data/items';
import { fontSize, radius, spacing } from '../theme';

type Props = {
  onOpenItem: (id: string) => void;
};

export default function HomeScreen({ onOpenItem }: Props) {
  const { colors, username } = useAppState();
  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <TestBanner />
      <FlatList
        testID="itemsListView"
        data={DEMO_ITEMS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={[styles.welcome, { color: colors.ink }]}>
            Welcome back, {username ?? 'tester'}. Tap an item to open its detail screen.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            testID={`itemRow-${item.id}`}
            style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => onOpenItem(item.id)}>
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={styles.rowText}>
              <Text style={[styles.name, { color: colors.ink }]}>{item.name}</Text>
              <Text style={[styles.category, { color: colors.muted }]}>{item.category}</Text>
            </View>
            <Text style={[styles.chevron, { color: colors.muted }]}>{'\u203A'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  list: { padding: spacing.md },
  welcome: { fontSize: fontSize.md, marginBottom: spacing.md, lineHeight: 20 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  icon: { fontSize: 22, width: 36 },
  rowText: { flex: 1 },
  name: { fontSize: fontSize.md, fontWeight: '700' },
  category: { fontSize: fontSize.xs, marginTop: 2 },
  chevron: { fontSize: 20 },
});
