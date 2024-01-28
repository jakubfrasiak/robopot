import { primaryTheme } from '@/config/themes/primary';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Button, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Plant } from '../../../server/types';

export default function Home() {
	const [data, setData] = useState([]);
	const havePots = true;

	const fetchPots = async () => {
		console.log(`wynik:`);
		try {
			const QUERY = await (await fetch('http://192.168.1.134:5000/plants')).json();
			console.log(QUERY.data);
			setData(QUERY.data);
		} catch (error) {
			console.log('jest błąd o nie!');
			console.error(error);
		}
	};
	useEffect(() => {
		fetchPots();
	}, []);

	function shortenString(inputString: string, maxLength: number = 150): string {
		if (inputString.length > maxLength) {
			const truncatedString = inputString.substr(0, maxLength);
			const lastSpaceIndex = truncatedString.lastIndexOf(' ');

			if (lastSpaceIndex !== -1) {
				return truncatedString.substr(0, lastSpaceIndex) + '...';
			} else {
				// If no space found, truncate without breaking a word
				return truncatedString + '...';
			}
		} else {
			return inputString;
		}
	}

	{
		return havePots ? (
			<ScrollView style={{ flex: 1, backgroundColor: primaryTheme.colors.primary }}>
				<View style={styles.container}>
					<Text style={styles.category}>Poznaj nowe doniczki</Text>

					{data.map((plant: Plant, plantIndex: number) => {
						return (
							<ImageBackground
								key={plantIndex}
								source={{ uri: plant.image }}
								resizeMode='cover'
								imageStyle={{ borderRadius: 12 }}
								style={{ marginBottom: 20 }}>
								<LinearGradient colors={['#2A3E84BF', '#2A3E8480']} style={{ borderRadius: 12 }}>
									<View style={styles.card}>
										<Text style={styles.title}>{plant.name}</Text>
										<Text style={styles.description}>{shortenString(plant.description)}</Text>
									</View>
								</LinearGradient>
							</ImageBackground>
						);
					})}
					<Text>Hehka!</Text>
				</View>
			</ScrollView>
		) : (
			<View>
				<Text>Nie masz żadnych doniczek!</Text>
				<Button title='dodaj doniczke'></Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: { marginLeft: 25, marginRight: 25, marginBottom: 20 },
	category: { fontSize: 36, color: primaryTheme.colors.white, fontWeight: '600', paddingBottom: 20 },
	title: { fontSize: 24, color: primaryTheme.colors.white, textTransform: 'capitalize', fontWeight: '600' },
	description: { color: primaryTheme.colors.white, fontSize: 14 },
	card: { paddingHorizontal: 30, height: 350, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' },
});
