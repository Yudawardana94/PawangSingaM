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
    console.log("onbackPressed")
    props.navigation.goBack()
  }

  const onSocmedPressed = () => {
    console.log("onSocmedPressed")
  }

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
        <View style={{backgroundColor: "black", position:'absolute', top: 0, zIndex: 20, width, height: 250, opacity: 0.5}}/>
        <Text style={{
          position: 'absolute',
          top: 220,
          left: 12,
          zIndex: 30,
          fontWeight: "bold",
          color: "white",
          fontSize: 18,
          textTransform: 'capitalize'
        }}>{detailData.Name}</Text>
        {/* <Text>{JSON.stringify(Object.keys(detailData.SocialMedia))}</Text> */}
        <View style={{marginTop: 12, padding: 8, backgroundColor: "aquamarine", flex: 1}}>
          <View style={{
            position: 'absolute', 
            right: 10,
            top: -20, 
            zIndex: 19, 
            backgroundColor: 'black', 
            width: 50, 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: 8, 
            borderRadius: 50,
            opacity: 1,
          }}>
            <Icon name={"map"} size={30} color={"white"}/>
          </View>
          <Text>Address</Text>
          <Text>{detailData?.Address}</Text>
        </View>
        <View style={{marginTop: 12, padding: 8, backgroundColor: "teal", flex: 1}}>
          <Text>SocialMedia</Text>
          <View style={{flexDirection: 'row'}}>
            <Pressable style={{
              backgroundColor: "beige",
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              marginTop: 8,
              marginRight: 8,
            }} onPress={onSocmedPressed}>
              <Icon name={"logo-instagram"} size={30} color={"orange"}/>
            </Pressable>
            <Pressable style={{
              backgroundColor: "beige",
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              marginTop: 8,
              marginRight: 8,
            }} onPress={onSocmedPressed}>
              <Icon name={"logo-facebook"} size={30} color={"orange"}/>
            </Pressable>
            <Pressable style={{
              backgroundColor: "beige",
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              marginTop: 8,
              marginRight: 8,
            }} onPress={onSocmedPressed}>
              <Icon name={"logo-twitter"} size={30} color={"orange"}/>
            </Pressable>
          </View>
        </View>
        <View style={{marginTop: 12, padding: 8, backgroundColor: "teal", flex: 1}}>
          <Text>Type</Text>
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
        <View style={{marginTop: 12, padding: 8, backgroundColor: "beige", flex: 1}}>
          <Text>Notes</Text>
          <Text>{JSON.stringify(detailData?.Notes)}</Text>
        </View>
        <View style={{marginTop: 12, padding: 8, backgroundColor: "aquamarine", flex: 1}}>
          <Text>Review</Text>
          <Text>{JSON.stringify(detailData?.Reviews)}</Text>
        </View>
        <View style={{marginTop: 12, padding: 8, backgroundColor: "tomato", flex: 1}}>
          <Text>Menu</Text>
          <Text>{JSON.stringify(detailData?.Menu)}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})