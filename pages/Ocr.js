import { StyleSheet, Text, View } from "react-native";
import ButtonComponent from "../components/ButtonComponent";

function Ocr({ navigation }) {
  const nextStep = () => {
    //여기에 넘어가기전 처리
    navigation.navigate("MainForm");
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>OCR</Text>
      <ButtonComponent title="OCR기능" onPress={nextStep}></ButtonComponent>
    </View>
  );
}

export default Ocr;
