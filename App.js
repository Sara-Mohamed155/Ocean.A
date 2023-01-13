import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { push, ref, set } from "firebase/database";
import IconButton from "./components/iconButton";
import { modes } from "./constants/names";
import { db } from "./firebase-config";
import ComaprisonScreen from "./Screens/ComparisonScreen";
import DataScreen from "./Screens/DataScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            //headerStyle: {backgroundColor:"rgba(0,0,0,0.1)" },
            //headerTintColor: 'white',
            // contentStyle: { backgroundColor:"rgba(0,0,0,.1)" },
            statusBarColor: "black",
          }}
        >
          <Stack.Screen
            name="DataScreen"
            component={DataScreen}
            options={{
              // hide header
              headerShown: false,
              title: "data screen",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="md-information-circle-outline"
                  color={tintColor}
                  size={30}
                />
              ),
            }}
          />
          <Stack.Screen
            name="ComaprisonScreen"
            component={ComaprisonScreen}
            options={({ route }) => {
              const mode = route?.params?.mode;
              return {
                title: modes[mode]?.title,
                headerRight: ({ tintColor }) => (
                  <MaterialCommunityIcons
                    name={modes[mode].iconName}
                    color={modes[mode].color}
                    size={30}
                  />
                ),
              };
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
