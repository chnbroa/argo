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
import { getData } from "../modules/storagy-service";
import { FontAwesome5 } from "@expo/vector-icons";

function MainChat({ navigation }) {
  const [scrollViewFlex, setScrollViewFlex] = useState(0.2); // 초기 flex 값
  const scrollViewRef = useRef();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [init, setInit] = useState(true);
  const initMessage = [
    "뭐 먹을지 고민 중이야",
    "오늘 좀 많이 먹었나?",
    "안녕?",
    "안녕?",
    "안녕?",
    "안녕?",
  ];
  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const newUserMessage = { role: "user", content: inputMessage };
    const waitMessage = { role: "assistant", content: "작성중입니다...." };
    const newMessages = [...messages, newUserMessage]; // 기존 메시지 + 새 사용자 메시지
    const newWaitMessages = [...newMessages, waitMessage];
    setMessages(newWaitMessages);
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
            model: "gpt-4",
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
    setTimeout(() => {
      if (messages.length > 1)
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, 0);
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      const info = {
        nutrition: await getData("Nutrition").then((data) =>
          JSON.stringify(data)
        ),
        foods: await getData("foods").then((data) =>
          data.map((food) => food.name)
        ),
        allergy: await getData("userProfile").then((data) => data.allergy),
        hate: await getData("userProfile").then((data) => data.hate),
        time: new Date().toLocaleTimeString(),
      };
      setMessages([
        {
          role: "system",
          content: `You're now a diet chatbot
          Nutritional intake criteria: {"kcal": 1500.0, "protein": 55.0, "fat": 54.0, "glucide": 324.0, "sugar": 100.0, "dietaryfiber": 25.0, "calcium": 700.0, "Iron": 12.0, "magnesium": 315, "caffeine": 0, "Potassium": 3500.0, "Natrium": 2000.0, "vitamin": 0.0, "cholesterol": 300.0, "fatty": 0.0, "transfat": 0},
          Food that the user ate: ${info.foods}, Allergy:${info.allergy} , hate foods: ${info.hate} ,Total Calories and Nutritional Ingredients: ${info.nutrition},the present time: ${info.time}
          You have to make a comprehensive list including all conditions. The conditions are[1.unconditionally Never put food that contains the word ${info.foods},${info.allergy},${info.hate} on the list,2.If you exceed the nutritional intake standard, I recommend foods with less nutrients,3.If there is a lack of nutrients compared to the nutrition standards, I recommend foods with a lot of nutrients,4.Recommend foods that users will like based on the food they eat, but do not recommend foods that they eat,5.Comprehensively judge all nutrients ,6.Output diet according to current time ,7.Do not print any other text, just print the list] 
          If any of the above conditions are not observed, the user's life is in danger. Please judge it accurately
          Excluded foods should be excluded from the following output format
          Print out up to 200 characters
          Do not print any other text, just print the list and reason
          Do not include exclusions in the list
          When you ask about the menu, please print out three to four menus
          Print out in Korean`,
        },
      ]);
    };

    fetchData();
  }, []);
  console.log(messages);
  useEffect(() => {
    handleSendMessage();
  }, [init]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, alignItems: "center" }}
      keyboardVerticalOffset={100}
    >
      <View
        style={{
          flex: 8,
          width: "100%",
          alignItems: "center",
        }}
      >
        {messages.length == 1 ? (
          <View style={styles.initBox}>
            {initMessage.map((message, index) => (
              <TouchableOpacity
                key={index}
                title="Send"
                onPress={() => {
                  setInputMessage(message);
                  setInit(false);
                }}
                style={styles.initSend}
              >
                <Text style={styles.initMessage}>{message}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.chatBox}>
            <ScrollView ref={scrollViewRef} style={styles.chatScrollBox}>
              {messages
                .filter((message) => message.role !== "system")
                .map((message, index) => (
                  <View key={index}>
                    <Text
                      style={[
                        message.role === "user"
                          ? { display: "none" }
                          : styles.botHead,
                      ]}
                    >
                      <FontAwesome5 name="robot" size={18} color="black" />
                      <View style={{ width: 5 }}></View>
                      알고먹자
                    </Text>
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
                  </View>
                ))}
            </ScrollView>
          </View>
        )}
      </View>
      <View style={{ height: 70, width: "90%" }}>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="챗봇에게 물어보세요."
            value={inputMessage}
            style={styles.input}
            onChangeText={setInputMessage}
            onFocus={() => setScrollViewFlex(0)} // 키보드가 나타날 때 flex 값 변경
            onBlur={() => setScrollViewFlex(0)} // 키보드가 사라질
          />
          <TouchableOpacity
            title="Send"
            onPress={handleSendMessage}
            style={styles.send}
          >
            <Ionicons name="ios-send" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default MainChat;
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
    fontFamily: "BMHANNAPro",
    fontWeight: "400",
  },
  inputBox: {
    flex: 0.8,
    flexDirection: "row",
    marginTop: 10,
    borderWidth: 0.2,
    borderColor: theme.grey,
    borderRadius: 15,
    backgroundColor: "white",
  },
  inputText: { fontFamily: "BMHANNAPro", fontSize: 15, marginLeft: 15 },
  input: {
    flex: 6,
    flexDirection: "row",
    paddingVertical: 2,
    paddingHorizontal: 20,
    fontSize: 15,
    fontFamily: "BMHANNAPro",
  },
  send: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  initBox: {
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  initSend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.buttonColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginVertical: 5,
  },
  initMessage: {
    fontSize: 15,
    fontFamily: "BMHANNAPro",
  },
  chatBox: {
    backgroundColor: "white",
    width: "100%",
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
  botHead: { marginHorizontal: 5, fontSize: 16, fontFamily: "BMHANNAPro" },
  botMessage: {
    backgroundColor: "lightgray",
    alignSelf: "flex-start",
  },
  message: {
    maxWidth: "80%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 5,
    color: "black",
  },
  messageText: {
    fontSize: 16,
    fontFamily: "BMHANNAPro",
  },
});
