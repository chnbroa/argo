import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { theme } from "../assets/colors";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

function Chat({ navigation }) {
  const [scrollViewFlex, setScrollViewFlex] = useState(1); // 초기 flex 값
  const scrollViewRef = useRef();
  const [messages, setMessages] = useState([
    {
      content: `If the user tells me the food I ate today, calories, nutrients, and the standard of daily video intake, I need to recommend the next food I will eat accordingly. Also, please recommend a diet according to the current time
      The five conditions must be determined comprehensively. [Except for allergies and foods you don't like,If the nutritional intake standard is exceeded, low-nutritive food is recommended if the nutrient content is insufficient, high-nutritive food is recommended, and all nutrients are comprehensively determined]
      First, I'll tell you the standard of video intake per day [{"kcal": 1500.0, "protein": 55.0, "fat": 54.0, "glucide": 324.0, "sugar": 100.0, "dietaryfiber": 25.0, "calcium": 700.0, "Iron": 12.0, "magnesium": 315, "caffeine": 0, "Potassium": 3500.0, "Natrium": 2000.0, "vitamin": 0.0, "cholesterol": 300.0, "fatty": 0.0, "transfat": 0}]
      Then I'll tell you what the user ate today. [햄버거,마라탕,바나나킥] And the total calories and nutrients that I ate today are
      {"kcal": 500.0, "protein": 60.0, "fat": 5.0, "glucide": 10.0, "sugar": 15.0, "dietaryfiber": 0.0, "calcium": 0.0, "Iron": 0.0, "magnesium": 0, "caffeine": 0, "Potassium": 0.0, "Natrium": 45.0, "vitamin": 0.0, "cholesterol": 0.0, "fatty": 0.0, "transfat": 0} It's 18 o'clock now Allergy is[우유,연어], food I hate is[피망,연어,상추]
      From now on, only when the user asks about the diet, "Only list with the diet and reason and recommend 3 or 4 of them" and "Unconditionally print it within 200 characters." Print out in Korean`,
      role: "system",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  console.log(messages);
  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const newUserMessage = { role: "user", content: inputMessage };
    const newMessages = [...messages, newUserMessage]; // 기존 메시지 + 새 사용자 메시지
    setMessages(newMessages);
    setInputMessage("");

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.EXPO_PUBLIC_GPT_KEY,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: newMessages, // 수정된 메시지 배열 전송
            temperature: 1,
            max_tokens: 512,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      const botMessage = responseData.choices[0].message.content;
      const newBotMessage = { role: "assistant", content: botMessage };
      setMessages([...newMessages, newBotMessage]); // 기존 메시지 + 새 응답 메시지
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("******************");
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, alignItems: "center" }}
    >
      <View style={{ flex: 1 }}></View>
      <View style={styles.mainTitle}>
        <Text style={styles.mainText}>인공지능 챗봇</Text>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 80, height: 80 }}
        ></Image>
      </View>
      <View
        style={{
          flex: 8,
          width: "100%",
          alignItems: "center",
        }}
      >
        <View style={styles.chatBox}>
          <ScrollView ref={scrollViewRef} style={styles.chatScrollBox}>
            {messages
              .filter((message) => message.role !== "system")
              .map((message, index) => (
                <View
                  key={index}
                  style={[
                    styles.message,
                    message.role === "user"
                      ? styles.userMessage
                      : styles.botMessage,
                  ]}
                >
                  <Text style={styles.messageText}>{message.content}</Text>
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
      <View style={{ flex: 1, width: "90%" }}>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="챗봇에게 물어보세요."
            value={inputMessage}
            style={styles.input}
            onChangeText={setInputMessage}
            onFocus={() => setScrollViewFlex(0)} // 키보드가 나타날 때 flex 값 변경
            onBlur={() => setScrollViewFlex(1)} // 키보드가 사라질
          />
          <View style={{ flex: 0.1 }}></View>
          <TouchableOpacity
            title="Send"
            onPress={handleSendMessage}
            style={styles.send}
          >
            <Ionicons name="ios-send" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: scrollViewFlex }}></View>
    </KeyboardAvoidingView>
  );
}

export default Chat;
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
  inputBox: {
    flex: 0.8,
    flexDirection: "row",
    marginTop: 10,
  },
  inputText: { fontSize: 15, marginLeft: 15 },
  input: {
    flex: 6,
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderWidth: 0.2,
    borderColor: theme.grey,
    borderRadius: 15,
    fontSize: 15,
  },
  send: {
    backgroundColor: theme.buttonColor,
    flex: 1,
    borderWidth: 0.2,
    borderColor: theme.grey,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  chatBox: {
    backgroundColor: "white",
    borderWidth: 0.2,
    borderRadius: 15,
    borderColor: theme.grey,

    width: "90%",
    flex: 1,
  },
  chatScrollBox: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  userMessage: {
    backgroundColor: "lightblue",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "lightgray",
    alignSelf: "flex-start",
  },
  message: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 5,
    color: "black",
  },
  messageText: {
    fontSize: 20,
  },
});
