import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginForm from "./pages/LoginForm";
import Register1 from "./pages/Register1";
import Register2 from "./pages/Register2";
import Register3 from "./pages/Register3";
import Register4 from "./pages/Register4";
import MainForm from "./pages/MainForm";


import CameraForm from "./pages/CameraForm"
import Result from "./pages/Result";
import MaterialForm from "./pages/MaterialForm"
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginForm">
        <Stack.Screen
          name="LoginForm"
          options={{ headerShown: false }}
          component={LoginForm}
        />
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
          component={LoginForm}
        />
        <Stack.Screen
          name="register1"
          options={{ headerShown: false }}
          component={Register1}
        />
        <Stack.Screen
          name="register2"
          options={{ headerShown: false }}
          component={Register2}
        />
        <Stack.Screen
          name="register3"
          options={{ headerShown: false }}
          component={Register3}
        />
        <Stack.Screen
          name="register4"
          options={{ headerShown: false }}
          component={Register4}
        />


        {/* 추가 */}
        <Stack.Screen
          name="MainForm"
          options={{ headerShown: false }}
          component={MainForm}
        />
        <Stack.Screen
          name="CameraForm"
          options={{ headerShown: false }}
          component={CameraForm}
        />

        <Stack.Screen
          name="Result"
          options={{ headerShown: false }}
          component={Result}
        />

        <Stack.Screen
          name="MaterialForm"
          options={{ headerShown: false }}
          component={MaterialForm}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create();
