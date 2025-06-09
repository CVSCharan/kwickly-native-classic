import React from 'react';
import {View, Text, ViewStyle, StyleSheet} from 'react-native';
import {useThemeStore} from '../store/useThemeStore';

type CardProps = {
  children: React.ReactNode;
  title?: string;
  style?: ViewStyle;
  variant?: 'default' | 'glass';
};

export const Card: React.FC<CardProps> = ({
  children,
  title,
  style,
  variant = 'default',
}) => {
  const theme = useThemeStore(state => state.theme);

  const cardStyle = [
    styles.card,
    {
      backgroundColor:
        variant === 'glass' ? 'rgba(255, 255, 255, 0.1)' : theme.card,
      borderColor: theme.border,
    },
    style,
  ];

  return (
    <View style={cardStyle}>
      {title && (
        <Text style={[styles.title, {color: theme.cardForeground}]}>
          {title}
        </Text>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
});
