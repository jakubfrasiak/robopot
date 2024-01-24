import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/screens/Home';
import Pots from '@/screens/AllPots';
import { Tabs } from 'expo-router';

export default function Navbar() {
	const Stack = createNativeStackNavigator();

	return (
		<>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}>
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='Pots' component={Pots} />
			</Stack.Navigator>
			{/* <Tabs>
				<Tabs.Screen name='Home' />
				<Tabs.Screen name='Pots' />
			</Tabs> */}
		</>
	);
}
