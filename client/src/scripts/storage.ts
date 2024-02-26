import { getItemAsync, deleteItemAsync, setItemAsync } from 'expo-secure-store';

export const saveInStorage = async (key: string, value: string) => {
	return await setItemAsync(key, value);
};

export const readFromStorage = async (key: string) => {
	return await getItemAsync(key);
};

export const removeFromStorage = async (key: string) => {
	return await deleteItemAsync(key);
};
