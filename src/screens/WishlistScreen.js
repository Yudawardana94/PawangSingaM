import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';

const WishlistScreen = (props) => {
  useEffect(() => {
    // Get User Wishlist
  }, [])
  const addNewWishlist = () => {
    console.log("addNewWishlist")
  }

  const onNavigateScreen = (route) => {
    props.navigation.navigate(route)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      {/* // Container */}
      <View>
        {/*  Header */}
        <View style={styles.header}>
          <Text>My Whistlit</Text>
          <TouchableOpacity onPress={() => onNavigateScreen('addWishlist')}>
            <Text>Add new Wishlist</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "slateblue",
    flex: 1,
    padding: 16
  },
  header: {
    backgroundColor: "beige",
    minHeight: 24,
    paddingVertical: 6,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
})

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistScreen)