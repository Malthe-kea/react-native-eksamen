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

export default function MyStreetArtScreen({
                                              navigation,
                                          }) {
    const [artworks, setArtworks] =
        useState([]);

    useEffect(() => {
        const q = query(
            collection(
                db,
                "streetart"
            ),
            where(
                "userId",
                "==",
                auth.currentUser.uid
            )
        );

        const unsubscribe =
            onSnapshot(
                q,
                (snapshot) => {
                    setArtworks(
                        snapshot.docs.map(
                            (doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            })
                        )
                    );
                }
            );

        return unsubscribe;
    }, []);

    function stars(rating) {
        const value =
            Math.round(rating || 0);

        return (
            "★".repeat(value) +
            "☆".repeat(5 - value)
        );
    }

    function renderItem({
                            item,
                        }) {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() =>
                    navigation.navigate(
                        "Detail",
                        {
                            art: item,
                        }
                    )
                }
            >
                <Image
                    source={{
                        uri:
                        item.imageUrl,
                    }}
                    style={styles.image}
                />

                <View
                    style={styles.content}
                >
                    <Text
                        style={styles.title}
                    >
                        {item.title}
                    </Text>

                    <Text
                        style={styles.rating}
                    >
                        {stars(
                            item.averageRating
                        )}
                    </Text>

                    <Text
                        style={
                            styles.description
                        }
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
            style={
                styles.background
            }
        >
            <View
                style={styles.overlay}
            >
                <Text
                    style={styles.header}
                >
                    My Street Art
                </Text>

                {artworks.length ===
                0 ? (
                    <View
                        style={styles.empty}
                    >
                        <Text
                            style={
                                styles.emptyTitle
                            }
                        >
                            No uploads yet
                        </Text>

                        <Text
                            style={
                                styles.emptyText
                            }
                        >
                            Upload your first artwork
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={artworks}
                        renderItem={
                            renderItem
                        }
                        keyExtractor={(
                            item
                        ) =>
                            item.id
                        }
                        showsVerticalScrollIndicator={
                            false
                        }
                    />
                )}
            </View>
        </ImageBackground>
    );
}

const styles =
    StyleSheet.create({
        background: {
            flex: 1,
        },

        overlay: {
            flex: 1,
            paddingTop: 60,
            backgroundColor:
                "rgba(0,0,0,0.35)",
        },

        header: {
            fontSize: 38,
            fontWeight: "800",
            color: "#fff",
            paddingHorizontal: 20,
            marginBottom: 20,
        },

        card: {
            backgroundColor:
                "#fff",
            marginHorizontal: 20,
            marginBottom: 20,
            borderRadius: 22,
            overflow: "hidden",

            shadowColor:
                "#000",

            shadowOffset: {
                width: 0,
                height: 4,
            },

            shadowOpacity:
                0.12,

            shadowRadius: 10,

            elevation: 5,
        },

        image: {
            width: "100%",
            height: 240,
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
            marginBottom: 10,
        },

        description: {
            fontSize: 16,
            color: "#666",
            lineHeight: 24,
        },

        empty: {
            flex: 1,
            justifyContent:
                "center",
            alignItems:
                "center",
        },

        emptyTitle: {
            fontSize: 30,
            fontWeight: "700",
            color: "#fff",
            marginBottom: 10,
        },

        emptyText: {
            fontSize: 18,
            color: "#ddd",
        },
    });