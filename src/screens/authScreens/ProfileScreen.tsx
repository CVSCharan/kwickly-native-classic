import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useThemeStore} from '../../store/useThemeStore';
import {Card} from '../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {MenuButton} from '../../components/MenuButton';

export const ProfileScreen = () => {
  const {theme} = useThemeStore();
  const insets = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

  const renderProfileSection = () => (
    <Card style={styles.profileCard}>
      <View style={styles.profileHeader}>
        <View
          style={[
            styles.avatarContainer,
            {backgroundColor: theme.primary + '15'},
          ]}>
          <Icon name="person" size={wp('12%')} color={theme.primary} />
        </View>
        <Text style={[styles.userName, {color: theme.foreground}]}>
          John Doe
        </Text>
        <Text style={[styles.userRole, {color: theme.mutedForeground}]}>
          Restaurant Manager
        </Text>
      </View>

      <View style={[styles.divider, {backgroundColor: theme.border}]} />

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <View style={styles.infoLabelContainer}>
            <Icon
              name="mail-outline"
              size={wp('5%')}
              color={theme.mutedForeground}
            />
            <Text style={[styles.infoLabel, {color: theme.mutedForeground}]}>
              Email
            </Text>
          </View>
          <Text style={[styles.infoValue, {color: theme.foreground}]}>
            john.doe@example.com
          </Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoLabelContainer}>
            <Icon
              name="call-outline"
              size={wp('5%')}
              color={theme.mutedForeground}
            />
            <Text style={[styles.infoLabel, {color: theme.mutedForeground}]}>
              Phone
            </Text>
          </View>
          <Text style={[styles.infoValue, {color: theme.foreground}]}>
            +1 234 567 8900
          </Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoLabelContainer}>
            <Icon
              name="business-outline"
              size={wp('5%')}
              color={theme.mutedForeground}
            />
            <Text style={[styles.infoLabel, {color: theme.mutedForeground}]}>
              Restaurant
            </Text>
          </View>
          <Text style={[styles.infoValue, {color: theme.foreground}]}>
            Kwickly Restaurant
          </Text>
        </View>
      </View>
    </Card>
  );

  const renderActionButtons = () => (
    <Card style={styles.actionsCard}>
      <TouchableOpacity
        style={[styles.actionButton, {borderBottomColor: theme.border}]}
        onPress={() => {}}>
        <View style={styles.actionLeft}>
          <Icon
            name="create-outline"
            size={wp('5%')}
            color={theme.foreground}
          />
          <Text style={[styles.actionText, {color: theme.foreground}]}>
            Edit Profile
          </Text>
        </View>
        <Icon
          name="chevron-forward"
          size={wp('5%')}
          color={theme.mutedForeground}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, {borderBottomColor: theme.border}]}
        onPress={() => {}}>
        <View style={styles.actionLeft}>
          <Icon name="key-outline" size={wp('5%')} color={theme.foreground} />
          <Text style={[styles.actionText, {color: theme.foreground}]}>
            Change Password
          </Text>
        </View>
        <Icon
          name="chevron-forward"
          size={wp('5%')}
          color={theme.mutedForeground}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, {borderBottomColor: theme.border}]}
        onPress={() => {}}>
        <View style={styles.actionLeft}>
          <Icon
            name="shield-outline"
            size={wp('5%')}
            color={theme.foreground}
          />
          <Text style={[styles.actionText, {color: theme.foreground}]}>
            Privacy Settings
          </Text>
        </View>
        <Icon
          name="chevron-forward"
          size={wp('5%')}
          color={theme.mutedForeground}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
        <View style={styles.actionLeft}>
          <Icon
            name="help-circle-outline"
            size={wp('5%')}
            color={theme.foreground}
          />
          <Text style={[styles.actionText, {color: theme.foreground}]}>
            Help & Support
          </Text>
        </View>
        <Icon
          name="chevron-forward"
          size={wp('5%')}
          color={theme.mutedForeground}
        />
      </TouchableOpacity>
    </Card>
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
                Profile
              </Text>
              <Text
                style={[styles.headerSubtitle, {color: theme.mutedForeground}]}>
                Manage your account
              </Text>
            </View>

            {renderProfileSection()}
            {renderActionButtons()}
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
  profileCard: {
    padding: wp('6%'),
    gap: hp('2%'),
  },
  profileHeader: {
    alignItems: 'center',
    gap: hp('1%'),
  },
  avatarContainer: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('12.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  userName: {
    fontSize: wp('5%'),
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.3,
  },
  userRole: {
    fontSize: wp('3.8%'),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.2,
    opacity: 0.8,
  },
  divider: {
    height: 1.5,
    width: '100%',
  },
  infoSection: {
    gap: hp('2%'),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
  },
  infoLabel: {
    fontSize: wp('3.8%'),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.2,
  },
  infoValue: {
    fontSize: wp('3.8%'),
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.2,
  },
  actionsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp('4%'),
    borderBottomWidth: 1.5,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('4%'),
  },
  actionText: {
    fontSize: wp('3.8%'),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
  },
});
