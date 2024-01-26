import { Types } from 'mongoose';

export type PlantBuild = {
	name: string;
	description: string;
	image: string;
	pH: number;
	soilMoisture: number;
	airHumidity: number;
	airTemperature: number;
	waterAvailable: number;
	lightAvailable: number;
};

export type Plant = {
	readonly _id: Types.ObjectId;
	name: string;
	description: string;
	image: string;
	pH: number;
	soilMoisture: number;
	airHumidity: number;
	airTemperature: number;
	waterAvailable: number;
	lightAvailable: number;
	readonly createdAt: Date;
	readonly updatedAt: Date;
};
