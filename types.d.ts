// https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#common_weight_name_mapping
enum fontSize {
	'thin' = 100,
	'extraLight' = 200,
	'light' = 300,
	'normal' = 400,
	'medium' = 500,
	'semiBold' = 600,
	'bold' = 700,
	'extraBold' = 800,
	'black' = 900,
	'extraBlack' = 950,
}

type ThemeConfig = {
	colors: { [colorName: string]: string };
	fonts: { [fontName: string]: string };
};

import type { RouteProp } from '@react-navigation/native';
import { Types } from 'mongoose';

type MainStackParamsList = {
	Home: undefined;
	Pots: undefined;
};

export type HomeScreenRouteProp = RouteProp<MainStackParamsList, 'Home'>;

export type PotBuild = {
	name: string;
	description: string;
	image: string;
	pH: number;
	soilMoisture: number;
	airHumidity: number;
	airTemperature: number;
	waterAvailable: number;
};

export type Pot = {
	readonly _id: Types.ObjectId;
	name: string;
	description: string;
	image: string;
	pH: number;
	soilMoisture: number;
	airHumidity: number;
	airTemperature: number;
	waterAvailable: number;
	readonly createdAt: Date;
	readonly updatedAt: Date;
};
