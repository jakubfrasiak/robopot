import React, { useEffect, useState } from 'react';
import { Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useBluetooth from '@/bluetooth/useBluetooth';
import DeviceList from '@/bluetooth/deviceModal';
import { theme } from '@/config/themes/primary';
import { fetchPotsFromDevices } from '@/scripts/fetchPots';
import PotDetails from '@/components/PotDetails';
import { fixName } from '@/scripts/fixName';

const App = () => {
	const {
		requestPermissions,
		startDiscovery,
		allDevices,
		connectedDevice,
		discovering,
		connectToDevice,
		disconnectFromDevice,
		deviceData,
		getConnectedDevices,
	} = useBluetooth();

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	const [temperature, setTemperature] = useState<number | any>(0);
	const [airHumidity, setAirHumidity] = useState<number | any>(0);
	const [waterLevel, setWaterLevel] = useState<number | any>(0);
	const [soilMoisture, setSoilMoisture] = useState<number | any>(0);
	const [lightAvailable, SetLightAvailable] = useState<number | any>(0);

	useEffect(() => {
		if (deviceData) {
			console.log('odebrałem dane!');
			const splited = deviceData.split(' ');
			setAirHumidity(splited[0]);
			setTemperature(splited[1]);
			setWaterLevel(splited[2]);
			setSoilMoisture(splited[3]);
			SetLightAvailable(splited[4]);
		}
	}, [deviceData]);

	const scanForDevices = async () => {
		getConnectedDevices();
		const isPermissionsEnabled = await requestPermissions();
		if (isPermissionsEnabled) {
			startDiscovery();
		}
	};

	const closeModal = () => {
		setIsModalVisible(false);
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	return (
		<>
			<StatusBar barStyle={'light-content'} translucent={true} backgroundColor={theme.colors.primary} />
			<View style={styles.container}>
				<Text>{discovering ? 'Skanowanie...' : ''}</Text>
				<View style={styles.heartRateTitleWrapper}>
					{connectedDevice ? (
						<>
							<Text style={styles.heartRateTitleText}>Połączono z:</Text>
							<Text style={styles.heartRateText}>{connectedDevice.name}</Text>
						</>
					) : (
						<Text style={styles.heartRateTitleText}>Podłącz się do swojej doniczki!</Text>
					)}
				</View>
				<Modal style={styles['modalContainer']} animationType='slide' transparent={false} visible={isModalVisible}>
					{connectedDevice ? (
						<PotDetails
							id={fixName(connectedDevice?.address)}
							airHumidity={airHumidity}
							temperature={temperature}
							soilMoisture={soilMoisture}
							waterLevel={waterLevel}
							lightAvailable={lightAvailable}
							closeModal={closeModal}
							deviceAdress={connectedDevice.address}
						/>
					) : (
						<Text>Coś poszło nie tak!</Text>
					)}
					{/* <TouchableOpacity
						style={styles.ctaButton}
						onPress={() => {
							console.log(deviceData.current);
						}}>
						<Text style={styles.ctaButtonText}>{text}</Text>
					</TouchableOpacity> */}
				</Modal>
				<DeviceList
					devices={fetchPotsFromDevices(allDevices)}
					connect={connectToDevice}
					closeModal={closeModal}
					showModal={showModal}
					visible={isModalVisible}
				/>
				<TouchableOpacity
					disabled={discovering ? true : false}
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
					<Text style={styles.ctaButtonText}>{connectedDevice ? 'Rozłącz' : discovering ? 'Skanowanie...' : 'Znajdź Doniczki'}</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: theme.colors.primary },
	heartRateTitleWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	heartRateTitleText: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginHorizontal: 20, color: 'white' },
	heartRateText: { color: 'white', fontSize: 25, marginTop: 15 },
	modalContainer: { flex: 1, backgroundColor: theme.colors.primary },
	ctaButton: {
		backgroundColor: theme.colors.secondary,
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		marginHorizontal: 20,
		marginBottom: 20,
		borderRadius: 12,
	},
	ctaButtonA: {
		position: 'absolute',
		bottom: 1,
		backgroundColor: theme.colors.secondary,
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		marginHorizontal: 20,
		marginBottom: 20,
		borderRadius: 12,
		width: 'auto',
	},
	ctaButtonText: { fontSize: 18, fontWeight: 'bold', color: 'white' },
});

export default App;
