type rateConditionsArguments = {
	soilMoisture: number;
	correctSoilMoisture: number;
	temperature: number;
	correctTemperature: number;
	airHumidity: number;
	correctAirHumidity: number;
	lightAvailable: number;
	correctLightAvailable: number;
};

export const rateConditions = (args: rateConditionsArguments) => {
	return Math.round(
		Math.abs(args.soilMoisture - args.correctSoilMoisture) * 0.7 +
			Math.abs(args.temperature - args.correctTemperature) +
			Math.abs(args.airHumidity - args.correctAirHumidity) * 0.7 +
			Math.abs(args.lightAvailable - args.correctLightAvailable) * 5
	);
};
