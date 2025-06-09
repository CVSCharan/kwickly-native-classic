import React from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import {useThemeStore} from '../store/useThemeStore';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: any;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  style,
  containerStyle,
  ...props
}) => {
  const theme = useThemeStore(state => state.theme);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, {color: theme.foreground}]}>{label}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.input,
            color: theme.foreground,
            borderColor: error ? theme.destructive : theme.border,
          },
          style,
        ]}
        placeholderTextColor={theme.mutedForeground}
        {...props}
      />
      {error && (
        <Text style={[styles.error, {color: theme.destructive}]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.2,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'Poppins',
  },
});
