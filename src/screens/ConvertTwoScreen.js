import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Asset, Font } from 'expo';
import { render } from 'react-dom';

export default class ConvertTwoScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			fontLoaded: false,
			multiplier: 2,
			input: ''
		};
	}

	async componentDidMount() {
		await Font.loadAsync({
			'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
			'Montserrat-BoldItalic': require('../../assets/fonts/Montserrat-BoldItalic.otf')
		});

		this.setState({ fontLoaded: true });
	}
	render() {
		//const [ multiplier, setMultiplier ] = useState('2');
		//const [ input, setInput ] = useState('');
		return (
			<View style={{ backgroundColor: '#FBEAF4' }}>
				<Text style={styles.title}>RECIPE SCALER</Text>
				<Text style={styles.subtitleOne}>Multiplier</Text>
				<TextInput
					keyboardType="numeric"
					value={multiplier}
					onChangeText={(newValue) => this.setState({ input: newValue })}
					style={styles.numberInput}
				/>
				<Text style={styles.subtitleTwo}>Ingredients</Text>
				<Text style={styles.smallPrint}>One per line</Text>
				<ScrollView style={styles.recipeBox}>
					<TextInput
						placeholder="ex. 1/2 cup sugar"
						style={{ marginLeft: 10 }}
						multiline={true}
						value={input}
						onChangeText={(newValue) => this.setState({ input: newValue })}
					/>
				</ScrollView>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Result', { multiplier: this.multiplier, input: this.input });
					}}
				>
					<Text style={styles.convertButton}>CONVERT</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

/*
const ConvertTwoScreen = ({ navigation }) => {
	const [ multiplier, setMultiplier ] = useState('2');
	const [ input, setInput ] = useState('');

	return (
		<View style={{ backgroundColor: '#FBEAF4' }}>
			<Text style={styles.title}>RECIPE SCALER</Text>
			<Text style={styles.subtitleOne}>Multiplier</Text>
			<TextInput
				keyboardType="numeric"
				value={multiplier}
				onChangeText={(newValue) => setMultiplier(newValue)}
				style={styles.numberInput}
			/>
			<Text style={styles.subtitleTwo}>Ingredients</Text>
			<Text style={styles.smallPrint}>One per line</Text>
			<ScrollView style={styles.recipeBox}>
				<TextInput
					placeholder="ex. 1/2 cup sugar"
					style={{ marginLeft: 10 }}
					multiline={true}
					value={input}
					onChangeText={(newValue) => setInput(newValue)}
				/>
			</ScrollView>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Result', { multiplier: multiplier, input: input });
				}}
			>
				<Text style={styles.convertButton}>CONVERT</Text>
			</TouchableOpacity>
		</View>
	);
};*/

const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold',
		fontSize: 30,
		margin: 10,
		color: '#0502E3',
		fontFamily: 'Montserrat-BoldItalic'
		//letterSpacing: 1
	},
	subtitleOne: {
		fontWeight: 'bold',
		fontSize: 20,
		marginLeft: 10,
		marginBottom: 5
	},
	subtitleTwo: {
		fontWeight: 'bold',
		fontSize: 20,
		marginLeft: 10
	},
	numberInput: {
		marginLeft: 10,
		fontSize: 18,
		marginBottom: 10
	},
	smallPrint: {
		marginLeft: 10,
		fontSize: 16
	},
	recipeBox: {
		borderColor: 'black',
		borderWidth: 1,
		marginTop: 15
	},
	convertButton: {
		fontWeight: 'bold',
		fontSize: 28,
		alignSelf: 'center',
		marginTop: 10
	}
});

//export default ConvertTwoScreen;
