import React, { useEffect, useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function MapScreen({ navigation }) {
    const [artworks, setArtworks] = useState([]);
    const [region, setRegion] = useState(null);
    const [selectedArt, setSelectedArt] = useState(null);

    useEffect(() => {
        loadLocation();

        const unsubscribe = onSnapshot(
            collection(db, "streetart"),
            (snapshot) => {
                setArtworks(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
            }
        );

        return unsubscribe;
    }, []);

    async function loadLocation() {
        const permission =
            await Location.requestForegroundPermissionsAsync();

        if (!permission.granted) {
            return;
        }

        const current =
            await Location.getCurrentPositionAsync();

        setRegion({
            latitude: current.coords.latitude,
            longitude: current.coords.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
        });
    }

    function stars(rating) {
        const value = Math.round(rating || 0);

        return (
            "★".repeat(value) +
            "☆".repeat(5 - value)
        );
    }

    return (
        <ImageBackground
            source={{
                uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F2191690740%2Fpt%2Ffoto%2Ffreetown-christiania-copenhagen.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3DFLB148ntlKrrr0tH3YE8N1FjF_pAXxXJljLW7_j9sxo%3D&f=1&nofb=1&ipt=3cd4780dd9493d1e32879c452d85fd97499cf329347b99d107fca899cf179527",
            }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <MapView
                    style={styles.map}
                    region={
                        region || {
                            latitude: 55.6761,
                            longitude: 12.5683,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }
                    }
                >
                    {artworks.map((art) => (
                        <Marker
                            key={art.id}
                            coordinate={{
                                latitude: art.latitude,
                                longitude: art.longitude,
                            }}
                            onPress={() => setSelectedArt(art)}
                        />
                    ))}
                </MapView>

                {selectedArt && (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate("Detail", {
                                art: selectedArt,
                            })
                        }
                    >
                        <Image
                            source={{
                                uri: selectedArt.imageUrl,
                            }}
                            style={styles.image}
                        />

                        <View style={styles.content}>
                            <Text style={styles.title}>
                                {selectedArt.title}
                            </Text>

                            <Text style={styles.rating}>
                                {stars(selectedArt.averageRating)}
                            </Text>

                            <Text
                                numberOfLines={2}
                                style={styles.description}
                            >
                                {selectedArt.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
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
        backgroundColor: "rgba(0,0,0,0.35)",
    },

    header: {
        fontSize: 38,
        fontWeight: "800",
        color: "#fff",
        marginTop: 60,
        marginBottom: 20,
        paddingHorizontal: 20,
    },

    map: {
        height: 340,
        marginHorizontal: 20,
        borderRadius: 24,
        overflow: "hidden",
        marginTop: 40,
    },

    card: {
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 24,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    image: {
        width: "100%",
        height: 220,
    },

    content: {
        padding: 18,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 8,
    },

    rating: {
        fontSize: 20,
        marginBottom: 8,
    },

    description: {
        fontSize: 16,
        color: "#666",
    },
});