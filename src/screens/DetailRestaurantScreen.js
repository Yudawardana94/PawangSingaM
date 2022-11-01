import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, Dimensions, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Ionicons'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const { width } = Dimensions.get('screen')

export default function DetailRestaurantScreen(props) {
  const socialMediaList = ["instagram", "facebook", "twitter"]
  const [detailData, setData] = useState(null)

  useEffect(() => {
    if (props?.route?.params) setData(props.route.params)
  }, [])

  const onBackPressed = () => props.navigation.goBack()

  const onSocmedPressed = (socmed) => {
    console.log("onSocmedPressed" + socmed)
  }

  const onMapsOpen = () => {
    console.log("open maps")
  }

  const onNavigate = (destination) => {
    console.log('masuk sinii', destination)
    props.navigation.navigate(destination)
  }

  if (!detailData) {
    return (
      <View>
        <Text>No data...</Text>
      </View>
    )
  }
  const BackButton = () => {
    return (
      <Pressable onPress={onBackPressed} style={styles.backButton}>
        <Icon name={"arrow-back"} size={30} color={"white"} />
      </Pressable>
    )
  }
  return (
    <View>
      <BackButton />
      <ScrollView>
        <FastImage
          style={{
            width: width,
            height: 250,
          }}
          source={{
            uri: detailData?.Photos[0],
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.fakeImage} />
        <Text style={styles.nameTitleStyle}>{detailData?.Name}</Text>
        <View style={[styles.keyBox, styles.shadowProp, styles.addressBox]}>
          <View style={styles.addressDetail}>
            <Text style={styles.title}>Address</Text>
            <Text style={styles.addressText}>{detailData?.Address}</Text>
          </View>
          <Pressable style={styles.floatingMapButton} onPress={onMapsOpen}>
            <Icon name={"map"} size={30} color={"white"} />
          </Pressable>
        </View>
        <View style={[styles.keyBox, styles.shadowProp]}>
          <Text style={styles.title}>Type</Text>
          <View style={{
            flexDirection: 'row'
          }}>
            {
              detailData?.Type.map(type => {
                return (
                  <View style={styles.typeWrapper}>
                    <Text style={styles.typeText}>{type}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>
        <View style={[styles.keyBox, styles.shadowProp]}>
          <Text style={styles.title}>Notes</Text>
          <Text>{detailData?.Notes}</Text>
        </View>
        <TouchableOpacity style={[styles.keyBox, styles.shadowProp]} onPress={() => onNavigate("reviews")}>
          <Text style={styles.title}>Review</Text>
          <Text>{detailData?.Reviews}</Text>
        </TouchableOpacity>
        <View style={[styles.keyBox, styles.shadowProp]}>
          <Text style={styles.title}>Menu</Text>
          <Text>{detailData?.Menu}</Text>
        </View>
        <View style={[styles.keyBox, styles.shadowProp]}>
          <Text style={styles.title}>SocialMedia</Text>
          <View style={{ flexDirection: 'row' }}>
            {
              socialMediaList.map(socmed => {
                return <Pressable style={styles.socialMediaBox} onPress={() => onSocmedPressed(socmed)}>
                  <Icon name={`logo-${socmed}`} size={20} color={"orange"} />
                </Pressable>
              })
            }
          </View>
        </View>
      </ScrollView >
    </View >
  )
}

const styles = StyleSheet.create({
  fakeImage: { backgroundColor: "purple", position: 'absolute', top: 0, zIndex: 20, width, height: 250, opacity: 0.5 },
  keyBox: {
    marginTop: 12,
    padding: 8,
    backgroundColor: "white",
    flex: 1,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  nameTitleStyle: {
    position: 'absolute',
    top: 220,
    left: 12,
    zIndex: 30,
    fontWeight: "bold",
    color: "purple",
    fontSize: 18,
    textTransform: 'capitalize'
  },
  title: {
    zIndex: 30,
    fontWeight: "bold",
    color: "black",
    fontSize: 18,
    textTransform: 'capitalize',
    marginBottom: 4,
  },

  // Address Section
  addressBox: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressDetail: {
    flex: 1,
  },
  addressText: {
    flexWrap: 'wrap',
    fontSize: 12,
  },
  floatingMapButton: {
    zIndex: 19,
    width: 50,
    height: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginHorizontal: 4
  },

  // Type Detail Section
  typeWrapper: {
    backgroundColor: "violet",
    padding: 4,
    paddingHorizontal: 8,
    marginRight: 6,
    borderRadius: 4,
  },
  typeText: {
    color: "white",
    textTransform: "capitalize",
    fontSize: 12,
    fontWeight: "600"
  },

  socialMediaBox: {
    backgroundColor: "beige",
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 8,
    marginRight: 8,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    zIndex: 99
  }
})