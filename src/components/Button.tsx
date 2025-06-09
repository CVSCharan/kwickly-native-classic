import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import {useThemeStore} from '../store/useThemeStore';

type ButtonProps = {
  onPress: () => void;
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: any;
};

export const Button: React.FC<ButtonProps> = ({
  onPress,
  label,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon,
  fullWidth = false,
  style,
}) => {
  const {theme} = useThemeStore();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return theme.primary;
      case 'secondary':
        return theme.secondary;
      case 'outline':
      case 'ghost':
        return 'transparent';
      case 'destructive':
        return theme.destructive;
      default:
        return theme.primary;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return theme.primaryForeground;
      case 'secondary':
        return theme.secondaryForeground;
      case 'outline':
        return theme.primary;
      case 'ghost':
        return theme.foreground;
      case 'destructive':
        return theme.destructiveForeground;
      default:
        return theme.primaryForeground;
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'sm':
        return {paddingVertical: 10, paddingHorizontal: 16};
      case 'lg':
        return {paddingVertical: 18, paddingHorizontal: 32};
      default: // md
        return {paddingVertical: 14, paddingHorizontal: 24};
    }
  };

  const getHeight = () => {
    switch (size) {
      case 'sm':
        return 36;
      case 'lg':
        return 56;
      default: // md
        return 46;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return 14;
      case 'lg':
        return 18;
      default: // md
        return 16;
    }
  };

  const buttonStyles = [
    styles.button,
    {
      backgroundColor: getBackgroundColor(),
      height: getHeight(),
      width: fullWidth ? '100%' : 'auto',
      minWidth: size === 'sm' ? 100 : size === 'lg' ? 160 : 130,
      opacity: disabled ? 0.5 : 1,
      borderWidth: variant === 'outline' ? 2 : 0,
      borderColor: variant === 'outline' ? theme.primary : undefined,
      ...getPadding(),
    },
    style,
  ];

  const textStyles = [
    styles.text,
    {
      color: getTextColor(),
      fontSize: getFontSize(),
    },
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      style={buttonStyles}>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'outline' || variant === 'ghost'
              ? theme.primary
              : theme.primaryForeground
          }
          style={styles.icon}
        />
      ) : icon ? (
        <View style={styles.icon}>{icon}</View>
      ) : null}
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  icon: {
    marginRight: 10,
  },
});
