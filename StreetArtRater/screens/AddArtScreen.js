import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage, auth } from "../firebase";

export default function AddArtScreen({ navigation }) {
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);

    async function openCamera() {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            Alert.alert("Camera permission denied");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    async function useCurrentLocation() {
        const permission = await Location.requestForegroundPermissionsAsync();

        if (!permission.granted) return;

        const current = await Location.getCurrentPositionAsync();

        setLocation({
            latitude: current.coords.latitude,
            longitude: current.coords.longitude,
        });
    }

    async function uploadImage(uri) {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = ref(storage, `streetart/${Date.now()}.jpg`);

        await uploadBytes(storageRef, blob);

        return getDownloadURL(storageRef);
    }

    async function saveArt() {
        try {
            if (!image || !location || !title || !description || !rating) {
                Alert.alert("Please fill all fields");
                return;
            }

            const imageUrl = await uploadImage(image);

            await addDoc(collection(db, "streetart"), {
                title,
                description,
                imageUrl,
                latitude: location.latitude,
                longitude: location.longitude,
                ratings: [rating],
                averageRating: rating,
                userId: auth.currentUser.uid,
                createdBy: auth.currentUser.email,
                createdAt: new Date(),
            });

            Alert.alert("Saved");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }

    return (
        <ImageBackground
            source={{
                uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fbc%2F0f%2F74%2Fbc0f74c07e3d1498ff8bb891f540f181.jpg&f=1&nofb=1&ipt=036c27621001646d2e5f5847791708b6a04857feecd34b2d55fe8f36f413d1c0",
            }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView>
                        <Text style={styles.title}>Add Street Art</Text>

                        <View style={styles.row}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={openCamera}
                            >
                                <Text>📷 Camera</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={pickImage}
                            >
                                <Text>🖼 Upload</Text>
                            </TouchableOpacity>
                        </View>

                        {image && (
                            <Image source={{ uri: image }} style={styles.image} />
                        )}

                        <TouchableOpacity
                            style={styles.button}
                            onPress={useCurrentLocation}
                        >
                            <Text>Current location</Text>
                        </TouchableOpacity>

                        <MapView
                            style={styles.map}
                            onPress={(e) =>
                                setLocation(e.nativeEvent.coordinate)
                            }
                        >
                            {location && (
                                <Marker coordinate={location} />
                            )}
                        </MapView>

                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                        />

                        <TextInput
                            style={[styles.input, styles.description]}
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                        />

                        <View style={styles.stars}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => setRating(star)}
                                >
                                    <Text style={styles.star}>
                                        {star <= rating ? "★" : "☆"}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={styles.save}
                            onPress={saveArt}
                        >
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>
                    </ScrollView>
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
        padding: 20,
        backgroundColor: "rgba(0,0,0,0.45)",
    },

    title: {
        fontSize: 40,
        fontWeight: "800",
        color: "#fff",
        marginTop: 50,
        marginBottom: 30,
    },

    row: {
        flexDirection: "row",
        gap: 10,
    },

    button: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.9)",
        padding: 16,
        borderRadius: 18,
        alignItems: "center",
        marginBottom: 15,
    },

    image: {
        width: "100%",
        height: 250,
        borderRadius: 20,
        marginBottom: 15,
    },

    map: {
        height: 240,
        borderRadius: 20,
        marginBottom: 20,
    },

    input: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 18,
        marginBottom: 15,
    },

    description: {
        minHeight: 140,
        textAlignVertical: "top",
    },

    stars: {
        flexDirection: "row",
        marginBottom: 25,
    },

    star: {
        fontSize: 42,
        color: "#FFD60A",
    },

    save: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 18,
        alignItems: "center",
        marginBottom: 50,
    },

    saveText: {
        fontSize: 18,
        fontWeight: "700",
    },
});