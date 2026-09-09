import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useAppState } from '../AppState';
import { fontSize, radius, spacing } from '../theme';

type Props = {
  label: string;
  onPress: () => void;
  testID?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
};

export default function PrimaryButton({
  label,
  onPress,
  testID,
  variant = 'primary',
  disabled,
  loading,
}: Props) {
  const { colors } = useAppState();
  const isSecondary = variant === 'secondary';
  const bg = disabled
    ? colors.border
    : variant === 'danger'
    ? colors.danger
    : isSecondary
    ? 'transparent'
    : colors.accent;
  const fg = disabled ? colors.muted : isSecondary ? colors.accent : colors.accentInk;
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      style={[
        styles.btn,
        { backgroundColor: bg, borderColor: colors.accent, borderWidth: isSecondary ? 1.5 : 0 },
      ]}>
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <Text style={[styles.label, { color: fg }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: radius.md,
    paddingVertical: spacing.md - 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: '700',
  },
});
