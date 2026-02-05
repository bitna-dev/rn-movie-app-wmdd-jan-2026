import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import SelectModal from "../components/shared/SelectModal";
import Card from "../components/shared/Card";
import Loader from "../components/shared/Loader";
import Pagination from "../components/shared/Pagination";
import { useNavigation } from "@react-navigation/native";
import { searchData } from "../services/api";
import { Feather } from "@expo/vector-icons";

const OPTION_VALUES = [
	{ label: "Movie", value: "movie" },
	{ label: "TV", value: "tv" },
	{ label: "Multi", value: "multi" },
];

const ITEMS_PER_PAGE = 10;

const ResultScreen = () => {
	const navigation = useNavigation();

	const [option, setOption] = useState(OPTION_VALUES[0].value);
	const [data, setData] = useState([]);
	const [error, setError] = useState("");

	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [query, setQuery] = useState("");
	const [searched, setSearched] = useState(false);
	const [lastSearchedQuery, setLastSearchedQuery] = useState("");
	const [lastSearchedOption, setLastSearchedOption] = useState("");

	const loadData = async (pageNum, chosenOption, searchQuery) => {
		if (loading || !searchQuery.trim()) return;

		setLoading(true);
		try {
			const res = await searchData(pageNum, chosenOption, searchQuery);
			const slicedResults = res.results.slice(0, ITEMS_PER_PAGE);
			setData(slicedResults);
			setTotalPages(Math.min(res.total_pages, 50));
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = () => {
		if (!query.trim()) {
			setError("Movie/TV show name is required");
			return;
		}
		setError("");
		setPage(1);
		setSearched(true);
		setLastSearchedQuery(query);
		setLastSearchedOption(option);
		loadData(1, option, query);
	};

	const handlePress = (id, mediaType) => {
		let category = option;
		if (option === "multi" && mediaType) {
			category = mediaType;
		}
		navigation.navigate("Detail", {
			id,
			category,
		});
	};

	const handlePageChange = (newPage) => {
		setPage(newPage);
		loadData(newPage, lastSearchedOption, lastSearchedQuery);
	};

	const handleQueryChange = (text) => {
		setQuery(text);
		if (error && text.trim()) {
			setError("");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<View style={styles.group}>
					<Text style={styles.label}>
						Search Movie/TV Show Name <Text style={styles.required}>*</Text>
					</Text>
					<View style={[styles.searchInputWrapper, error && styles.searchInputError]}>
						<Feather name="search" size={20} color="#999" style={styles.searchIcon} />
						<TextInput
							style={styles.searchInput}
							placeholder="i.e. James Bond, CSI"
							placeholderTextColor="#999"
							value={query}
							onChangeText={handleQueryChange}
							onSubmitEditing={handleSearch}
						/>
					</View>
				</View>

				<View style={styles.group}>
					<Text style={styles.label}>
						Choose Search Type<Text style={styles.required}>*</Text>
					</Text>
					<View style={styles.innerGroup}>
						<View style={styles.select}>
							<SelectModal options={OPTION_VALUES} selectedOption={option} onSelectOption={setOption} />
						</View>
						<TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={loading}>
							<Feather name="search" size={20} color="white" />
							<Text style={styles.searchButtonText}>Search</Text>
						</TouchableOpacity>
					</View>
				</View>
				{error ? <Text style={styles.errorText}>{error}</Text> : null}
			</View>

			{loading ? (
				<View style={styles.loaderContainer}>
					<Loader />
				</View>
			) : searched ? (
				data.length > 0 ? (
					<FlatList
						style={styles.flatList}
						data={data}
						keyExtractor={(item, idx) => `${item.id}-${idx}`}
						renderItem={({ item }) => {
							const {
								release_date: date,
								first_air_date: tvDate,
								id,
								backdrop_path: path,
								poster_path: poster,
								title,
								name,
								popularity,
								media_type,
							} = item;
							return (
								<Card
									date={date || tvDate}
									id={id}
									path={path || poster}
									title={title || name}
									popularity={popularity}
									onPress={() => handlePress(id, media_type)}
								/>
							);
						}}
						ListFooterComponent={
							<Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
						}
					/>
				) : (
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>No results found</Text>
					</View>
				)
			) : (
				<View style={styles.emptyContainer}>
					<Text style={styles.initiateText}>Please initiate a search</Text>
				</View>
			)}
		</View>
	);
};

export default ResultScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	searchContainer: {
		padding: 14,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	group: {
		marginBottom: 16,
	},
	innerGroup: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
	},
	label: {
		fontSize: 16,
		color: "#666",
		marginBottom: 8,
		fontWeight: "500",
	},
	required: {
		color: "#ff0000",
	},
	searchInputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 8,
		borderWidth: 2,
		borderColor: "#ddd",
		paddingHorizontal: 12,
	},
	searchInputError: {
		borderColor: "#ff0000",
	},
	searchIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		padding: 12,
		fontSize: 16,
		color: "#333",
	},
	errorText: {
		color: "#ff0000",
		fontSize: 14,
		marginBottom: 12,
		marginTop: -8,
	},
	select: {
		flex: 2,
	},
	searchButton: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#00bcd4",
		borderRadius: 8,
		gap: 6,
		padding: 14,
	},
	searchButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
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
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 40,
		backgroundColor: "#f5f5f5",
	},
	emptyText: {
		fontSize: 16,
		color: "#999",
	},
	initiateText: {
		fontSize: 24,
		color: "#333",
		fontWeight: "600",
	},
});
