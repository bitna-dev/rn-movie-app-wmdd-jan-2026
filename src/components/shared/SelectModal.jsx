import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const SelectModal = ({ options, selectedOption, onSelectOption }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const selectedLabel = options.find((opt) => opt.value === selectedOption)?.label || selectedOption;
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
				<Text style={styles.selectText}>{selectedLabel}</Text>
				<Text style={styles.arrow}>▼</Text>
			</TouchableOpacity>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
					<View style={styles.modalContent}>
						{options.map((option) => (
							<TouchableOpacity
								key={option.value}
								style={[styles.option, selectedOption === option.value && styles.selectedOption]}
								onPress={() => {
									onSelectOption(option.value);
									setModalVisible(false);
								}}
							>
								<Text style={[styles.optionText, selectedOption === option.value && styles.selectedOptionText]}>
									{option.label}
								</Text>
								{selectedOption === option.value && <Text style={styles.checkMark}>✓</Text>}
							</TouchableOpacity>
						))}
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
};

export default SelectModal;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: "#fff",
	},
	selectButton: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 15,
		backgroundColor: "#f5f5f5",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#ddd",
	},
	selectText: {
		fontSize: 16,
		color: "#333",
	},
	arrow: {
		fontSize: 12,
		color: "#666",
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.3)",
	},
	modalContent: {
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingVertical: 18,
	},
	option: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},
	selectedOption: {
		backgroundColor: "#00bcd4",
	},
	optionText: {
		fontSize: 16,
		color: "#333",
	},
	checkMark: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
	},
});
