import SplashScreen from "../screens/SplashScreen";
import SignInScreen from "../screens/SignInScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../screens/RegisterScreen";
import Route from "./routes";
import TabNavigation from "./TabNavigation";
import ViewCategoryScreen from "../screens/ViewCategoryScreen";
const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Route.SPLASH_SCREEN}>
        <Stack.Screen
          name={Route.SPLASH_SCREEN}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Route.SIGN_IN_SCREEN}
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Route.CREATE_ACCOUNT_SCREEN}
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Route.STACK_HOME_SCREEN}
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Route.VIEW_CATEGORY_SCREEN}
          component={ViewCategoryScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
