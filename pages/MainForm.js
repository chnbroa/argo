import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Camera } from 'expo-camera';
import { ProgressChart } from 'react-native-chart-kit';

function MainForm({ navigation }) {

  const [userProfile, setUserProfile] = useState({
    name: "홍길동",
    age: 26,
    sex: "M",
    allergy: ["oranges", "apples"],
    hate: ["cucumber", "carrot"],
    weight: 70,
    height: 180,
  });

  const [foods, setFoods] = useState([]);

  const [cumulativeNutrition, setCumulativeNutrition] = useState({

    // Add more nutrients here
  });


  // Simulating the received JSON response
  const mockApiResponse = {
    "foods": [
      {
        "name": "이름",
        "nutrition": {
          "kcal": 40.4,
          "protein": 10.1,
          "fat": 10.1,
          "glucide": 10.1,
          "sugar": 10.1,
          "dietaryfiber": 10.1,
          "calcium": 10.1,
          "Iron": 10.1,
          "magnesium": 10.1,
          "caffeine": 10.1,
          "Potassium": 10.1,
          "Natrium": 10.1,
          "vitamin": 10.1,
          "cholesterol": 10.1,
          "fatty": 10.1,
          "transfat": 10.1
        },
        "date": "YYYY-MM-DD",
        "hate": ["유해", "물질"]
      },
      {
        "name": "이름1",
        "nutrition": {
          "kcal": 500.4,
          "protein": 10.1,
          "fat": 10.1,
          "glucide": 10.1,
          "sugar": 10.1,
          "dietaryfiber": 10.1,
          "calcium": 10.1,
          "Iron": 10.1,
          "magnesium": 10.1,
          "caffeine": 10.1,
          "Potassium": 10.1,
          "Natrium": 10.1,
          "vitamin": 10.1,
          "cholesterol": 10.1,
          "fatty": 10.1,
          "transfat": 10.1
        },
        "date": "YYYY-MM-DD",
        "hate": ["유해", "물질"]
      },
      {
        "name": "이름3",
        "nutrition": {
          "kcal": 52.4,
          "protein": 10.1,
          "fat": 10.1,
          "glucide": 10.1,
          "sugar": 10.1,
          "dietaryfiber": 10.1,
          "calcium": 10.1,
          "Iron": 10.1,
          "magnesium": 10.1,
          "caffeine": 10.1,
          "Potassium": 10.1,
          "Natrium": 10.1,
          "vitamin": 10.1,
          "cholesterol": 10.1,
          "fatty": 10.1,
          "transfat": 10.1
        },
        "date": "YYYY-MM-DD",
        "hate": ["유해", "물질"]
      },
    ]
  };

  const calculateCumulativeNutrition = (foods) => {
    const initialCumulativeNutrition = {
      kcal: 0,
      protein: 0,
      fat: 0,
      glucides: 0,
      sugar: 0,
      dietaryfiber: 0,
      calcium: 0,
      Iron: 0,
      magnesium: .0,
      caffeine: 0,
      Potassium: 0,
      Natrium: 0,
      vitamin: 0,
      cholesterol: 0,
      fatty: 0,
      transfat: 0
      // Add more nutrients here
    };

    return foods.reduce((cumulative, food) => {
      Object.keys(food.nutrition).forEach(nutrient => {
        cumulative[nutrient] = (cumulative[nutrient] || 0) + food.nutrition[nutrient];
        cumulative[nutrient] = parseFloat(cumulative[nutrient].toFixed(2));
      });
      return cumulative;
    }, initialCumulativeNutrition);
  };



  useEffect(() => {

    const calculatedCumulativeNutrition = calculateCumulativeNutrition(mockApiResponse.foods);
    setCumulativeNutrition(calculatedCumulativeNutrition);


    // Fetch data from API endpoint here
    // fetch("/todayfood", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // Add any required request body here
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Update the foods state with the received data
    //     setFoods(data.foods);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching food data:", error);
    //   });

    setFoods(mockApiResponse.foods);
  }, []);

  cameraRoute = async (route) => {
    //여기에 넘어가기전 처리
    const { status } = await Camera.requestCameraPermissionsAsync();

    // 권한을 획득하면 status가 granted 상태가 됩니다.
    if (status === 'granted') {
      // 권한이 있으면 페이지 이동
      navigation.navigate('CameraForm', { "key": route });
    } else {
      Alert.alert('카메라 접근 허용은 필수입니다.');
    }
  };

  /**
   * 오늘 해야할일!!!!
   *  1. 버튼 수정
   *  2. JSON으로 이름 설정
   *  3. JSON으로 오늘 먹은 음식 슬라이드 만들기
   *  4. 그래프  그리기???!?
   */
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello, {userProfile.name}!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>검색하기</Text>
        <Text>사진을 통한간편한 인식</Text>
      </View>

      <View style={styles.cameraButtons}>
        <TouchableOpacity style={styles.camerabtn} onPress={() => cameraRoute("ocr")}>
          <Text style={styles.cameratitle}>성분표</Text>

        </TouchableOpacity>
        <TouchableOpacity style={styles.camerabtn} onPress={() => cameraRoute("foodcnn")}>
          <Text style={styles.cameratitle}>음식사진</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.camerabtn} onPress={() => cameraRoute("stockcnn")}>
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
        {/* 누적 (칼로리 탄수화물 단백질 지방 )영양성분 차트 */}
        {/* 더보기 버튼 */}
      </View>
      <ProgressChart
        data={{
          labels: ['Calories', 'Carbs', 'Protein', 'Fat'],
          data: [
            cumulativeNutrition.kcal / 100,
            (cumulativeNutrition.glucides + cumulativeNutrition.sugar) / 100,
            cumulativeNutrition.protein / 100,
            cumulativeNutrition.fat / 100,
          ],
        }}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color of chart elements
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color of labels
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <TouchableOpacity
        style={styles.moreButton}
        onPress={() => {
          // navigation.navigate('CumulativeNutritionPage', {
          //   cumulativeNutrition: cumulativeNutrition,} );

          console.log(cumulativeNutrition)
        }}
      >
        <Text style={styles.moreButtonText}>더보기</Text>
      </TouchableOpacity>
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
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cameraButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  camerabtn: {
    width: 100,
    height: 100,
    backgroundColor: '#CECECE',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameratitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  foodList: {
    flexGrow: 0.42,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  foodSlide: {
    width: '80%',
    backgroundColor: '#CECECE',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodKcal: {
    fontSize: 16,
  },
});




export default MainForm;
