import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Plant } from '../../../server/types';
import { primaryTheme } from '@/config/themes/primary';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function PlantDetails({ id }: { id: string }) {
	const [plant, setPlant] = useState<Plant | null>(null);
	const router = useRouter();

	const fetchPlant = async () => {
		try {
			const QUERY = await (await fetch(`http://192.168.1.134:5000/plants/${id}`)).json();
			setPlant(QUERY.data);
		} catch (error) {
			console.log('jest błąd o nie!');
			console.error(error);
		}
	};
	useEffect(() => {
		fetchPlant();
	}, []);

	if (plant) {
		const { airHumidity, airTemperature, lightAvailable, pH, soilMoisture, waterAvailable } = plant;
		return (
			<>
				<StatusBar translucent={true} />
				<View style={{ flex: 1, backgroundColor: primaryTheme.colors.primary }}>
					<ImageBackground
						source={{ uri: plant.image }}
						resizeMethod='auto'
						resizeMode='cover'
						imageStyle={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
						style={{ marginBottom: 20 }}>
						<LinearGradient colors={['#2A3E84BF', '#2A3E8480']} style={{ borderRadius: 12 }}>
							<View style={{ paddingVertical: 100, paddingHorizontal: 20 }}>
								<Text style={{ fontSize: 24, color: primaryTheme.colors.white, textTransform: 'capitalize', fontWeight: '600' }}>
									{plant.name}
								</Text>
								<Text style={{ fontSize: 14, color: primaryTheme.colors.white }}>{plant.description}</Text>
							</View>
						</LinearGradient>
					</ImageBackground>
					<View style={{ marginHorizontal: 20, display: 'flex', rowGap: 20 }}>
						<Button title='Powrót' onPress={() => router.replace(`/plants/[id]`)} />
						<View>
							<View style={styles.cell}>
								<View style={styles.row}>
									<Text style={styles.header}>Informacja</Text>
									<Text style={styles.header}>Oczekiwana</Text>
								</View>
								<View style={styles.divider} />
							</View>
							<View style={styles.cell}>
								<View style={styles.row}>
									<Text style={styles.table}>pH gleby:</Text>
									<Text style={styles.table}>{pH}</Text>
								</View>
								<View style={styles.divider} />
							</View>
							<View style={styles.cell}>
								<View style={styles.row}>
									<Text style={styles.table}>Wilgotność gleby:</Text>
									<Text style={styles.table}>{soilMoisture}%</Text>
								</View>
								<View style={styles.divider} />
							</View>
							<View style={styles.cell}>
								<View style={styles.row}>
									<Text style={styles.table}>Wilgotność powietrza:</Text>
									<Text style={styles.table}>{airHumidity}%</Text>
								</View>
								<View style={styles.divider} />
							</View>
							<View style={styles.cell}>
								<View style={styles.row}>
									<Text style={styles.table}>Temperatura powietrza:</Text>
									<Text style={styles.table}>{airTemperature}°C</Text>
								</View>
								<View style={styles.divider} />
							</View>

							<View style={styles.cell}>
								<View style={styles.row}>
									<Text style={styles.table}>Dostępność światła:</Text>
									<Text style={styles.table}>{lightAvailable}%</Text>
								</View>
								<View style={styles.divider} />
							</View>

							<View style={styles.cell}>
								<View style={styles.row}>
									<Text style={styles.table}>Dostępność wody:</Text>
									<Text style={styles.table}>{['Brak', 'Mała', 'Świetna'][waterAvailable]}</Text>
								</View>
								<View style={styles.divider} />
							</View>
						</View>
					</View>
				</View>
			</>
		);
	} else {
		<Text style={{ fontSize: 32, color: primaryTheme.colors.white }}>Nie ma takiej rośliny</Text>;
	}
}

const styles = StyleSheet.create({
	table: { color: primaryTheme.colors.white, fontSize: 16, fontWeight: '600' },
	header: { color: primaryTheme.colors.white, fontSize: 16, fontWeight: '600' },
	row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
	divider: { backgroundColor: primaryTheme.colors.white, height: 1, marginVertical: 15 },
	cell: { display: 'flex' },
});
