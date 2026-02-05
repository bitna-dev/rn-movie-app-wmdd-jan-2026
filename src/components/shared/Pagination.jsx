import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const maxVisiblePages = 5;

	const getPageNumbers = () => {
		const pages = [];
		let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
		let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}
		return pages;
	};

	if (totalPages <= 1) return null;

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.button, currentPage === 1 && styles.disabled]}
				onPress={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<Text style={[styles.buttonText, currentPage === 1 && styles.disabledText]}>Prev</Text>
			</TouchableOpacity>

			{getPageNumbers().map((pageNum) => (
				<TouchableOpacity
					key={pageNum}
					style={[styles.pageButton, currentPage === pageNum && styles.activePage]}
					onPress={() => onPageChange(pageNum)}
				>
					<Text style={[styles.pageText, currentPage === pageNum && styles.activePageText]}>{pageNum}</Text>
				</TouchableOpacity>
			))}

			<TouchableOpacity
				style={[styles.button, currentPage === totalPages && styles.disabled]}
				onPress={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				<Text style={[styles.buttonText, currentPage === totalPages && styles.disabledText]}>Next</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Pagination;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 16,
		gap: 8,
	},
	button: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		backgroundColor: "#00bcd4",
		borderRadius: 6,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "600",
	},
	disabled: {
		backgroundColor: "#ccc",
	},
	disabledText: {
		color: "#888",
	},
	pageButton: {
		width: 36,
		height: 36,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 6,
		backgroundColor: "#f0f0f0",
	},
	activePage: {
		backgroundColor: "#00bcd4",
	},
	pageText: {
		fontSize: 14,
		color: "#333",
		fontWeight: "500",
	},
	activePageText: {
		color: "#fff",
	},
});
