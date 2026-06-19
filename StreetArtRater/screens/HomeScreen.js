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

export default function HomeScreen({ navigation }) {
    return (
        <ImageBackground
            source={require("../static/pics/WP1.png")}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>
                    World wide street art
                </Text>

                <Text style={styles.subtitle}>
                    Explore and rate street art from around the world
                </Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    overlay: {
        flex: 1,
        justifyContent: "center",
        padding: 30,
        backgroundColor: "rgba(0,0,0,0.45)",
    },

    title: {
        fontSize: 48,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 18,
        color: "#ddd",
        marginBottom: 60,
    },

    logout: {
        marginTop: 40,
        alignItems: "center",
    },

    logoutText: {
        color: "#fff",
        fontSize: 18,
    },
});