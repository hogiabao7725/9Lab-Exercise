import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DICE_IMAGES = [
  require("../../assets/images/1_dice.jpg"),
  require("../../assets/images/2_dice.jpg"),
  require("../../assets/images/3_dice.jpg"),
  require("../../assets/images/4_dice.jpg"),
  require("../../assets/images/5_dice.jpg"),
  require("../../assets/images/6_dice.jpg"),
];

const DiceApp = () => {
  const [dices, setDices] = useState([0, 0]);

  const rollDice = () => {
    setDices([
      Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 6),
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.diceContainer}>
        {dices.map((diceIndex, index) => (
          <TouchableOpacity key={index} onPress={rollDice} activeOpacity={0.7}>
            <Image 
              source={DICE_IMAGES[diceIndex]} 
              style={styles.dice} 
              resizeMode="contain" 
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000000" },
  diceContainer: { flexDirection: "row", alignItems: "center" },
  dice: { width: 130, height: 130, marginHorizontal: 10 },
});

export default DiceApp;