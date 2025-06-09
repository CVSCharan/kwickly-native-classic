import {useThemeStore} from '../store/useThemeStore';

export const useThemeAssets = () => {
  const {mode, theme} = useThemeStore();
  const isDark =
    mode === 'dark' ||
    (mode === 'system' && theme === useThemeStore.getState().darkTheme);

  return {
    logo: isDark
      ? require('../../assets/logos/kwickly-dark-bold-logo.png')
      : require('../../assets/logos/kwickly-light-bold-logo.png'),
  };
};
