import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

import { getRestaurants } from '../services/RestaurantService'
import RestaurantCardList from '../components/Lists/RestaurantList'

const RestaurantsScreen = () => {
  const [restaurantsList, setRestaurantList] = useState([])

  useEffect(async () => {
    try {
      const restaurants = await getRestaurants()
      setRestaurantList(restaurants)
    } catch (error) {
      console.log(error, "---error get restaurant on restaurants screen")
    }
  }, [])
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <RestaurantCardList data={restaurantsList} />
      <SafeAreaView />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  }
})

export default RestaurantsScreen