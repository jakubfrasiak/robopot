import { primaryTheme } from '@/config/themes/primary';
import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack initialRouteName='/home'>
			<Stack.Screen name='(tabs)' options={{ headerShown: false, statusBarColor: primaryTheme.colors.primary }} />
		</Stack>
	);
}
