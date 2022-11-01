import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'

import Icon from 'react-native-vector-icons/Fontisto'
import { ScrollView } from 'react-native-gesture-handler'

const ReviewPage = () => {
    const dummyComment = [{
        Creator: {
            userName: "sayasendiri",
        },
        Restaurant: {
            Name: "Restaurant 1"
        },
        Title: "Judul kata",
        Comment: "makanannya enak",
    }, {
        Creator: {
            userName: "sayasendiri",
        },
        Restaurant: {
            Name: "Restaurant 1"
        },
        Title: "Judul kata",
        Comment: "makanannya enak",
    }, {
        Creator: {
            userName: "sayasendiri",
        },
        Restaurant: {
            Name: "Restaurant 1"
        },
        Title: "Judul kata",
        Comment: "makanannya enak",
    }]
    const [inputCommentShown, setInputCommentShown] = useState(true)
    // Function Section
    const setCommentSectionVisibility = () => setInputCommentShown(status => !status)
    // const onBackPressed = () => props.navigation.goBack()
    // const BackButton = () => {
    //     return (
    //         <Pressable onPress={onBackPressed} style={styles.backButton}>
    //             <Icon name={"arrow-back"} size={30} color={"white"} />
    //         </Pressable>
    //     )
    // }
    const AddReviewComponent = () => {
        return (
            // Add some animation for better interaction or change how to show add comment button
            <View style={[styles.addReviewComp, { paddingTop: inputCommentShown ? 8 : 0 }]}>
                {inputCommentShown && <View>
                    <Text>Add Comment</Text>
                    {/* Title Input -- Optional*/}
                    <TextInput placeholder='Title (optional)' style={[styles.addReviewInputBox, styles.addReviewTitleBox]} />
                    {/* Comment Input -- Required */}
                    <TextInput placeholder='Description (required)' multiline style={[styles.addReviewInputBox, styles.addReviewCommentBox]} />
                </View>}
                {/* Button To Hide And Show input */}
                <Pressable style={styles.hideAndShow} onPress={setCommentSectionVisibility}>
                    <Icon name={inputCommentShown ? "angle-up" : "angle-down"} size={16} color={"black"} />
                </Pressable>
            </View>
        )
    }
    const CommentCard = (props) => {
        return (
            <View style={styles.commentCard}>
                <Text>{props.data.Creator.userName}</Text>
                <Text>{props.data.Title}</Text>
                <Text>{props.data.Comment}</Text>
            </View>
        )
    }
    const AllCommentLists = () => {
        return (
            <View style={styles.commentSection}>
                <ScrollView>
                    {
                        dummyComment.map(comment => {
                            return <CommentCard data={comment} key={comment.comment} />
                        })
                    }
                </ScrollView>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <SafeAreaView />
            {/* <BackButton /> */}
            <AddReviewComponent />
            <AllCommentLists />
        </View>
    )
}

export default ReviewPage

const styles = StyleSheet.create({
    container: {
        // padding: 8,
        // paddingTop: 0
    },
    // backButton: {
    //     position: 'absolute',
    //     top: 48,
    //     left: 16,
    //     zIndex: 99
    // }

    //Add review Section
    addReviewComp: {
        backgroundColor: 'white',
        padding: 8,
        paddingBottom: 0,
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8
    },
    addReviewInputBox: {
        padding: 4,
        marginTop: 8,
        backgroundColor: "lightgray",
        borderRadius: 4,
        borderColor: "darkgray",
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addReviewTitleBox: {
        height: 40,
    },
    addReviewCommentBox: {
        height: 100
    },
    hideSection: {
        height: 0
    },
    hideAndShow: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4
    },

    //Comment Section
    commentSection: {
        padding: 8,
        height: "100%",
        backgroundColor: "lime"
    },
    commentCard: {
        marginVertical: 8,
        padding: 6,
        borderRadius: 4,
        backgroundColor: "lavender"
    }
})