import React from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {Button} from '../components/Button';
import {Card} from '../components/Card';

export const DashboardScreen = () => {
  const {toggleTheme} = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="p-6 space-y-6 animate-in">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-foreground">Dashboard</Text>
            <Button
              label="Toggle Theme"
              onPress={toggleTheme}
              variant="secondary"
              size="sm"
            />
          </View>

          <Card title="Quick Stats" className="mb-4">
            <View className="flex-row justify-between mt-2">
              <View className="items-center">
                <Text className="text-2xl font-bold text-primary">150</Text>
                <Text className="text-sm text-muted-foreground">Orders Today</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-primary">$2,450</Text>
                <Text className="text-sm text-muted-foreground">Revenue</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-primary">45</Text>
                <Text className="text-sm text-muted-foreground">Active Tables</Text>
              </View>
            </View>
          </Card>

          <View className="flex-row space-x-4">
            <Card className="flex-1 items-center p-4" variant="glass">
              <Text className="text-lg font-semibold text-card-foreground">Orders</Text>
              <Text className="text-3xl font-bold text-primary mt-2">24</Text>
              <Text className="text-xs text-muted-foreground">Pending</Text>
            </Card>
            <Card className="flex-1 items-center p-4" variant="glass">
              <Text className="text-lg font-semibold text-card-foreground">Tables</Text>
              <Text className="text-3xl font-bold text-secondary mt-2">12</Text>
              <Text className="text-xs text-muted-foreground">Available</Text>
            </Card>
          </View>

          <Card title="Recent Orders" className="mb-4">
            {[1, 2, 3].map((item) => (
              <View 
                key={item} 
                className="py-3 border-b border-border flex-row justify-between items-center"
                style={item === 3 ? {borderBottomWidth: 0} : undefined}
              >
                <View>
                  <Text className="font-medium text-card-foreground">Order #{1000 + item}</Text>
                  <Text className="text-sm text-muted-foreground">Table {item} • 2 items</Text>
                </View>
                <View className="bg-accent px-2 py-1 rounded">
                  <Text className="text-xs font-medium text-accent-foreground">
                    {item === 1 ? 'Preparing' : item === 2 ? 'Ready' : 'Delivered'}
                  </Text>
                </View>
              </View>
            ))}
          </Card>

          <Card title="Popular Items" className="mb-4">
            {['Chicken Burger', 'Caesar Salad', 'Margherita Pizza'].map((item, index) => (
              <View 
                key={index} 
                className="py-3 border-b border-border flex-row justify-between items-center"
                style={index === 2 ? {borderBottomWidth: 0} : undefined}
              >
                <Text className="font-medium text-card-foreground">{item}</Text>
                <Text className="text-primary font-semibold">
                  ${(Math.random() * 10 + 5).toFixed(2)}
                </Text>
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
