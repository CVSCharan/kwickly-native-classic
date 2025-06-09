import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeStore, ThemeMode} from '../../store/useThemeStore';
import {useAuthStore} from '../../store/useAuthStore';
import {Card} from '../../components/Card';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList, TabParamList} from '../../navigation/types';

type SettingsScreenProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'Settings'>,
    NativeStackNavigationProp<AuthStackParamList>
  >;
};

export const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}) => {
  const {theme, mode, setMode} = useThemeStore();
  const logout = useAuthStore(state => state.logout);

  const themeOptions: {label: string; value: ThemeMode}[] = [
    {label: 'Light', value: 'light'},
    {label: 'Dark', value: 'dark'},
    {label: 'System', value: 'system'},
  ];

  const renderThemeOption = (option: {label: string; value: ThemeMode}) => (
    <TouchableOpacity
      key={option.value}
      style={[
        styles.themeOption,
        {
          backgroundColor:
            mode === option.value ? theme.primary : theme.background,
          borderColor: theme.border,
        },
      ]}
      onPress={() => setMode(option.value)}>
      <Text
        style={[
          styles.themeOptionText,
          {
            color:
              mode === option.value
                ? theme.primaryForeground
                : theme.foreground,
          },
        ]}>
        {option.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.content}>
        <Text style={[styles.title, {color: theme.foreground}]}>Settings</Text>

        <Card title="Theme">
          <View style={styles.themeOptions}>
            {themeOptions.map(renderThemeOption)}
          </View>
        </Card>

        <Card>
          <TouchableOpacity
            style={[styles.logoutButton, {borderColor: theme.border}]}
            onPress={logout}>
            <Text style={[styles.logoutText, {color: theme.destructive}]}>
              Logout
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  themeOptions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  themeOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  themeOptionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  logoutButton: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
