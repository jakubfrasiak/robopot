import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Plant } from '../../../server/types';
import { theme } from '@/config/themes/primary';
import { LinearGradient } from 'expo-linear-gradient';
import { setStringAsync } from 'expo-clipboard';
type PotDetailsProps = {
	name: string;
	closeModal: () => void;
};

export default function PotPreview(props: PotDetailsProps) {
	const [plant, setPlant] = useState<Plant | null>(null);

	const copyToClipboard = async (text: string) => {
		await setStringAsync(text);
	};

	const fetchPlant = async () => {
		try {
			const QUERY = await (await fetch(`http://212.106.130.122:5000/plants/${props.name}`)).json();
			setPlant(QUERY.data);
		} catch (error) {
			console.log('jest błąd o nie!');
			console.error(error);
		}
	};

	useEffect(() => {
		fetchPlant();
	}, [props.name]);

	if (plant) {
		return (
			<ScrollView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
				<ImageBackground
					source={{ uri: plant.image }}
					resizeMethod='auto'
					resizeMode='cover'
					imageStyle={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
					style={{ marginBottom: 20 }}>
					<LinearGradient colors={['#2A3E84BF', '#2A3E8480']} style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
						<Text style={styles['arrow']} onPress={() => props.closeModal()}>
							Powrót
						</Text>
						<View style={{ paddingVertical: 100, paddingHorizontal: 20 }}>
							<Text
								style={{ fontSize: 24, color: theme.colors.white, textTransform: 'capitalize', fontWeight: '600' }}
								onPress={() => copyToClipboard(plant.name)}>
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
								<Text style={styles.header}>Oczekiwania</Text>
							</View>
							<View style={styles.divider} />
						</View>
						<View style={styles.cell}>
							<View style={styles.row}>
								<Text style={styles.table}>Wilgotność powietrza:</Text>
								<Text style={styles.table}>{plant.airHumidity}%</Text>
							</View>
							<View style={styles.divider} />
						</View>
						<View style={styles.cell}>
							<View style={styles.row}>
								<Text style={styles.table}>Temperatura powietrza:</Text>
								<Text style={styles.table}>{plant.airTemperature}°C</Text>
							</View>
							<View style={styles.divider} />
						</View>
						<View style={styles.cell}>
							<View style={styles.row}>
								<Text style={styles.table}>Wilgotność gleby:</Text>
								<Text style={styles.table}>{plant.soilMoisture}%</Text>
							</View>
							<View style={styles.divider} />
						</View>
						<View style={styles.cell}>
							<View style={styles.row}>
								<Text style={styles.table}>Dostępność światła:</Text>
								<Text style={styles.table}>{plant.lightAvailable}%</Text>
							</View>
							<View style={styles.divider} />
						</View>
					</View>
				</View>
			</ScrollView>
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
	arrow: {
		position: 'absolute',
		top: 20,
		left: 20,
		backgroundColor: 'white',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 12,
	},
});
