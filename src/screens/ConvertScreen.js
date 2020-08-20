import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'

const ConvertScreen = ({ navigation }) => {
  const [multiplier, setMultiplier] = useState('')
  const [input, setInput] = useState('')

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <View style={{ backgroundColor: '#FBEAF4', flex: 1 }}>
        <View style={{ marginTop: 100 }} />
        <Text style={styles.title}>RECIPE SCALER</Text>
        <View style={styles.backgroundBox} />
        <View style={styles.mainBox}>
          <Text style={styles.subtitleOne}>multiplier</Text>
          <TextInput
            keyboardType='numeric'
            value={multiplier}
            onChangeText={newValue => setMultiplier(newValue)}
            style={styles.numberInput}
            placeholder='2'
          />
          <View
            style={{
              backgroundColor: '#FFA2C3',
              height: 2,
              width: 290,
              alignSelf: 'center'
            }}
          />
          <Text style={styles.subtitleTwo}>ingredients</Text>
          <Text style={styles.smallPrint}>One per line</Text>
          <ScrollView
            style={styles.recipeBox}
            alwaysBounceVertical={false}
            keyboardDismissMode={'on-drag'}
          >
            <TextInput
              placeholder='ex. 1/2 cup sugar'
              style={{ marginLeft: 7, fontSize: 16 }}
              multiline={true}
              value={input}
              onChangeText={newValue => setInput(newValue)}
            />
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Result', {
              multiplier: multiplier,
              input: input
            })
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              width: 200,
              height: 50,
              alignSelf: 'center',
              marginTop: 10,
              borderColor: '#0502E3',
              borderWidth: 3
            }}
          >
            <Text style={styles.convertButton}>CONVERT</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 36,
    margin: 10,
    color: '#0502E3',
    fontFamily: 'Montserrat-BoldItalic',
    textAlign: 'center',
    marginTop: 0
    //letterSpacing: 1
  },
  mainBox: {
    width: 328,
    height: 500,
    backgroundColor: 'white',
    borderColor: '#0502E3',
    borderWidth: 3,
    marginTop: 160,
    marginLeft: 30,
    position: 'absolute'
  },
  backgroundBox: {
    width: 328,
    height: 500,
    backgroundColor: '#0502E3',
    marginLeft: 20,
    marginTop: 17
  },
  subtitleOne: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
    color: '#0502E3'
  },
  subtitleTwo: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 15,
    fontFamily: 'Montserrat-Bold',
    color: '#0502E3',
    marginTop: 10
  },
  numberInput: {
    marginLeft: 17,
    fontSize: 18,
    marginBottom: 10
  },
  smallPrint: {
    marginLeft: 15,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#0502E3'
  },
  recipeBox: {
    marginTop: 5,
    marginLeft: 10
  },
  convertButton: {
    fontWeight: 'bold',
    fontSize: 28,
    alignSelf: 'center',
    color: '#0502E3',
    fontFamily: 'Montserrat-BoldItalic',
    marginTop: 5
  }
})

export default ConvertScreen
