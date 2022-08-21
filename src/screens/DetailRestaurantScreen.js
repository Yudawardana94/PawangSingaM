import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, ScrollView, View, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Ionicons'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const {width} = Dimensions.get('screen')

export default function DetailRestaurantScreen(props) {
  const [detailData, setData] = useState(null)

  useEffect(() => {
    if(props?.route?.params) setData(props.route.params)
  },[])

  const onbackPressed = () => {
    props.navigation.goBack()
  }

  const onSocmedPressed = () => {
    console.log("onSocmedPressed")
  }
  
  const onOpenMaps = () => console.log("oepn maps")

  return (
    <View>
      <Pressable onPress={onbackPressed} style={{
        position: 'absolute',
        top: 48,
        left: 16,
        zIndex: 99
      }}>
        <Icon name={"arrow-back"} size={30} color={"white"}/>
      </Pressable>
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
        <View style={styles.fakeImage}/>
        <Text style={styles.nameTitleStyle}>{detailData?.Name}</Text>
        <View style={[styles.keyBox, styles.shadowProp]} onPress={onOpenMaps}>
          <View style={styles.floatingMapButton}>
            <Icon name={"map"} size={30} color={"white"}/>
          </View>
          <Text style={styles.title}>Address</Text>
          <Text>{detailData?.Address}</Text>
        </View>
        <View style={[styles.keyBox, styles.shadowProp]}>
          <Text style={styles.title}>Type</Text>
          <View style={{
            flexDirection: 'row'
          }}>
            {
              ["Caffee",...detailData?.Type].map(type => {
                return (
                  <View style={{
                    backgroundColor: "crimson",
                    padding: 4,
                    paddingHorizontal: 8,
                    marginRight: 6,
                    borderRadius: 4,
                  }}>
                    <Text style={{
                      color: "white",
                      textTransform: "capitalize"
                    }}>{type}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>
        <View style={[styles.keyBox, styles.shadowProp]}>
          <Text style={styles.title}>Notes</Text>
          <Text>{JSON.stringify(detailData?.Notes)}</Text>
        </View>
        <View style={[styles.keyBox, styles.shadowProp]}>
          <Text style={styles.title}>Review</Text>
          <Text>{JSON.stringify(detailData?.Reviews)}</Text>
        </View>
        <View style={[styles.keyBox, styles.shadowProp]}>
          <Text style={styles.title}>Menu</Text>
          <Text>{JSON.stringify(detailData?.Menu)}</Text>
        </View>
        <View style={[styles.keyBox, styles.shadowProp]}>
          <Text style={styles.title}>SocialMedia</Text>
          <View style={{flexDirection: 'row'}}>
            <Pressable style={styles.socialMediaBox} onPress={onSocmedPressed}>
              <Icon name={"logo-instagram"} size={20} color={"orange"}/>
            </Pressable>
            <Pressable style={styles.socialMediaBox} onPress={onSocmedPressed}>
              <Icon name={"logo-facebook"} size={20} color={"orange"}/>
            </Pressable>
            <Pressable style={styles.socialMediaBox} onPress={onSocmedPressed}>
              <Icon name={"logo-twitter"} size={20} color={"orange"}/>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  fakeImage: {backgroundColor: "purple", position:'absolute', top: 0, zIndex: 20, width, height: 250, opacity: 0.5},
  keyBox: {
    marginTop: 12, 
    padding: 8, 
    backgroundColor: "white", 
    flex: 1,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  floatingMapButton: {
    position: 'absolute', 
    right: 10,
    top: -40, 
    zIndex: 19,
    backgroundColor: 'black', 
    width: 50, 
    height: 50,
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 8, 
    borderRadius: 50,
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
    textTransform: 'capitalize'
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
  }
})