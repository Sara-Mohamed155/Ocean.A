import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet } from "react-native";
import { routes } from "../constants/names";

function IconButton({ icon, color, size, onPress }) {
  const navigation = useNavigation();
  function onPressHandler() {
    navigation.navigate("ComaprisonScreen", {
      mode: routes.MIXED,
    });
  }
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPressHandler}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.7,
  },
});
