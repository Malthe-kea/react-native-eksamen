import { StyleSheet } from "react-native";

export const colors = {
    background: "#1E1E1E", // Mørk beton
    surface: "#2A2A2A", // Kort og bokse
    accent: "#ff6600", // Orange spray
    text: "#F5E6D3", // Beige tekst
    subText: "#B0B0B0", // Grå tekst
    white: "#FFFFFF",
    black: "#000000",
    border: "#3A3A3A",
    star: "#FFD700",
};

export const styles = StyleSheet.create({
    // Containers
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },

    centeredContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
        padding: 20,
    },

    overlay: {
        flex: 1,
        justifyContent: "center",
        padding: 30,
        backgroundColor: "rgba(255,255,255,0.1)",
    },

    // Cards
    card: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 18,
        marginBottom: 20,

        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },

    // Titles
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: colors.text,

        textShadowColor: "rgba(0,0,0,0.8)",
        textShadowOffset: {
            width: 1,
            height: 1,
        },
    },

    subTitle: {
        fontSize: 22,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 10,
    },

    // Text
    text: {
        fontSize: 16,
        color: colors.text,
    },

    subText: {
        fontSize: 14,
        color: colors.subText,
    },

    // Buttons
    button: {
        backgroundColor: colors.accent,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "700",
    },

    secondaryButton: {
        backgroundColor: colors.surface,
        borderWidth: 2,
        borderColor: colors.accent,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    secondaryButtonText: {
        color: colors.accent,
        fontSize: 16,
        fontWeight: "700",
    },

    // Inputs
    input: {
        backgroundColor: colors.surface,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 15,
        padding: 16,
        marginBottom: 15,
    },

    // Images
    image: {
        width: "100%",
        borderRadius: 20,
    },

    profileImage: {
        width: 140,
        height: 140,
        borderRadius: 70,
        alignSelf: "center",
    },

    // Floating Button
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

    // Layout helpers
    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    center: {
        justifyContent: "center",
        alignItems: "center",
    },

    // Separators
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 15,
    },

    // Ratings
    star: {
        color: colors.star,
        fontSize: 22,
    },

    // Margin helpers
    marginTop: {
        marginTop: 20,
    },

    marginBottom: {
        marginBottom: 20,
    },
});