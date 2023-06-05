import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "./src/Screens/Authentication/Login";
import SignUp from "./src/Screens/Authentication/SignUp";
import ExaminerHome from "./src/Screens/ExaminerScreens/ExaminerHome";
import HomeScreen from "./src/Screens/HomeScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ExaminerHome" component={ExaminerHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;