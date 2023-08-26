import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import ButtonComponent from "../components/ButtonComponent";

function LoginForm({ navigation }) {
  const responseData = {
    idx: 21,
    name: "바나나킥12",
    nutrition: {
      kcal: 50.4,
      protein: 10.1,
      fat: 10.1,
      glucide: 10.1,
      sugar: 10.1,
      dietaryfiber: 10.1,
      calcium: 10.1,
      Iron: 10.1,
      magnesium: 10.1,
      caffeine: 10.1,
      Potassium: 10.1,
      Natrium: 10.1,
      vitamins: 10.1,
      cholesterol: 10.1,
      fatty: 10.1,
      transfat: 10.1,
    },
    date: "YYYY-MM-DD",
    hate: ["hazard", "substance"],
    allergy: ["오렌지", "땅콩"],
    userallergy: ["땅콩"],
    material: [
      "aspartame",
      "raw material",
      "테스트",
      "ㅁㄴㅇ",
      "raw material",
      "테스트",
      "ㅁㄴㅇ",
      "raw material",
      "테스트",
      "ㅁㄴㅇ",
      "raw material",
      "테스트",
      "ㅁㄴㅇ",
      "raw material",
      "테스트",
      "ㅁㄴㅇ",
      "raw material",
      "테스트",
      "ㅁㄴㅇ",
      "raw material",
      "테스트",
      "ㅁㄴㅇ",
    ],
    prompt:
      "해당 텍스트는 더미 데이터입니다. 해당 칸 레이아웃을 위해서 150자 정도 작성하여 고민중에 있습니다. 당연히 실제로는 분석 텍스트가 들어가겠죠? 막상다 쳐보니깐 150자가 안되더라고요 좀더 작성해야 할 거같습니다. 앞으로 30자 정도 남았는데 이정도면 된거같습니다.",
  };
  const register = () => {
    //여기에 넘어가기전 처리
    navigation.navigate("register1");
  };
  const login = async () => {
    //여기에 넘어가기전 처리

    navigation.navigate("MainForm");
  };

  const result = () => {
    //여기에 넘어가기전 처리
    navigation.navigate("Result", { responseData });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ marginBottom: 30 }}>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 150, height: 150 }}
        ></Image>
      </View>
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
