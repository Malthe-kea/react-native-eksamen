import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Image,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../firebase";

export default function AddArtScreen({ navigation }) {
    const [imageUri, setImageUri] = useState(null);
    const [location, setLocation] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");

    async function takePicture() {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

        if (!cameraPermission.granted) {
            Alert.alert("Fejl", "Kamera tilladelse mangler");
            return;
        }

        const locationPermission = await Location.requestForegroundPermissionsAsync();

        if (!locationPermission.granted) {
            Alert.alert("Fejl", "Location tilladelse mangler");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: true,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);

            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
        }
    }

    async function uploadImage(uri) {
        const response = await fetch(uri);
        const blob = await response.blob();

        const filename = `streetart/${Date.now()}.jpg`;
        const imageRef = ref(storage, filename);

        await uploadBytes(imageRef, blob);

        return await getDownloadURL(imageRef);
    }

    async function saveArt() {
        if (!imageUri || !location || !title || !description || !rating) {
            Alert.alert("Mangler data", "Udfyld alle felter og tag et billede");
            return;
        }

        const ratingNumber = Number(rating);

        if (ratingNumber < 1 || ratingNumber > 10) {
            Alert.alert("Fejl", "Rating skal være mellem 1 og 10");
            return;
        }

        try {
            const imageUrl = await uploadImage(imageUri);

            await addDoc(collection(db, "streetart"), {
                title,
                description,
                rating: ratingNumber,
                imageUrl,
                latitude: location.latitude,
                longitude: location.longitude,
                userId: auth.currentUser.uid,
                createdAt: new Date(),
            });

            Alert.alert("Gemt", "Gadekunsten er gemt");
            navigation.navigate("Map");
        } catch (error) {
            Alert.alert("Fejl", error.message);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Button title="Tag billede" onPress={takePicture} />

            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

            <TextInput
                style={styles.input}
                placeholder="Titel"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={styles.input}
                placeholder="Beskrivelse"
                value={description}
                onChangeText={setDescription}
            />

            <TextInput
                style={styles.input}
                placeholder="Rating 1-10"
                value={rating}
                onChangeText={setRating}
                keyboardType="numeric"
            />

            {location && (
                <Text>
                    Position: {location.latitude}, {location.longitude}
                </Text>
            )}

            <View style={styles.space} />

            <Button title="Gem gadekunst" onPress={saveArt} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    image: {
        width: "100%",
        height: 250,
        marginVertical: 20,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
    },
    space: { height: 20 },
});