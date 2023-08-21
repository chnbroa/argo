import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import ButtonComponent from "../components/ButtonComponent";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";

function Register3({ navigation }) {
  info = useRoute().params;
  const count = 0;
  const [allergy, setAllergy] = useState([]);

  const items = [
    { id: 1, label: "옥수수", value: "옥수수" },
    { id: 2, label: "참깨", value: "참깨" },
    { id: 3, label: "콩", value: "콩" },
    { id: 4, label: "감자", value: "감자" },
    { id: 5, label: "사과", value: "사과" },
    { id: 6, label: "카카오", value: "카카오" },
    { id: 7, label: "복숭아", value: "복숭아" },
    { id: 8, label: "토마토", value: "토마토" },
    { id: 9, label: "키위", value: "키위" },
    { id: 10, label: "망고", value: "망고" },
    { id: 11, label: "바나나", value: "바나나" },
    { id: 12, label: "라임", value: "라임" },
    { id: 13, label: "오렌지", value: "오렌지" },
    { id: 14, label: "레몬", value: "레몬" },
    { id: 15, label: "땅콩", value: "땅콩" },
    { id: 16, label: "호두", value: "호두" },
    { id: 17, label: "밤", value: "밤" },
    { id: 18, label: "밀", value: "밀" },
    { id: 19, label: "보리", value: "보리" },
    { id: 20, label: "쌀", value: "쌀" },
    { id: 21, label: "메밀", value: "메밀" },
    { id: 22, label: "마늘", value: "마늘" },
    { id: 23, label: "양파", value: "양파" },
    { id: 24, label: "샐러리", value: "샐러리" },
    { id: 25, label: "오이", value: "오이" },
    { id: 26, label: "효모", value: "효모" },
    { id: 27, label: "버섯", value: "버섯" },
    { id: 28, label: "계란", value: "계란" },
    { id: 29, label: "우유", value: "우유" },
    { id: 30, label: "게", value: "게" },
    { id: 31, label: "새우", value: "새우" },
    { id: 32, label: "고등어", value: "고등어" },
    { id: 33, label: "돼지고기", value: "돼지고기" },
    { id: 34, label: "소고기", value: "소고기" },
    { id: 35, label: "치즈", value: "치즈" },
    { id: 36, label: "닭고기", value: "닭고기" },
    { id: 37, label: "대구", value: "대구" },
    { id: 38, label: "홍합", value: "홍합" },
    { id: 39, label: "참치", value: "참치" },
    { id: 40, label: "연어", value: "연어" },
    { id: 41, label: "조개", value: "조개" },
    { id: 42, label: "오징어", value: "오징어" },
    { id: 43, label: "멸치", value: "멸치" },
  ];

  const toggleItem = (itemValue) => {
    if (allergy.includes(itemValue)) {
      setAllergy(allergy.filter((value) => value !== itemValue));
    } else {
      setAllergy([...allergy, itemValue]);
    }
  };

  const rows = [];
  for (let i = 0; i < items.length; i += 3) {
    const rowItems = items.slice(i, i + 3);
    const row = (
      <View key={i} style={styles.checkboxRow}>
        {rowItems.map((item) => (
          <View key={item.id} style={styles.check}>
            <Checkbox.Item
              key={item.id}
              label={item.label}
              status={allergy.includes(item.value) ? "checked" : "unchecked"}
              onPress={() => toggleItem(item.value)}
            />
          </View>
        ))}
      </View>
    );
    rows.push(row);
  }

  const nextRegister = () => {
    info.allergy = allergy;
    //여기에 넘어가기전 처리
    console.log(info);
    navigation.navigate("register4", info);
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
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>알레르기 정보</Text>
        </View>
        <View style={{ height: 10 }}></View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "80%" }}
        >
          {rows}
        </ScrollView>
        <View style={{ height: 10 }}></View>
      </View>
      <View style={{ flex: 2 }}>
        <ButtonComponent title="다음" onPress={nextRegister}></ButtonComponent>
      </View>
    </View>
  );
}

export default Register3;

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
  checkboxRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  check: {
    flex: 1,
    fontSize: 50,
    width: "100%",
  },
  inputBox: {
    width: "80%",
  },
  inputText: { fontSize: 20, marginLeft: 15 },
});
