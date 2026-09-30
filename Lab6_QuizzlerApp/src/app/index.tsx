import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const QUIZ = [
  { q: "HTML is a programming language.", a: false },
  { q: "CPU is considered the brain of a computer.", a: true },
  { q: "RAM stands for Random Access Memory.", a: true },
  { q: "World War II ended in 1945.", a: true },
  { q: "The Great Wall of China is visible from space.", a: false },
  { q: "Kimono is a traditional dress of Korea.", a: false },
  { q: "Pizza originated in Italy.", a: true },
];

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

export default function App() {
  const [data, setData] = useState(() => shuffle(QUIZ));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);

  const answer = (val: boolean) => {
    if (val === data[idx].a) setScore((s) => s + 1);
    setIdx((i) => i + 1);
  };

  const restart = () => {
    setData(shuffle(QUIZ));
    setIdx(0);
    setScore(0);
  };

  const isDone = idx >= data.length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1C1C1C" barStyle="light-content" />
      <View style={styles.quizContainer}>
        <Text style={styles.appTitle}>Quizzler</Text>

        {isDone ? (
          <View style={styles.center}>
            <Text style={styles.scoreText}>Your score: {score} out of {data.length}</Text>
            <TouchableOpacity style={styles.btnBlue} onPress={restart}>
              <Text style={styles.btnText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.qBox}>
              <Text style={styles.qText}>{data[idx].q}</Text>
            </View>

            <TouchableOpacity style={styles.btnGreen} onPress={() => answer(true)}>
              <Text style={styles.btnText}>True</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnRed} onPress={() => answer(false)}>
              <Text style={styles.btnText}>False</Text>
            </TouchableOpacity>

            <Text style={styles.progressText}>{idx + 1}/{data.length}</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1C1C1C" },
  quizContainer: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
  appTitle: { fontSize: 32, fontWeight: "bold", color: "#FFF", marginBottom: 40 },
  qBox: { backgroundColor: "#262626", borderRadius: 10, padding: 20, marginBottom: 30, width: "100%" },
  qText: { fontSize: 22, color: "#FFF", textAlign: "center", lineHeight: 30 },
  btnGreen: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 25, marginBottom: 15, width: "100%", alignItems: "center" },
  btnRed: { backgroundColor: "#F44336", padding: 15, borderRadius: 25, width: "100%", alignItems: "center" },
  btnBlue: { backgroundColor: "#09355a", padding: 15, borderRadius: 25, width: 200, alignItems: "center" },
  btnText: { color: "#FFF", fontWeight: "bold", fontSize: 18 },
  progressText: { color: "#BBBBBB", fontSize: 16, marginTop: 20 },
  center: { alignItems: "center" },
  scoreText: { fontSize: 24, color: "#FFF", marginBottom: 30, textAlign: "center" },
});