import React from 'react';
import {View, ViewProps, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../../theme/ThemeProvider';

interface ScreenWrapperProps extends ViewProps {
  children: React.ReactNode;
  useSafeArea?: boolean;
  className?: string;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  useSafeArea = true,
  className = '',
  style,
  ...props
}) => {
  const {isDark, theme} = useTheme();
  const Container = useSafeArea ? SafeAreaView : View;

  return (
    <Container
      className={`flex-1 ${className}`}
      style={[
        {
          backgroundColor: theme.background,
        },
        style,
      ]}
      {...props}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      {children}
    </Container>
  );
};
