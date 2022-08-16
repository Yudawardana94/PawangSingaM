import { Button, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Modal from "react-native-modal";
import React from 'react'

const PlainModalWIthCloseButton = (props) => {
    const {
        modalVisible,
        toggleModal,
        data
    } = props
    console.log(props, "---props")
  return (
    <Modal isVisible={modalVisible}>
        <View style={styles.modalContainer}>
            <View style={styles.textWrapper}>
                <Text style={styles.title}>The Randomizer result is here !!!</Text>
                <Text style={styles.message}>may be you shoud go to {'\n'}{data?.winner}</Text>
            </View>


          <Button title="Open Restaurant Info" />
          <TouchableOpacity style={styles.closeIcon} onPress={toggleModal}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 4,
        padding: '5%',
        minHeight: '20%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textWrapper: {
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: "700",
        marginBottom: 12
    },
    message: {
        textAlign: 'center'
    },
    button: {},
    closeIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
    }
})

export default PlainModalWIthCloseButton