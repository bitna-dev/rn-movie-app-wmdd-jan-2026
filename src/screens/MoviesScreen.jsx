import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getMovies } from "../services/api.js";
import Card from "../components/shared/Card.jsx";
import { useNavigation } from "@react-navigation/native";
import SelectModal from "../components/shared/SelectModal.jsx";
import Loader from "../components/shared/Loader.jsx";
import Pagination from "../components/shared/Pagination.jsx";

const OPTION_VALUES = [
	{ label: "Now Playing", value: "now_playing" },
	{ label: "Popular", value: "popular" },
	{ label: "Top Rated", value: "top_rated" },
	{ label: "Upcoming", value: "upcoming" },
];

const ITEMS_PER_PAGE = 10;

const MoviesScreen = () => {
	const navigation = useNavigation();

	const [option, setOption] = useState(OPTION_VALUES[0].value);
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		setPage(1);
		loadMovies(1, option);
	}, [option]);

	const loadMovies = async (pageNum, chosenOption) => {
		setLoading(true);
		try {
			const data = await getMovies(pageNum, chosenOption);
			const slicedResults = data.results.slice(0, ITEMS_PER_PAGE);
			setMovies(slicedResults);
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
			category: "movie",
		});
	};

	const handlePageChange = (newPage) => {
		setPage(newPage);
		loadMovies(newPage, option);
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
					data={movies}
					keyExtractor={(item, idx) => `${item.id}-${idx}`}
					renderItem={({ item }) => {
						const { release_date: date, id, poster_path: path, title, popularity } = item;
						return (
							<Card
								date={date}
								id={id}
								path={path}
								title={title}
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

export default MoviesScreen;

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
