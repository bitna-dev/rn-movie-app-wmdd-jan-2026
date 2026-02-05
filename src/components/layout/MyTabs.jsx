import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TVShowScreen from "../../screens/TVShowScreen";
import MoviesScreen from "../../screens/MoviesScreen";
import ResultScreen from "../../screens/ResultScreen";

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Movies" component={MoviesScreen} />
			<Tab.Screen name="Results" component={ResultScreen} />
			<Tab.Screen name="TVShows" component={TVShowScreen} />
		</Tab.Navigator>
	);
};

export default MyTabs;
