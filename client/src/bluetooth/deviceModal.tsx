import { theme } from '@/config/themes/primary';
import { fixName } from '@/scripts/fixName';
import { readFromStorage } from '@/scripts/storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, ImageBackground, View, Modal } from 'react-native';
import { BluetoothDevice } from 'react-native-bluetooth-classic';

type DeviceButtonProps = {
	device: BluetoothDevice;
	connect: (device: BluetoothDevice) => void;
	closeModal: () => void;
	showModal: () => void;
};

const DeviceButton = (props: DeviceButtonProps) => {
	const connect = useCallback(() => {
		console.log(`połączono z`);
		console.log(JSON.stringify(props.device.name, null, 4));

		props.connect(props.device);
	}, [props.connect, props.device]);

	const router = useRouter();
	const [plant, setPlant] = useState(null);

	const fetchPots = async () => {
		try {
			const plantId = await readFromStorage(fixName(props.device.id));
			if (!plantId) {
				setPlant(null);
			} else {
				const QUERY = await (await fetch(`http://192.168.1.134:5000/plants/${plantId}`)).json();
				setPlant(QUERY.data);
			}
		} catch (error) {
			console.log('jest błąd o nie!');
			console.error(error);
		}
	};
	useEffect(() => {
		fetchPots();
	}, []);
	return plant ? (
		<TouchableOpacity
			onPress={() => {
				connect();
				props.showModal();
			}}>
			<ImageBackground
				id={plant._id.toString()}
				source={{ uri: plant.image }}
				resizeMode='cover'
				imageStyle={{ borderRadius: 12 }}
				style={{ marginBottom: 20, marginHorizontal: 20, height: 150 }}>
				<LinearGradient colors={['#2A3E84BF', '#2A3E8480']} style={{ borderRadius: 12 }}>
					<View style={styles.card}>
						<Text style={styles.title}>{props.device.name}</Text>
						<Text style={styles.description}>{plant.name}</Text>
					</View>
				</LinearGradient>
			</ImageBackground>
		</TouchableOpacity>
	) : (
		<TouchableOpacity
			onPress={() => {
				connect();
				router.push({ pathname: '/pots/[id]', params: { id: fixName(props.device.id) } });
			}}>
			<LinearGradient colors={['#4E5983', '#4E5983']} style={{ borderRadius: 12, marginBottom: 20, marginHorizontal: 20, height: 150 }}>
				<View style={styles.card}>
					<Text style={styles.title}>{props.device.name}</Text>
					<Text style={styles.description}>Ustaw Roślinę</Text>
				</View>
			</LinearGradient>
		</TouchableOpacity>
	);
};

type DeviceListProps = {
	devices: BluetoothDevice[];
	visible: boolean;
	closeModal: () => void;
	showModal: () => void;
	connect: (device: BluetoothDevice) => void;
};

export default function DeviceList(props: DeviceListProps) {
	return props.devices.map((device, deviceIndex) => {
		return <DeviceButton closeModal={props.closeModal} showModal={props.showModal} key={deviceIndex} connect={props.connect} device={device} />;
	});
}

const styles = StyleSheet.create({
	container: { marginLeft: 25, marginRight: 25, marginBottom: 20 },
	category: { fontSize: 36, color: theme.colors.white, fontWeight: '600', paddingBottom: 20 },
	title: { fontSize: 24, color: theme.colors.white, fontWeight: '600' },
	description: { color: theme.colors.white, fontSize: 18 },
	card: { paddingHorizontal: 30, height: 150, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' },
	modalFlatlistContiner: { flex: 1, justifyContent: 'center' },
	modalCellOutline: { borderWidth: 1, borderColor: 'white', alignItems: 'center', marginHorizontal: 20, paddingVertical: 15, borderRadius: 8 },
	modalTitle: { flex: 1, backgroundColor: '#f2f2f2' },
	modalTitleText: { marginTop: 40, fontSize: 30, fontWeight: 'bold', marginHorizontal: 20, textAlign: 'center' },
	ctaButton: { backgroundColor: theme.colors.secondary, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, borderRadius: 12 },
	ctaButtonText: { fontSize: 18, fontWeight: 'bold', color: 'white' },
});
