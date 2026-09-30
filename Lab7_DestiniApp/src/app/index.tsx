import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STORY = [
  {
    txt: "Bão cát vừa tan, bạn tỉnh dậy giữa sa mạc mênh mông. Bình nước chỉ còn vài giọt. Phía xa có một ngôi đền cổ và một dấu vết xe di chuyển.",
    c1: "Đi về phía ngôi đền cổ tìm bóng râm.", d1: 1,
    c2: "Men theo dấu vết xe trên cát.", d2: 2,
  },
  {
    txt: "Trong đền có một giếng nước khô cạn và hai lối đi: một lối lên tháp cao, một lối dẫn xuống hầm tối.",
    c1: "Leo lên tháp cao để quan sát xung quanh.", d1: 3,
    c2: "Đi xuống hầm tối tìm nguồn nước.", d2: 4,
  },
  {
    txt: "Dấu vết xe dẫn bạn đến một đoàn thương nhân Bedouin đang dừng chân nghỉ ngơi.",
    c1: "Tiến lại gần xin sự giúp đỡ.", d1: 5,
    c2: "Sợ hãi cướp biển sa mạc nên bỏ chạy.", d2: 6,
  },
  {
    txt: "Từ trên đỉnh tháp, bạn thấy một ốc đảo xanh mát ngay gần đó. Bạn tìm được đường tới ốc đảo và sống sót!",
    c1: "Chơi lại từ đầu", d1: 0,
  },
  {
    txt: "Hầm tối là hang ổ của bọ cạp độc. Bạn không thể thoát ra kịp. Trò chơi kết thúc!",
    c1: "Chơi lại từ đầu", d1: 0,
  },
  {
    txt: "Đoàn thương nhân rất thân thiện. Họ cho bạn nước uống và đưa bạn về thành phố an toàn!",
    c1: "Chơi lại từ đầu", d1: 0,
  },
  {
    txt: "Bạn kiệt sức và gục ngã giữa cái nắng chói chang của sa mạc. Trò chơi kết thúc!",
    c1: "Chơi lại từ đầu", d1: 0,
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const cur = STORY[index];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={require("../../assets/images/background.jpg")} style={styles.bg}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Destini</Text>
          <View style={styles.center}><Text style={styles.story}>{cur.txt}</Text></View>

          <View style={{ marginBottom: 30 }}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: cur.c2 ? "#0048ff" : "#ff5e00" }]} onPress={() => setIndex(cur.d1)}>
              <Text style={[styles.btnTxt, { color: "#000" }]}>{cur.c1}</Text>
            </TouchableOpacity>

            {cur.c2 && (
              <TouchableOpacity style={[styles.btn, { backgroundColor: "#37ff00" }]} onPress={() => setIndex(cur.d2!)}>
                <Text style={styles.btnTxt}>{cur.c2}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  bg: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.65)", padding: 20, justifyContent: "space-between" },
  title: { fontSize: 36, fontWeight: "bold", color: "#FFF", textAlign: "center", marginTop: 20 },
  center: { flex: 1, justifyContent: "center" },
  story: { fontSize: 20, color: "#FFF", textAlign: "center", lineHeight: 28 },
  btn: { padding: 16, borderRadius: 12, marginBottom: 12 },
  btnTxt: { color: "#FFF", fontWeight: "bold", fontSize: 16, textAlign: "center" },
});