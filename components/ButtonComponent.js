import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "../assets/colors";

function ButtonComponent({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.boderBtn}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

// 색은 assest/colors.js -> buttoneColor으로 수정
//marginVertical은 0으로 두고 사용할때 직접 style에 접근해서 수정
const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.buttonColor,
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    width: "80%",
    color: "black",
    fontSize: 15,
    fontFamily: "BMHANNAPro",
    fontWeight: "400",
    textAlign: "center",
  },
  boderBtn: {
    marginVertical: 10,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    // backgroundColor: theme.buttonColor,
  },
});

export default ButtonComponent;
