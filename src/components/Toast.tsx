import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useAppState } from '../AppState';
import { fontSize, radius, spacing } from '../theme';

type Props = {
  message: string | null;
  testID?: string;
};

// A hand-rolled toast (not the OS-level Android Toast or an Alert.alert
// dialog) so the exact same component renders on both platforms.
export default function Toast({ message, testID }: Props) {
  const { colors } = useAppState();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (message) {
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }),
        Animated.delay(1600),
        Animated.timing(opacity, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start();
    }
  }, [message, opacity]);

  if (!message) {
    return null;
  }

  return (
    <Animated.View
      testID={testID}
      pointerEvents="none"
      style={[styles.toast, { opacity, backgroundColor: colors.ink }]}>
      <Text style={[styles.text, { color: colors.bg }]}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 96,
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    maxWidth: '80%',
  },
  text: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    textAlign: 'center',
  },
});
