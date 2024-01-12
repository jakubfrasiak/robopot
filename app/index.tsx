import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.paragraph}>Save an item, and grab it later!</Text>
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
