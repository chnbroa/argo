import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import ButtonComponent from "../components/ButtonComponent";

function Chat({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 1 }}></View>
      <View style={styles.mainTitle}>
        <Text style={styles.mainText}>인공지능 챗봇</Text>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 80, height: 80 }}
        ></Image>
      </View>
      <View style={{ flex: 10, width: "100%", alignItems: "center" }}>
        <View style={styles.chatBox}></View>
      </View>
    </View>
  );
}

export default Chat;
const styles = StyleSheet.create({
  mainTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    flex: 2,
  },
  mainText: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: "400",
  },
  inputBox: {
    width: "80%",
  },
  inputText: { fontSize: 15, marginLeft: 15 },
  input: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 10,
    fontSize: 15,
  },
  chatBox: {},
});
