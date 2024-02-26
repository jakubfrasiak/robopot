import { BluetoothDevice } from 'react-native-bluetooth-classic';

export const fetchPotsFromDevices = (devices: BluetoothDevice[]): BluetoothDevice[] => {
	return devices.filter((device) => device.id === '98:D3:32:30:BA:F3');
};
