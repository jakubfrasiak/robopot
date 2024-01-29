import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { Client } from './database/client/client.js';
import 'dotenv/config';

import { PlantController } from './controllers/plants.js';

const app: Express = express();
const port = parseInt(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

export const client = new Client();

const plantController = new PlantController();

app.get('/', (req: Request, res: Response) => res.send(404));

app.post('/plants', async (req: Request, res: Response) => {
	if (
		// 0 też może być, a nue działa
		!(
			req.body?.name &&
			req.body?.description &&
			req.body?.image &&
			req.body?.pH &&
			req.body?.soilMoisture &&
			req.body?.airHumidity &&
			req.body?.airTemperature &&
			req.body?.waterAvailable &&
			req.body?.lightAvailable
		)
	) {
		console.log([
			['name', req.body?.name],
			['description', req.body?.description],
			['image', req.body?.image],
			['pH', req.body?.pH],
			['soilMoisture', req.body?.soilMoisture],
			['airHumidity', req.body?.airHumidity],
			['airTemperature', req.body?.airTemperature],
			['waterAvailable', req.body?.waterAvailable],
			['lightAvailable', req.body?.lightAvailable],
		]);
		res.statusCode = 400;
		return res.send({
			statusCode: 400,
			message: "You didn't provide required data. Please check it again",
		});
	}
	const { name, airHumidity, airTemperature, description, image, pH, soilMoisture, waterAvailable, lightAvailable } = req.body;
	if (
		!(
			typeof name === 'string' ||
			(typeof lightAvailable === 'number' && lightAvailable <= 100 && lightAvailable >= 0) ||
			(typeof airHumidity === 'number' && airHumidity <= 100 && airHumidity >= 0) ||
			(typeof airTemperature === 'number' && airTemperature <= 40 && airTemperature >= 0) ||
			typeof description === 'string' ||
			typeof image === 'string' ||
			(typeof pH === 'number' && pH <= 14 && pH >= 0) ||
			(typeof soilMoisture === 'number' && soilMoisture <= 100 && soilMoisture >= 0) ||
			(typeof waterAvailable === 'number' && waterAvailable <= 2 && waterAvailable >= 0)
		)
	) {
		res.statusCode = 400;
		return res.send({
			statusCode: 400,
			message: 'Invalid data provided. Please check it again',
		});
	}

	const created = await plantController.createPlant({
		name,
		airHumidity,
		airTemperature,
		description,
		image,
		pH,
		soilMoisture,
		waterAvailable,
		lightAvailable,
	});

	return res.send({
		statusCode: 201,
		message: 'Plant created succesfully',
		data: created,
	});
});

app.get('/plants', async (req: Request, res: Response) => {
	const found = await plantController.allPlants(10);
	const statusCode = found.length > 0 ? 200 : 404;
	res.statusCode = statusCode;
	return res.send({
		statusCode,
		message: found.length > 0 ? 'Success' : 'No plants found',
		data: found,
	});
});

app.get('/plants/:id', async (req: Request, res: Response) => {
	const found = await plantController.plant(req.params.id);
	const statusCode = found ? 200 : 404;

	res.statusCode = statusCode;
	res.send({
		statusCode,
		message: found ? 'No plant found' : 'Success',
		data: found,
	});
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
