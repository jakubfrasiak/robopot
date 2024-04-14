import { Plant, PlantBuild } from '../../types.js';
import { plants } from '../database/index.js';

export class PlantController {
	constructor() {}
	public async allPlants(limit: number): Promise<Array<Plant>> {
		return await plants.find().sort({createdAt: -1}).limit(limit);
	}
	public async plant(plantName: string): Promise<Plant|null> {
		const result = await plants.findOne({ name: plantName });
		return result;
	}

	public async createPlant(params: PlantBuild): Promise<Plant> {
		return await plants.create(params);
	}
}
