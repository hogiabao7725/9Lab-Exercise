import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createAudioPlayer, AudioPlayer } from "expo-audio";

const KEYS = [
  { sound: require("../../assets/1sound.wav"), color: "#c53526" },
  { sound: require("../../assets/2sound.wav"), color: "#f79c4d" },
  { sound: require("../../assets/3sound.wav"), color: "#f8da63" },
  { sound: require("../../assets/4sound.wav"), color: "#3df704" },
  { sound: require("../../assets/5sound.wav"), color: "#047528" },
  { sound: require("../../assets/6sound.wav"), color: "#0095ff" },
  { sound: require("../../assets/7sound.wav"), color: "#d16ff8" },
];

export default function XylophoneApp() {
  const players = useRef<AudioPlayer[]>([]);

  useEffect(() => {
    KEYS.forEach((item, index) => {
      try {
        players.current[index] = createAudioPlayer(item.sound);
      } catch (error) {
        console.log(`Error loading sound ${index + 1}:`, error);
      }
    });

    return () => {
      players.current.forEach((player) => player?.release());
    };
  }, []);

  const playSound = (index: number) => {
    try {
      const player = players.current[index];
      if (player) {
        player.seekTo(0);
        player.play();
      }
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {KEYS.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          style={[styles.key, { backgroundColor: item.color }]}
          onPress={() => playSound(index)}
        >
          <Text style={styles.text}>Sound {index + 1}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  key: { flex: 1, justifyContent: "center", alignItems: "center", width: "100%" },
  text: { fontSize: 20, color: "#FFFFFF", fontWeight: "bold" },
});