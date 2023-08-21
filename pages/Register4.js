import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { URI } from "@env";

function Register4({ navigation }) {
  //파라미터 input 처리
  info = useRoute().params;

  //TextInput추가에 따른 처리
  const [inputFields, setInputFields] = useState([{ value: "" }]);

  const handleInputChange = (text, index) => {
    const newInputFields = [...inputFields];
    newInputFields[index].value = text;
    setInputFields(newInputFields);
  };

  const handleAddField = () => {
    //명단 더하기
    setInputFields([...inputFields, { value: "" }]);
  };

  const handleRemoveField = () => {
    //명단 지우기
    const newInputFields = [...inputFields];
    if (inputFields.length > 1) {
      newInputFields.splice(-1);
      setInputFields(newInputFields);
    }
  };

  //페이지 전환간 처리
  const nextRegister = async () => {
    //여기에 넘어가기전 처리
    const combinedValues = inputFields
      .map((field) => field.value)
      .filter((field) => field !== "");
    info.hate = combinedValues;
    //여기서 fetch
    const url = URI + "/register/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      if (!response.ok) {
        //실패시 코드
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      alert(responseData.code);
    } catch (error) {
      console.error("Error sending API request:", error);
    }
    console.log("fetch");
    console.log(info);
    navigation.navigate("LoginForm");
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
      <View style={styles.inputBox}>
        <View style={{ height: "5%" }}></View>
        <Text style={styles.inputText}>혐오식품</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {inputFields.map((field, index) => (
            <View key={index} style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={`Input #${index + 1}`}
                value={field.value}
                onChangeText={(text) => handleInputChange(text, index)}
              />
            </View>
          ))}
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Button title="-" onPress={() => handleRemoveField()} />
            <Button title="+" onPress={handleAddField} />
          </View>
        </ScrollView>
        <View style={{ height: "5%" }}></View>
      </View>
      <View style={{ flex: 2 }}>
        <ButtonComponent title="다음" onPress={nextRegister}></ButtonComponent>
      </View>
    </View>
  );
}
export default Register4;

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
    flex: 8,
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
