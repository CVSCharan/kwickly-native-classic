import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useThemeStore, ThemeMode} from '../../store/useThemeStore';
import {useAuthStore} from '../../store/useAuthStore';
import {Card} from '../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList, TabParamList} from '../../navigation/types';
import {MenuButton} from '../../components/MenuButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
              {backgroundColor: (iconColor || theme.primary) + '15'},
            ]}>
            <Icon name={icon} size={18} color={iconColor || theme.primary} />
          </View>
          <Text style={[styles.sectionTitle, {color: theme.foreground}]}>
            {title}
          </Text>
        </View>
      </View>
      <View style={styles.sectionContent}>{children}</View>
    </Card>
  );
};

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const {theme, mode, setMode} = useThemeStore();
  const insets = useSafeAreaInsets();
  const logout = useAuthStore(state => state.logout);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  const themeOptions: {label: string; value: ThemeMode; icon: string}[] = [
    {label: 'Light', value: 'light', icon: 'sunny-outline'},
    {label: 'Dark', value: 'dark', icon: 'moon-outline'},
    {label: 'System', value: 'system', icon: 'phone-portrait-outline'},
  ];

  const renderThemeOption = (option: {
    label: string;
    value: ThemeMode;
    icon: string;
  }) => (
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
        color={
          mode === option.value ? theme.primaryForeground : theme.foreground
        }
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
    iconColor?: string,
  ) => (
    <View style={[styles.settingRow, {borderBottomColor: theme.border}]}>
      <View style={styles.settingInfo}>
        <View
          style={[
            styles.settingIconContainer,
            {backgroundColor: (iconColor || theme.primary) + '15'},
          ]}>
          <Icon name={icon} size={18} color={iconColor || theme.primary} />
        </View>
        <Text style={[styles.settingTitle, {color: theme.foreground}]}>
          {title}
        </Text>
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
      edges={['left', 'right']}
      style={[styles.container, {backgroundColor: theme.background}]}>
      <MenuButton />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContent,
          {
            paddingTop: insets.top + hp('2%'),
            paddingBottom: insets.bottom + hp('2%'),
          },
        ]}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, {color: theme.foreground}]}>
              Settings
            </Text>
            <Text
              style={[styles.headerSubtitle, {color: theme.mutedForeground}]}>
              Manage your account
            </Text>
          </View>
          <SettingsSection title="Appearance" icon="color-palette-outline">
            <Text
              style={[
                styles.sectionDescription,
                {color: theme.mutedForeground},
              ]}>
              Choose your preferred theme mode
            </Text>
            <View style={styles.themeOptions}>
              {themeOptions.map(renderThemeOption)}
            </View>
          </SettingsSection>

          <SettingsSection
            title="Notifications"
            icon="notifications-outline"
            iconColor="#6366f1">
            {renderSettingRow(
              'Push Notifications',
              'push-outline',
              notificationsEnabled,
              setNotificationsEnabled,
            )}
            {renderSettingRow(
              'Sound Effects',
              'volume-high-outline',
              soundEnabled,
              setSoundEnabled,
            )}
          </SettingsSection>

          <SettingsSection
            title="Account"
            icon="person-outline"
            iconColor="#10b981">
            <TouchableOpacity
              style={[styles.accountOption, {borderBottomColor: theme.border}]}>
              <View style={styles.accountOptionInfo}>
                <Icon
                  name="person-circle-outline"
                  size={18}
                  color={theme.foreground}
                />
                <Text
                  style={[styles.accountOptionText, {color: theme.foreground}]}>
                  Profile Settings
                </Text>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={18}
                color={theme.mutedForeground}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.accountOption, {borderBottomColor: theme.border}]}>
              <View style={styles.accountOptionInfo}>
                <Icon name="key-outline" size={18} color={theme.foreground} />
                <Text
                  style={[styles.accountOptionText, {color: theme.foreground}]}>
                  Change Password
                </Text>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={18}
                color={theme.mutedForeground}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.logoutButton,
                {borderColor: theme.destructive + '30'},
              ]}
              onPress={logout}>
              <Icon
                name="log-out-outline"
                size={18}
                color={theme.destructive}
              />
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
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    padding: wp('5%'),
    gap: hp('2.5%'),
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('2%'),
  },
  headerTitle: {
    fontSize: wp('7%'),
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
    marginBottom: hp('0.5%'),
  },
  headerSubtitle: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
    opacity: 0.8,
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
    justifyContent: 'space-between',
    gap: wp('3%'),
    marginTop: hp('2%'),
  },
  themeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp('2%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('2.5%'),
    borderWidth: 1,
  },
  themeOptionText: {
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Medium',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('4%'),
  },
  settingIconContainer: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Medium',
  },
  accountOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
  },
  accountOptionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('4%'),
  },
  accountOptionText: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Medium',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp('2%'),
    marginTop: hp('2%'),
    paddingVertical: hp('1.5%'),
    borderRadius: wp('2.5%'),
    borderWidth: 1,
  },
  logoutText: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-SemiBold',
  },
});
