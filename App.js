import './src/i18n'; // Initialize i18n first
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import EventDetailScreen from './src/screens/EventDetailScreen';
import MapScreen from './src/screens/MapScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DrawerMenu from './src/screens/DrawerMenu';
import EventsScreen from './src/screens/EventsScreen';
import FilterScreen from './src/screens/FilterScreen';
import MyProfileScreen from './src/screens/MyProfileScreen';
import OrganizerProfileScreen from './src/screens/OrganizerProfileScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import InviteFriendScreen from './src/screens/InviteFriendScreen';
import ShareScreen from './src/screens/ShareScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ─── Custom Tab Bar ──────────────────────────────────────────────────────────
function CustomTabBar({ state, descriptors, navigation }) {
  const { t } = useTranslation();
  const tabs = [
    { key: 'Explore', icon: '🧭', label: t('menu.myProfile', 'Explore') },
    { key: 'Map',     icon: '🗺',  label: t('map.nearbyEvents', 'Map') },
    { key: 'Profile', icon: '👤',  label: t('profile.title', 'Profile') },
  ];

  const icons   = { Explore: '🧭', Events: '📅', Map: '🗺', Profile: '👤' };
  const labels  = { Explore: 'Explore', Events: 'Events', Map: 'Map', Profile: 'Profile' };

  return (
    <View style={tabStyles.bar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        return (
          <TouchableOpacity
            key={route.key}
            style={tabStyles.tab}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.7}>
            <Text style={[tabStyles.icon, isFocused && tabStyles.iconActive]}>
              {icons[route.name]}
            </Text>
            <Text style={[tabStyles.label, isFocused && tabStyles.labelActive]}>
              {labels[route.name]}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Center FAB */}
      <TouchableOpacity style={tabStyles.fab} onPress={() => navigation.navigate('Search')}>
        <Text style={{ fontSize: 24, color: '#fff' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  bar: {
    flexDirection: 'row', backgroundColor: '#fff',
    height: 64, borderTopWidth: 1, borderTopColor: '#F0F0F0',
    alignItems: 'center', justifyContent: 'space-around',
    position: 'relative',
    paddingBottom: 4,
  },
  tab: { alignItems: 'center', flex: 1, paddingTop: 8 },
  icon: { fontSize: 22, marginBottom: 2, opacity: 0.4 },
  iconActive: { opacity: 1 },
  label: { fontSize: 10, color: '#AAA', fontWeight: '500' },
  labelActive: { color: '#6C63FF', fontWeight: '700' },
  fab: {
    position: 'absolute',
    top: -20, left: '50%',
    marginLeft: -28,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#6C63FF',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#6C63FF', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 10,
  },
});

// ─── Bottom Tab Navigator ─────────────────────────────────────────────────────
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Explore" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <SafeAreaProvider>
        <SplashScreen onFinish={() => setShowSplash(false)} />
      </SafeAreaProvider>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Onboarding"
            screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>

            {/* Onboarding */}
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />

            {/* Auth */}
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

            {/* Main app with tabs */}
            <Stack.Screen name="MainTabs" component={MainTabs} />

            {/* Detail screens */}
            <Stack.Screen name="EventDetail" component={EventDetailScreen} />
            <Stack.Screen name="Search" component={SearchScreen} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="DrawerMenu" component={DrawerMenu} options={{ animation: 'slide_from_left' }} />
            <Stack.Screen name="MyProfile" component={MyProfileScreen} />
            <Stack.Screen name="OrganizerProfile" component={OrganizerProfileScreen} />
            <Stack.Screen name="Filter" component={FilterScreen} options={{ presentation: 'transparentModal', animation: 'fade' }} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="InviteFriend" component={InviteFriendScreen} options={{ presentation: 'transparentModal', animation: 'fade' }} />
            <Stack.Screen name="Share" component={ShareScreen} options={{ presentation: 'transparentModal', animation: 'fade' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
