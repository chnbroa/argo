import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Splash from "./Splash";

function CameraForm({ navigation, route }) {
  const paymentData = route.params.key;
  //들어오는 paymentData 에 따라 API 설정,
  if (paymentData == "ocr") {
    API_URL = process.env.EXPO_PUBLIC_URI + "/ocr";
  }
  if (paymentData == "foodcnn") {
    API_URL = process.env.EXPO_PUBLIC_URI + "/foodcnn";
  }
  if (paymentData == "stockcnn") {
    API_URL = process.env.EXPO_PUBLIC_URI + "/stockcnn";
  }
  console.log("start::" + API_URL);

  const [splash, setSplash] = useState(null);

  const nextStep = () => {
    //여기에 넘어가기전 처리
    navigation.navigate("LoginForm");
  };

  const cameraRef = useRef(null);
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo);
      setPreviewVisible(true);
    }
  };

  const retakePicture = () => {
    setPreviewVisible(false);
    setCapturedImage(null);
  };
  const sendPicture = async () => {

    <CameraPreviewImage photo={capturedImage} />;
    if (capturedImage) {
      const formData = new FormData();
      formData.append("image", {
        uri: capturedImage.uri,
        type: capturedImage.type,
        name: "image.jpg",
      });

      try {
        console.log("try::" + API_URL);
        setSplash(true);
        const response = await fetch(API_URL, {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/formdata" },
        });
        // 서버로부터 받은 응답 처리
        //다음 페이지로 이동

        const responseData = await response.json();
        setSplash(false);
        console.log(responseData);
        if (responseData.idx == -1) {
          console.log("인식오류");
          Alert.alert("인식 오류");
        } else {
          navigation.navigate('Result', { responseData });
        }

        //확인 필요
        setPreviewVisible(false);
        setCapturedImage(null);
      } catch (error) {
        //오류처리 해주기.
        //ex) alter 인식 실패 , HOME 화면으로 이동?
        console.error("Error sending photo:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isPreviewVisible ? (
        <View style={styles.previewContainer}>
          <CameraPreviewImage photo={capturedImage} />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={retakePicture} style={styles.iconButton}>
              <MaterialCommunityIcons
                name="camera-retake"
                size={50}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={sendPicture} style={styles.iconButton}>
              <MaterialCommunityIcons name="send" size={50} color="black" />

            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Camera style={styles.camera} ref={cameraRef}>
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity onPress={takePicture}>
              <MaterialCommunityIcons name="camera" size={60} color="black" />
            </TouchableOpacity>

          </View>
        </Camera>
      )}
      {splash && <Splash />}
    </View>

  );
}

const CameraPreviewImage = ({ photo }) => (
  <View style={styles.previewImage}>
    {photo && <Image source={{ uri: photo.uri }} style={{ flex: 1 }} />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  captureButtonContainer: {
    marginBottom: 20,
  },
  previewContainer: {
    flex: 1,
  },
  previewImage: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  iconButton: {
    marginHorizontal: 60,
    marginTop: 10,
  },
});

export default CameraForm;
