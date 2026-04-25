import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function SignupScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function signup() {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            Alert.alert("Oprettelse fejl", error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Opret bruger</Text>

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

            <Button title="Opret bruger" onPress={signup} />
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
});