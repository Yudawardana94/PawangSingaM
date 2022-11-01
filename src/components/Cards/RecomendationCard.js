import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { colors } from '../../config/globalValue'

export default function RecomendationCard({ data, navigation }) {
    const [isWL, setWL] = useState(false);

    const onNavigateScreen = () => navigation.navigate("DetailRestaurant", data)

    const BookmarkButton = () => {
        return <Pressable
            onPress={() => setWL(!isWL)}  // #TODO: ekstract to external function
            style={{
                alignSelf: 'flex-start',
                marginTop: 6,
                marginRight: 8,
            }}
            hitSlop={{
                top: 16,
                bottom: 16,
                right: 8,
                left: 20,
            }}
        >
            <Icon name={isWL ? "bookmark" : "bookmark-o"} size={18} />
        </Pressable>
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Today's recommendation</Text>
            <Pressable
                style={styles.recommended}
                onPress={onNavigateScreen}>
                <View style={styles.recContentWrapper}>
                    <View style={styles.reccomendationImage} />
                    <View style={styles.recContentText}>
                        <Text>{data?.Name}</Text>
                        <View style={styles.typeWrapper}>
                            {
                                [data?.Type, "apakah", "semua", "telah", 'berakhir', 'sudahhh', 'dan', 'membuatku', 'menjadi'].map((type, idx) => {
                                    return idx <= 4 ? <View style={styles.randomResType} key={Math.random()}>
                                        <Text style={{
                                            fontSize: 12,
                                            textTransform: 'capitalize'
                                        }}>{type}</Text>
                                    </View> : null
                                })
                            }
                        </View>
                    </View>
                    <BookmarkButton />
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 8
    },
    recommended: {
        backgroundColor: colors.card,
        borderRadius: 4,
        minHeight: 64,
        marginVertical: 8,
        overflow: "hidden"
    },
    recContentWrapper: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    recContentText: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1
    },
    randomResType: {
        textTransform: "capitalize",
        padding: 2,
        paddingHorizontal: 4,
        borderRadius: 3,
        marginRight: 4,
        marginTop: 4,
        backgroundColor: "lightgray",
    },
    reccomendationImage: {
        height: 108,
        width: 80,
        // borderTopLeftRadius: 4,
        // borderBottomLeftRadius: 4,
        backgroundColor: "lightgrey",
        marginRight: 12
    },
    typeWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    // Text
    title: {
        textAlign: 'left',
        fontWeight: "600",
        textTransform: "capitalize"
    },
})