import React, {useEffect, useRef, useState} from 'react'
import { Button, View, ScrollView, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import knoob from '../assets/images/knob.png'

import WheelOfFortune from './Library/WheelOfFortune.js'
import PlainModalWIthCloseButton from'../components/Modal/PlainModalWIthCloseButton'


/**
 * 
 * Notes: 
 * - make dynamic inputs for random restaurants
 * - dynamic inputs not worked yet
 * - use this references https://javascript.plainenglish.io/creating-dynamic-input-fields-in-react-native-514a3e8444fa
 */
const RandomScreen = () => {
  const [itemInput, setItemInput] = useState(''); 
  const [itemPools, setItemPools] = useState([]);
  const [randomResult, setResult] = useState("");
  // const [showResult, setShowResult] = useState(false);
  const [winner, setWinner] = useState(null);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showWheelVisible, setWheelVisible] = useState(true)

  let childRef = useRef(null)
  let textInputRef = useRef(null)

  const participants = [
    '10%',
    '20%',
    '30%',
    '40%',
    '50%',
  ];
  const wheelOptions = {
    rewards: itemPools,
    knobSize: 50,
    borderWidth: 5,
    borderColor: '#000',
    innerRadius: 50,
    duration: 4000,
    backgroundColor: 'transparent',
    textAngle: 'horizontal',
    knobSource: knoob,
    getWinner: (value, index) => {
      setWinner({winnerValue: value, winnerIndex: index})
      setModalData({
        winner: value,
      })
      setModalVisibility(true)
    },
    onRef: ref => childRef = ref
  };

  useEffect(() => {
    setResult("this is result text, changeable to lottie dice")
  }, [])
  const onItemAdded = () => {
    if(itemPools.length >= 5) return false
    if(!itemPools.includes(itemInput) && itemInput !== "") {
      const newPools = [itemInput, ...itemPools]
      setItemPools(newPools)
      setItemInput("")
    } else {
      // tampilkan toast kalau item dengan nama yang sama sudah di tambahkan
      setItemInput("")
    }
    setWheelVisible(false);
    textInputRef.focus();
  }

  const toggleModal = () => setModalVisibility(false)

  const onShuffle = () => {
    setWheelVisible(true);
    childRef.prepareWheel();
    childRef.resetWheelState();
    childRef.angleListener();
    childRef._onPress()
  }

  const onItemRemoved = (position) => {
    const result = [...itemPools]
    result.splice(position, 1)
    setItemPools(result)
  }

  const onReset = () => {
    setItemPools([])
    setItemInput("")
    setResult("this is result text, changeable to lottie dice")
  } 

  const Header = () => {
    return (
      <View style={{
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: "bold",
        }}>Terserah</Text>
        <Text style={{
          textAlign: 'center'
        }}>Bingung mau makan atau nongkrong dimana ?{'\n'} yuk acak pilihanmu disini.</Text>
      </View>
    )
  }

  const Result = () => {
    return <View style={{
      backgroundColor: 'teal',
      padding: 8,
      marginTop: 6,
    }}>
      <Text>{winner?.winnerValue}</Text>
    </View>
  }

  const RandomItem = ({data, position}) => {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 8,
      }}>
        <Text style={{
          textTransform: 'capitalize'
        }}>{data}</Text>
        <TouchableOpacity onPress={() => onItemRemoved(position)}>
          <Icon name="ios-remove-circle-sharp" size={24} color="crimson"/>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header />
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 12,
      }}>
        <TextInput 
          style={{
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "darkgray",
            padding: 4,
            paddingHorizontal: 8,
            width: "90%",
            height: 48,
            marginTop: 6,
          }}
          onChangeText={value => setItemInput(value)}
          // onEndEditing={onItemAdded}
          onSubmitEditing={onItemAdded}
          value={itemInput}
          autoCapitalize={"none"}
          autoCorrect={false}
          editable={itemPools.length < 5}
          ref={ref => textInputRef = ref}
          blurOnSubmit={false}
          placeholder={itemPools.length < 5 ? "Input restaurant name here" : "Maximum option reached"}
        />
        <TouchableOpacity onPress={onItemAdded} style={{paddingTop: 4}}>
          <Icon name="send" size={24} color="blue"/>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onReset} hitSlop={{
        top: 8, bottom: 8
      }} style={{
        marginTop: 4,
      }}>
        <Text>reset</Text>
      </TouchableOpacity>
      <View>
        {itemPools.length > 0 && !showWheelVisible && <ScrollView 
        showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: "tomato",
            marginHorizontal: 8,
            borderRadius: 4,
          }}>
          {
            itemPools.map((item, idx)  => {
              return <RandomItem key={Math.random()} data={item} position={idx}/>
            })
          }
        </ScrollView>}
      </View>
      <TouchableOpacity style={{
        backgroundColor: "steelblue",
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 24,
        marginTop: 12,
        height: 40,
        borderRadius: 8,
      }} onPress={onShuffle}>
        <Text style={{
          fontWeight: 'bold',
          color: "white"
        }}>Shuffle</Text>
      </TouchableOpacity>
      <WheelOfFortune options={wheelOptions} ref={ref => (childRef = ref)}/>
      <PlainModalWIthCloseButton modalVisible={modalVisibility} toggleModal={toggleModal} data={modalData}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 8,
  }
})

export default RandomScreen