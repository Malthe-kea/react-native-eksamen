import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "./screens/HomeScreen.js";
import AddArtScreen from "./screens/AddArtScreen.js";
import ListScreen from "./screens/ListScreen.js";
import MyStreetArtScreen from "./screens/MyStreetArtScreen.js";
import MapScreen from "./screens/MapScreen.js";
import TopRatedScreen from "./screens/TopRatedScreen.js";

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
                tabBarActiveTintColor: "#ff6600",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 5,
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
                        options={{ title }}
                    />
                )
            )}
        </Tab.Navigator>
    );
}