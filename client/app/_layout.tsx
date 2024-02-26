import { Compass, Pot, User } from '@/config/constants/icons';
import { theme } from '@/config/themes/primary';
import { Tabs } from 'expo-router';

import { StyleSheet, View } from 'react-native';

export default function Layout() {
	return (
		<>
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						backgroundColor: theme.colors.accent,
						position: 'relative',
						height: 75,
						bottom: 0,
					},
				}}>
				<Tabs.Screen
					name='pots/index'
					options={{
						title: '',
						tabBarIcon: ({ focused, color, size }) => {
							return (
								<View style={style.icon}>
									<Pot width={33} height={33} style={{ color: focused ? theme.colors.white : theme.colors.secondary }} />
								</View>
							);
						},
					}}
				/>
				<Tabs.Screen
					name='plants/index'
					options={{
						title: '',

						tabBarIcon: ({ focused, color, size }) => {
							return (
								<View style={style.icon}>
									<Compass width={33} height={33} style={{ color: focused ? theme.colors.white : theme.colors.secondary }} />
								</View>
							);
						},
					}}
				/>
				<Tabs.Screen
					name='create/index'
					options={{
						title: '',
						tabBarIcon: ({ focused, color, size }) => {
							return (
								<View style={style.icon}>
									<User width={33} height={33} style={{ color: focused ? theme.colors.white : theme.colors.secondary }} />
								</View>
							);
						},
					}}
				/>
				<Tabs.Screen name='index' options={{ href: null }} />
			</Tabs>
		</>
	);
}
const style = StyleSheet.create({
	icon: {
		alignItems: 'center',
		paddingTop: 16,
		color: theme.colors.secondary,
	},
});
