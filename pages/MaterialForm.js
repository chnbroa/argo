import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const MaterialForm = () => {
  const route = useRoute();
  const { name, material } = route.params;

  const [summaries, setSummaries] = useState({}); // Store summaries for each item

  //테스트 예시 
  const showSummaryAlert = (item) => {
    console.log(`/material?name=${item}`);

    fetch(`${process.env.EXPO_PUBLIC_URI}/material?name=${item}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        Alert.alert(`${item}`, data.summary);
      })
      .catch(error => {
        console.error("material error:", error);
      });

  };


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{name} 상세보기</Text>
      <ScrollView style={styles.materialContainer} showsVerticalScrollIndicator={false}>
        {material.map((item, index) => (
          <TouchableOpacity key={index} style={styles.materialItem} onPress={() => showSummaryAlert(item)}>
            <Text style={styles.materialItemText} >{item}</Text>
            <MaterialCommunityIcons name="magnify" size={20} style={styles.searchIcon} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  materialContainer: {
    marginTop: 10,
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#CECECE',
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  materialItemText: {
    fontSize: 20,
  },
};

export default MaterialForm;