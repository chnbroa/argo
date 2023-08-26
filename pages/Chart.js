import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import ButtonComponent from "../components/ButtonComponent";
import { getData, saveData } from "../modules/storagy-service";
import { BarChart } from "react-native-gifted-charts";
import { PieChart } from "react-native-gifted-charts";
import { theme } from "../assets/colors"

function Chart({ navigation }) {

  const [cumulativeNutrition, setCumulativeNutrition] = useState({});
  const [dbPercentNutrition, setDbPercentNutrition] = useState({});
  const [chartData, setChartData] = useState([]);
  const [piechartData, setPieChartData] = useState([]);
  const mainform = () => {
    navigation.navigate("Mainform");
  };


  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 30,
            marginBottom: 10,

          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 150,
              marginBottom: 10
            }}>
            {renderDot('#8ECDFB')}
            <Text style={{ color: 'black', fontWeight: 'bold', fontFamily: "BMHANNAPro" }}>소비 칼로리 : {dbPercentNutrition.kcal}%</Text>
          </View>

          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 150 }}>
            {renderDot('#FFA07E')}
            <Text style={{ color: 'black', fontWeight: 'bold', fontFamily: "BMHANNAPro" }}>남은 칼로리:  {Math.round((100 - dbPercentNutrition.kcal) * 10) / 10}%</Text>
          </View>



        </View>
      </>
    );
  };



  useEffect(() => {
    getData("percentNutrition").then((data) => {
      setDbPercentNutrition(data);

      const newPieChartDate = [
        {
          value: data.kcal <= 100 ? data.kcal : 100,
          color: '#009FFF',
          gradientCenterColor: '#8ECDFB',
          focused: true,
        },
        { value: (100 - data.kcal) >= 0 ? 100 - data.kcal : 0, color: '#FFA5BA', gradientCenterColor: '#FFA07E' }
      ];

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
          label: '단백질',
          frontColor: data.protein > 100 ? theme.chartRed : "#FFF3AE",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.protein}%</Text>
          )
        },
        {
          value: data.fat > 100 ? 100 : data.fat,
          label: '지방',
          frontColor: data.fat > 100 ? theme.chartRed : "#B4E2FD",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.fat}%</Text>
          )
        },
        {
          value: data.sugar > 100 ? 100 : data.sugar,
          label: '당류',
          frontColor: data.sugar > 100 ? theme.chartRed : "#D2F7AF",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.sugar}%</Text>
          )
        },
        {
          value: data.Natrium > 100 ? 100 : data.Natrium,
          label: '나트륨',
          frontColor: data.Natrium > 100 ? theme.chartRed : "#ADC8FF",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.Natrium}%</Text>
          )
        },
        {

          value: data.cholesterol > 100 ? 100 : data.cholesterol,
          label: '클레스테롤',
          frontColor: data.cholesterol > 100 ? theme.chartRed : "#FFA07E",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.cholesterol}%</Text>
          )

        },
        {

          value: data.dietaryfiber > 100 ? 100 : data.dietaryfiber,
          label: '식이섬유',
          frontColor: data.cholesterol > 100 ? theme.chartRed : "#FFEB85",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.dietaryfiber}%</Text>
          )
        },
        {

          value: data.calcium > 100 ? 100 : data.calcium,
          label: '칼슘',
          frontColor: data.calcium > 100 ? theme.chartRed : "#8ECDFB",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.calcium}%</Text>
          )

        },
        {

          value: data.magnesium > 100 ? 100 : data.magnesium,
          label: '마그네슘',
          frontColor: data.magnesium > 100 ? theme.chartRed : "#ACE883",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.magnesium}%</Text>
          )
        },
        {
          value: data.Iron > 100 ? 100 : data.Iron,
          label: '철분',
          frontColor: data.Iron > 100 ? theme.chartRed : "#ADC8FF",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.Iron}%</Text>
          )
        },
        {
          value: data.Potassium > 100 ? 100 : data.Potassium,
          label: '칼륨',
          frontColor: data.Potassium > 100 ? theme.chartRed : "#FF7B5D",
          topLabelComponent: () => (
            <Text style={{ fontSize: 12 }}>{data.Potassium}%</Text>
          )
        },
      ];
      setChartData(newChartData);
      setPieChartData(newPieChartDate);
    })

  }, []);


  return (
    <View
      style={{
        paddingVertical: 50,
        backgroundColor: '#ffffff',
        flex: 1,
      }}>
      <View
        style={{
          margin: 10,
          padding: 16,
          paddingBottom: 130,
          borderRadius: 20,
          backgroundColor: '#ffffff',
        }}>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', fontFamily: "BMHANNAPro" }}>
          누적 영양 성분
        </Text>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <PieChart
            data={piechartData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={'#ffffff'}
            centerLabelComponent={() => {
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text
                    style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>
                    {dbPercentNutrition.kcal}%
                  </Text>
                  <Text style={{ fontSize: 14, color: 'black' }}>칼로리</Text>
                </View>
              );
            }}
          />
        </View>
        {renderLegendComponent()}

        <View style={{
          marginTop: 20
        }}>
          <BarChart
            horizontal
            intactTopLabel
            isAnimated
            barWidth={45}
            noOfSections={2}
            maxValue={100}
            width={360}
            barBorderRadius={4}
            frontColor="lightgray"
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: 'black' }}
            // height={200}
            onPress={(item, index) => console.log('item', item)}
            data={chartData}
            yAxisLabelTexts={[' ', '50', '100']}
            spacing={40}
            xAxisLabelTextStyle={styles.chartX}
            hideYAxisText
            xAxisTextNumberOfLines={7}
            labelWidth={50}
            // 추가 높이
            labelsExtraHeight={20}
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

    </View>
  );
}


const styles = StyleSheet.create({
  chart: {
    margin: 24,
    padding: 16,
    borderRadius: 20,
    // backgroundColor: '#232B5D',

  },
  chartX: {
    marginBottom: 100,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Chart;
