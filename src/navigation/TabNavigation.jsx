import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../presentations/screens/landing/HomeScreen";
import FavouritesScreen from "../presentations/screens/landing/FavouritesScreen";
import CartScreen from "../presentations/screens/landing/CartScreen";
import UserProfileScreen from "../presentations/screens/landing/UserProfileScreen";
import Icon from "react-native-vector-icons/Ionicons";
import Route from "../resources/routes";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === Route.HOME_SCREEN) {
            iconName = focused ? "flame" : "flame-outline";
          } else if (route.name === Route.FAVOURITES_SCREEN) {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === Route.CART_SCREEN) {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === Route.USER_PROFILE_SCREEN) {
            iconName = focused ? "person" : "person-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#8E6CEF",
        tabBarInactiveTintColor: "#272727",
        tabBarStyle: [{ display: "flex" }, null],
      })}>
      <Tab.Screen
        name={Route.HOME_SCREEN}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={Route.FAVOURITES_SCREEN}
        component={FavouritesScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={Route.CART_SCREEN}
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={Route.USER_PROFILE_SCREEN}
        component={UserProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
