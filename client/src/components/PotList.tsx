import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '@/config/themes/primary';
import useBluetooth from '@/bluetooth/useBluetooth';
export default function PotList() {
	const { requestPermissions, startDiscovery, allDevices, connectedDevice, disconnectFromDevice } = useBluetooth();

	console.log('list');
	console.log(allDevices);

	const scanForDevices = async () => {
		const isPermissionsEnabled = await requestPermissions();
		if (isPermissionsEnabled) {
			startDiscovery();
		}
	};

	return (
		<ScrollView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
			<TouchableOpacity
				onPress={
					connectedDevice
						? () => {
								disconnectFromDevice(connectedDevice.address);
						  }
						: () => {
								scanForDevices();
						  }
				}
				style={styles.ctaButton}>
				<Text style={styles.ctaButtonText}>{connectedDevice ? 'Rozłącz' : 'Rozpocznij skanowanie'}</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	container: { marginLeft: 25, marginRight: 25, marginBottom: 20 },
	category: { fontSize: 36, color: theme.colors.white, fontWeight: '600', paddingBottom: 20 },
	title: { fontSize: 24, color: theme.colors.white, textTransform: 'capitalize', fontWeight: '600' },
	description: { color: theme.colors.white, fontSize: 14 },
	ctaButton: { backgroundColor: theme.colors.secondary, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, borderRadius: 12 },
	card: { paddingHorizontal: 30, height: 350, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' },
	heartRateTitleWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	heartRateTitleText: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginHorizontal: 20, color: 'black' },
	heartRateText: { fontSize: 25, marginTop: 15 },
	ctaButtonText: { fontSize: 18, fontWeight: 'bold', color: 'white' },
});
