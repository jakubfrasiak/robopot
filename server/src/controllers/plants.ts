import { Plant, PlantBuild } from '../../types.js';
import { plants } from '../database/index.js';

export class PlantController {
	constructor() {}
	public async allPlants(limit: number): Promise<Array<Plant>> {
		return await plants.find().limit(limit);
	}
	public async plant(plantId: string): Promise<Plant> {
		return await plants.findById(plantId);
	}
	public async createPlant(params: PlantBuild): Promise<Plant> {
		return await plants.create(params);
	}
}
