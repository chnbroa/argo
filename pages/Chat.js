import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { theme } from "../assets/colors";
import { useState } from "react";

function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

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
  console.log(messages);
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 1 }}></View>
      <View style={styles.mainTitle}>
        <Text style={styles.mainText}>인공지능 챗봇</Text>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 80, height: 80 }}
        ></Image>
      </View>
      <View style={{ flex: 8, width: "100%", alignItems: "center" }}>
        <View style={styles.chatBox}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.message,
                message.role === "user"
                  ? styles.userMessage
                  : styles.botMessage,
              ]}
            >
              <Text>{message.content}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Type a message..."
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity
          title="Send"
          onPress={handleSendMessage}
          style={{ backgroundColor: "black", width: 100, height: 100 }}
        />
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
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
    width: "80%",
  },
  inputText: { fontSize: 15, marginLeft: 15 },
  input: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 10,
    fontSize: 15,
  },
  chatBox: {
    backgroundColor: "white",
    borderWidth: 0.2,
    borderRadius: 15,
    borderColor: theme.grey,

    width: "90%",
    flex: 1,
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
    color: "black",
  },
});
