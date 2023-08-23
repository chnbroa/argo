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
    { content: "안녕", role: "user" },
    { content: "안녕하세요! 도와드릴게 있나요?", role: "assistant" },
    { content: "그냥 아무거나 긴글써줘", role: "user" },
    {
      content:
        "당신이 원하는대로 긴 글을 써드리겠습니다.인생은 참으로 놀라운 여행이다. 우리는 태어나서부터 끊임없이 성장하고 변화하며, 경험을 쌓아가며 삶을 살아간다. 어린 시절부터 우리는 꿈과 희망으로 가득찬 어린이였다. 하지만 성장과 함께 문제에 부딪히고 실패도 경험하게 된다. 그러나 우리는 항상 다시 일어나고 새로운 도전을 해나갈 수 있는 힘과 용기를 내내 갖고 있으며, 성취와 성공을 향해 나아갈 수 있는 자원이 무궁무진하게 내재되어 있다.인간은 사회적 동물이다. 우리는 한 사람으로서 혼자 살아갈 수도 있지만, 상호작용과 협력을 통해 더 큰 성공을 이뤄낼 수 있다. 가족, 친구, 동료들과의 연결은 우리 삶의 가장 귀중한 재산이다. 서로를 이해하고 서로를 도울 수 있는 관계를 구축하며 세상을 함께 더 아름답게 만들어 나갈 수 있다.또한, 우리는 지속적인 자기 계발의 필요성을 깨달아야 한다. 세상은 끊임없이 변화하고 발전하며, 우리도 그에 맞춰 새로운 지식과 기술을 습득해야 한다. 꾸준한 학습과 성장은 우리를 더 높은 곳으로 이끌어주며, 자신에게 무한한 가능성을 실현해 줄 것이다.또한, 우리는 주변 자연과 환경에 대한 책임도 가져야 한다. 우리는 자연과 조화롭게 공존해야 하며, 지속 가능한 방식으로 자원을 관리하고 보호해야 한다. 우리들의 작은 선택과 행동은 큰 변화의 시작이 될 수 있다. 우리는 지구를 더욱 아름답게, 건강하게 만들기 위해 노력해야 한다.마지막으로, 삶은 짧고 소중하다는 것을 기억해야 한다. 우리는 매 순간을 소중히 여기고, 감사하며 살아가야 한다. 행복은 외부에서 찾을 수 있는 것이 아니라 우리 마음의 태도에서 비롯되는 것이다. 어떠한 상황에서도 긍정적인 태도와 감사의 마음을 지니며, 자신과 주변 사람들을 사랑하고 가치있게 여길 수 있다면, 풍요로운 삶을 살아갈 수 있을 것이다.이렇게 여행하는 동안 우리는 서로에게서 배우며 성장하고, 사랑과 희망을 품어가며 보다 나은 세상을 만들어 나갈 것이다. 인생의 여정을 함께 하며, 마음 가득한 행복과 만족을 느끼기를 바랍니다.",
      role: "assistant",
    },
  ]);
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
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 5,
    color: "black",
  },
  messageText: {
    fontSize: 20,
  },
});
