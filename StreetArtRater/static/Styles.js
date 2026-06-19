// StreetArtRater/styles.js
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    // HomeScreen styles
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        padding: 30,
        backgroundColor: "rgba(0,0,0,0.45)",
    },
    title: {
        fontSize: 48,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#ddd",
        marginBottom: 60,
    },
    logout: {
        marginTop: 40,
        alignItems: "center",
    },
    logoutText: {
        color: "#fff",
        fontSize: 18,
    },

    // DetailScreen styles
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    image: {
        width: "100%",
        height: 320,
    },
    content: {
        padding: 20,
    },
    rating: {
        fontSize: 24,
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 18,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
    },
    heading: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: "#555",
        lineHeight: 24,
    },
    deleteButton: {
        backgroundColor: "#D62828",
        padding: 18,
        borderRadius: 16,
        alignItems: "center",
        marginTop: 10,
    },
    deleteText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 18,
    },
});