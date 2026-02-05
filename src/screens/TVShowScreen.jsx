import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { getTVData } from "../services/api.js";
import Card from "../components/shared/Card.jsx";
import { useNavigation } from "@react-navigation/native";
import SelectModal from "../components/shared/SelectModal.jsx";
import Loader from "../components/shared/Loader.jsx";
import Pagination from "../components/shared/Pagination.jsx";

const OPTION_VALUES = [
	{ label: "Popular", value: "popular" },
	{ label: "Airing Today", value: "airing_today" },
	{ label: "On The Air", value: "on_the_air" },
	{ label: "Top Rated", value: "top_rated" },
];

const ITEMS_PER_PAGE = 10;

const TVShowScreen = () => {
	const navigation = useNavigation();

	const [option, setOption] = useState(OPTION_VALUES[0].value);
	const [series, setSeries] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		setPage(1);
		loadSeries(1, option);
	}, [option]);

	const loadSeries = async (pageNum, chosenOption) => {
		setLoading(true);
		try {
			const data = await getTVData(pageNum, chosenOption);
			const slicedResults = data.results.slice(0, ITEMS_PER_PAGE);
			setSeries(slicedResults);
			setTotalPages(Math.min(data.total_pages, 50));
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handlePress = (id) => {
		navigation.navigate("Detail", {
			id,
			category: "tv",
		});
	};

	const handlePageChange = (newPage) => {
		setPage(newPage);
		loadSeries(newPage, option);
	};

	return (
		<View style={styles.container}>
			<SelectModal options={OPTION_VALUES} selectedOption={option} onSelectOption={setOption} />

			{loading ? (
				<View style={styles.loaderContainer}>
					<Loader />
				</View>
			) : (
				<FlatList
					style={styles.flatList}
					data={series}
					keyExtractor={(item, idx) => `${item.id}-${idx}`}
					renderItem={({ item }) => {
						const { first_air_date: date, id, poster_path: path, name, popularity } = item;
						return (
							<Card
								date={date}
								id={id}
								path={path}
								title={name}
								popularity={popularity}
								onPress={() => handlePress(id)}
							/>
						);
					}}
					ListFooterComponent={
						<Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
					}
				/>
			)}
		</View>
	);
};

export default TVShowScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	flatList: {
		backgroundColor: "#FFF",
		padding: 14,
	},
	loaderContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
