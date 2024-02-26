import { useEffect, useState } from 'react';
import { Button, Image, ImageBackground, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { Plant } from '../../../server/types';
import { theme } from '@/config/themes/primary';
import { LinearGradient } from 'expo-linear-gradient';
import { readFromStorage, removeFromStorage, saveInStorage } from '@/scripts/storage';
import { rateConditions } from '@/scripts/rateConditions';
import { BluetoothDevice } from 'react-native-bluetooth-classic';
import { fixName } from '@/scripts/fixName';

type PotDetailsProps = {
	id: string;
	soilMoisture: number;
	airHumidity: number;
	temperature: number;
	waterLevel: number;
	lightAvailable: number;
	closeModal: () => void;
	deviceAdress: string;
};

export default function PotDetails(props: PotDetailsProps) {
	const [plant, setPlant] = useState<Plant | null>(null);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [textInputValue, setTextInputValue] = useState<string>('');

	const fetchPlant = async () => {
		// await removeFromStorage(id);
		// await saveInStorage(id, 'strelicja');
		const plantName = await readFromStorage(props.id);
		if (!plantName) {
			setPlant(null);
		} else {
			try {
				const QUERY = await (await fetch(`http://192.168.1.134:5000/plants/${plantName}`)).json();
				setPlant(QUERY.data);
			} catch (error) {
				console.log('jest błąd o nie!');
				console.error(error);
			}
		}
	};

	useEffect(() => {
		fetchPlant();
	}, [props.id]);

	if (plant) {
		return (
			<>
				<StatusBar barStyle={'light-content'} translucent backgroundColor={'#00000000'} />
				<ScrollView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
					<ImageBackground
						source={{ uri: plant.image }}
						resizeMethod='auto'
						resizeMode='cover'
						imageStyle={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
						style={{ marginBottom: 20 }}>
						{isModalVisible ? (
							<Modal animationType='slide' visible={isModalVisible}>
								<View
									style={{
										flex: 1,
										backgroundColor: theme.colors.primary,
										paddingHorizontal: 25,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
										<TextInput placeholder='Nazwa' onChangeText={(value) => setTextInputValue(value)} />
										<Text style={styles['outlinedButton']} onPress={() => setIsModalVisible(false)}>
											Anuluj
										</Text>
										<Text
											style={styles['containedButton']}
											onPress={() => {
												saveInStorage(fixName(props.deviceAdress), textInputValue);
												setIsModalVisible(false);
											}}>
											Zmień Roślinę
										</Text>
									</View>
								</View>
							</Modal>
						) : (
							<></>
						)}
						<LinearGradient colors={['#2A3E84BF', '#2A3E8480']} style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
							<Text style={styles['arrowLeft']} onPress={() => props.closeModal()}>
								Powrót
							</Text>
							<Text style={styles['arrowRight']} onPress={() => setIsModalVisible(true)}>
								Edytuj
							</Text>
							<View style={{ paddingVertical: 100, paddingHorizontal: 20 }}>
								<Text style={{ fontSize: 24, color: theme.colors.white, textTransform: 'capitalize', fontWeight: '600' }}>
									{plant.name}
								</Text>
								<Text style={{ fontSize: 14, color: theme.colors.white }}>{plant.description}</Text>
							</View>
						</LinearGradient>
					</ImageBackground>

					<View style={{ marginHorizontal: 20, display: 'flex', rowGap: 20 }}>
						<View>
							<View style={styles.cell}>
								<View style={styles.row}>
									<Text style={styles.header}>Informacja</Text>
									<Text style={styles.header}>Odczyt</Text>
								</View>
								<View style={styles.divider} />
							</View>
							<View style={styles.cell}>
								<View style={styles.row}>
									<Text style={styles.table}>Wilgotność powietrza:</Text>
									<Text style={styles.table}>{props.airHumidity}%</Text>
								</View>
								<View style={styles.divider} />
							</View>
							<View style={styles.cell}>
								<View style={styles.row}>
									<Text style={styles.table}>Temperatura powietrza:</Text>
									<Text style={styles.table}>{props.temperature}°C</Text>
								</View>
								<View style={styles.divider} />
							</View>
							<View style={styles.cell}>
								<View style={styles.row}>
									<Text style={styles.table}>Dostępność wody:</Text>
									<Text style={styles.table}>{props.waterLevel}</Text>
								</View>
								<View style={styles.divider} />
							</View>
							<View style={styles.cell}>
								<View style={styles.row}>
									<Text style={styles.table}>Wilgotność gleby:</Text>
									<Text style={styles.table}>{props.soilMoisture}%</Text>
								</View>
								<View style={styles.divider} />
							</View>
							<View style={styles.cell}>
								<View style={styles.row}>
									<Text style={styles.table}>Dostępność światła:</Text>
									<Text style={styles.table}>{props.lightAvailable}%</Text>
								</View>
								<View style={styles.divider} />
							</View>
						</View>
					</View>
					<View style={styles['ratingContainer']}>
						<Text style={styles['header']}>Ogólna ocena rośliny:</Text>
						<Text style={styles['rating']}>
							{rateConditions({
								airHumidity: props.airHumidity,
								lightAvailable: props.lightAvailable,
								soilMoisture: props.soilMoisture,
								temperature: props.temperature,
								correctAirHumidity: plant.airHumidity,
								correctSoilMoisture: plant.soilMoisture,
								correctTemperature: plant.airTemperature,
								correctLightAvailable: plant.lightAvailable,
							})}
						</Text>
					</View>
				</ScrollView>
			</>
		);
	} else {
		return (
			<ScrollView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
				<Text>Wczytywanie...</Text>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	table: { color: theme.colors.white, fontSize: 16, fontWeight: '600' },
	header: { color: theme.colors.white, fontSize: 16, fontWeight: '600' },
	row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
	divider: { backgroundColor: theme.colors.white, height: 1, marginVertical: 15 },
	cell: { display: 'flex' },
	rating: { color: theme.colors.white, fontSize: 40, fontWeight: '600' },
	ratingContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
	arrowLeft: {
		position: 'absolute',
		top: 20,
		left: 20,
		backgroundColor: 'white',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 12,
	},
	arrowRight: {
		color: 'white',
		position: 'absolute',
		top: 20,
		right: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 12,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'white',
	},
	outlinedButton: {
		color: 'white',
		paddingVertical: 10,
		paddingHorizontal: 85,
		borderRadius: 12,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'white',
		textAlign: 'center',
		alignSelf: 'stretch',
		marginBottom: 20,
	},
	containedButton: {
		backgroundColor: 'white',
		paddingVertical: 10,
		paddingHorizontal: 85,
		borderRadius: 12,
		textAlign: 'center',
		alignSelf: 'stretch',
	},
});
