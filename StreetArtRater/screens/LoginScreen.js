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
import { colors } from "../styles/styles";

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
            source={require("../static/pics/WP1.png")}
            style={localStyles.background}
        >
            <View style={localStyles.overlay}>
                <KeyboardAvoidingView
                    behavior={
                        Platform.OS === "ios"
                            ? "padding"
                            : "height"
                    }
                >
                    <Text style={localStyles.title}>
                        StreetArt
                    </Text>

                    <Text style={localStyles.subtitle}>
                        Discover and rate street art
                    </Text>

                    <TextInput
                        style={localStyles.input}
                        placeholder="Email"
                        placeholderTextColor={colors.subText}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={localStyles.input}
                        placeholder="Password"
                        placeholderTextColor={colors.subText}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={localStyles.button}
                        onPress={login}
                    >
                        <Text style={localStyles.buttonText}>
                            Login
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={localStyles.secondary}
                        onPress={() =>
                            navigation.navigate("Signup")
                        }
                    >
                        <Text style={localStyles.secondaryText}>
                            Create account
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
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
        backgroundColor: "rgba(0,0,0,0.55)",
    },

    title: {
        fontSize: 52,
        fontWeight: "800",
        color: colors.text,
        marginBottom: 8,

        textShadowColor: "rgba(0,0,0,0.8)",
        textShadowOffset: {
            width: 1,
            height: 1,
        },
    },

    subtitle: {
        fontSize: 18,
        color: colors.subText,
        marginBottom: 40,
    },

    input: {
        backgroundColor: "rgba(42,42,42,0.9)",
        color: colors.text,
        padding: 18,
        borderRadius: 18,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: colors.border,
    },

    button: {
        backgroundColor: colors.accent,
        padding: 18,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 10,

        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },

    buttonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "700",
    },

    secondary: {
        marginTop: 20,
        alignItems: "center",
    },

    secondaryText: {
        color: colors.text,
        fontSize: 16,
    },
});