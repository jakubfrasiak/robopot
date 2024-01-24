import { primaryTheme } from '@/config/themes/primary';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Compass, Pot, User } from '@/config/constants/icons';

export default function LayoutStack() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: primaryTheme.colors.accent,
					position: 'absolute',
					height: 72,
					bottom: 0,
				},
			}}>
			<Tabs.Screen
				name='myPots'
				options={{
					title: '',
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<View style={style.icon}>
								<Pot width={33} height={33} style={{ color: focused ? primaryTheme.colors.white : primaryTheme.colors.secondary }} />
							</View>
						);
					},
				}}
			/>
			<Tabs.Screen
				name='home'
				options={{
					title: '',
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<View style={style.icon}>
								<Compass
									width={33}
									height={33}
									style={{ color: focused ? primaryTheme.colors.white : primaryTheme.colors.secondary }}
								/>
							</View>
						);
					},
				}}
			/>
			<Tabs.Screen
				name='account'
				options={{
					title: '',
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<View style={style.icon}>
								<User width={33} height={33} style={{ color: focused ? primaryTheme.colors.white : primaryTheme.colors.secondary }} />
							</View>
						);
					},
				}}
			/>
		</Tabs>
	);
}

const style = StyleSheet.create({
	icon: {
		alignItems: 'center',
		paddingTop: 16,
		color: primaryTheme.colors.secondary,
	},
});
