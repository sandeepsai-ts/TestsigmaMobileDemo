import React, { useState } from 'react';
import { PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useAppState } from '../AppState';
import PrimaryButton from '../components/PrimaryButton';
import TestBanner from '../components/TestBanner';
import { fontSize, radius, spacing } from '../theme';

type Status = 'idle' | 'requesting' | 'granted' | 'denied' | 'error';

async function requestAndroidPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return true;
  }
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location Permission',
      message: 'This test app would like to read your device location.',
      buttonPositive: 'Allow',
      buttonNegative: 'Deny',
    },
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

export default function GeolocationScreen() {
  const { colors } = useAppState();
  const [status, setStatus] = useState<Status>('idle');
  const [coords, setCoords] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  const requestLocation = async () => {
    setStatus('requesting');
    setErrorText(null);
    const allowed = await requestAndroidPermission();
    if (!allowed) {
      setStatus('denied');
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        setStatus('granted');
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      error => {
        setStatus('error');
        setErrorText(error.message);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 },
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <TestBanner />
      <ScrollView contentContainerStyle={styles.content}>
        <Text testID="pageTitleLabel" style={[styles.title, { color: colors.ink }]}>
          Geolocation
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Requests the device's current position. Most cloud device labs (Testsigma Cloud,
          BrowserStack, Sauce Labs) can inject a mock GPS coordinate at the session level - the
          values below simply reflect whatever the OS/driver reports.
        </Text>

        <PrimaryButton
          testID="requestLocationButton"
          label="GET CURRENT LOCATION"
          onPress={requestLocation}
          loading={status === 'requesting'}
        />

        {status === 'denied' ? (
          <Text testID="locationPermissionDeniedText" style={[styles.status, { color: colors.danger }]}>
            Location permission was denied.
          </Text>
        ) : null}

        {status === 'error' ? (
          <Text style={[styles.status, { color: colors.danger }]}>{errorText}</Text>
        ) : null}

        {coords ? (
          <View style={[styles.resultBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.muted }]}>Latitude</Text>
            <Text testID="latitudeText" style={[styles.value, { color: colors.ink }]}>
              {coords.lat.toFixed(6)}
            </Text>
            <Text style={[styles.label, { color: colors.muted }]}>Longitude</Text>
            <Text testID="longitudeText" style={[styles.value, { color: colors.ink }]}>
              {coords.lng.toFixed(6)}
            </Text>
            <Text style={[styles.label, { color: colors.muted }]}>Accuracy</Text>
            <Text testID="accuracyText" style={[styles.value, { color: colors.ink }]}>
              {'\u00b1'}
              {Math.round(coords.accuracy)}m
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: spacing.lg },
  title: { fontSize: fontSize.xl, fontWeight: '800', marginBottom: spacing.xs },
  subtitle: { fontSize: fontSize.sm, lineHeight: 18, marginBottom: spacing.md },
  status: { marginTop: spacing.md, fontSize: fontSize.sm, fontWeight: '600' },
  resultBox: { marginTop: spacing.md, padding: spacing.md, borderRadius: radius.md, borderWidth: 1 },
  label: { fontSize: fontSize.xs, textTransform: 'uppercase', letterSpacing: 0.4, marginTop: spacing.xs },
  value: { fontSize: fontSize.md, fontWeight: '700' },
});
