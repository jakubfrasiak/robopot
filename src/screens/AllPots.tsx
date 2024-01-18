import { pots } from '@/database';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

export default function Pots() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	// const fetchPots = async () => {
	// 	const LIMIT = 10;
	// 	const QUERY = await pots.find({}).limit(LIMIT);

	// 	setData(QUERY && QUERY.length > 0 ? (QUERY as any) : []);
	// 	setLoading(false);
	// };

	// useEffect(() => {
	// 	fetchPots();
	// }, []);

	return <Text>HEJO TUTAJ DONICZKI!: {data.length > 0 ? <pre>{JSON.stringify(data, null, 4)}</pre> : 'Brak doniczek'}</Text>;
}
