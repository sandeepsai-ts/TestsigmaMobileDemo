import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { useAppState } from '../AppState';
import { fontSize, radius, spacing } from '../theme';

type Props = TextInputProps & {
  label: string;
  errorText?: string | null;
  testID: string;
};

export default function TextField({ label, errorText, testID, style, ...rest }: Props) {
  const { colors } = useAppState();
  const hasError = !!errorText;
  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: colors.muted }]}>{label}</Text>
      <TextInput
        testID={testID}
        placeholderTextColor={colors.muted}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        style={[
          styles.input,
          {
            color: colors.ink,
            backgroundColor: colors.card,
            borderColor: hasError ? colors.danger : colors.border,
          },
          style,
        ]}
        {...rest}
      />
      {hasError ? (
        <Text testID={`${testID}ErrorText`} style={[styles.error, { color: colors.danger }]}>
          {errorText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 4,
    marginLeft: 2,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: fontSize.md,
  },
  error: {
    fontSize: fontSize.xs,
    marginTop: 4,
    marginLeft: 2,
  },
});
