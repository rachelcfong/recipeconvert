import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
	return (
		<View>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Convert');
				}}
			>
				<Text style={styles.title}>Convert</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		textAlign: 'center'
	}
});

export default HomeScreen;
