import React from "react";

import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { signOut } from "firebase/auth";

import { auth } from "../firebase";

export default function HomeScreen({
                                       navigation,
                                   }) {

    return (

        <ImageBackground
            source={{
                uri:
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmetroselskabet.euwest01.umbraco.io%2Fmedia%2Fvbkn5uue%2Fnordvest-daniel-rasmussen.jpg%3Fwidth%3D1200%26height%3D600&f=1&nofb=1&ipt=23f0cb9aeb45993a140a492a588491fadc0bc750c4bbd641f3c9009827eba359",
            }}

            style={styles.background}
        >

            <View style={styles.overlay}>

                <Text style={styles.title}>
                    World wide street art
                </Text>

                <Text style={styles.subtitle}>
                    Explore and rate street art from around the world
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate(
                            "AddArt"
                        )
                    }
                >
                    <Text style={styles.buttonText}>
                        Add
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate(
                            "List"
                        )
                    }
                >
                    <Text style={styles.buttonText}>
                        List of street art
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate(
                            "MyStreetArt"
                        )
                    }
                >
                    <Text style={styles.buttonText}>
                        My Street Art
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate(
                            "TopRated"
                        )
                    }
                >
                    <Text style={styles.buttonText}>
                        Highest rated
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.logout}
                    onPress={() =>
                        signOut(auth)
                    }
                >
                    <Text style={styles.logoutText}>
                        Log out
                    </Text>
                </TouchableOpacity>

            </View>

        </ImageBackground>

    );

}

const styles =
    StyleSheet.create({

        background:{
            flex:1
        },

        overlay:{
            flex:1,

            backgroundColor:
                "rgba(0,0,0,0.45)",

            justifyContent:
                "center",

            padding:30
        },

        title:{
            fontSize:48,

            fontWeight:"800",

            color:"#fff",

            marginBottom:10
        },

        subtitle:{
            fontSize:18,

            color:"#ddd",

            marginBottom:60
        },

        button:{
            backgroundColor:
                "rgba(255,255,255,0.15)",

            padding:22,

            borderRadius:18,

            marginBottom:18,

            borderWidth:1,

            borderColor:
                "rgba(255,255,255,0.2)"
        },

        buttonText:{
            fontSize:20,

            color:"#fff",

            fontWeight:"700",

            textAlign:"center"
        },

        logout:{
            marginTop:40,

            alignItems:"center"
        },

        logoutText:{
            color:"#fff",

            fontSize:18
        }

    });