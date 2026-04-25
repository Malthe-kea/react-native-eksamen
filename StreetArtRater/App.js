import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import MapScreen from "./screens/MapScreen";
import AddArtScreen from "./screens/AddArtScreen";
import DetailScreen from "./screens/DetailScreen";
import ListScreen from "./screens/ListScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingUser(false);
    });

    return unsubscribe;
  }, []);

  if (checkingUser) return null;

  return (
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
              <>
                <Stack.Screen name="Map" component={MapScreen} />
                <Stack.Screen name="AddArt" component={AddArtScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} />
                <Stack.Screen name="List" component={ListScreen} />
              </>
          ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
              </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}