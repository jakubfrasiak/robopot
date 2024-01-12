export class Pot {
	public plant: string;
	constructor(props: PotBuild) {
		this.plant = props.plant;
	}

	public get(): string {
		return this.plant;
	}

	public set(newPlant: string) {
		this.plant = newPlant;
	}
}
