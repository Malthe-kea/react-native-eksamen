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

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { colors } from "../styles/styles";

export default function ListScreen({ navigation }) {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "streetart"),
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    randomHeight: [180, 220, 260, 320][Math.floor(Math.random() * 4)],
                }));

                setArtworks(data);
            }
        );

        return unsubscribe;
    }, []);

    function openDetail(art) {
        navigation.navigate("Detail", { art });
    }

    function renderItem({ item }) {
        return (
            <TouchableOpacity
                style={[
                    localStyles.card,
                    { height: item.randomHeight }
                ]}
                onPress={() => openDetail(item)}
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
                <FlatList
                    data={artworks}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={localStyles.row}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={localStyles.list}
                />
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

    titleOverlay: {
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: "rgba(0,0,0,0.4)",
        paddingHorizontal: 8,
        paddingVertical: 4,
    },

    title: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "600",
    },
});