import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function RestaurantCard({ data }) {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.title}>{data.Name}</Text>
            <Text style={styles.desc}>{data.Address}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "crimson",
        marginVertical: 4,
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 4
    },
    // Text
    title: {
        color: "white",
        fontWeight: "700",
        fontSize: 15,
    },
    desc: {
        color: "white",
        fontWeight: "400",
        marginTop: 4
    }
})