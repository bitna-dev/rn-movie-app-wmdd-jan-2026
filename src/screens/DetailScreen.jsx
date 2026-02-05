import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getOneData } from "../services/api";
import { IMAGE_URL } from "../config/configApi";
import { useNavigation } from "@react-navigation/native";

const DetailScreen = ({ route }) => {
	const navigation = useNavigation();
	const { id, category } = route.params;
	const [item, setItem] = useState(null);
	useEffect(() => {
		if (id && category) {
			(async () => {
				try {
					const data = await getOneData(id, category);
					setItem(data);

					if (category == "movie") {
						navigation.setOptions({
							title: data.title,
						});
					} else {
						navigation.setOptions({
							title: data.name,
						});
					}
				} catch (error) {
					console.error(error);
				}
			})();
		}
	}, [id, category]);

	if (item) {
		return (
			<ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
				<Text style={styles.title}>{item?.title || item?.name}</Text>
				<Image width={220} height={220} source={{ uri: `${IMAGE_URL}${item?.poster_path}` }} />
				<View style={styles.textContainer}>
					<Text style={styles.desc}>{item?.overview}</Text>
					<Text style={{ fontSize: 12, color: "#585858" }}>
						Popularity: {item?.popularity} | Release Date: {item?.release_date || item?.first_air_date}
					</Text>
				</View>
			</ScrollView>
		);
	}
};

export default DetailScreen;

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
	},
	container: {
		alignItems: "center",
		gap: 30,
		padding: 50,
	},
	title: {
		fontWeight: "bold",
		fontSize: 20,
		marginBottom: 20,
	},
	textContainer: {
		gap: 20,
	},
	desc: {
		lineHeight: 22,
		color: "#585858",
	},
});
