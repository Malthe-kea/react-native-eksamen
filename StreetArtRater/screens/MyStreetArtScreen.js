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

import {
    collection,
    query,
    where,
    onSnapshot,
} from "firebase/firestore";

import { db, auth } from "../firebase";
import { colors } from "../styles/styles";

export default function MyStreetArtScreen({ navigation }) {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        const q = query(
            collection(db, "streetart"),
            where("userId", "==", auth.currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                randomHeight: [180, 220, 260, 320][Math.floor(Math.random() * 4)],
            }));

            setArtworks(data);
        });

        return unsubscribe;
    }, []);

    function renderItem({ item }) {
        return (
            <TouchableOpacity
                style={[
                    localStyles.card,
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
                    style={localStyles.image}
                />

                <View style={localStyles.titleOverlay}>
                    <Text
                        style={localStyles.title}
                        numberOfLines={1}
                    >
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <ImageBackground
            source={require("../static/pics/WP1.png")}
            style={localStyles.background}
        >
            <View style={localStyles.overlay}>
                <Text style={localStyles.header}>
                    My Street Art
                </Text>

                {artworks.length === 0 ? (
                    <View style={localStyles.empty}>
                        <Text style={localStyles.emptyTitle}>
                            No uploads yet
                        </Text>

                        <Text style={localStyles.emptyText}>
                            Upload your first artwork
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={artworks}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        columnWrapperStyle={localStyles.row}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={localStyles.list}
                    />
                )}
            </View>
        </ImageBackground>
    );
}

const localStyles = StyleSheet.create({
    background: {
        flex: 1,
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.25)",
        paddingTop: 60,
    },

    header: {
        fontSize: 38,
        fontWeight: "800",
        color: colors.text,
        paddingHorizontal: 20,
        marginBottom: 20,

        textShadowColor: "rgba(0,0,0,0.8)",
        textShadowOffset: {
            width: 1,
            height: 1,
        },
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

    titleOverlay: {
        position: "absolute",
        top: 8,
        left: 8,
        backgroundColor: "rgba(0,0,0,0.45)",
        paddingHorizontal: 8,
        paddingVertical: 4,
    },

    title: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "600",
    },

    empty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
    },

    emptyTitle: {
        fontSize: 30,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 10,

        textShadowColor: "rgba(0,0,0,0.8)",
        textShadowOffset: {
            width: 1,
            height: 1,
        },
    },

    emptyText: {
        fontSize: 18,
        color: colors.subText,
    },
});