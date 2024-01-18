import { Model, Schema, SchemaTypes, model, models } from 'mongoose';
import { Pot, PotBuild } from 'types';

const PotSchema = new Schema<PotBuild>(
	{
		name: { type: SchemaTypes.String, required: true, lowercase: true },
		description: { type: SchemaTypes.String, required: true },
		image: { type: SchemaTypes.String, required: true },
		airHumidity: { type: SchemaTypes.Number, required: true, min: 0, max: 100 },
		airTemperature: { type: SchemaTypes.Number, required: true },
		waterAvailable: { type: SchemaTypes.Number, required: true, min: 0, max: 2 },
		pH: { type: SchemaTypes.Number, required: true, min: 0, max: 14 },
		soilMoisture: { type: SchemaTypes.Number, required: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export const PotModel: Model<Pot> = models['Pot'] || model('Pot', PotSchema);
