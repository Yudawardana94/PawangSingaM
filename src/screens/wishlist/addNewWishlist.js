import { Button, View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { connect } from "react-redux"
import { TextInput } from 'react-native-gesture-handler'

const addNewWishlist = () => {
    const [newWishlistData, setNewWishlistData] = useState({
        name: "",
        creatorId: "",
        tags: [],
        address: ""
    })
    const [tag, setTag] = useState(null)

    const addTag = () => {
        setTag(null)
        setNewWishlistData(data => {
            const newTags = [...data.tags, tag]
            return {
                ...data,
                tags: newTags
            }
        })
    }
    const changeText = (field, event) => {
        console.log(field, event)
        setNewWishlistData(data => {
            return {
                ...data,
                [field]: event
            }
        })
    }
    const createWishlist = () => {
        console.log("createWishlist")
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text>addNewWishlist</Text>
            <TextInput placeholderTextColor={"white"} placeholder='Input name' style={styles.input} onChangeText={(e) => changeText('name', e)} value={newWishlistData.name} />
            <TextInput placeholderTextColor={"white"} placeholder='Input tag' style={styles.input} onChangeText={setTag} value={tag} onSubmitEditing={addTag} />
            {
                newWishlistData.tags.map(tag => {
                    return (
                        <Text>{tag}</Text>
                    )
                })
            }

            <Button title="Create New Wishlist" onPress={createWishlist} />
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

const styles = StyleSheet.create({
    container: {
        margin: 8,
    },
    input: {
        padding: 12,
        backgroundColor: "tomato",
        marginVertical: 4,
        borderRadius: 4,
        borderColor: "grey",
        borderWidth: 2,
        color: "white"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(addNewWishlist)