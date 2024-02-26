import RNBluetoothClassic, {
	BluetoothDevice,
	BluetoothDeviceReadEvent,
	BluetoothError,
	BluetoothEventSubscription,
} from 'react-native-bluetooth-classic';

/* eslint-disable no-bitwise */
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
// import { BleManager, Device } from 'react-native-ble-plx';

import * as ExpoDevice from 'expo-device';

interface BluetoothLowEnergyApi {
	requestPermissions(): Promise<boolean>;
	startDiscovery(): void;
	connectToDevice: (device: BluetoothDevice) => Promise<void>;
	disconnectFromDevice: (deviceAdress: string) => void;
	writeDataToDevice: (device: BluetoothDevice, data: string | Buffer) => Promise<void>;
	readDataFromDevice: (device: BluetoothDevice) => void;
	getConnectedDevices: () => Promise<BluetoothDevice[]>;
	connection: BluetoothEventSubscription | null;
	deviceData: string | null;
	discovering: boolean;
	connectedDevice: BluetoothDevice | null;
	allDevices: BluetoothDevice[];
}

function useBluetooth(): BluetoothLowEnergyApi {
	const [allDevices, setAllDevices] = useState<BluetoothDevice[]>([]);
	const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
	const [discovering, setDiscovering] = useState<boolean>(false);
	const [deviceData, setDeviceData] = useState<string | null>(null);

	const [connection, setConnection] = useState<BluetoothEventSubscription | null>(null);
	const requestAndroid31Permissions = async () => {
		const bluetoothScanPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN, {
			title: 'Location Permission',
			message: 'Bluetooth Low Energy requires Location',
			buttonPositive: 'OK',
		});
		const bluetoothConnectPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT, {
			title: 'Location Permission',
			message: 'Bluetooth Low Energy requires Location',
			buttonPositive: 'OK',
		});
		const fineLocationPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
			title: 'Location Permission',
			message: 'Bluetooth Low Energy requires Location',
			buttonPositive: 'OK',
		});

		return bluetoothScanPermission === 'granted' && bluetoothConnectPermission === 'granted' && fineLocationPermission === 'granted';
	};

	const requestPermissions = async () => {
		if (Platform.OS === 'android') {
			if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
				const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
					title: 'Location Permission',
					message: 'Bluetooth Low Energy requires Location',
					buttonPositive: 'OK',
				});
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} else {
				const isAndroid31PermissionsGranted = await requestAndroid31Permissions();

				return isAndroid31PermissionsGranted;
			}
		} else {
			return true;
		}
	};
	const getConnectedDevices = async () => {
		return await RNBluetoothClassic.getConnectedDevices();
	};

	const startDiscovery = async () => {
		setAllDevices([]);
		setDiscovering(true);
		const alreadyConnected = await getConnectedDevices();
		setAllDevices(alreadyConnected);
		const unpaired = await RNBluetoothClassic.startDiscovery();
		setDiscovering(false);
		setAllDevices(alreadyConnected.concat(unpaired));
		console.log(JSON.stringify(unpaired, null, 4));
	};

	const connectToDevice = async (device: BluetoothDevice) => {
		try {
			const deviceConnection = await RNBluetoothClassic.connectToDevice(device.address);
			setConnectedDevice(deviceConnection);
			readDataFromDevice(device);
		} catch (error) {
			console.log('Coś poszło nie tak podczas próby połączenia', error);
		}
	};

	const disconnectFromDevice = async (deviceAdress: string) => {
		try {
			await RNBluetoothClassic.disconnectFromDevice(deviceAdress);
			setConnectedDevice(null);
			connection?.remove();
			setConnection(null);
			console.log('rozłączono urzadzenie');
		} catch (error) {
			console.log('Coś poszło nie tak podczas próby rozłączenia', error);
		}
	};

	const writeDataToDevice = async (device: BluetoothDevice, data: string | Buffer) => {
		try {
			const wyslane = await device.write(data, 'base64');
			console.log(data);
			console.log(wyslane);
		} catch (error) {
			console.log('Coś poszło nie tak podczas próby wysyłania danych', error);
		}
	};

	const readDataFromDevice = (device: BluetoothDevice): void => {
		try {
			// clear previous connection
			if (connection) {
				connection.remove();
				setConnection(null);
			}

			const newConnection = device.onDataReceived(async (receivedData) => onEvent(receivedData));
			setConnection(newConnection);
		} catch (error) {
			console.log('Coś poszło nie tak podczas próby otrzymywania danych', error);
		}
	};

	const onEvent = (event: BluetoothDeviceReadEvent) => {
		setDeviceData(event.data);
	};
	return {
		deviceData,
		allDevices,
		discovering,
		connectedDevice,
		connection,
		startDiscovery,
		requestPermissions,
		connectToDevice,
		disconnectFromDevice,
		getConnectedDevices,
		writeDataToDevice,
		readDataFromDevice,
	};
}

export default useBluetooth;
