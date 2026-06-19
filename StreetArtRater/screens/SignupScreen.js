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

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function signup() {
        try {
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
        } catch (error) {
            Alert.alert(
                "Account creation failed",
                error.message
            );
        }
    }

    return (
        <ImageBackground
            source={require("../static/pics/WP1.png")}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <Text style={styles.title}>
                        Create account
                    </Text>

                    <Text style={styles.subtitle}>
                        Join the StreetArt community
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
                        onPress={signup}
                    >
                        <Text style={styles.buttonText}>
                            Create account
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondary}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.secondaryText}>
                            Already have an account?
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
        fontSize: 42,
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