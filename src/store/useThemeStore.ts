import {create} from 'zustand';
import {lightTheme, darkTheme} from '../theme/theme';
import {useColorScheme} from 'react-native';

type ThemeState = {
  isDark: boolean;
  theme: typeof lightTheme;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
};

export const useThemeStore = create<ThemeState>(set => ({
  isDark: useColorScheme() === 'dark',
  theme: useColorScheme() === 'dark' ? darkTheme : lightTheme,
  toggleTheme: () =>
    set(state => ({
      isDark: !state.isDark,
      theme: !state.isDark ? darkTheme : lightTheme,
    })),
  setTheme: (isDark: boolean) =>
    set(() => ({
      isDark,
      theme: isDark ? darkTheme : lightTheme,
    })),
}));
