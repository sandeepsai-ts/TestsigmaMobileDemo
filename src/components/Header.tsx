import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppState } from '../AppState';
import { fontSize, spacing } from '../theme';

type Props = {
  title: string;
  onBack?: () => void;
  rightLabel?: string;
  onRightPress?: () => void;
  rightTestID?: string;
};

export default function Header({ title, onBack, rightLabel, onRightPress, rightTestID }: Props) {
  const { colors } = useAppState();
  return (
    <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
      <View style={styles.side}>
        {onBack ? (
          <TouchableOpacity testID="headerBackButton" onPress={onBack} hitSlop={12}>
            <Text style={[styles.back, { color: colors.accent }]}>{'\u2039'} Back</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <Text testID="pageTitleLabel" style={[styles.title, { color: colors.ink }]} numberOfLines={1}>
        {title}
      </Text>
      <View style={[styles.side, styles.sideRight]}>
        {rightLabel ? (
          <TouchableOpacity testID={rightTestID} onPress={onRightPress} hitSlop={12}>
            <Text style={[styles.rightAction, { color: colors.accent }]}>{rightLabel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
  },
  side: {
    width: 72,
    justifyContent: 'center',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  back: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  rightAction: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});
