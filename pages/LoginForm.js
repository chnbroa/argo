import { StyleSheet, Text, View, TextInput } from "react-native";
import ButtonComponent from "../components/ButtonComponent";

function LoginForm({ navigation }) {
  const register = () => {
    //여기에 넘어가기전 처리
    navigation.navigate("register1");
  };
  const login = async () => {
    //여기에 넘어가기전 처리
    const url = "http://localhost:5678/login";
    let responseData = null;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        //실패시 코드
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      responseData = await response.json();
    } catch (error) {
      console.error("Error sending API request:", error);
    }
    console.log(responseData);

    navigation.navigate("MainForm", responseData);
  };



  const result = () => {
    //여기에 넘어가기전 처리
    navigation.navigate("Result");
  };


  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
      <ButtonComponent title="로그인" onPress={login}></ButtonComponent>
      <ButtonComponent title="회원가입" onPress={register}></ButtonComponent>
      <ButtonComponent title="result" onPress={result}></ButtonComponent>
    </View>
  );
}

export default LoginForm;

const styles = StyleSheet.create({
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
});
