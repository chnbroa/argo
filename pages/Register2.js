import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Checkbox } from "react-native-paper";

function Register2({ navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  info = useRoute().params;

  const nextRegister = () => {
    //여기에 넘어가기전 처리
    info.name = name;
    info.age = age;
    info.sex = sex;
    info.weight = weight;
    info.height = height;
    navigation.navigate("register3", info);
  };

  const handleCheckboxChange = (gender) => {
    setSex(gender);
  };
  console.log(sex);

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
          <Text style={styles.inputText}>이름</Text>
          <TextInput
            placeholder="홍길동"
            style={styles.input}
            onChangeText={setName}
          ></TextInput>
        </View>
        <View style={{ flex: 0.05 }}></View>
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>성별</Text>
          <View style={styles.checkboxRow}>
            <View style={{ flex: 0.1 }}></View>
            <View style={styles.check}>
              <Checkbox.Item
                label="남"
                status={sex === "남" ? "checked" : "unchecked"}
                onPress={() => handleCheckboxChange("남")}
              />
            </View>
            <View style={{ flex: 0.2 }}></View>
            <View style={styles.check}>
              <Checkbox.Item
                label="여"
                status={sex === "여" ? "checked" : "unchecked"}
                onPress={() => handleCheckboxChange("여")}
              />
            </View>
            <View style={{ flex: 0.1 }}></View>
          </View>
        </View>
        <View style={{ flex: 0.05 }}></View>
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>나이</Text>
          <TextInput
            placeholder="20"
            style={styles.input}
            onChangeText={setAge}
          ></TextInput>
        </View>
        <View style={{ flex: 0.05 }}></View>
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>몸무게</Text>
          <TextInput
            placeholder="75"
            style={styles.input}
            onChangeText={setWeight}
          ></TextInput>
        </View>
        <View style={{ flex: 0.05 }}></View>
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>키</Text>
          <TextInput
            placeholder="175"
            style={styles.input}
            onChangeText={setHeight}
          ></TextInput>
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <ButtonComponent title="다음" onPress={nextRegister}></ButtonComponent>
      </View>
    </View>
  );
}

export default Register2;

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
    fontFamily: "BMHANNAPro",
  },
  inputBox: {
    width: "80%",
  },
  inputText: { fontFamily: "BMHANNAPro", fontSize: 15, marginLeft: 15 },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 10,
    fontSize: 15,
    fontFamily: "BMHANNAPro",
  },
  checkboxRow: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  check: {
    flex: 1,
    fontSize: 50,
    width: "100%",
  },
});
