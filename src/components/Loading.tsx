import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';

type LoadingProps = {
  message?: string;
};

export const Loading: React.FC<LoadingProps> = ({message = 'Loading...'}) => {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color="hsl(var(--primary))" />
      <Text className="mt-4 text-muted-foreground">{message}</Text>
    </View>
  );
};