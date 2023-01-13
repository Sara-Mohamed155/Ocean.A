import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
function Icon({ name, height, onPress }) {
  return (
    <View style={{ ...styles.container, height: height, width: height }}>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons name={name} size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default Icon;
const styles = StyleSheet.create({
  container: {
    //  backgroundColor: GlobalStyles.colors.primary500,
    justifyContent: "center",
    padding: 24,
    alignItems: "center",
    borderRadius: 80,
    elevation: 1,
    margin: 5,
    borderWidth: 2,
    borderColor: "white",
    borderStyle: "dashed",
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 26,
    color: "white",
  },
});
