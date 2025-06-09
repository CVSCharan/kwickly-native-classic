import React from 'react';
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useThemeStore} from '../store/useThemeStore';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  style?: ViewStyle;
  variant?: 'default' | 'glass';
  actionLabel?: string;
  onActionPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  style,
  variant = 'default',
  actionLabel,
  onActionPress,
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
      {(title || actionLabel) && (
        <View style={styles.header}>
          <Text style={[styles.title, {color: theme.cardForeground}]}>
            {title}
          </Text>
          {actionLabel && onActionPress && (
            <TouchableOpacity onPress={onActionPress}>
              <Text style={[styles.action, {color: theme.primary}]}>
                {actionLabel}
              </Text>
            </TouchableOpacity>
          )}
        </View>
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
    // Shadow removed
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  action: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});
