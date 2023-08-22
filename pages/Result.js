import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { getData } from "../modules/storagy-service";

const productJson = {
  idx: 21,
  name: "바나나킥12",
  nutrition: {
    kcal: 40.4,
    protein: 10.1,
    fat: 10.1,
    glucides: 10.1,
    sugar: 10.1,
    "dietary fiber": 10.1,
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
  userallergy: ["오"],
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
    "해당 텍스트는 더미 데이터입니다. 해당 칸 레이아웃을 위해서 150자 정도 작성하여 고민중에 있습니다. 당연히 실제로는 분석 텍스트가 들어가겠죠?",
};

const Result = ({ navigation }) => {
  getData("percentNutrition").then((json) => console.log(json));
  // const product = useRoute().params.responseData;
  const saveBtn = () => {
    navigation.navigate("MainForm");
  };

  const deleteBtn = (idx) => {
    fetch(`${process.env.EXPO_PUBLIC_URI}/delete?idx=${idx}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          console.log("result_deleteBtn");
          navigation.navigate("MainForm");
        } else {
          console.log("delete code error ");
        }
      })
      .catch((error) => {
        console.error("delete error:", error);
      });

    // Navigate to the "MainForm" page
    //테스트
    // navigation.navigate("MainForm");
  };

  const product = productJson;

  console.log(product.responseData);
  const goToMaterialForm = () => {
    navigation.navigate("MaterialForm", {
      name: product.name,
      material: product.material,
    });
  };

  Vibration.vibrate();
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>{product.name}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{product.prompt}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Allergens and Hates:</Text>
        <View style={styles.tableContainer}>
          <View style={styles.box}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="alert"
                size={20}
                style={styles.icon}
              />
              <Text style={styles.iconText}>알레르기</Text>
            </View>
            <View style={styles.tableItems}>
              {product.allergy.map((item, index) => (
                <View key={index} style={styles.tableItem}>
                  {product.userallergy.includes(item) && (
                    <Text style={{ color: "red" }}>{item}</Text>
                  )}
                  {!product.userallergy.includes(item) && <Text>{item}</Text>}
                </View>
              ))}
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="alert"
                size={20}
                style={styles.icon}
              />
              <Text style={styles.iconText}>주의물질</Text>
            </View>
            <View style={styles.tableItems}>
              {product.hate.map((item, index) => (
                <View key={index} style={styles.tableItem}>
                  <Text>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.nutritionButton}
          onPress={goToMaterialForm}
        >
          <Text style={styles.nutritionButtonText}>원재료 상세 보기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>섭취 후 영양정보 </Text>
      </View>
      {/*하단 버튼 */}
      <View style={styles.bottomButtonsContainer}>
        {/* 취소 버튼만 따로 스타일 */}
        {/* 취소시 --> 요청 --> 메인 */}
        {/* 저장시 --> 메인 */}
        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: "#f79c9b" }]}
          onPress={() => deleteBtn(product.idx)}
        >
          <Text style={styles.bottomButtonText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={saveBtn}>
          <Text style={styles.bottomButtonText}>저장</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 35,
    marginBottom: 10,
    fontWeight: "bold",
  },
  section: {
    marginTop: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tableContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  box: {
    flex: 1,
    backgroundColor: "#CECECE",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  iconText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tableItems: {
    marginTop: 10,
  },
  tableItem: {
    marginBottom: 10,
  },
  nutritionButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  nutritionButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  nutritionSection: {
    marginTop: 10,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Center buttons vertically
    marginTop: 20,
  },
  bottomButton: {
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
    backgroundColor: "#CECECE",
  },
  bottomButtonText: {
    fontSize: 18,
    textAlign: "center",
  },
  nutritionButton: {
    backgroundColor: "#CECECE",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    // marginBottom: 20,
  },
  nutritionButtonText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Result;
