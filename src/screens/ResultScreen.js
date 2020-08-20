import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'

const ResultScreen = ({ navigation }) => {
  const multiplier = navigation.getParam('multiplier')
  const input = navigation.getParam('input')
  const recipe = getMultipliedRecipe(input, multiplier)

  return (
    <View style={{ backgroundColor: '#FBEAF4', flex: 1 }}>
      <View style={{ marginTop: 100 }}>
        <Text style={styles.title}>RECIPE SCALER</Text>
        <View style={styles.backgroundBox} />
        <View style={styles.mainBox}>
          <Text style={styles.subtitleOne}>multiplier</Text>
          <Text style={styles.numberInput}>{multiplier}</Text>
          <View
            style={{
              backgroundColor: '#FFA2C3',
              height: 2,
              width: 290,
              alignSelf: 'center'
            }}
          />
          <Text style={styles.subtitleTwo}>ingredients</Text>
          <ScrollView style={styles.recipeBox} alwaysBounceVertical={false}>
            {renderArray(recipe)}
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Convert')
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
            <Text style={styles.convertButton}>GO BACK</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

//INPUT: Array of strings, each string is one recipeLine
const renderArray = recipeArray => {
  return recipeArray.map((line, i) => {
    return (
      <View key={i}>
        <Text style={{ marginLeft: 7, fontSize: 16 }}>{line}</Text>
      </View>
    )
  })
}

const getMultipliedQuantity = (recipeLine, multiplier) => {
  if (recipeLine === '') {
    return ''
  } else {
    const firstCharIndex = recipeLine.match('[a-zA-Z]').index
    let quantity = recipeLine.substring(0, firstCharIndex - 1)
    console.log(`quantity within getMultipliedQuantity: ${quantity}`)
    if (quantity.includes(' ')) {
      let splitOne = quantity.split(' ')
      let splitTwo = splitOne[1].split('/')
      quantity =
        (parseInt(splitOne[0], 10) +
          parseInt(splitTwo[0], 10) / parseInt(splitTwo[1], 10)) *
        multiplier
    } else if (quantity.includes('/')) {
      let splitOne = quantity.split('/')
      quantity =
        (parseInt(splitOne[0], 10) / parseInt(splitOne[1], 10)) * multiplier
      console.log(`quantity after split and divide: ${quantity}`)
    } else {
      quantity = parseInt(quantity, 10) * multiplier
    }

    if (!isNaN(quantity) && quantity % 1 != 0) {
      console.log(`Rounding this quantiy: ${quantity}`)
      return roundQuantity(quantity)
    } else {
      return quantity
    }
  }
}

const getIngredient = recipeLine => {
  if (recipeLine !== '') {
    const firstCharIndex = recipeLine.match('[a-zA-Z]').index
    return recipeLine.substring(firstCharIndex, recipeLine.length)
  } else {
    return ''
  }
}

const roundQuantity = quantity => {
  let remainder = quantity % 1
  let fract = 0
  switch (true) {
    case remainder > 0 && remainder <= 0.25:
      fract = '1/4'
      break
    case remainder > 0.25 && remainder <= 0.35:
      fract = '1/3'
      break
    case remainder > 1 / 3 && remainder <= 0.5:
      fract = '1/2'
      break
    case remainder > 0.5 && remainder <= 0.69:
      fract = '2/3'
      break
    case remainder > 2 / 3 && remainder <= 0.75:
      fract = '3/4'
      break
    case remainder > 0.75:
      fract = '1'
      break
    default:
      break
  }
  if (Math.floor(quantity) === 0) {
    console.log(`returning this fract: ${fract}`)
    return `${fract}`
  } else if (fract === '1') {
    return `${Math.floor(quantity) + 1}`
  } else {
    return `${Math.floor(quantity)} ${fract}`
  }
}

//INPUT: original recipe as a string
//OUTPUT: array of recipe lines with each line multiplied by multiplier
const getMultipliedRecipe = (input, multiplier) => {
  if (input) {
    let recipeAsArray = input.split('\n')
    let quantity, ingredient
    for (let i = 0; i < recipeAsArray.length; i++) {
      quantity = getMultipliedQuantity(recipeAsArray[i], multiplier)
      ingredient = getIngredient(recipeAsArray[i])

      if (isNaN(parseInt(recipeAsArray[i].charAt(0)), 10)) {
        recipeAsArray[i] = ingredient
      } else {
        recipeAsArray[i] = quantity + ' ' + ingredient
      }
    }
    return recipeAsArray
  } else {
    return []
  }
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
    marginTop: 60,
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
    marginTop: 10,
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

export default ResultScreen
