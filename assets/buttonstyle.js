import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "./colors";

export const btntheme = StyleSheet.create({
  boderBtn: {
    marginVertical: 10,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: theme.dbButton,
  }
});
