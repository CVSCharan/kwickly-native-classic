import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeStore, ThemeMode} from '../../store/useThemeStore';
import {useAuthStore} from '../../store/useAuthStore';
import {Card} from '../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';
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

type SettingsSectionProps = {
  title: string;
  icon: string;
  iconColor?: string;
  children: React.ReactNode;
};

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  icon,
  iconColor,
  children,
}) => {
  const {theme} = useThemeStore();
  
  return (
    <Card style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <View 
            style={[
              styles.sectionIconContainer, 
              {backgroundColor: (iconColor || theme.primary) + '15'}
            ]}
          >
            <Icon name={icon} size={18} color={iconColor || theme.primary} />
          </View>
          <Text style={[styles.sectionTitle, {color: theme.foreground}]}>{title}</Text>
        </View>
      </View>
      <View style={styles.sectionContent}>{children}</View>
    </Card>
  );
};

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const {theme, mode, setMode} = useThemeStore();
  const logout = useAuthStore(state => state.logout);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  const themeOptions: {label: string; value: ThemeMode; icon: string}[] = [
    {label: 'Light', value: 'light', icon: 'sunny-outline'},
    {label: 'Dark', value: 'dark', icon: 'moon-outline'},
    {label: 'System', value: 'system', icon: 'phone-portrait-outline'},
  ];

  const renderThemeOption = (option: {label: string; value: ThemeMode; icon: string}) => (
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
      <Icon 
        name={option.icon} 
        size={18} 
        color={mode === option.value ? theme.primaryForeground : theme.foreground} 
      />
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

  const renderSettingRow = (
    title: string, 
    icon: string, 
    value: boolean, 
    onValueChange: (value: boolean) => void,
    iconColor?: string
  ) => (
    <View style={[styles.settingRow, {borderBottomColor: theme.border}]}>
      <View style={styles.settingInfo}>
        <View 
          style={[
            styles.settingIconContainer, 
            {backgroundColor: (iconColor || theme.primary) + '15'}
          ]}
        >
          <Icon name={icon} size={18} color={iconColor || theme.primary} />
        </View>
        <Text style={[styles.settingTitle, {color: theme.foreground}]}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{false: theme.border, true: theme.primary}}
        thumbColor={value ? theme.primaryForeground : theme.background}
      />
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, {color: theme.foreground}]}>Settings</Text>
            <Text style={[styles.subtitle, {color: theme.mutedForeground}]}>Customize your experience</Text>
          </View>

          <SettingsSection title="Appearance" icon="color-palette-outline">
            <Text style={[styles.sectionDescription, {color: theme.mutedForeground}]}>
              Choose your preferred theme mode
            </Text>
            <View style={styles.themeOptions}>
              {themeOptions.map(renderThemeOption)}
            </View>
          </SettingsSection>

          <SettingsSection title="Notifications" icon="notifications-outline" iconColor="#6366f1">
            {renderSettingRow(
              'Push Notifications', 
              'push-outline', 
              notificationsEnabled, 
              setNotificationsEnabled
            )}
            {renderSettingRow(
              'Sound Effects', 
              'volume-high-outline', 
              soundEnabled, 
              setSoundEnabled
            )}
          </SettingsSection>

          <SettingsSection title="Account" icon="person-outline" iconColor="#10b981">
            <TouchableOpacity style={[styles.accountOption, {borderBottomColor: theme.border}]}>
              <View style={styles.accountOptionInfo}>
                <Icon name="person-circle-outline" size={18} color={theme.foreground} />
                <Text style={[styles.accountOptionText, {color: theme.foreground}]}>Profile Settings</Text>
              </View>
              <Icon name="chevron-forward-outline" size={18} color={theme.mutedForeground} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.accountOption, {borderBottomColor: theme.border}]}>
              <View style={styles.accountOptionInfo}>
                <Icon name="key-outline" size={18} color={theme.foreground} />
                <Text style={[styles.accountOptionText, {color: theme.foreground}]}>Change Password</Text>
              </View>
              <Icon name="chevron-forward-outline" size={18} color={theme.mutedForeground} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.logoutButton, {borderColor: theme.destructive + '30'}]}
              onPress={logout}>
              <Icon name="log-out-outline" size={18} color={theme.destructive} />
              <Text style={[styles.logoutText, {color: theme.destructive}]}>
                Logout
              </Text>
            </TouchableOpacity>
          </SettingsSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    marginTop: 4,
  },
  sectionCard: {
    padding: 0,
    overflow: 'hidden',
  },
  sectionHeader: {
    padding: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Poppins',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionContent: {
    paddingBottom: 16,
  },
  themeOptions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  themeOption: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeOptionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  accountOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  accountOptionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accountOptionText: {
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  logoutButton: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
