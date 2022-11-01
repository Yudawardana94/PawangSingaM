import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import RestaurantCard from '../Cards/RestaurantCard'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const RestaurantCardList = ({ data, navigation }) => {
  const onNavigateScreen = (restaurantData) => navigation.navigate("DetailRestaurant", restaurantData)
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>Restaurant list</Text>
      {
        data.map(restaurant => {
          return <Pressable onPress={() => onNavigateScreen(restaurant)}>
            <RestaurantCard data={restaurant} />
          </Pressable>
        })
      }
    </View>
  )
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    marginVertical: 8,
  },
  // Text
  title: {
    textAlign: 'left',
    fontWeight: "600",
    textTransform: "capitalize",
  },
})

export default RestaurantCardList