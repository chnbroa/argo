import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveData(name, data) {
  await AsyncStorage.setItem(name, JSON.stringify(data));
}
async function getData(name) {
  const Items = await AsyncStorage.getItem(name);
  console.log("inner" + Items);
  return await JSON.parse(Items);
}

export { saveData, getData };
