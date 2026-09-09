import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../AppState';
import { fontSize, spacing } from '../theme';

export default function TestBanner() {
  const { colors } = useAppState();
  return (
    <View
      testID="testBannerLabel"
      style={[
        styles.banner,
        { backgroundColor: colors.warningBg, borderColor: colors.warningBorder },
      ]}>
      <Text style={[styles.text, { color: colors.warningInk }]}>
        TESTSIGMA DEMO APP · NOT A REAL PRODUCT · TEST DATA ONLY
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderBottomWidth: 1,
    paddingVertical: spacing.xs,
    alignItems: 'center',
  },
  text: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
