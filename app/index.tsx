import { Link, Redirect } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Page() {
	return Redirect({ href: '/home' });
}
