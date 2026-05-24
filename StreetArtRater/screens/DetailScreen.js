import React from "react";

import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from "react-native";

import {
    doc,
    deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase";

export default function DetailScreen({
                                         route,
                                         navigation,
                                     }) {

    const { art } =
        route.params;

    function stars(rating) {
        const rounded =
            Math.round(
                rating || 0
            );

        return (
            "★".repeat(rounded) +
            "☆".repeat(
                5 - rounded
            )
        );
    }

    async function deleteArt() {

        try {

            await deleteDoc(
                doc(
                    db,
                    "streetart",
                    art.id
                )
            );

            Alert.alert(
                "Deleted",
                "Street art deleted successfully"
            );

            navigation.navigate(
                "Home"
            );

        } catch (error) {

            Alert.alert(
                "Error",
                error.message
            );

        }

    }

    return (

        <ScrollView
            style={styles.container}
        >

            <Image
                source={{
                    uri:
                    art.imageUrl,
                }}
                style={styles.image}
            />

            <View
                style={styles.content}
            >

                <Text
                    style={styles.title}
                >
                    {art.title}
                </Text>

                <Text
                    style={styles.rating}
                >
                    {stars(
                        art.averageRating
                    )}
                    {" "}
                    {(art.averageRating || 0)
                        .toFixed(1)}
                    /5
                </Text>

                <View
                    style={styles.card}
                >

                    <Text
                        style={styles.heading}
                    >
                        Description
                    </Text>

                    <Text
                        style={styles.text}
                    >
                        {art.description}
                    </Text>

                </View>

                <View
                    style={styles.card}
                >

                    <Text
                        style={styles.heading}
                    >
                        Added by
                    </Text>

                    <Text
                        style={styles.text}
                    >
                        {
                            art.createdBy ||
                            "Unknown"
                        }
                    </Text>

                </View>

                <View
                    style={styles.card}
                >

                    <Text
                        style={styles.heading}
                    >
                        Location
                    </Text>

                    <Text
                        style={styles.text}
                    >
                        Latitude:
                        {" "}
                        {art.latitude}
                    </Text>

                    <Text
                        style={styles.text}
                    >
                        Longitude:
                        {" "}
                        {art.longitude}
                    </Text>

                </View>

                <TouchableOpacity
                    style={
                        styles.deleteButton
                    }
                    onPress={
                        deleteArt
                    }
                >

                    <Text
                        style={
                            styles.deleteText
                        }
                    >
                        Delete art
                    </Text>

                </TouchableOpacity>

            </View>

        </ScrollView>

    );

}

const styles =
    StyleSheet.create({

        container:{
            flex:1,
            backgroundColor:"#F5F5F5"
        },

        image:{
            width:"100%",
            height:320
        },

        content:{
            padding:20
        },

        title:{
            fontSize:30,
            fontWeight:"700",
            marginBottom:10
        },

        rating:{
            fontSize:24,
            marginBottom:20
        },

        card:{
            backgroundColor:"#fff",

            borderRadius:18,

            padding:18,

            marginBottom:16,

            shadowColor:"#000",

            shadowOffset:{
                width:0,
                height:4
            },

            shadowOpacity:0.08,

            shadowRadius:10,

            elevation:3
        },

        heading:{
            fontSize:18,

            fontWeight:"700",

            marginBottom:10
        },

        text:{
            fontSize:16,

            color:"#555",

            lineHeight:24
        },

        deleteButton:{
            backgroundColor:"#D62828",

            padding:18,

            borderRadius:16,

            alignItems:"center",

            marginTop:10
        },

        deleteText:{
            color:"#fff",

            fontWeight:"700",

            fontSize:18
        }

    });