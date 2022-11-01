import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import IconI from 'react-native-vector-icons/Ionicons'
import { View, Text, TouchableOpacity } from 'react-native';

/**
 * TODO: 
 * - make stack navigation to each of bottom tab bar
 * - custom middle icon to be bigger and overflowing ( using myTabBar to customize it)
 *  - https://www.youtube.com/watch?v=I3tkxxoA8Sg
 *  - https://reactnavigation.org/docs/bottom-tab-navigator/#tabbar
 *  - clean code by separating each stack and screen 
 */

//init call functions
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//import screen
// import SplashScreen from '../screens/SplashScreen';
// import RegisterScreen from '../screens/RegisterScreen';

// Home screen member
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/LoginScreen';
import DetailRestaurantScreen from '../screens/DetailRestaurantScreen';
import RestaurantsScreen from '../screens/RestaurantsScreen';
import SearchScreen from '../screens/SearchScreen';
import WishlistScreen from '../screens/WishlistScreen';
import AddWishlistScreen from '../screens/wishlist/addNewWishlist';
import ReviewDetailScreen from '../screens/DetailsPartition/ReviewPage';

// random screen member
import RandomScreen from '../screens/RandomScreen';

//setting screen member
import ProfileScreen from '../screens/ProfileScreen';

const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center", height: 72, justifyContent: 'flex-end', paddingBottom: 24 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const HomeTab = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Landing'} // TODO: change it to Login Screen
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Landing" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="DetailRestaurant" component={DetailRestaurantScreen} />
      <Stack.Screen name="Restaurants" component={RestaurantsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name="addWishlist" component={AddWishlistScreen} />
      <Stack.Screen name="reviews" component={ReviewDetailScreen} options={{
        headerShown: true,
      }} />
    </Stack.Navigator>
  )
}

const RandomTab = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Shuffle'}>
      <Stack.Screen name="Shuffle" component={RandomScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const SettingTab = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Profile'}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  )
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: false,
      }}
      // tabBar={props => <MyTabBar {...props} />}
      >
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{
            tabBarLabelPosition: 'below-icon',
            tabBarIcon: ({ focused, size }) => focused ? <Icon name="home" size={size} color="#4F8EF7" /> : <Icon name="home-outline" size={size} color="#4F8EF7" />
          }}
        />
        <Tab.Screen
          name="Random"
          component={RandomTab}
          options={{
            tabBarLabelPosition: 'below-icon',
            tabBarIcon: ({ focused, size }) => {
              return focused ? <Icon5 name="dice-d20" size={size + 5} color="#4F8EF7" /> : <Icon5 name="dice-d6" size={size} color="#4F8EF7" />
            }
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingTab}
          options={{
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: 'salmon',
            tabBarIcon: ({ focused, size }) => focused ? <IconI name="settings" size={size} color="#4F8EF7" /> : <IconI name="settings-outline" size={size} color="#4F8EF7" />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
