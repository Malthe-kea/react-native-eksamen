import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
        } catch (error) {
            Alert.alert(
                "Login failed",
                error.message
            );
        }
    }

    return (
        <ImageBackground
            source={{
                uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbarbarapicci.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fdabs-myla-40-copenhagen-denmark.jpg&f=1&nofb=1&ipt=02ec94e89bd582dbeb2024dfb40b8dbc9174b061e26aaca9caae323b2b29248a",
            }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <KeyboardAvoidingView
                    behavior={
                        Platform.OS === "ios"
                            ? "padding"
                            : "height"
                    }
                >
                    <Text style={styles.title}>
                        StreetArt
                    </Text>

                    <Text style={styles.subtitle}>
                        Discover and rate street art
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#bbb"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#bbb"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={login}
                    >
                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondary}
                        onPress={() =>
                            navigation.navigate("Signup")
                        }
                    >
                        <Text style={styles.secondaryText}>
                            Create account
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
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
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 18,
        color: "#ddd",
        marginBottom: 40,
    },

    input: {
        backgroundColor: "rgba(255,255,255,0.15)",
        padding: 18,
        borderRadius: 16,
        marginBottom: 15,
        color: "#fff",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
    },

    button: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 18,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        fontSize: 18,
        fontWeight: "700",
    },

    secondary: {
        marginTop: 20,
        alignItems: "center",
    },

    secondaryText: {
        color: "#fff",
        fontSize: 16,
    },
});