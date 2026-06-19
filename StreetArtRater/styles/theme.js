import { StyleSheet } from "react-native";

export const colors = {
    background: "#1E1E1E",      // Mørk beton
    surface: "#2A2A2A",         // Kort og bokse
    accent: "#ff6600",          // Orange spray
    text: "#F5E6D3",            // Beige tekst
    subText: "#B0B0B0",         // Grå tekst
    white: "#FFFFFF",
    black: "#000000",
    border: "#3A3A3A",
    star: "#FFD700",
};

export const theme = StyleSheet.create({
    // Generel container
    container: {
        flex: 1,
        padding: 16,
    },

    // Kort
    card: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 16,
        marginBottom: 20,

        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },

    // Overskrift
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: colors.text,
    },

    // Almindelig tekst
    text: {
        fontSize: 16,
        color: colors.text,
    },

    // Sekundær tekst
    subText: {
        fontSize: 14,
        color: colors.subText,
    },

    // Orange knap
    button: {
        backgroundColor: colors.accent,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: "center",
    },

    buttonText: {
        color: colors.white,
        fontWeight: "700",
        fontSize: 16,
    },

    // Input felter
    input: {
        backgroundColor: colors.surface,
        color: colors.text,
        padding: 16,
        borderRadius: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: colors.border,
    },

    // Billeder
    image: {
        width: "100%",
        borderRadius: 20,
    },

    // Floating knapper
    floatingButton: {
        backgroundColor: colors.accent,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",

        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
});