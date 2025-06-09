import React from 'react';
import {View, Text, ViewStyle} from 'react-native';

type CardProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  style?: ViewStyle;
  variant?: 'default' | 'glass';
};

export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  style,
  variant = 'default',
}) => {
  const variantClass = variant === 'glass' ? 'glass-card' : 'professional-card';

  return (
    <View
      className={`p-4 ${variantClass} ${className}`}
      style={style}>
      {title && (
        <Text className="text-lg font-semibold text-card-foreground mb-2">
          {title}
        </Text>
      )}
      {children}
    </View>
  );
};