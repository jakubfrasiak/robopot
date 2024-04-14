import mongoose, { Model, Schema, SchemaTypes, model } from 'mongoose';
import { Plant, PlantBuild } from '../../../types.js';

const PlantSchema = new Schema<PlantBuild>(
	{
		name: { type: SchemaTypes.String, required: true, lowercase: true, unique: true },
		description: { type: SchemaTypes.String, required: true },
		image: { type: SchemaTypes.String, required: true },
		airHumidity: { type: SchemaTypes.Number, required: true, min: 0, max: 100 },
		airTemperature: { type: SchemaTypes.Number, required: true, min: 0, max: 40 },
		waterAvailable: { type: SchemaTypes.Number, required: true, min: 0, max: 2 }, // do wywalenia.
		pH: { type: SchemaTypes.Number, required: true, min: 0, max: 14 },
		soilMoisture: { type: SchemaTypes.Number, required: true, min: 0, max: 100 },
		lightAvailable: { type: SchemaTypes.Number, required: true, min: 0, max: 100 },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export const PlantModel: Model<Plant> = mongoose.models['Plant'] || model('Plant', PlantSchema);
