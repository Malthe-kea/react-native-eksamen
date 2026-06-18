import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function ListScreen({ navigation }) {
    const [artworks, setArtworks] = useState([]);
    const [region, setRegion] = useState(null);

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

    function openDetail(art) {
        navigation.navigate("Detail", { art });
    }

    function renderItem({ item }) {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => openDetail(item)}
            >
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                />

                <View style={styles.content}>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>

                    <Text style={styles.rating}>
                        {stars(item.averageRating)}
                    </Text>

                    <Text
                        style={styles.description}
                        numberOfLines={2}
                    >
                        {item.description}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968",
            }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <FlatList
                    data={artworks}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
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
        paddingTop: 60,
    },

    header: {
        fontSize: 38,
        fontWeight: "800",
        color: "#fff",
        paddingHorizontal: 20,
        marginBottom: 20,
    },

    map: {
        height: 280,
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 22,
        overflow: "hidden",
    },

    card: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 22,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
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
        fontSize: 22,
        marginBottom: 8,
    },

    description: {
        fontSize: 16,
        color: "#666",
        lineHeight: 24,
    },
});