// Shared design tokens. Every screen imports from here instead of using
// platform defaults, so Android and iOS render pixel-identical UI - no
// native Switch/Picker/TabBar look-and-feel differences leak through.

export const lightColors = {
  bg: '#F4F5F7',
  card: '#FFFFFF',
  ink: '#1B1D22',
  muted: '#6B7280',
  border: '#E3E5E9',
  accent: '#5B4CFF',
  accentInk: '#FFFFFF',
  success: '#1FAA59',
  danger: '#E23D28',
  warningBg: '#FFF3CD',
  warningBorder: '#F0C36D',
  warningInk: '#5C4400',
};

export const darkColors = {
  bg: '#14151A',
  card: '#1E2027',
  ink: '#F2F3F5',
  muted: '#9CA3AF',
  border: '#2E3138',
  accent: '#8A7CFF',
  accentInk: '#14151A',
  success: '#3DDC84',
  danger: '#FF6B57',
  warningBg: '#3A310F',
  warningBorder: '#7A5C00',
  warningInk: '#FFE9A8',
};

export type ThemeColors = typeof lightColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  pill: 999,
};

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 24,
};
