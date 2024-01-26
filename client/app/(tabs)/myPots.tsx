import { primaryTheme } from '@/config/themes/primary';
import axios from 'axios';
import { Query } from 'mongoose';

import { useEffect, useState } from 'react';
import { Button, FlatList, Image, SafeAreaView, StatusBar, Text, View } from 'react-native';

export default function myPots() {
	const [data, setData] = useState([]);
	const havePots = true;

	const fetchPots = async () => {
		console.log(`wynik:`);
		try {
			const QUERY = await (await fetch('http://192.168.1.134:5000/plants')).json();
			console.log(QUERY);
			setData(QUERY.data);
		} catch (error) {
			console.log('jest błąd o nie!');
			console.error(error);
		}
	};
	useEffect(() => {
		fetchPots();
	}, []);

	{
		return havePots ? (
			<SafeAreaView style={{ flex: 1, backgroundColor: primaryTheme.colors.primary }}>
				{data.map((plant) => {
					return (
						<View>
							<Text style={{ fontSize: 32, color: primaryTheme.colors.white }}>{plant.name}</Text>
							<Text style={{ color: primaryTheme.colors.white }}>{plant.description}</Text>
							<Image source={{ uri: plant.image }} width={400} height={300}></Image>
						</View>
					);
				})}
				<Text style={{ color: primaryTheme.colors.white, fontSize: 32 }}>Hej! Oto twoje doniczki: {data.length}</Text>
				<Image
					source={{ uri: 'https://tomaszewski.pl/97515-large_default/sansewieria-laurentii-duza-4.jpg', width: 300, height: 150 }}></Image>
			</SafeAreaView>
		) : (
			<Text>Nie masz żadnych doniczek!</Text>
		);
	}
}
