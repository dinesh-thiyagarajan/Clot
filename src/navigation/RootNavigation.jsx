import SplashScreen from "../presentations/screens/SplashScreen";
import SignInScreen from "../presentations/screens/auth/SignInScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccountScreen from "../presentations/screens/auth/CreateAccountScreen";
import Route from "../resources/routes";
import TabNavigation from "./TabNavigation";
import ViewCategoryScreen from "../presentations/screens/category/ViewCategoryScreen";
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
          component={CreateAccountScreen}
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
