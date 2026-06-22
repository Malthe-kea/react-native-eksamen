import React, { useEffect, useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { colors } from "../styles/styles";

export default function MapScreen({ navigation }) {
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

    return (
        <ImageBackground
            source={require("../static/pics/WP1.png")}
            style={localStyles.background}
        >
            <View style={localStyles.overlay}>
                <MapView
                    style={localStyles.map}
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
                        >
                            <Callout
                                tooltip
                                onPress={() =>
                                    navigation.navigate("Detail", {
                                        art,
                                    })
                                }
                            >
                                <TouchableOpacity
                                    style={localStyles.callout}
                                    activeOpacity={0.9}
                                >
                                    <Image
                                        source={{ uri: art.imageUrl }}
                                        style={localStyles.calloutImage}
                                    />

                                    <Text
                                        numberOfLines={1}
                                        style={localStyles.calloutTitle}
                                    >
                                        {art.title}
                                    </Text>
                                </TouchableOpacity>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
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
    },

    map: {
        flex: 1,
    },

    callout: {
        width: 160,
        backgroundColor: colors.surface,
        borderRadius: 18,
        overflow: "hidden",

        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },

    calloutImage: {
        width: "100%",
        height: 100,
    },

    calloutTitle: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "700",
        padding: 10,

        textShadowColor: "rgba(0,0,0,0.8)",
        textShadowOffset: {
            width: 1,
            height: 1,
        },
    },
});