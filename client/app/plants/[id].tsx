import { primaryTheme } from '@/config/themes/primary';
import { ScrollView, StatusBar, View } from 'react-native';

import { useRoute } from '@react-navigation/native';
import PlantDetails from '@/components/PlantDetails';
import PlantList from '@/components/PlantList';

export default function Plants() {
	const router = useRoute();
	if (router.params) {
		return router.params.id === '[id]' ? <PlantList /> : <PlantDetails id={router.params.id} />;
	} else {
		<PlantList />;
	}
}
