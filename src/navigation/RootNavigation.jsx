import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorite from "../screens/Favorite";
import Custome from "../screens/Custome";
import { Text } from "react-native";
import Detail from "../screens/Detail";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => <Text>🏚️</Text>,
        }}
      />
      <Tabs.Screen
        name="Favorite"
        component={Favorite}
        options={{
          headerShown: false,
          tabBarIcon: () => <Text>💖</Text>,
        }}
      />
      <Tabs.Screen
        name="Custome"
        component={Custome}
        options={{
          headerShown: false,
          tabBarIcon: () => <Text>😊</Text>,
        }}
      />
    </Tabs.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
