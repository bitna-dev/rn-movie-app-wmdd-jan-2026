import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../shared/Button";
import { IMAGE_URL } from "../../config/configApi";

const Card = ({ path, title, date, popularity, onPress }) => {
	return (
		<View style={styles.container}>
			<View>
				<Image style={styles.image} width={100} height={100} source={{ uri: `${IMAGE_URL}${path}` }} />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text>Popularity: {popularity}</Text>
				<Text>Release Date: {date}</Text>
				<Button onPress={onPress}>
					<Text style={styles.button}>More Details</Text>
				</Button>
			</View>
		</View>
	);
};

export default Card;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: "#fff",
		marginBottom: 14,
		gap: 12,
		width: "100%",
	},
	title: {
		fontWeight: "bold",
	},
	image: {
		objectFit: "cover",
	},
	textContainer: {
		flex: 0.9,
		flexShrink: 1,
		flexDirection: "column",
		justifyContent: "space-around",
	},
	button: {
		fontWeight: "semi-bold",
		fontSize: 16,
		color: "white",
		textAlign: "center",
	},
});
