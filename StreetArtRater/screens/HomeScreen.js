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
            source={{
                uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmetroselskabet.euwest01.umbraco.io%2Fmedia%2Fvbkn5uue%2Fnordvest-daniel-rasmussen.jpg%3Fwidth%3D1200%26height%3D600&f=1&nofb=1&ipt=23f0cb9aeb45993a140a492a588491fadc0bc750c4bbd641f3c9009827eba359",
            }}
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