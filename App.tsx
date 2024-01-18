import Pots from '@/screens/AllPots';
import Home from '@/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='Pots' component={Pots} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
