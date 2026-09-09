import React, { createContext, useContext, useMemo, useState } from 'react';
import { darkColors, lightColors, ThemeColors } from './theme';

type AppStateShape = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  isLoggedIn: boolean;
  username: string | null;
  logIn: (username: string) => void;
  logOut: () => void;
  colors: ThemeColors;
};

const AppStateContext = createContext<AppStateShape | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const value = useMemo<AppStateShape>(
    () => ({
      isDarkMode,
      toggleDarkMode: () => setIsDarkMode(v => !v),
      notificationsEnabled,
      toggleNotifications: () => setNotificationsEnabled(v => !v),
      isLoggedIn,
      username,
      logIn: (u: string) => {
        setUsername(u);
        setIsLoggedIn(true);
      },
      logOut: () => {
        setUsername(null);
        setIsLoggedIn(false);
      },
      colors: isDarkMode ? darkColors : lightColors,
    }),
    [isDarkMode, notificationsEnabled, isLoggedIn, username],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateShape {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return ctx;
}
