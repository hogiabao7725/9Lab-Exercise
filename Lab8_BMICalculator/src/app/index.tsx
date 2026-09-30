import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [bmiResult, setBmiResult] = useState<string | null>(null);
  const [bmiCategory, setBmiCategory] = useState("");

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      Alert.alert("Thông báo", "Vui lòng nhập chiều cao và cân nặng hợp lệ.");
      return;
    }

    const heightInMeters = h / 100;
    const bmi = w / (heightInMeters * heightInMeters);
    const formattedBmi = bmi.toFixed(1);
    setBmiResult(formattedBmi);

    if (bmi < 18.5) {
      setBmiCategory("Thiếu cân");
    } else if (bmi < 24.9) {
      setBmiCategory("Bình thường");
    } else if (bmi < 29.9) {
      setBmiCategory("Thừa cân");
    } else {
      setBmiCategory("Béo phì");
    }
  };

  const resetCalculator = () => {
    setHeight("170");
    setWeight("65");
    setAge(25);
    setBmiResult(null);
    setBmiCategory("");
  };

  const adjustWeight = (delta: number) => {
    const current = parseFloat(weight) || 0;
    const updated = Math.max(1, current + delta);
    setWeight(updated.toString());
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F5F7" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Tính Chỉ Số BMI</Text>
          <Text style={styles.subtitle}>Theo dõi sức khỏe của bạn mỗi ngày</Text>
        </View>

        {/* Chuyển đổi Giới tính dạng Tab Slider */}
        <View style={styles.genderContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.genderTab, gender === "male" && styles.activeGenderTab]}
            onPress={() => setGender("male")}
          >
            <Text style={[styles.genderText, gender === "male" && styles.activeGenderText]}>
              ♂ Nam
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.genderTab, gender === "female" && styles.activeGenderTab]}
            onPress={() => setGender("female")}
          >
            <Text style={[styles.genderText, gender === "female" && styles.activeGenderText]}>
              ♀ Nữ
            </Text>
          </TouchableOpacity>
        </View>

        {/* Nhập Chiều cao & Độ tuổi (Hàng đôi) */}
        <View style={styles.row}>
          <View style={[styles.card, styles.flexCard]}>
            <Text style={styles.cardLabel}>CHIỀU CAO (CM)</Text>
            <TextInput
              style={styles.numericInput}
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              placeholder="170"
              placeholderTextColor="#A0AEC0"
              maxLength={3}
            />
          </View>

          <View style={[styles.card, styles.flexCard]}>
            <Text style={styles.cardLabel}>TUỔI</Text>
            <View style={styles.counterRow}>
              <TouchableOpacity style={styles.counterBtn} onPress={() => setAge(Math.max(1, age - 1))}>
                <Text style={styles.counterBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{age}</Text>
              <TouchableOpacity style={styles.counterBtn} onPress={() => setAge(age + 1)}>
                <Text style={styles.counterBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Nhập Cân nặng với nút điều chỉnh nhanh */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>CÂN NẶNG (KG)</Text>
          <View style={styles.weightInputContainer}>
            <TouchableOpacity style={styles.adjustBtn} onPress={() => adjustWeight(-1)}>
              <Text style={styles.adjustBtnText}>- 1</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.weightInput}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholder="65"
              placeholderTextColor="#A0AEC0"
              maxLength={5}
            />

            <TouchableOpacity style={styles.adjustBtn} onPress={() => adjustWeight(1)}>
              <Text style={styles.adjustBtnText}>+ 1</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Kết quả BMI */}
        {bmiResult && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>CHỈ SỐ BMI CỦA BẠN</Text>
            <Text style={styles.resultValue}>{bmiResult}</Text>
            <View style={styles.badgeContainer}>
              <Text
                style={[
                  styles.categoryBadge,
                  bmiCategory === "Thiếu cân" && styles.underweight,
                  bmiCategory === "Bình thường" && styles.normal,
                  bmiCategory === "Thừa cân" && styles.overweight,
                  bmiCategory === "Béo phì" && styles.obese,
                ]}
              >
                {bmiCategory}
              </Text>
            </View>
          </View>
        )}

        {/* Nút thao tác */}
        <View style={styles.actionContainer}>
          <TouchableOpacity activeOpacity={0.8} style={styles.primaryBtn} onPress={calculateBMI}>
            <Text style={styles.primaryBtnText}>TÍNH BMI</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.secondaryBtn} onPress={resetCalculator}>
            <Text style={styles.secondaryBtnText}>LÀM MỚI</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A202C",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#718096",
    marginTop: 4,
  },
  genderContainer: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },
  genderTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  activeGenderTab: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  genderText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#718096",
  },
  activeGenderText: {
    color: "#2D3748",
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  flexCard: {
    flex: 1,
    marginBottom: 0,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#A0AEC0",
    marginBottom: 10,
    textAlign: "center",
  },
  numericInput: {
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    height: 48,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#2D3748",
    borderWidth: 1,
    borderColor: "#CBD5E0",
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: "#CBD5E0",
  },
  counterBtn: {
    width: 38,
    height: 38,
    backgroundColor: "#E2E8F0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  counterBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A5568",
  },
  counterValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
  },
  weightInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  adjustBtn: {
    backgroundColor: "#EDF2F7",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  adjustBtnText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4A5568",
  },
  weightInput: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    height: 48,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#2D3748",
    borderWidth: 1,
    borderColor: "#CBD5E0",
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#CBD5E0",
  },
  resultTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#718096",
  },
  resultValue: {
    fontSize: 48,
    fontWeight: "800",
    color: "#1A202C",
    marginVertical: 6,
  },
  badgeContainer: {
    marginTop: 4,
  },
  categoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: "700",
    overflow: "hidden",
  },
  underweight: {
    backgroundColor: "#EBF8FF",
    color: "#3182CE",
  },
  normal: {
    backgroundColor: "#F0FFF4",
    color: "#38A169",
  },
  overweight: {
    backgroundColor: "#FFFFF0",
    color: "#D69E2E",
  },
  obese: {
    backgroundColor: "#FFF5F5",
    color: "#E53E3E",
  },
  actionContainer: {
    marginTop: 10,
    gap: 10,
  },
  primaryBtn: {
    backgroundColor: "#2D3748",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  secondaryBtn: {
    backgroundColor: "#E2E8F0",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#4A5568",
    fontSize: 15,
    fontWeight: "600",
  },
});