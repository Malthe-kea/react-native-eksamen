import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import HomeScreen from "./screens/HomeScreen";
import AddArtScreen from "./screens/AddArtScreen";
import ListScreen from "./screens/ListScreen";
import DetailScreen from "./screens/DetailScreen";
import TopRatedScreen from "./screens/TopRatedScreen";
import MyStreetArtScreen from "./screens/MyStreetArtScreen";
import MapScreen from "./screens/MapScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    if (loading) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown:false,
                }}
            >

                {user ? (
                    <>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{
                                title: "Street Art",
                            }}
                        />

                        <Stack.Screen
                            name="AddArt"
                            component={AddArtScreen}
                            options={{
                                title: "Add art",
                            }}
                        />

                        <Stack.Screen
                            name="List"
                            component={ListScreen}
                            options={{
                                title: "List of street art",
                            }}
                        />

                        <Stack.Screen
                            name="Detail"
                            component={DetailScreen}
                            options={{
                                title: "Details",
                            }}
                        />

                        <Stack.Screen
                            name="MyStreetArt"
                            component={MyStreetArtScreen}
                            options={{
                                title: "My street art",
                            }}
                        />

                        <Stack.Screen
                            name="Map"
                            component={MapScreen}
                            options={{
                                title: "Street Art Map",
                            }}
                        />

                        <Stack.Screen
                            name="TopRated"
                            component={TopRatedScreen}
                            options={{
                                title: "Highest rated",
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                        />

                        <Stack.Screen
                            name="Signup"
                            component={SignupScreen}
                        />
                    </>
                )}

            </Stack.Navigator>
        </NavigationContainer>
    );
}