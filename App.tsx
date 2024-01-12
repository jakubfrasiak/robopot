import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

async function save(key: string, value: string) {
	await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
	let result = await SecureStore.getItemAsync(key);
	if (result) {
		alert("🔐 Here's your value 🔐 \n" + result);
	} else {
		alert('No values stored under that key.');
	}
}

export default function App() {
	const [key, onChangeKey] = React.useState('');
	const [value, onChangeValue] = React.useState('');

	return (
		<View style={styles.container}>
			<Text style={styles.paragraph}>Zapisz i odczytaj roślinkę z doniczki!</Text>

			<TextInput
				style={styles.textInput}
				placeholder='Tutaj wpisz ID doniczki (klucz)'
				clearTextOnFocus
				onChangeText={(text) => onChangeKey(text)}
				value={key}
			/>
			<TextInput
				style={styles.textInput}
				placeholder='Tutaj wpisz roślinkę (wartość)'
				clearTextOnFocus
				onChangeText={(text) => onChangeValue(text)}
				value={value}
			/>

			<Button
				title='Zapisz'
				onPress={() => {
					save(key, value);
					onChangeKey('');
					onChangeValue('');
				}}
			/>
			<Text style={styles.paragraph}>🔐 Wpisz ID doniczki do odczytu 🔐</Text>
			<TextInput
				style={styles.textInput}
				onSubmitEditing={async (event) => {
					await getValueFor(event.nativeEvent.text);
				}}
				placeholder='ID doniczki'
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingTop: 10,
		backgroundColor: '#ecf0f1',
		padding: 8,
	},
	paragraph: {
		marginTop: 34,
		margin: 24,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	textInput: {
		height: 35,
		borderColor: 'gray',
		borderWidth: 0.5,
		padding: 4,
	},
});
