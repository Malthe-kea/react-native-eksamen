import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
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
                randomHeight: [180, 220, 260, 320][
                    Math.floor(Math.random() * 4)
                    ],
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
                style={[
                    styles.card,
                    { height: item.randomHeight }
                ]}
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

                <View style={styles.infoOverlay}>
                    <Text
                        style={styles.title}
                        numberOfLines={1}
                    >
                        {item.title}
                    </Text>

                    <Text style={styles.rating}>
                        {stars(item.averageRating)}
                    </Text>

                    <Text style={styles.distance}>
                        📍 {item.distance.toFixed(1)} km væk
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <ImageBackground
            source={require("../static/pics/WP1.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <FlatList
                    data={artworks}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
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
        backgroundColor: "rgba(0,0,0,0.2)",
    },

    list: {
        paddingBottom: 120,
    },

    row: {
        gap: 2,
    },

    card: {
        flex: 1,
        marginBottom: 2,
        position: "relative",
    },

    image: {
        width: "100%",
        height: "100%",
    },

    infoOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
        paddingHorizontal: 10,
        paddingVertical: 8,
    },

    title: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
        marginBottom: 2,
    },

    rating: {
        color: "#FFD700",
        fontSize: 12,
        marginBottom: 2,
    },

    distance: {
        color: "#fff",
        fontSize: 11,
    },
});