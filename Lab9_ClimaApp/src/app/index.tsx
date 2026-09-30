import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";

interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number; feels_like: number; humidity: number; pressure: number };
  weather: Array<{ description: string; icon: string }>;
  wind: { speed: number };
}

const API_KEY = "15ebce4afe33ef1cec8c1e4b98276207";

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
        fetchByCoords();
      }
    })();
  }, []);

  const fetchByCoords = async () => {
    setLoading(true);
    setError(null);
    try {
      const loc = await Location.getCurrentPositionAsync({});
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      data.cod === 200 ? setWeather(data) : setError(data.message);
    } catch {
      setError("Không thể lấy vị trí hiện tại.");
    } finally {
      setLoading(false);
    }
  };

  const fetchByCity = async (cityName: string) => {
    if (!cityName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      data.cod === 200 ? setWeather(data) : setError("Không tìm thấy thành phố.");
    } catch {
      setError("Lỗi kết nối máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4a154b" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>SkyPulse ⛅</Text>
        <Text style={styles.subtitle}>Dự báo thời tiết thời gian thực</Text>
      </View>

      {/* Ô tìm kiếm */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên thành phố..."
          placeholderTextColor="#a0aec0"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => { fetchByCity(search); setSearch(""); }}
        />
        <TouchableOpacity style={styles.btnSearch} onPress={() => { fetchByCity(search); setSearch(""); }}>
          <Text style={styles.btnTxt}>Tìm</Text>
        </TouchableOpacity>
      </View>

      {/* Nút định vị */}
      <TouchableOpacity style={styles.btnLoc} onPress={fetchByCoords}>
        <Text style={styles.btnLocTxt}>📍 {hasPermission ? "Cập nhật vị trí hiện tại" : "Bật quyền vị trí"}</Text>
      </TouchableOpacity>

      {/* Nội dung */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e01e5a" />
          <Text style={styles.infoTxt}>Đang tải dữ liệu thời tiết...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errTxt}>{error}</Text>
          <TouchableOpacity style={styles.btnSearch} onPress={fetchByCoords}>
            <Text style={styles.btnTxt}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : weather ? (
        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
          <Text style={styles.cityName}>{weather.name}, {weather.sys.country}</Text>

          <View style={styles.mainInfo}>
            <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
            <View style={styles.row}>
              <Image
                source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
                style={{ width: 50, height: 50 }}
              />
              <Text style={styles.desc}>{weather.weather[0].description}</Text>
            </View>
          </View>

          {/* Chi tiết */}
          <View style={styles.card}>
            {[
              ["Nhiệt độ", `${Math.round(weather.main.feels_like)}°C`],
              ["Độ ẩm", `${weather.main.humidity}%`],
              ["Tốc độ gió", `${weather.wind.speed} m/s`],
              ["Áp suất", `${weather.main.pressure} hPa`],
            ].map(([label, val], i) => (
              <View key={i} style={styles.cardRow}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.val}>{val}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.center}>
          <Text style={styles.infoTxt}>Nhập thành phố hoặc bấm định vị để xem thời tiết.</Text>
        </View>
      )}

      <Text style={styles.footer}>Nguồn dữ liệu: OpenWeatherMap API</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1d21" },
  header: { backgroundColor: "#4a154b", padding: 18, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 13, color: "#d1d5db", marginTop: 2 },
  searchBox: { flexDirection: "row", padding: 14, gap: 10 },
  input: { flex: 1, height: 44, backgroundColor: "#2c3136", borderRadius: 10, paddingHorizontal: 12, color: "#fff" },
  btnSearch: { backgroundColor: "#e01e5a", paddingHorizontal: 20, borderRadius: 10, justifyContent: "center" },
  btnTxt: { color: "#fff", fontWeight: "bold" },
  btnLoc: { backgroundColor: "#2eb67d", marginHorizontal: 14, padding: 12, borderRadius: 10, alignItems: "center", marginBottom: 10 },
  btnLocTxt: { color: "#fff", fontWeight: "bold" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  infoTxt: { color: "#9ca3af", textAlign: "center", marginTop: 10 },
  errTxt: { color: "#f87171", textAlign: "center", marginBottom: 12 },
  cityName: { fontSize: 24, fontWeight: "bold", color: "#fff", textAlign: "center", marginTop: 16 },
  mainInfo: { alignItems: "center", marginVertical: 16 },
  temp: { fontSize: 60, fontWeight: "bold", color: "#ec4899" },
  row: { flexDirection: "row", alignItems: "center" },
  desc: { fontSize: 18, color: "#d1d5db", textTransform: "capitalize" },
  card: { backgroundColor: "#2c3136", borderRadius: 14, padding: 16, marginBottom: 20 },
  cardRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#374151" },
  label: { color: "#9ca3af", fontSize: 15 },
  val: { color: "#fff", fontSize: 15, fontWeight: "600" },
  footer: { textAlign: "center", color: "#6b7280", fontSize: 12, paddingBottom: 10 },
});