import { StyleSheet, View } from "react-native";
import AppStack from "./src/components/stack/AppStack";
import { StatusBar } from "expo-status-bar";

export default function App() {
	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<AppStack />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
