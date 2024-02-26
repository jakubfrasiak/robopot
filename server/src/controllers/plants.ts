import { Plant, PlantBuild } from '../../types.js';
import { plants } from '../database/index.js';

export class PlantController {
	constructor() {}
	public async allPlants(limit: number): Promise<Array<Plant>> {
		return await plants.find().limit(limit);
	}
	public async plant(plantName: string): Promise<Plant> {
		const result = await plants.findOne({ name: plantName });
		return result || null;
	}

	public async createPlant(params: PlantBuild): Promise<Plant> {
		return await plants.create(params);
	}
}
