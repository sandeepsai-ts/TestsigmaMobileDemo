import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppState } from '../AppState';
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';
import { DEMO_ITEMS } from '../data/items';
import { fontSize, radius, spacing } from '../theme';

type Props = {
  itemId: string;
  onBack: () => void;
  onAdded: (message: string) => void;
};

export default function DetailScreen({ itemId, onBack, onAdded }: Props) {
  const { colors } = useAppState();
  const item = DEMO_ITEMS.find(i => i.id === itemId) ?? DEMO_ITEMS[0];
  const [qty, setQty] = useState(1);

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <Header title="Item Detail" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.hero, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={styles.heroIcon}>{item.icon}</Text>
        </View>
        <Text testID="itemDetailNameText" style={[styles.name, { color: colors.ink }]}>
          {item.name}
        </Text>
        <Text style={[styles.category, { color: colors.muted }]}>{item.category}</Text>
        <Text style={[styles.description, { color: colors.ink }]}>{item.description}</Text>

        <Text style={[styles.qtyLabel, { color: colors.muted }]}>Quantity</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            testID="quantityDecrementButton"
            style={[styles.qtyBtn, { borderColor: colors.border }]}
            onPress={() => setQty(q => Math.max(1, q - 1))}>
            <Text style={[styles.qtyBtnText, { color: colors.ink }]}>{'-'}</Text>
          </TouchableOpacity>
          <Text testID="quantityValueText" style={[styles.qtyValue, { color: colors.ink }]}>
            {qty}
          </Text>
          <TouchableOpacity
            testID="quantityIncrementButton"
            style={[styles.qtyBtn, { borderColor: colors.border }]}
            onPress={() => setQty(q => Math.min(99, q + 1))}>
            <Text style={[styles.qtyBtnText, { color: colors.ink }]}>{'+'}</Text>
          </TouchableOpacity>
        </View>

        <PrimaryButton
          testID="addToListButton"
          label="ADD TO LIST"
          onPress={() => onAdded(`Added ${qty} \u00d7 ${item.name}`)}
        />
        <PrimaryButton testID="backToListButton" label="BACK TO LIST" variant="secondary" onPress={onBack} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: spacing.lg },
  hero: {
    height: 140,
    borderRadius: radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroIcon: { fontSize: 56 },
  name: { fontSize: fontSize.lg, fontWeight: '800' },
  category: { fontSize: fontSize.sm, marginTop: 2, marginBottom: spacing.md },
  description: { fontSize: fontSize.md, lineHeight: 21, marginBottom: spacing.lg },
  qtyLabel: { fontSize: fontSize.xs, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 6 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  qtyBtn: {
    width: 40,
    height: 40,
    borderWidth: 1.5,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: { fontSize: fontSize.lg, fontWeight: '700' },
  qtyValue: { fontSize: fontSize.lg, fontWeight: '700', width: 48, textAlign: 'center' },
});
