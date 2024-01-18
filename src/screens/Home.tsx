import { Button, Text, View } from 'react-native';
import { MainStackParamsList } from 'types';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function Home({ navigation }: NativeStackScreenProps<MainStackParamsList>) {
	return (
		<View>
			<Text>SIEMANKOOOOOO TUTAJ HOME</Text>
			<Button
				title='Doniczki?'
				onPress={() => {
					navigation.navigate('Pots');
				}}></Button>
		</View>
	);
}
