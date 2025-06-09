import React from 'react';
import {View, Text, TextInput, TextInputProps, StyleSheet} from 'react-native';
import {useThemeStore} from '../store/useThemeStore';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  style?: any;
  containerStyle?: any;
};

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
    fontSize: 14,
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'Poppins',
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'Poppins',
  },
});
