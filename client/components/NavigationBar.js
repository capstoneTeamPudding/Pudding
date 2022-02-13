import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Fridge from "./Fridge";
import Home from "./Home";
import Favorites from "./Favorites";

const Bottom = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Bottom.Navigator>
      <Bottom.Screen name="Fridge" component={Fridge} />
      <Bottom.Screen name="Home" component={Home} />
      <Bottom.Screen name="Favorites" component={Favorites} />
    </Bottom.Navigator>
  );
}
