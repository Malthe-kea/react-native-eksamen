import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            Alert.alert("Login fejl", error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>StreetArt Rater</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Kodeord"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Log ind" onPress={login} />

            <View style={styles.space} />

            <Button
                title="Opret bruger"
                onPress={() => navigation.navigate("Signup")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center" },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 30 },
    input: {
        borderWidth: 1,
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
    },
    space: { height: 15 },
});