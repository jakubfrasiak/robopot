import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Plant } from '../../../server/types';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryTheme } from '@/config/themes/primary';
import { Redirect, useNavigation, useRouter } from 'expo-router';
import { shortenDescription } from '@/scripts/shortenDescription';
import { StatusBar } from 'expo-status-bar';

export default function PlantList() {
	const router = useRouter();
	const [data, setData] = useState([]);

	const fetchPots = async () => {
		try {
			const QUERY = await (await fetch('http://192.168.1.134:5000/plants')).json();
			setData(QUERY.data);
		} catch (error) {
			console.log('jest błąd o nie!');
			console.error(error);
		}
	};
	useEffect(() => {
		fetchPots();
	}, []);

	return (
		<ScrollView style={{ flex: 1, backgroundColor: primaryTheme.colors.primary }}>
			<View style={styles.container}>
				<Text style={styles.category}>Discover New Plants</Text>

				{data.map((plant: Plant, plantIndex: number) => (
					<TouchableOpacity onPress={() => router.push({ pathname: '/plants/[id]', params: { id: plant._id } })} key={plantIndex}>
						<ImageBackground
							id={plant._id.toString()}
							source={{ uri: plant.image }}
							resizeMode='cover'
							imageStyle={{ borderRadius: 12 }}
							style={{ marginBottom: 20 }}>
							<LinearGradient colors={['#2A3E84BF', '#2A3E8480']} style={{ borderRadius: 12 }}>
								<View style={styles.card}>
									<Text style={styles.title}>{plant.name}</Text>
									<Text style={styles.description}>{shortenDescription(plant.description)}</Text>
								</View>
							</LinearGradient>
						</ImageBackground>
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	container: { marginLeft: 25, marginRight: 25, marginBottom: 20 },
	category: { fontSize: 36, color: primaryTheme.colors.white, fontWeight: '600', paddingBottom: 20 },
	title: { fontSize: 24, color: primaryTheme.colors.white, textTransform: 'capitalize', fontWeight: '600' },
	description: { color: primaryTheme.colors.white, fontSize: 14 },
	card: { paddingHorizontal: 30, height: 350, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' },
});
