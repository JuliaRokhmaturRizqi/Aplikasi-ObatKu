import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/rooter/stack";

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
