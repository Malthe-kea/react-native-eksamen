import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function ListScreen({ navigation }) {
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
            <FlatList
                data={artworks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("Detail", { art: item })}
                    >
                        <Image source={{ uri: item.imageUrl }} style={styles.image} />

                        <View style={styles.textBox}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text>{item.rating}/10 stjerner</Text>
                            <Text numberOfLines={2}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 12 },
    card: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 12,
        padding: 10,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 8,
    },
    textBox: {
        flex: 1,
        marginLeft: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
});