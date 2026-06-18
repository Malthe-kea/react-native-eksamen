import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";

export default function TopRatedScreen({ navigation }) {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const permission = await Location.requestForegroundPermissionsAsync();

        if (!permission.granted) {
            return;
        }

        const position = await Location.getCurrentPositionAsync();

        const snapshot = await getDocs(collection(db, "streetart"));

        const list = snapshot.docs.map((doc) => {
            const art = doc.data();

            const dist = distance(
                position.coords.latitude,
                position.coords.longitude,
                art.latitude,
                art.longitude
            );

            return {
                id: doc.id,
                ...art,
                distance: dist,
            };
        });

        list.sort((a, b) => {
            if (Math.abs(a.distance - b.distance) < 1) {
                return b.averageRating - a.averageRating;
            }

            return a.distance - b.distance;
        });

        setArtworks(list);
    }

    function distance(lat1, lon1, lat2, lon2) {
        const R = 6371;

        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        return (
            R *
            2 *
            Math.atan2(
                Math.sqrt(a),
                Math.sqrt(1 - a)
            )
        );
    }

    function stars(rating) {
        const value = Math.round(rating || 0);

        return "★".repeat(value) + "☆".repeat(5 - value);
    }

    function renderItem({ item }) {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() =>
                    navigation.navigate("Detail", {
                        art: item,
                    })
                }
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

                    <Text style={styles.distance}>
                        {item.distance.toFixed(1)} km væk
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={artworks}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 16,
    },

    card: {
        backgroundColor: "#fff",
        marginBottom: 20,
        borderRadius: 20,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },

    image: {
        width: "100%",
        height: 220,
    },

    content: {
        padding: 16,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 8,
    },

    rating: {
        fontSize: 22,
        marginBottom: 8,
    },

    distance: {
        fontSize: 16,
        color: "#666",
    },
});