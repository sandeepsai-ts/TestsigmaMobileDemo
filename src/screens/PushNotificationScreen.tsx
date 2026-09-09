import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../AppState';
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';
import { fontSize, spacing } from '../theme';

type Props = { onBack: () => void; onSend: (message: string) => void };

// Simulated only: real push requires a Firebase/APNs project per platform,
// which is far outside what a disclosed demo/test app should ship with.
// This exercises the same UI surface (a banner/toast appearing) that a real
// push notification would trigger, without any backend dependency.
export default function PushNotificationScreen({ onBack, onSend }: Props) {
  const { colors, notificationsEnabled } = useAppState();
  const [sentCount, setSentCount] = useState(0);

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <Header title="Push Notifications" onBack={onBack} />
      <View style={styles.content}>
        <Text style={[styles.hint, { color: colors.muted }]}>
          Simulates a push notification arriving by showing an in-app banner. Toggle
          "Notifications" off in Settings to test the suppressed path too.
        </Text>
        <PrimaryButton
          testID="sendTestNotificationButton"
          label="SEND TEST NOTIFICATION"
          onPress={() => {
            setSentCount(c => c + 1);
            if (notificationsEnabled) {
              onSend('Test notification: your order status changed.');
            }
          }}
        />
        <Text testID="notificationSentCountText" style={[styles.count, { color: colors.ink }]}>
          Sent {sentCount} time{sentCount === 1 ? '' : 's'} this session
        </Text>
        {!notificationsEnabled ? (
          <Text style={[styles.suppressed, { color: colors.danger }]}>
            Notifications are currently disabled in Settings - the banner will not appear.
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: spacing.lg },
  hint: { fontSize: fontSize.sm, lineHeight: 18, marginBottom: spacing.md },
  count: { marginTop: spacing.md, fontSize: fontSize.sm, fontWeight: '600' },
  suppressed: { marginTop: spacing.sm, fontSize: fontSize.xs },
});
