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
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => signOut(auth)}
                >
                    <Text style={styles.logoutText}>Log ud</Text>
                </TouchableOpacity>
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

    logoutButton: {
        position: "absolute",
        top: 60,
        right: 20,
        backgroundColor: "#1E1E1E",
        borderWidth: 2,
        borderColor: "#ff6600",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },

    logoutText: {
        color: "#ff6600",
        fontWeight: "700",
    },
});