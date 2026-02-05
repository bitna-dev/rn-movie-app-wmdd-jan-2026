import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabs from "../layout/MyTabs";
import DetailScreen from "../../screens/DetailScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={MyTabs}
					options={{
						title: "Movies App",
						headerStyle: {
							backgroundColor: "#2D3E51",
						},
						headerTitleStyle: {
							color: "#fff",
						},
					}}
				/>
				<Stack.Screen
					name="Detail"
					component={DetailScreen}
					options={{
						headerBackTitle: "Back to List",
						headerBackTitleStyle: {
							fontSize: 14,
						},
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppStack;
