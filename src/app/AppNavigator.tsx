import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Image, View } from 'react-native';
import { useTheme } from '../constants/ThemeContext';
import HomeScreen from '../features/home/HomeScreen';
import ProfileScreen from '../features/profile/ProfileScreen';
import MapScreen from '../features/map/MapScreen';
import MapScreen2 from '../features/map/MapScreenv2';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { colors: themeColors, highContrast, fontScale } = useTheme();

  return (
    <View style={{ flex: 1, paddingTop: 8, alignContent: 'center' }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerStyle: { backgroundColor: themeColors.primary[50] },
          headerTintColor: themeColors.primary[950],
          headerTitleStyle: { fontSize: 18 * fontScale },
          headerShadowVisible: !highContrast,
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: themeColors.primary[950],
              }}
            >
              <Image
                source={require('../utils/images/logo.png')}
                style={{ width: 100, height: 30, marginRight: 10 }}
                resizeMode="contain"
              />
            </View>
          ),
          tabBarActiveTintColor: themeColors.primary[50],
          tabBarInactiveTintColor: themeColors.secondary[300],
          tabBarStyle: {
            backgroundColor: themeColors.primary[950],
            borderTopColor: themeColors.primary[900],
            borderTopWidth: highContrast ? 2 : 1,
          },
          tabBarLabelStyle: { fontSize: 12 * fontScale },
          tabBarIcon: ({ color, size }) => {
            let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'help-outline';

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person-outline';
            } else if (route.name === 'Map') {
              iconName = 'map-outline';
            } else if (route.name === 'Map2') {
              iconName = 'map-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Map2" component={MapScreen2} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </View>
  );
}