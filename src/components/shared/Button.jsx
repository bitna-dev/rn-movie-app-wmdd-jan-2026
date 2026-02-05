import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const Button = ({ onPress, children }) => {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			{children}
		</Pressable>
	);
};

export default Button;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#03B6D2",
		padding: 10,
		borderRadius: 4,
	},
});
