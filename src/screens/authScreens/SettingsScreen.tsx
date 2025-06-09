import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Platform,
  StatusBar,
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
            <Icon
              name={icon}
              size={wp('4.5%')}
              color={iconColor || theme.primary}
            />
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
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
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
        size={wp('4.5%')}
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
          <Icon
            name={icon}
            size={wp('4.5%')}
            color={iconColor || theme.primary}
          />
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
    <>
      <StatusBar
        barStyle={
          theme.foreground === '#ffffff' ? 'light-content' : 'dark-content'
        }
        backgroundColor={theme.background}
        translucent
      />
      <SafeAreaView
        edges={['left', 'right']}
        style={[styles.container, {backgroundColor: theme.background}]}>
        <MenuButton />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollViewContent,
            {
              paddingTop:
                Platform.OS === 'ios'
                  ? insets.top + hp('2%')
                  : statusBarHeight + hp('2%'),
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
            <View style={styles.sections}>
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
                  style={[
                    styles.accountOption,
                    {borderBottomColor: theme.border},
                  ]}>
                  <View style={styles.accountOptionInfo}>
                    <Icon
                      name="person-circle-outline"
                      size={wp('4.5%')}
                      color={theme.foreground}
                    />
                    <Text
                      style={[
                        styles.accountOptionText,
                        {color: theme.foreground},
                      ]}>
                      Profile Settings
                    </Text>
                  </View>
                  <Icon
                    name="chevron-forward-outline"
                    size={wp('4.5%')}
                    color={theme.mutedForeground}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.accountOption,
                    {borderBottomColor: theme.border},
                  ]}>
                  <View style={styles.accountOptionInfo}>
                    <Icon
                      name="key-outline"
                      size={wp('4.5%')}
                      color={theme.foreground}
                    />
                    <Text
                      style={[
                        styles.accountOptionText,
                        {color: theme.foreground},
                      ]}>
                      Change Password
                    </Text>
                  </View>
                  <Icon
                    name="chevron-forward-outline"
                    size={wp('4.5%')}
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
                    size={wp('4.5%')}
                    color={theme.destructive}
                  />
                  <Text style={[styles.logoutText, {color: theme.destructive}]}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </SettingsSection>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
    flex: 1,
    padding: wp('5%'),
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('3%'),
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
  sections: {
    gap: hp('2%'),
  },
  sectionCard: {
    padding: wp('4%'),
    overflow: 'hidden',
  },
  sectionHeader: {
    marginBottom: hp('2%'),
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
  },
  sectionIconContainer: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.3,
  },
  sectionDescription: {
    fontSize: wp('3.8%'),
    fontFamily: 'Poppins-Medium',
    marginBottom: hp('2%'),
    opacity: 0.8,
  },
  sectionContent: {
    gap: hp('1%'),
  },
  themeOptions: {
    flexDirection: 'row',
    gap: wp('2%'),
  },
  themeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp('2%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('2%'),
    borderWidth: 1,
  },
  themeOptionText: {
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5%'),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
  },
  settingIconContainer: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.2,
  },
  accountOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5%'),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  accountOptionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
  },
  accountOptionText: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp('2%'),
    marginTop: hp('2%'),
    paddingVertical: hp('1.5%'),
    borderRadius: wp('2%'),
    borderWidth: 1,
  },
  logoutText: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.2,
  },
});
