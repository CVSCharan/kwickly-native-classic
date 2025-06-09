import React, {useEffect} from 'react';
import {View, Text, Animated, TouchableOpacity} from 'react-native';

type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'info';
  visible: boolean;
  onDismiss: () => void;
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  visible,
  onDismiss,
}) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onDismiss());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, opacity, onDismiss]);

  if (!visible) return null;

  const bgColor =
    type === 'success'
      ? 'bg-green-500'
      : type === 'error'
      ? 'bg-destructive'
      : 'bg-secondary';

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
      }}
      className={`absolute top-10 left-4 right-4 ${bgColor} rounded-lg p-4 shadow-lg z-50`}>
      <View className="flex-row justify-between items-center">
        <Text className="text-white font-medium">{message}</Text>
        <TouchableOpacity onPress={onDismiss}>
          <Text className="text-white font-bold">×</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};