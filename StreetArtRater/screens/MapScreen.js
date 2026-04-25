import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { collection, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";

export default function MapScreen({ navigation }) {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "streetart"), (snapshot) => {
            const list = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setArtworks(list);
        });

        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 55.6761,
                    longitude: 12.5683,
                    latitudeDelta: 0.08,
                    longitudeDelta: 0.08,
                }}
            >
                {artworks.map((art) => (
                    <Marker
                        key={art.id}
                        coordinate={{
                            latitude: art.latitude,
                            longitude: art.longitude,
                        }}
                        title={art.title}
                        description={`${art.rating}/10 stjerner`}
                        onCalloutPress={() => navigation.navigate("Detail", { art })}
                    />
                ))}
            </MapView>

            <View style={styles.buttons}>
                <Button title="Tilføj kunst" onPress={() => navigation.navigate("AddArt")} />
                <Button title="Liste" onPress={() => navigation.navigate("List")} />
                <Button title="Log ud" onPress={() => signOut(auth)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    buttons: {
        position: "absolute",
        bottom: 30,
        left: 20,
        right: 20,
        gap: 8,
    },
});