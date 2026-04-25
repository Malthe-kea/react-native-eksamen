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
import MapView, { Marker } from "react-native-maps";
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

        const result = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: true,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            await useCurrentLocation();
        }
    }

    async function pickImage() {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert("Fejl", "Tilladelse til billeder mangler");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 0.7,
            allowsEditing: true,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    }

    async function useCurrentLocation() {
        const locationPermission =
            await Location.requestForegroundPermissionsAsync();

        if (!locationPermission.granted) {
            Alert.alert("Fejl", "Location tilladelse mangler");
            return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
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
            Alert.alert(
                "Mangler data",
                "Tilføj billede, punkt på kortet og alle tekstfelter"
            );
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
            <Text style={styles.heading}>Tilføj gadekunst</Text>

            <Button title="Tag billede med kamera" onPress={takePicture} />

            <View style={styles.space} />

            <Button title="Upload billede fra galleri" onPress={pickImage} />

            <View style={styles.space} />

            <Button title="Brug min nuværende position" onPress={useCurrentLocation} />

            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

            <Text style={styles.label}>Vælg punkt manuelt på kortet:</Text>

            <MapView
                style={styles.smallMap}
                initialRegion={{
                    latitude: 55.6761,
                    longitude: 12.5683,
                    latitudeDelta: 0.08,
                    longitudeDelta: 0.08,
                }}
                onPress={(event) => {
                    setLocation(event.nativeEvent.coordinate);
                }}
            >
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                    />
                )}
            </MapView>

            {location && (
                <Text style={styles.locationText}>
                    Valgt position: {location.latitude}, {location.longitude}
                </Text>
            )}

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

            <Button title="Gem gadekunst" onPress={saveArt} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    heading: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
    },
    image: {
        width: "100%",
        height: 250,
        marginVertical: 20,
        borderRadius: 10,
    },
    smallMap: {
        width: "100%",
        height: 250,
        marginVertical: 15,
    },
    label: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: "bold",
    },
    locationText: {
        marginBottom: 15,
        fontSize: 12,
    },
    input: {
        borderWidth: 1,
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
    },
    space: {
        height: 10,
    },
});