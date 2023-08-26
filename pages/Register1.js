import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import ButtonComponent from "../components/ButtonComponent";

function Register1({ navigation }) {
  const info = {
    name: "",
    age: 0,
    sex: "",
    allergy: "",
    hate: "",
    weight: 0,
    height: 0,
  };

  const nextRegister = () => {
    //여기에 넘어가기전 처리
    console.log(info);
    navigation.navigate("register2", info);
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 1 }}></View>
      <View style={styles.mainTitle}>
        <Text style={styles.mainText}>회원가입</Text>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 80, height: 80 }}
        ></Image>
      </View>
      <View style={{ flex: 8, width: "100%", alignItems: "center" }}>
        <View style={{ flex: 0.1 }}></View>
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>아이디</Text>
          <TextInput placeholder="아이디" style={styles.input}></TextInput>
        </View>
        <View style={{ flex: 0.05 }}></View>
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>패스워드</Text>
          <TextInput placeholder="패스워드" style={styles.input}></TextInput>
        </View>
        <View style={{ flex: 0.05 }}></View>
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>패스워드 확인</Text>
          <TextInput placeholder="패스워드" style={styles.input}></TextInput>
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <ButtonComponent title="다음" onPress={nextRegister}></ButtonComponent>
      </View>
    </View>
  );
}

export default Register1;
const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: "BMHANNAPro",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    flex: 2,
  },
  mainText: {
    fontFamily: "BMHANNAPro",
    marginLeft: 10,
    fontSize: 30,
    fontWeight: "200",
  },
  inputBox: {
    width: "80%",
  },
  inputText: { fontFamily: "BMHANNAPro", fontSize: 15, marginLeft: 15 },
  input: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 10,
    fontSize: 15,
    fontFamily: "BMHANNAPro",
  },
});
