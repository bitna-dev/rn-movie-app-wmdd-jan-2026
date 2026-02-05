import React from "react";
import { StyleSheet, View } from "react-native";

const InnerLayout = ({ children }) => {
	return <View style={styles.container}>{children}</View>;
};

export default InnerLayout;

const styles = StyleSheet.create({
	container: {
		paddingInline: 14,
		backgroundColor: "#fff",
	},
});
