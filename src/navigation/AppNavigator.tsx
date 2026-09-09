import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppState } from '../AppState';
import TabBar, { TabKey } from '../components/TabBar';
import Toast from '../components/Toast';
import AboutScreen from '../screens/AboutScreen';
import BiometricScreen from '../screens/BiometricScreen';
import DetailScreen from '../screens/DetailScreen';
import GeolocationScreen from '../screens/GeolocationScreen';
import GesturesScreen from '../screens/GesturesScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import MoreScreen, { MoreDestination } from '../screens/MoreScreen';
import NetworkScreen from '../screens/NetworkScreen';
import PushNotificationScreen from '../screens/PushNotificationScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WebViewScreen from '../screens/WebViewScreen';

type MoreRoute = 'menu' | MoreDestination;

export default function AppNavigator() {
  const { colors, isLoggedIn, logOut } = useAppState();
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [homeDetailId, setHomeDetailId] = useState<string | null>(null);
  const [moreRoute, setMoreRoute] = useState<MoreRoute>('menu');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    // clear after the animation window so the same message can be shown again
    setTimeout(() => setToastMessage(null), 2100);
  };

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  const handleTabSelect = (key: TabKey) => {
    setActiveTab(key);
    if (key === 'home') {
      setHomeDetailId(null);
    }
    if (key === 'more') {
      setMoreRoute('menu');
    }
  };

  const handleLogout = () => {
    setActiveTab('home');
    setHomeDetailId(null);
    setMoreRoute('menu');
    logOut();
  };

  let screen: React.ReactNode = null;
  switch (activeTab) {
    case 'home':
      screen = homeDetailId ? (
        <DetailScreen itemId={homeDetailId} onBack={() => setHomeDetailId(null)} onAdded={showToast} />
      ) : (
        <HomeScreen onOpenItem={setHomeDetailId} />
      );
      break;
    case 'gestures':
      screen = <GesturesScreen />;
      break;
    case 'network':
      screen = <NetworkScreen />;
      break;
    case 'location':
      screen = <GeolocationScreen />;
      break;
    case 'web':
      screen = <WebViewScreen />;
      break;
    case 'more':
      switch (moreRoute) {
        case 'settings':
          screen = <SettingsScreen onBack={() => setMoreRoute('menu')} />;
          break;
        case 'biometric':
          screen = <BiometricScreen onBack={() => setMoreRoute('menu')} />;
          break;
        case 'pushNotifications':
          screen = (
            <PushNotificationScreen onBack={() => setMoreRoute('menu')} onSend={showToast} />
          );
          break;
        case 'about':
          screen = <AboutScreen onBack={() => setMoreRoute('menu')} />;
          break;
        default:
          screen = <MoreScreen onNavigate={setMoreRoute} onLogout={handleLogout} />;
      }
      break;
    default:
      screen = null;
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <View style={styles.body}>{screen}</View>
      <TabBar active={activeTab} onSelect={handleTabSelect} />
      <Toast testID="globalToast" message={toastMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { flex: 1 },
});
