import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonComponent from "../components/ButtonComponent";
import { getData, saveData } from "../modules/storagy-service";
import { BarChart } from "react-native-gifted-charts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { theme } from "../assets/colors";
import { btntheme } from "../assets/buttonstyle";
function MainForm({ navigation }) {
  const [userProfile, setUserProfile] = useState({
    name: "",
    age: 26,
    sex: "M",
    allergy: ["oranges", "apples"],
    hate: ["cucumber", "carrot"],
    weight: 70,
    height: 180,
    kcal: 2200,
  });

  const [foods, setFoods] = useState([]);

  const [cumulativeNutrition, setCumulativeNutrition] = useState({});
  const [dbPercentNutrition, setDbPercentNutrition] = useState({});
  const [chartData, setChartData] = useState([]);
  const [welcome, setWelcome] = useState("안녕하세요.");
  // Simulating the received JSON response
  // const mockApiResponse = {
  //   foods: [
  //     {
  //       name: "햄버거",
  //       nutrition: {
  //         kcal: 1000.4,
  //         protein: 10.1,
  //         fat: 10.1,
  //         glucide: 10.1,
  //         sugar: 10.1,
  //         dietaryfiber: 10.1,
  //         calcium: 10.1,
  //         Iron: 0,
  //         magnesium: 10.1,
  //         caffeine: 10.1,
  //         Potassium: 10.1,
  //         Natrium: 10.1,
  //         vitamin: 10.1,
  //         cholesterol: 10.1,
  //         fatty: 0,
  //         transfat: 10.1,
  //       },
  //       date: "YYYY-MM-DD",
  //       hate: ["유해", "물질"],
  //     },
  //     {
  //       name: "바나나킥",
  //       nutrition: {
  //         kcal: 500.4,
  //         protein: 10.1,
  //         fat: 10.1,
  //         glucide: 10.1,
  //         sugar: 10.1,
  //         dietaryfiber: 10.1,
  //         calcium: 10.1,
  //         Iron: 0,
  //         magnesium: 10.1,
  //         caffeine: 10.1,
  //         Potassium: 10.1,
  //         Natrium: 10.1,
  //         vitamin: 10.1,
  //         cholesterol: 10.1,
  //         fatty: 10.1,
  //         transfat: 10.1,
  //       },
  //       date: "YYYY-MM-DD",
  //       hate: ["유해", "물질"],
  //     },
  //     {
  //       name: "치킨",
  //       nutrition: {
  //         kcal: 52.4,
  //         protein: 10.1,
  //         fat: 10.1,
  //         glucide: 100.1,
  //         sugar: 10.1,
  //         dietaryfiber: 10.1,
  //         calcium: 10.1,
  //         Iron: 0,
  //         magnesium: 10.1,
  //         caffeine: 10.1,
  //         Potassium: 10.1,
  //         Natrium: 10.1,
  //         vitamin: 10.1,
  //         cholesterol: 10.1,
  //         fatty: 10.1,
  //         transfat: 10.1,
  //       },
  //       date: "YYYY-MM-DD",
  //       hate: ["유해", "물질"],
  //     },
  //   ],
  // };

  const calculateCumulativeNutrition = (foods) => {
    const initialCumulativeNutrition = {
      kcal: 0, //에너지
      protein: 0, //단백질
      fat: 0, // 지방
      glucide: 0, //탄수화물
      sugar: 0, //총 당류
      dietaryfiber: 0, // 총 식이섬유
      calcium: 0, // 칼슘
      Iron: 0, //철
      magnesium: 0, // 마그네슘
      caffeine: 0, // 카페인
      Potassium: 0, // 칼륨
      Natrium: 0, // 나트륨
      vitamin: 0, // 비타민
      cholesterol: 0, //콜레스테롤
      fatty: 0, // 총 지방산
      transfat: 0, //트랜스 지방
    };

    return foods.reduce((cumulative, food) => {
      Object.keys(food.nutrition).forEach((nutrient) => {
        cumulative[nutrient] =
          (cumulative[nutrient] || 0) + food.nutrition[nutrient];
        cumulative[nutrient] = parseFloat(cumulative[nutrient].toFixed(2));
      });

      return cumulative;
    }, initialCumulativeNutrition);
  };
  const nutritionTranslator = {
    //변환기
    kcal: "칼로리",
    protein: "단백질",
    fat: "지방",
    glucide: "탄수화물",
    sugar: "총 당류",
    dietaryfiber: "총 식이섬유",
    calcium: "칼슘",
    Iron: "철",
    magnesium: "마그네슘",
    caffeine: "카페인",
    Potassium: "칼륨",
    Natrium: "나트륨",
    vitamin: "비타민",
    cholesterol: "콜레스테롤",
    fatty: "총 지방산",
    transfat: "트랜스 지방",
  };

  const percentNutrition = (savedNutrition) => {
    const dailyRecommendedNutrition = {
      // kcal 로그인에서 가져오기
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
          (savedNutrition[nutrient] / dailyRecommendedNutrition[nutrient]) *
          100;
        nutritionPercentages[nutrient] = Math.round(percentage * 10) / 10;
        // console.log(nutritionPercentages[nutrient] + "<<< 결과");
      }
    });
    return nutritionPercentages;
  };

  cameraRoute = async (route) => {
    //여기에 넘어가기전 처리
    const { status } = await Camera.requestCameraPermissionsAsync();

    // 권한을 획득하면 status가 granted 상태가 됩니다.
    if (status === "granted") {
      // 권한이 있으면 페이지 이동
      navigation.navigate("CameraForm", { key: route });
    } else {
      Alert.alert("카메라 접근 허용은 필수입니다.");
    }
  };

  useEffect(
    () =>
      navigation.addListener("focus", () => {
        //로그인 --> 회원정보
        fetch(process.env.EXPO_PUBLIC_URI + "/login", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            //저장
            // saveData("userProfile", data);
            setUserProfile(data);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
        saveData("userProfile", userProfile);
        // getData("userProfile").then(data => setUserProfile(data));

        //todayfood

        // Fetch data from API endpoint here
        fetch(process.env.EXPO_PUBLIC_URI + "/todayfood", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // Add any required request body here
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);\
            console.log(data.foods);
            setFoods(data.foods);
            saveData("foods", data.foods);
            return data.foods;
          })
          .then((food) => {
            const nutrition = calculateCumulativeNutrition(food);
            console.log(nutrition);
            saveData("Nutrition", nutrition);
            // setCumulativeNutrition(nutrition);
            return nutrition;
          })
          .then((nutrition) => {
            const nutritionPercentages = percentNutrition(nutrition);
            saveData("percentNutrition", nutritionPercentages);
            // setDbPercentNutrition(nutritionPercentages);
            return nutritionPercentages;
          })
          .then((data) => {
            setDbPercentNutrition(data);
            const newChartData = [
              {
                value: data.kcal > 100 ? 100 : data.kcal,
                label: "에너지",
                frontColor: data.kcal > 100 ? theme.chartRed : "#FFA07E",
                topLabelComponent: () => (
                  <Text style={{ fontSize: 12 }}>{data.kcal}%</Text>
                ),
              },
              {
                value: data.glucide > 100 ? 100 : data.glucide,
                label: "탄수화물",
                frontColor: data.glucide > 100 ? theme.chartRed : "#FFE367",
                topLabelComponent: () => (
                  <Text style={{ fontSize: 12 }}>{data.glucide}%</Text>
                ),
              },
              {
                value: data.protein > 100 ? 100 : data.protein,
                label: "단백질",
                frontColor: data.protein > 100 ? theme.chartRed : "#72B9F8",
                topLabelComponent: () => (
                  <Text style={{ fontSize: 12 }}>{data.protein}%</Text>
                ),
              },
              {
                value: data.fat > 100 ? 100 : data.fat,
                label: "지방",
                frontColor: data.fat > 100 ? theme.chartRed : "#86D260",
                topLabelComponent: () => (
                  <Text style={{ fontSize: 12 }}>{data.fat}%</Text>
                ),
              },
            ];

            return newChartData;
          })
          .then((newChartData) => {
            setChartData(newChartData);
          })

          .catch((error) => {
            console.error("Error fetching food data:", error);
          });

        // setFoods(mockApiResponse.foods);
        // saveData("foods", data.foods);
        getData("percentNutrition").then((data) => {
          console.log(data);
          if (data.kcal == 0) {
            setWelcome("오늘 음식정보를 입력해 주세요");
          } else {
            const maxValue = Math.max(...Object.values(data));
            const maxKey = Object.keys(data).find(
              (key) => data[key] === maxValue
            );
            setWelcome(
              nutritionTranslator[maxKey] + " 섭취가 많아요, 주의해주세요!"
            );
          }
        });
      }),
    []
  );

  return (
    //가운데만 마춰서
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <ScrollView style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              <Text style={{ fontSize: 26 }}>
                {userProfile.name}님 안녕하세요.
              </Text>
            </Text>
            <Text style={styles.headerText}>{welcome}</Text>
          </View>

          <View style={styles.searchbox}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>검색하기</Text>
              <Text>사진을 통한간편한 인식</Text>
            </View>
            <View style={styles.cameraButtons}>
              <TouchableOpacity
                style={styles.camerabtn}
                onPress={() => cameraRoute("ocr")}
              >
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={50}
                  color="#22577a"
                />
                <Text style={styles.cameratitle}>성분표</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.camerabtn}
                onPress={() => cameraRoute("foodcnn")}
              >
                <MaterialCommunityIcons
                  name="food-turkey"
                  size={50}
                  color="#ca6702"
                />
                <Text style={styles.cameratitle}>음식사진</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.camerabtn}
                onPress={() => cameraRoute("stockcnn")}
              >
                <Octicons name="package" size={50} color="#ae2012" />
                <Text style={styles.cameratitle}>제품사진</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.foodbox}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>오늘 먹은 음식</Text>
              <Text>오늘 먹은 음식 한번에 보기</Text>
            </View>
            <ScrollView
              style={styles.foodList}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.scrollViewContent}>
                {foods.map((food, index) => (
                  <TouchableOpacity key={index} style={styles.foodSlide}>
                    <Text style={styles.foodName}>
                      {" "}
                      {food.name.length > 9
                        ? `${food.name.slice(0, 9)}...`
                        : food.name}
                    </Text>
                    <Text style={styles.foodKcal}>
                      {Math.round(food.nutrition.kcal * 10) / 10} kcal
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={{ width: "90%", marginTop: 20 }}>
            <View style={styles.chart}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>일일 영양성분</Text>
                <Text>누적 영양성분 확인</Text>
              </View>
              <View style={{ marginRight: 10 }}>
                <BarChart
                  isAnimated
                  barWidth={45}
                  noOfSections={2}
                  maxValue={100}
                  barBorderRadius={4}
                  frontColor="lightgray"
                  xAxisThickness={0}
                  yAxisThickness={0}
                  yAxisTextStyle={{ color: "gray" }}
                  // height={200}
                  onPress={(item, index) => console.log("item", item)}
                  data={chartData}
                  yAxisLabelTexts={[" ", "50", "100"]}
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
            </View>


            <TouchableOpacity
              style={btntheme.boderBtn}
              onPress={() => navigation.navigate("Chart")}
            >
              <View>
                <Text style={btntheme.buttonText}>
                  누적 영양소
                </Text>
              </View>
            </TouchableOpacity>





          </View>



          <View style={styles.section}>
            <Text style={styles.sectionTitle}>오늘의 레시피</Text>
            <Text>인공지능 챗봇으로 레시피제작</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", marginTop: 10 }}>

              <TouchableOpacity
                style={[btntheme.boderBtn, { width: "45%" }]}
                onPress={() => navigation.navigate("MainChat")}
              >
                <View>
                  <Text style={btntheme.buttonText}>
                    메인챗봇
                  </Text>
                </View>
              </TouchableOpacity>

              {/* [styles.bottomButton, { backgroundColor: "#f79c9b" }] */}
              <TouchableOpacity
                style={[btntheme.boderBtn, { width: "45%" }]}
                onPress={() => navigation.navigate("SubChat")}
              >
                <View>
                  <Text style={btntheme.buttonText}>
                    서브챗봇
                  </Text>
                </View>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingTop: 10,
  },
  header: {
    marginBottom: 20,
    justifyContent: "center",
    width: "85%",
    height: 100,
  },
  headerText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  section: {
    width: "90%",
    marginVertical: 15,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cameraButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  camerabtn: {
    width: 100,
    height: 100,
    // borderWidth: 0.5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",

    fontWeight: "bold",
    // borderColor: theme.grey,
  },
  searchbox: {
    backgroundColor: "#f4f3ee",
    width: "90%",
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 9,
    borderRadius: 8,
  },
  cameratitle: {
    marginTop: 8,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "BMHANNAPro",
  },
  foodList: {
    height: 170,
    marginVertical: 14,
  },
  scrollViewContent: {
    opacity: 0.8,
    alignItems: "center",
  },
  foodbox: {
    marginTop: 20,
    backgroundColor: "#f4f3ee",
    width: "90%",
    height: 250,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
  },
  foodSlide: {
    width: "90%",
    backgroundColor: "#f4f3ee",
    borderRadius: 15,
    marginVertical: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 100,
    marginLeft: 100,
    borderWidth: 0.5,
    borderColor: theme.grey,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  foodKcal: {
    fontSize: 16,
  },
  chart: {
    backgroundColor: "#f4f3ee",
    width: "100%",
    height: 370,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default MainForm;
