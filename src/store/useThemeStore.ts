import {create} from 'zustand';
import {lightTheme, darkTheme} from '../theme/theme';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  theme: typeof lightTheme;
  systemIsDark: boolean;
  setMode: (mode: ThemeMode) => void;
  updateSystemTheme: (isDark: boolean) => void;
  lightTheme: typeof lightTheme;
  darkTheme: typeof darkTheme;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'system',
  theme: lightTheme,
  systemIsDark: false,
  lightTheme,
  darkTheme,

  setMode: mode => {
    const {systemIsDark} = get();
    let newTheme = lightTheme;

    switch (mode) {
      case 'dark':
        newTheme = darkTheme;
        break;
      case 'light':
        newTheme = lightTheme;
        break;
      case 'system':
        newTheme = systemIsDark ? darkTheme : lightTheme;
        break;
    }

    set({mode, theme: newTheme});
  },

  updateSystemTheme: isDark => {
    set(state => {
      if (state.mode === 'system') {
        return {
          systemIsDark: isDark,
          theme: isDark ? darkTheme : lightTheme,
        };
      }
      return {systemIsDark: isDark};
    });
  },
}));
