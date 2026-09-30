import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BALL_IMAGES = [
  require("../../assets/images/1ball.png"),
  require("../../assets/images/2ball.png"),
  require("../../assets/images/3ball.png"),
  require("../../assets/images/4ball.png"),
  require("../../assets/images/5ball.png"),
];

const Magic8Ball = () => {
  const [ballIndex, setBallIndex] = useState(0);

  const shakeBall = () => {
    setBallIndex(Math.floor(Math.random() * BALL_IMAGES.length));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={shakeBall} activeOpacity={0.8}>
        <Image
          source={BALL_IMAGES[ballIndex]}
          style={styles.ball}
          resizeMode="contain"
          fadeDuration={0}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#878989" },
  ball: { width: 300, height: 300 },
});

export default Magic8Ball;