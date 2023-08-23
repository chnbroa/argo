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
function MainForm({ navigation }) {
  const [userProfile, setUserProfile] = useState({
    name: "홍길동",
    age: 26,
    sex: "M",
    allergy: ["oranges", "apples"],
    hate: ["cucumber", "carrot"],
    weight: 70,
    height: 180,
    kacl: 2200,
  });

  const [foods, setFoods] = useState([]);

  const [cumulativeNutrition, setCumulativeNutrition] = useState({});
  const [dbPercentNutrition, setDbPercentNutrition] = useState({});
  const [chartData, setChartData] = useState([]);
  // Simulating the received JSON response
  const mockApiResponse = {
    foods: [
      {
        name: "이름",
        nutrition: {
          kcal: 1000.4,
          protein: 10.1,
          fat: 10.1,
          glucide: 10.1,
          sugar: 10.1,
          dietaryfiber: 10.1,
          calcium: 10.1,
          Iron: 0,
          magnesium: 10.1,
          caffeine: 10.1,
          Potassium: 10.1,
          Natrium: 10.1,
          vitamin: 10.1,
          cholesterol: 10.1,
          fatty: 0,
          transfat: 10.1,
        },
        date: "YYYY-MM-DD",
        hate: ["유해", "물질"],
      },
      {
        name: "이름1",
        nutrition: {
          kcal: 500.4,
          protein: 10.1,
          fat: 10.1,
          glucide: 10.1,
          sugar: 10.1,
          dietaryfiber: 10.1,
          calcium: 10.1,
          Iron: 0,
          magnesium: 10.1,
          caffeine: 10.1,
          Potassium: 10.1,
          Natrium: 10.1,
          vitamin: 10.1,
          cholesterol: 10.1,
          fatty: 10.1,
          transfat: 10.1,
        },
        date: "YYYY-MM-DD",
        hate: ["유해", "물질"],
      },
      {
        name: "이름3",
        nutrition: {
          kcal: 52.4,
          protein: 10.1,
          fat: 10.1,
          glucide: 100.1,
          sugar: 10.1,
          dietaryfiber: 10.1,
          calcium: 10.1,
          Iron: 0,
          magnesium: 10.1,
          caffeine: 10.1,
          Potassium: 10.1,
          Natrium: 10.1,
          vitamin: 10.1,
          cholesterol: 10.1,
          fatty: 10.1,
          transfat: 10.1,
        },
        date: "YYYY-MM-DD",
        hate: ["유해", "물질"],
      },
    ],
  };

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
  const percentNutrition = (savedNutrition) => {
    const dailyRecommendedNutrition = {
      // kacl 로그인에서 가져오기
      kcal: userProfile.kacl, //에너지
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
        console.log(nutrient + "<<<< item");
        const percentage =
          (savedNutrition[nutrient] / dailyRecommendedNutrition[nutrient]) * 100;
        nutritionPercentages[nutrient] = Math.round(percentage * 10) / 10;
        // console.log(nutritionPercentages[nutrient] + "<<< 결과");
      }
    });
    return nutritionPercentages;
  };


  useEffect(() => {
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
    // fetch(process.env.EXPO_PUBLIC_URI + "/todayfood", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // Add any required request body here
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log(data);
    //     // setFoods(data.foods);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching food data:", error);
    //   });

    setFoods(mockApiResponse.foods);

    //비동기 문제
    console.log(calculateCumulativeNutrition(mockApiResponse.foods));
    saveData("Nutrition", calculateCumulativeNutrition(mockApiResponse.foods));
    //영양성분 불러와서 setCumulativeNutrition 넣어주기
    getData("Nutrition").then((data) => {
      setCumulativeNutrition(data);

      //percent 계산
      const nutritionPercentages = percentNutrition(data);
      console.log("Nutrition Percentages:", nutritionPercentages);

      //percent 저장
      saveData("percentNutrition", nutritionPercentages);

      //percent 가져오기
      getData("percentNutrition").then((data) => {
        setDbPercentNutrition(data);
        const newChartData = [
          {
            value: data.kcal, label: '에너지', frontColor: '#4ABFF4',
            topLabelComponent: () => (
              <Text style={{ fontSize: 12 }}>{data.kcal}%</Text>
            )
          },
          {
            value: data.glucide, label: '탄수화물', frontColor: '#79C3DB',
            topLabelComponent: () => (
              <Text style={{ fontSize: 12 }}>{data.glucide}%</Text>
            )
          },
          {
            value: data.protein, label: '단백질', frontColor: '#28B2B3',
            topLabelComponent: () => (
              <Text style={{ fontSize: 12 }}>{data.protein}%</Text>
            )
          },
          {
            value: data.fat, label: '지방', frontColor: '#4ADDBA',
            topLabelComponent: () => (
              <Text style={{ fontSize: 12 }}>{data.fat}%</Text>
            )
          }];

        setChartData(newChartData);
      });
    });
  }, []);

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



  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello, {userProfile.name}!</Text>
      </View>
      {console.log(foods.kcal)}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>검색하기</Text>
        <Text>사진을 통한간편한 인식</Text>
      </View>

      <View style={styles.cameraButtons}>
        <TouchableOpacity
          style={styles.camerabtn}
          onPress={() => cameraRoute("ocr")}
        >
          <Text style={styles.cameratitle}>성분표</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.camerabtn}
          onPress={() => cameraRoute("foodcnn")}
        >
          <Text style={styles.cameratitle}>음식사진</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.camerabtn}
          onPress={() => cameraRoute("stockcnn")}
        >
          <Text style={styles.cameratitle}>제품사진</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>오늘 먹은 음식</Text>
        <Text>오늘 먹은 음식 한번에 보기</Text>
      </View>

      <ScrollView style={styles.foodList} showsVerticalScrollIndicator={false}>
        <View style={styles.scrollViewContent}>
          {foods.map((food, index) => (
            <TouchableOpacity key={index} style={styles.foodSlide}>
              <Text style={styles.foodName}>{food.name}</Text>
              <Text style={styles.foodKcal}>{food.nutrition.kcal} kcal</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>일일 영양성분</Text>
        <Text>누적 영양성분 확인</Text>

        <View style={styles.chart}>
          <BarChart
            isAnimated
            barWidth={40}
            noOfSections={2}
            maxValue={100}
            barBorderRadius={4}
            frontColor="lightgray"
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: 'gray' }}
            // height={200}
            onPress={(item, index) => console.log('item', item)}
            data={chartData}
            yAxisLabelTexts={[' ', '50', '100']}



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






      <View style={styles.section}>
        <Text style={styles.sectionTitle}>오늘의 레시피</Text>
        <Text>인공지능 챗봇으로 레시피제작</Text>
        <ButtonComponent
          title="챗봇"
          onPress={() => {
            navigation.navigate("Chat");
          }}
        ></ButtonComponent>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    marginBottom: 10,
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
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
    backgroundColor: "#CECECE",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cameratitle: {
    fontSize: 18,
    textAlign: "center",
  },
  foodList: {
    flexGrow: 0.38,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  foodSlide: {
    width: "80%",
    backgroundColor: "#CECECE",
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  foodKcal: {
    fontSize: 16,
  },
  chart: {
    marginBottom: 50
  },
});

export default MainForm;
