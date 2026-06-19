import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signOut } from "firebase/auth";

import { auth } from "./firebase";

import HomeScreen from "./screens/HomeScreen";
import AddArtScreen from "./screens/AddArtScreen";
import ListScreen from "./screens/ListScreen";
import MyStreetArtScreen from "./screens/MyStreetArtScreen";
import MapScreen from "./screens/MapScreen";
import TopRatedScreen from "./screens/TopRatedScreen";

const Tab = createBottomTabNavigator();

const tabConfig = {
    Home: {
        component: HomeScreen,
        title: "Home",
        icon: "home",
    },
    AddArt: {
        component: AddArtScreen,
        title: "Add Art",
        icon: "add-circle",
    },
    List: {
        component: ListScreen,
        title: "Street Art",
        icon: "list",
    },
    MyStreetArt: {
        component: MyStreetArtScreen,
        title: "My Art",
        icon: "images",
    },
    Map: {
        component: MapScreen,
        title: "Map",
        icon: "map",
    },
    TopRated: {
        component: TopRatedScreen,
        title: "Top Rated",
        icon: "star",
    },
};

export default function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                // Header
                headerStyle: {
                    backgroundColor: "#1E1E1E",
                },

                headerTitleStyle: {
                    color: "#F5E6D3",
                    fontWeight: "700",
                },

                headerTintColor: "#ff6600",

                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => signOut(auth)}
                        style={{
                            marginRight: 15,
                            backgroundColor: "#ff6600",
                            paddingHorizontal: 14,
                            paddingVertical: 8,
                            borderRadius: 20,
                        }}
                    >
                        <Text
                            style={{
                                color: "#fff",
                                fontWeight: "bold",
                            }}
                        >
                            Log ud
                        </Text>
                    </TouchableOpacity>
                ),

                // Tab bar
                tabBarActiveTintColor: "#ff6600",
                tabBarInactiveTintColor: "#8E8E8E",

                tabBarStyle: {
                    position: "absolute",
                    left: 15,
                    right: 15,
                    bottom: 15,
                    height: 75,

                    backgroundColor: "#1E1E1E",

                    borderTopWidth: 0,

                    borderRadius: 25,

                    paddingTop: 8,
                    paddingBottom: 10,

                    elevation: 12,

                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                },

                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                    marginBottom: 5,
                },

                tabBarIcon: ({ color, size }) => (
                    <Ionicons
                        name={tabConfig[route.name]?.icon || "ellipse"}
                        size={size}
                        color={color}
                    />
                ),
            })}
        >
            {Object.entries(tabConfig).map(
                ([name, { component, title }]) => (
                    <Tab.Screen
                        key={name}
                        name={name}
                        component={component}
                        options={{
                            title,
                        }}
                    />
                )
            )}
        </Tab.Navigator>
    );
}