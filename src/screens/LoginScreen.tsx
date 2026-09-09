import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../AppState';
import PrimaryButton from '../components/PrimaryButton';
import TestBanner from '../components/TestBanner';
import TextField from '../components/TextField';
import { fontSize, spacing } from '../theme';

// Deterministic, disclosed rule so automation scenarios are 100% repeatable:
// any non-empty username plus a password of 6+ characters succeeds.
function validate(username: string, password: string) {
  if (username.trim().length === 0) {
    return 'Username is required.';
  }
  if (password.length === 0) {
    return 'Password is required.';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters.';
  }
  return null;
}

export default function LoginScreen() {
  const { colors, logIn } = useAppState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    const validationError = validate(username, password);
    setError(validationError);
    if (!validationError) {
      logIn(username.trim());
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <TestBanner />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text testID="pageTitleLabel" style={[styles.title, { color: colors.ink }]}>
            Sign In
          </Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Any username with a 6+ character password will succeed. Try username
            "demo" and password "demo123".
          </Text>

          <TextField
            testID="usernameInput"
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="demo"
          />
          <TextField
            testID="passwordInput"
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="demo123"
            secureTextEntry
          />

          {error ? (
            <Text testID="loginErrorText" style={[styles.errorBanner, { color: colors.danger }]}>
              {error}
            </Text>
          ) : null}

          <PrimaryButton testID="loginButton" label="LOG IN" onPress={handleLogin} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  flex: { flex: 1 },
  content: { padding: spacing.lg, paddingTop: spacing.xl, flexGrow: 1 },
  title: { fontSize: fontSize.xl, fontWeight: '800', marginBottom: spacing.xs },
  subtitle: { fontSize: fontSize.sm, marginBottom: spacing.lg, lineHeight: 18 },
  errorBanner: { fontSize: fontSize.sm, fontWeight: '600', marginBottom: spacing.xs },
});
