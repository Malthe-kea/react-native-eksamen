import React from "react";
import { View, Text, Image, StyleSheet, Button, Alert } from "react-native";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function DetailScreen({ route, navigation }) {
    const { art } = route.params;

    async function deleteArt() {
        try {
            await deleteDoc(doc(db, "streetart", art.id));
            Alert.alert("Slettet", "Gadekunsten er slettet");
            navigation.navigate("Map");
        } catch (error) {
            Alert.alert("Fejl", error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: art.imageUrl }} style={styles.image} />

            <Text style={styles.title}>{art.title}</Text>
            <Text style={styles.rating}>{art.rating}/10 stjerner</Text>
            <Text style={styles.description}>{art.description}</Text>

            <Text style={styles.location}>
                GPS: {art.latitude}, {art.longitude}
            </Text>

            <Button title="Slet" onPress={deleteArt} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    image: {
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: { fontSize: 26, fontWeight: "bold" },
    rating: { fontSize: 20, marginVertical: 10 },
    description: { fontSize: 16, marginBottom: 20 },
    location: { fontSize: 12, marginBottom: 20 },
});