import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Vibration,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getData, saveData } from "../modules/storagy-service";
import { FontAwesome5 } from "@expo/vector-icons";
import { BarChart } from "react-native-gifted-charts";
import { useRoute } from "@react-navigation/native";

//product 설정
// const product = useRoute().params.responseData;
// const product = productJson;

const percentNutrition = async (savedNutrition) => {
  const userProfile = await getData("userProfile");
  const dailyRecommendedNutrition = {
    kcal: userProfile.kcal, //에너지
    protein: 55, //단백질
    fat: 54, // 지방
    glucide: 324, //탄수화물
    sugar: 100, // 당류
    dietaryfiber: 25, // 총 식이섬유
    calcium: 700, // 칼슘
    Iron: 12, //철
    magnesium: 315, // 마그네슘
    Potassium: 3500, // 칼륨
    Natrium: 2000, // 나트륨
    cholesterol: 300, //콜레스테롤
    fatty: 15, // 총 지방산 (포화지방산??)
  };

  const nutritionPercentages = {};
  Object.keys(savedNutrition).forEach((nutrient) => {
    if (dailyRecommendedNutrition[nutrient]) {
      // console.log(nutrient + "<<<< item");
      const percentage =
        (savedNutrition[nutrient] / dailyRecommendedNutrition[nutrient]) * 100;
      nutritionPercentages[nutrient] = Math.round(percentage * 10) / 10;
      // console.log(nutritionPercentages[nutrient] + "<<< 결과");
    }
  });
  return nutritionPercentages;
};

