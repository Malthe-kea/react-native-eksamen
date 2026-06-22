import React from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const colors = {
    background: "#1E1E1E",
    accent: "#ff6600",
    text: "#1B1B1B",
    subText: "#1B1B1B",
    white: "#FFFFFF",
};

export default function HomeScreen({ navigation }) {
    return (
        <ImageBackground
            source={require("../static/pics/WP1.png")}
            style={localStyles.background}
        >
            <View style={localStyles.overlay}>
                <TouchableOpacity
                    style={localStyles.logoutButton}
                    onPress={() => signOut(auth)}
                >
                    <Text style={localStyles.logoutText}>Log ud</Text>
                </TouchableOpacity>

                <Text style={[localStyles.title, localStyles.homeScreenTitle]}>
                    World wide street art
                </Text>

                <Text style={[localStyles.subText, localStyles.homeScreenSubtitle]}>
                    Explore and rate street art
                </Text>

                <Text style={[localStyles.subText, localStyles.homeScreenSubtitle]}>
                    from around the world
                </Text>
            </View>
        </ImageBackground>
    );
}

const localStyles = StyleSheet.create({
    background: {
        flex: 1,
    },

    overlay: {
        flex: 1,
        justifyContent: "center",
        padding: 30,
        backgroundColor: "rgba(255,255,255,0.1)",
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        color: colors.text,
        textShadowColor: "rgba(0,0,0,0.8)",
        textShadowOffset: {
            width: 0,
            height: 0,
        },
    },

    subText: {
        fontSize: 14,
        color: colors.subText,
    },

    homeScreenTitle: {
        fontSize: 48,
        lineHeight: 48,
    },

    homeScreenSubtitle: {
        fontSize: 18,
        textShadowColor: "rgba(0,0,0,0.5)",
        textShadowOffset: {
            width: 0,
            height: 0,
        },
    },

    logoutButton: {
        position: "absolute",
        top: 60,
        left: 30,
        backgroundColor: colors.background,
        borderWidth: 2,
        borderColor: colors.accent,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },

    logoutText: {
        color: colors.accent,
        fontWeight: "700",
    },
});