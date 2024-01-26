import mongoose, { connect, modelNames } from 'mongoose';

export class Client {
	constructor() {
		this.connect();
	}

	public async connect(): Promise<void> {
		try {
			await connect(process.env.MONGOOSE_URI as string, {
				maxPoolSize: 15,
			});

			console.log(`Pomyślnie połączono z bazą danych! 🍃`);
		} catch (error) {
			console.log('Błąd podczas nawiązywania połączenia z bazą danych!:');
			console.log(error);
		}
	}

	public async resetCollections(): Promise<void> {
		modelNames().forEach(async (model: string) => {
			await mongoose.models[model].collection.drop();
		});
	}
}
