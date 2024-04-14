import React, { useEffect, useState } from 'react';
import { ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '@/config/themes/primary';
import PotPreview from '@/components/PotPreview';
import { LinearGradient } from 'expo-linear-gradient';
import { shortenDescription } from '@/scripts/shortenDescription';
import { Plant } from '../../../server/types';

const App = () => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [data, setData] = useState([]);

	const fetchPots = async () => {
		try {
			const QUERY = await (await fetch('http://212.106.130.122:5000/plants')).json();
			setData(QUERY.data);
		} catch (error) {
			console.log('jest błąd o nie!');
			console.error(error);
		}
	};
	useEffect(() => {
		fetchPots();
	}, []);

	const closeModal = () => {
		setIsModalVisible(false);
	};

	const [currentPlant, selectCurrentPlant] = useState<Plant | null>(null);

	return (
		<>
			<ScrollView style={styles['container']}>
				<View style={styles['plantContainer']}>
					<Text style={styles['category']}>Odkryj nowe, wspaniałe rośliny!</Text>
					{currentPlant ? (
						<Modal style={styles['modalContainer']} animationType='slide' transparent={false} visible={isModalVisible}>
							<PotPreview name={currentPlant.name} closeModal={closeModal} />
						</Modal>
					) : (
						<></>
					)}
					{data.map((plant: Plant, plantIndex: number) => (
						<TouchableOpacity
							key={plantIndex}
							onPress={() => {
								selectCurrentPlant(plant);
								setIsModalVisible(true);
							}}>
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
		</>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: theme.colors.primary },
	modalContainer: { flex: 1, backgroundColor: theme.colors.primary },
	plantContainer: { marginLeft: 25, marginRight: 25, marginBottom: 20, marginTop: 20 },
	category: { fontSize: 36, color: theme.colors.white, fontWeight: '600', paddingBottom: 20, marginTop: 25 },
	title: { fontSize: 24, color: theme.colors.white, textTransform: 'capitalize', fontWeight: '600' },
	description: { color: theme.colors.white, fontSize: 14 },
	card: { paddingHorizontal: 30, height: 350, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' },
});

export default App;
