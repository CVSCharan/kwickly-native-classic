import React from 'react';
import {View, Text, TextInput, TextInputProps} from 'react-native';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
};

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  containerClassName = '',
  ...props
}) => {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && (
        <Text className="text-sm font-medium text-foreground mb-1">{label}</Text>
      )}
      <TextInput
        className={`p-3 rounded-lg bg-input text-foreground border ${error ? 'border-destructive' : 'border-border'} ${className}`}
        placeholderTextColor="hsl(var(--muted-foreground))"
        {...props}
      />
      {error && (
        <Text className="mt-1 text-xs text-destructive">{error}</Text>
      )}
    </View>
  );
};