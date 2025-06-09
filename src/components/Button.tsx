import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator, View} from 'react-native';

type ButtonProps = {
  onPress: () => void;
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
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
  className = '',
}) => {
  const baseStyles = 'rounded-lg font-semibold flex-row items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    outline: 'bg-transparent border border-primary',
    ghost: 'bg-transparent',
    destructive: 'bg-destructive',
  };
  
  const textStyles = {
    primary: 'text-primary-foreground',
    secondary: 'text-secondary-foreground',
    outline: 'text-primary',
    ghost: 'text-foreground',
    destructive: 'text-destructive-foreground',
  };
  
  const sizeStyles = {
    sm: 'py-2 px-3',
    md: 'py-3 px-4',
    lg: 'py-4 px-6',
  };
  
  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50' : ''}
        ${className}
      `}>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? '#FF5A45' : '#FFFFFF'}
          className="mr-2"
        />
      ) : icon ? (
        <View className="mr-2">{icon}</View>
      ) : null}
      <Text
        className={`
          ${textStyles[variant]}
          ${textSizeStyles[size]}
          font-semibold
        `}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};