import { Model } from 'mongoose';
import { PlantModel } from './schemas/Plant.js';
import { Plant } from '../../types.js';

export const plants: Model<Plant> = PlantModel;
