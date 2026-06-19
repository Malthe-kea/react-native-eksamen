import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ImageBackground,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage, auth } from "../firebase";
import { theme, colors } from "../styles/theme";

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
            source={require("../static/pics/WP1.png")}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <KeyboardAwareScrollView
                    enableOnAndroid
                    extraScrollHeight={120}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 150 }}
                >
                    <Text style={[theme.title, styles.title]}>
                        Add Street Art
                    </Text>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[theme.button, styles.iconButton]}
                            onPress={openCamera}
                        >
                            <Ionicons
                                name="camera"
                                size={34}
                                color={colors.white}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[theme.button, styles.iconButton]}
                            onPress={pickImage}
                        >
                            <Ionicons
                                name="cloud-upload"
                                size={34}
                                color={colors.white}
                            />
                        </TouchableOpacity>
                    </View>

                    {image && (
                        <Image
                            source={{ uri: image }}
                            style={styles.image}
                        />
                    )}

                    <TouchableOpacity
                        style={styles.locationButton}
                        onPress={useCurrentLocation}
                    >
                        <Ionicons
                            name="location"
                            size={24}
                            color={colors.white}
                        />

                        <Text style={styles.locationText}>
                            Use current location
                        </Text>
                    </TouchableOpacity>

                    <MapView
                        style={styles.map}
                        onLongPress={(e) =>
                            setLocation(e.nativeEvent.coordinate)
                        }
                    >
                        {location && (
                            <Marker coordinate={location} />
                        )}
                    </MapView>

                    <TextInput
                        style={theme.input}
                        placeholder="Title"
                        placeholderTextColor={colors.subText}
                        value={title}
                        onChangeText={setTitle}
                    />

                    <TextInput
                        style={[theme.input, styles.description]}
                        placeholder="Description"
                        placeholderTextColor={colors.subText}
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
                        style={theme.button}
                        onPress={saveArt}
                    >
                        <View style={styles.saveContent}>
                            <Ionicons
                                name="save"
                                size={22}
                                color={colors.white}
                            />
                            <Text style={theme.buttonText}>
                                {" "}Save
                            </Text>
                        </View>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
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
        marginTop: 50,
        marginBottom: 25,
    },

    row: {
        flexDirection: "row",
        gap: 15,
        marginBottom: 20,
    },

    iconButton: {
        flex: 1,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },

    image: {
        width: "100%",
        height: 250,
        borderRadius: 25,
        marginBottom: 20,
    },

    locationButton: {
        backgroundColor: colors.accent,
        borderRadius: 25,
        paddingVertical: 20,
        marginBottom: 20,

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    locationText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "700",
        marginLeft: 10,
    },

    map: {
        height: 180,
        borderRadius: 25,
        marginBottom: 20,
    },

    description: {
        minHeight: 140,
        textAlignVertical: "top",
    },

    stars: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 25,
    },

    star: {
        fontSize: 50,
        color: colors.star,
    },

    saveContent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
