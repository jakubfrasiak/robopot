import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '@/config/themes/primary';
import { err } from 'react-native-svg';

export default function Create() {
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [image, setImage] = useState<string>('');
	const [temperature, setTemperature] = useState<number|''>('');
	const [airHumidity, setAirHumidity] = useState<number|''>('');
	const [soilMoisture, setSoilMoisture] = useState<number|''>('');
	const [lightAvailable, SetLightAvailable] = useState<number|''>('');


	const handleSubmit = async () => {
		setError('')
		
		console.log('nazwa: ', name)
		console.log('opis: ', description)
		console.log('temp: ', temperature)
		console.log('airHumidity: ', airHumidity)
		console.log('soilMoisture: ', soilMoisture)
		console.log('light: ', lightAvailable)

		const imageRegex = /https?:\/\/(?:media\.|cdn\.)?discord(app)?\.net\/attachments\/(?:\d+\/)+\d+\/[a-zA-Z0-9_\-]+\.(?:png|jpg|jpeg|gif|webp)/i

		if(!name || !description || !image || temperature === '' || airHumidity === '' || soilMoisture === '' || lightAvailable === '') {
			return setError("Wszystkie pola muszą być wypełnione")
		} else if(name.length < 4 || name.length > 32) {
			return setError('Nazwa musi mieć od 4 do 32 znaków')
		} else if (description.length < 12 || description.length > 128) {
			return setError('Opis musi mieć od 12 do 128 znaków')
		} else if(!imageRegex.test(image)) { 
			return setError('Wprowadź prawidłowy link')
		} else if(temperature < 0 || temperature > 40) {
			return setError('Temperatura powinna wynosić od 0 do 40 stopni')
		} else if (airHumidity < 0 || airHumidity > 100) {
			return setError('Wilgotność powietrza jest wyrażana w %')
		} else if (soilMoisture < 0 || soilMoisture > 100) {
			return setError('Wilgotność gleby jest wyrażana w %')
		}else if (lightAvailable < 0 || lightAvailable > 100) {
			return setError('Dostępność światła jest wyrażana w %')
		}
		setError('')
		try {
			const QUERY =  (await fetch('http://212.106.130.122:5000/plants', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"name": name,
					"description": description,
					"image": image,
					"airTemperature": temperature,
					"airHumidity": airHumidity,
					"soilMoisture": soilMoisture,
					"lightAvailable": lightAvailable
				  })
			}));
		} catch(error) {
			console.log(error)
		}
	}
	return (
		<>
			<ScrollView style={styles['container']}>
				<View style={styles['plantContainer']}>
					<Text style={styles['category']}>Stwórz roślinę!</Text>
					<View style={{display: 'flex', rowGap: 20}}>
						
					<TextInput style={styles['input']} placeholder='Nazwa' placeholderTextColor={theme.colors.whiteAccent} onChangeText={(value) => setName(value)} />
					<TextInput style={styles['input']} placeholder='Opis' multiline numberOfLines={3} placeholderTextColor={theme.colors.whiteAccent} onChangeText={(value) => setDescription(value)} />
					<TextInput style={styles['input']} placeholder='Zdjęcie' placeholderTextColor={theme.colors.whiteAccent} onChangeText={(value) => setImage(value)} />
					<View style={{display: 'flex', columnGap:20, flexDirection: 'row', justifyContent: 'space-between'}}>
						<TextInput style={styles['inputw']} contextMenuHidden={true} keyboardType='numeric' placeholder='T. Powietrza' placeholderTextColor={theme.colors.whiteAccent} onChangeText={(value) => setTemperature(parseInt(value))} />
						<TextInput style={styles['inputw']} contextMenuHidden={true} keyboardType='numeric' placeholder='W. powietrza' placeholderTextColor={theme.colors.whiteAccent} onChangeText={(value) => setAirHumidity(parseInt(value))} />
					</View>
					<TextInput style={styles['input']} contextMenuHidden={true} keyboardType='numeric' placeholder='Wilgotość gleby' placeholderTextColor={theme.colors.whiteAccent} onChangeText={(value) => setSoilMoisture(parseInt(value))} />
					<TextInput style={styles['input']} contextMenuHidden={true} keyboardType='numeric' placeholder='Dostępnoś światła' placeholderTextColor={theme.colors.whiteAccent} onChangeText={(value) => SetLightAvailable(parseInt(value))} />
					<TouchableOpacity style={styles['ctaButton']} onPress={async ()=>await handleSubmit()}>
						<Text style={styles['ctaButtonText']}>Stwórz</Text>
					</TouchableOpacity>
					{error ? <Text style={styles['errorText']}>Błąd: {error}</Text> : <></>}
					</View>
				</View>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	errorText: {color: '#fc383e', fontSize:12},
	container: { flex: 1, backgroundColor: theme.colors.primary },
	modalContainer: { flex: 1, backgroundColor: theme.colors.primary },
	plantContainer: { marginLeft: 25, marginRight: 25, marginBottom: 20, marginTop: 20 },
	category: { fontSize: 36, color: theme.colors.white, fontWeight: '600', paddingBottom: 20, marginTop: 25 },
	title: { fontSize: 24, color: theme.colors.white, textTransform: 'capitalize', fontWeight: '600' },
	description: { color: theme.colors.white, fontSize: 14 },
	card: { paddingHorizontal: 30, height: 350, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' },
	input: { borderColor:theme.colors.white, borderWidth:1, borderStyle: 'solid', borderRadius:12, color: theme.colors.white, paddingVertical: 8, paddingHorizontal: 16},
	inputw: { flex:0.5, borderColor:theme.colors.white, borderWidth:1, borderStyle: 'solid', borderRadius:12, color: theme.colors.white, paddingVertical: 8, paddingHorizontal: 16},
	ctaButton: {
		backgroundColor: theme.colors.secondary,
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		borderRadius: 12,
	},
	ctaButtonText: { fontSize: 18, fontWeight: 'bold', color: 'white' },
});