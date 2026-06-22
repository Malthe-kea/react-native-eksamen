import React from "react";
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { doc, deleteDoc } from "firebase/firestore";

import { db, auth } from "../firebase";
import { styles, colors } from "../styles/styles";

export default function DetailScreen({ route, navigation }) {
    const { art } = route.params;

    function stars(rating) {
        const rounded = Math.round(rating || 0);
        return "★".repeat(rounded) + "☆".repeat(5 - rounded);
    }

    async function deleteArt() {
        try {
            if (auth.currentUser?.email !== art.createdBy) {
                Alert.alert(
                    "Ingen adgang",
                    "Du kan kun slette dine egne billeder."
                );
                return;
            }

            await deleteDoc(doc(db, "streetart", art.id));

            Alert.alert(
                "Deleted",
                "Street art deleted successfully"
            );

            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }

    return (
        <ImageBackground
            source={require("../static/pics/WP1.png")}
            style={localStyles.background}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={localStyles.scrollContent}
            >
                <Image
                    source={{ uri: art.imageUrl }}
                    style={localStyles.image}
                />

                <View style={localStyles.content}>
                    <Text style={styles.title}>
                        {art.title}
                    </Text>

                    <Text style={localStyles.rating}>
                        {stars(art.averageRating)}{" "}
                        {(art.averageRating || 0).toFixed(1)}/5
                    </Text>

                    <View style={styles.card}>
                        <Text style={localStyles.heading}>
                            Description
                        </Text>

                        <Text style={styles.text}>
                            {art.description}
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={localStyles.heading}>
                            Added by
                        </Text>

                        <Text style={styles.text}>
                            {art.createdBy || "Unknown"}
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={localStyles.heading}>
                            Location
                        </Text>

                        <MapView
                            style={localStyles.map}
                            initialRegion={{
                                latitude: art.latitude,
                                longitude: art.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                        >
                            <Marker
                                coordinate={{
                                    latitude: art.latitude,
                                    longitude: art.longitude,
                                }}
                                title={art.title}
                            />
                        </MapView>
                    </View>

                    {}
                    {auth.currentUser?.email === art.createdBy && (
                        <TouchableOpacity
                            style={localStyles.deleteButton}
                            onPress={deleteArt}
                        >
                            <Text style={styles.buttonText}>
                                Delete Art
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const localStyles = StyleSheet.create({
    background: {
        flex: 1,
    },

    scrollContent: {
        paddingBottom: 120,
    },

    image: {
        width: "100%",
        height: 320,
    },

    content: {
        padding: 20,
    },

    rating: {
        fontSize: 26,
        color: colors.star,
        marginBottom: 25,
    },

    heading: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 12,
    },

    map: {
        height: 220,
        borderRadius: 20,
        overflow: "hidden",
    },

    deleteButton: {
        backgroundColor: "#D62828",
        padding: 18,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 10,
    },
});