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
        return {paddingVertical: 6, paddingHorizontal: 12};
      case 'lg':
        return {paddingVertical: 12, paddingHorizontal: 24};
      default: // md
        return {paddingVertical: 8, paddingHorizontal: 16};
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return 13;
      case 'lg':
        return 16;
      default: // md
        return 14;
    }
  };

  const buttonStyles = [
    styles.button,
    {
      backgroundColor: getBackgroundColor(),
      ...getPadding(),
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.5 : 1,
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: variant === 'outline' ? theme.primary : undefined,
      shadowColor:
        variant === 'primary' || variant === 'secondary' ? '#000' : undefined,
      shadowOffset:
        variant === 'primary' || variant === 'secondary'
          ? {
              width: 0,
              height: 1,
            }
          : undefined,
      shadowOpacity:
        variant === 'primary' || variant === 'secondary' ? 0.2 : undefined,
      shadowRadius:
        variant === 'primary' || variant === 'secondary' ? 2 : undefined,
      elevation: variant === 'primary' || variant === 'secondary' ? 2 : 0,
    },
    style,
  ];

  const textStyles = [
    styles.text,
    {
      color: getTextColor(),
      fontSize: getFontSize(),
      letterSpacing: 0.3,
    },
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
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
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  icon: {
    marginRight: 8,
  },
});