const Result = ({ navigation }) => {
  const product = useRoute().params.responseData;
  const [ResultNutrition, setResultNutrition] = useState({});
  const [DbPercentNutrition, setDbPercentNutrition] = useState({});
  const [ChartData, setChartData] = useState([]);
  useEffect(() => {
    let check = false;

    const temp = product.allergy
      .filter((item) => product.userallergy.includes(item))
      .map((item) => {
        check = true;
        return item;
      });
    if (check == true) {
      Vibration.vibrate();
      Alert.alert("알레르기 경고", temp + " 성분 검출");
    }

    percentNutrition(product.nutrition).then((data) => {
      setResultNutrition(data);
      const newChartData = [
        {
          value: data.glucide > 100 ? 100 : data.glucide,
          label: "탄수화물",
          frontColor: data.glucide > 100 ? theme.chartRed : "#FFC6A9",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.glucide}%</Text>
          ),
        },
        {
          value: data.protein > 100 ? 100 : data.protein,
          label: "단백질",
          frontColor: data.protein > 100 ? theme.chartRed : "#FFF3AE",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.protein}%</Text>
          ),
        },
        {
          value: data.fat > 100 ? 100 : data.fat,
          label: "지방",
          frontColor: data.fat > 100 ? theme.chartRed : "#B4E2FD",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.fat}%</Text>
          ),
        },
        {
          value: data.sugar > 100 ? 100 : data.sugar,
          label: "당류",
          frontColor: data.sugar > 100 ? theme.chartRed : "#D2F7AF",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.sugar}%</Text>
          ),
        },
        {
          value: data.Natrium > 100 ? 100 : data.Natrium,
          label: "나트륨",
          frontColor: data.Natrium > 100 ? theme.chartRed : "#ADC8FF",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.Natrium}%</Text>
          ),
        },
        {
          value: data.cholesterol > 100 ? 100 : data.cholesterol,
          label: "클레스테롤",
          frontColor: data.cholesterol > 100 ? theme.chartRed : "#FFA07E",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.cholesterol}%</Text>
          ),
        },
        {
          value: data.dietaryfiber > 100 ? 100 : data.dietaryfiber,
          label: "식이섬유",
          frontColor: data.cholesterol > 100 ? theme.chartRed : "#FFEB85",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.dietaryfiber}%</Text>
          ),
        },
        {
          value: data.calcium > 100 ? 100 : data.calcium,
          label: "칼슘",
          frontColor: data.calcium > 100 ? theme.chartRed : "#8ECDFB",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.calcium}%</Text>
          ),
        },
        {
          value: data.magnesium > 100 ? 100 : data.magnesium,
          label: "마그네슘",
          frontColor: data.magnesium > 100 ? theme.chartRed : "#ACE883",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.magnesium}%</Text>
          ),
        },
        {
          value: data.Iron > 100 ? 100 : data.Iron,
          label: "철분",
          frontColor: data.Iron > 100 ? theme.chartRed : "#ADC8FF",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.Iron}%</Text>
          ),
        },
        {
          value: data.Potassium > 100 ? 100 : data.Potassium,
          label: "칼륨",
          frontColor: data.Potassium > 100 ? theme.chartRed : "#FF7B5D",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.Potassium}%</Text>
          ),
        },
      ];

      setChartData(newChartData);

      getData("percentNutrition").then((data) => {
        setDbPercentNutrition(data);
      });
    });
  }, []);

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

  const DbNutritionBtn = () => {
    const updatedData = {};

    Object.entries(DbPercentNutrition).forEach(([property, value]) => {
      updatedData[property] =
        Math.round((ResultNutrition[property] + value) * 10) / 10;
    });

    console.log(updatedData);
    saveData("percentNutrition", updatedData).then(
      navigation.navigate("Chart")
    );
  };

  const goToMaterialForm = () => {
    navigation.navigate("MaterialForm", {
      name: product.name,
      material: product.material,
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", fontFamily: "BMHANNAPro" }}>
      <View style={{ flex: 1 }}></View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{product.name}</Text>
      </View>
      <View style={{ flex: 8, width: "90%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.gptText}>{product.prompt}</Text>
          </View>
          <View style={styles.section}>
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
                        <Text style={{ color: "red", fontFamily: "BMHANNAPro", }}>{item}</Text>
                      )}
                      {!product.userallergy.includes(item) && (
                        <Text style={{ fontFamily: "BMHANNAPro", }}>{item}</Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>
              <View style={{ flex: 0.1 }}></View>
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
                      <Text style={{ fontFamily: "BMHANNAPro", }}>{item}</Text>
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome5 name="search-plus" size={16} color="black" />
                <View style={{ width: 10 }}></View>
                <Text style={styles.nutritionButtonText}>원재료 상세 보기</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>검색 영양정보 </Text>
          </View>
          <View style={{ marginBottom: 30 }}>
            <BarChart
              isAnimated
              barWidth={40}
              noOfSections={2}
              maxValue={100}
              height={110}
              barBorderRadius={4}
              frontColor="lightgray"
              xAxisThickness={0}
              yAxisThickness={0}
              yAxisTextStyle={{ color: "gray" }}
              // height={200}
              onPress={(item, index) => console.log("item", item)}
              data={ChartData}
              yAxisLabelTexts={[" ", "50", "100"]}
              initialSpacing={20}
            // 상단 표기
            // renderTooltip={(item, index) => {
            //   return (
            //     <View
            //       style={{
            //         marginBottom: 20,
            //         marginLeft: -6,
            //         backgroundColor: '#ffcefe',
            //         paddingHorizontal: 6,
            //         paddingVertical: 4,
            //         borderRadius: 4,
            //       }}>
            //       <Text>{item.value}</Text>
            //     </View>
            //   );

            // }}
            />
          </View>

          <TouchableOpacity
            style={styles.nutritionButton}
            onPress={() => DbNutritionBtn(product)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.nutritionButtonText}>
                섭취 후 누적 영양소
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/*하단 버튼 */}
      <View style={styles.bottomButtonsContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    flex: 1.5,
  },
  headerText: {
    fontSize: 35,
    fontWeight: "bold",
    fontFamily: "BMHANNAPro",
  },
  gptText: { fontSize: 18, fontWeight: "600", fontFamily: "BMHANNAPro", },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "BMHANNAPro",
  },
  section: {
    marginVertical: 5,
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
    fontFamily: "BMHANNAPro",
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
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "BMHANNAPro",
  },
  nutritionSection: {
    marginTop: 10,
  },
  bottomButtonsContainer: {
    width: "90%",
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Center buttons vertically
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
    fontFamily: "BMHANNAPro",
  },
  nutritionButton: {
    backgroundColor: "#CECECE",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    // marginBottom: 20,
  },
});

export default Result;
