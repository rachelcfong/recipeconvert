import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedbackComponent } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import ConvertScreen from './src/screens/ConvertScreen';
import ResultScreen from './src/screens/ResultScreen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import ConvertTwoScreen from './src/screens/ConvertTwoScreen';

const navigator = createStackNavigator(
	{
		Home: HomeScreen,
		Convert: ConvertScreen,
		ConvertTwo: ConvertTwoScreen,
		Result: ResultScreen
	},
	{
		initialRouteName: 'Convert',
		defaultNavigationOptions: {
			title: '',
			headerTransparent: true
		}
	}
);

const AppContainer = createAppContainer(navigator);

export default class App extends Component {
	state = {
		loaded: false
	};

	_loadFontsAsync = async () => {
		await Font.loadAsync({
			'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
			'Montserrat-BoldItalic': require('./assets/fonts/Montserrat-BoldItalic.otf'),
			'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.otf')
		});
		this.setState({ loaded: true });
	};

	componentDidMount() {
		this._loadFontsAsync();
	}

	render() {
		if (!this.state.loaded) {
			return <AppLoading />;
		}

		return <AppContainer />;
	}
}
