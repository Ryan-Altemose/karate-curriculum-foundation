import { StyleSheet, Text, View, Pressable, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { categoryColors, colors, ui } from "../src/theme";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={[ui.screen, styles.container]}>
        <View style={styles.header}>
          <Image source={require("../assets/images/Shorin-patch.png")} style={styles.logo} accessibilityLabel="Shorin-Ryu patch" />
          <View style={styles.brand}>
            <Text style={styles.eyebrow}>EMPIRE STATE KARATE</Text>
            <Text style={styles.schoolName} accessibilityRole="header">ESK Katalog</Text>
            <Text style={styles.subtitle}>Curriculum reference</Text>
          </View>
        </View>
        <Text style={styles.description}>Our curriculum, at a glance.</Text>
        <View style={styles.buttonStack}>
          <Pressable accessibilityRole="button"
            style={({ pressed }) => [styles.curriculumButton, pressed && styles.buttonPressed]}
            onPress={() => router.push("/curriculum")}
          >
            <View style={styles.curriculumButtonInner}>
              <View style={[styles.curriculumStripe, styles.whiteStripe]} />
              <View style={[styles.curriculumStripe, styles.yellowStripe]} />
              <View style={[styles.curriculumStripe, styles.orangeStripe]} />
              <View style={[styles.curriculumStripe, styles.blueStripe]} />
              <View style={[styles.curriculumStripe, styles.greenStripe]} />
              <View style={[styles.curriculumStripe, styles.purpleStripe]} />
              <View style={[styles.curriculumStripe, styles.brownStripe]} />
              <View style={[styles.curriculumStripe, styles.redStripe]} />
              <View style={[styles.curriculumStripe, styles.blackStripe]} />
              <View style={styles.curriculumButtonLabelWrap}>
                <View style={styles.beltLabel}><Text style={styles.buttonText}>View All Belts</Text><Ionicons name="chevron-forward" size={18} color="#fff" /></View>
              </View>
            </View>
          </Pressable>

          <View style={styles.categoryRow}>
            <Pressable accessibilityRole="button" accessibilityLabel="View Kata" style={({ pressed }) => [styles.categoryButton, styles.kataButton, pressed && styles.buttonPressed]} onPress={() => router.push("/kata")}>
              <View style={styles.categoryIcon}><Ionicons name="body-outline" size={27} color="#fff" /></View>
              <View style={styles.categoryLabel}><Text style={styles.categoryText}>Kata</Text><Ionicons name="arrow-forward" size={18} color="#ffffffb3" /></View>
            </Pressable>

            <Pressable accessibilityRole="button" accessibilityLabel="View Partner Drills" style={({ pressed }) => [styles.categoryButton, styles.partnerButton, pressed && styles.buttonPressed]} onPress={() => router.push("/partner-drill")}>
              <View style={styles.categoryIcon}><Ionicons name="people-outline" size={27} color="#fff" /></View>
              <View style={styles.categoryLabel}><Text style={styles.categoryText}>Partner Drills</Text><Ionicons name="arrow-forward" size={18} color="#ffffffb3" /></View>
            </Pressable>
          </View>

          <View style={styles.categoryRow}>
            <Pressable accessibilityRole="button" accessibilityLabel="View Weapon Kata" style={({ pressed }) => [styles.categoryButton, styles.weaponButton, pressed && styles.buttonPressed]} onPress={() => router.push("/weapon-kata")}>
              <View style={styles.categoryIcon}><MaterialCommunityIcons name="sword-cross" size={27} color="#fff" /></View>
              <View style={styles.categoryLabel}><Text style={styles.categoryText}>Weapon Kata</Text><Ionicons name="arrow-forward" size={18} color="#ffffffb3" /></View>
            </Pressable>

            <Pressable accessibilityRole="button" accessibilityLabel="View Self-Defense" style={({ pressed }) => [styles.categoryButton, styles.selfDefenseButton, pressed && styles.buttonPressed]} onPress={() => router.push("/self-defense")}>
              <View style={styles.categoryIcon}><Ionicons name="shield-half-outline" size={27} color="#fff" /></View>
              <View style={styles.categoryLabel}><Text style={styles.categoryText}>Self-Defense</Text><Ionicons name="arrow-forward" size={18} color="#ffffffb3" /></View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "transparent" },
  container: { flexGrow: 1, padding: 22, paddingBottom: 36, maxWidth: 600 },
  header: { flexDirection: "row", alignItems: "center", gap: 14, marginTop: 24 },
  logo: { width: 58, height: 62, resizeMode: "contain" },
  brand: { flex: 1 },
  eyebrow: { fontSize: 10, letterSpacing: 1.5, fontWeight: "700", color: colors.muted, marginBottom: 4 },
  schoolName: { fontSize: 28, fontWeight: "700", letterSpacing: -0.8, color: colors.ink },
  subtitle: { marginTop: 3, fontSize: 14, color: colors.muted },
  description: { marginTop: 24, marginBottom: 16, fontSize: 15, lineHeight: 22, color: colors.muted },
  buttonStack: {
    gap: 12,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  curriculumButton: {
    borderRadius: 18,
    alignItems: "center",
    overflow: "hidden",
  },
  curriculumButtonInner: {
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%",
    minHeight: 104,
    position: "relative",
  },
  curriculumStripe: {
    flex: 1,
    minHeight: 104,
  },
  whiteStripe: { backgroundColor: "#f5f5f5" },
  yellowStripe: { backgroundColor: "#facc15" },
  orangeStripe: { backgroundColor: "#f97316" },
  blueStripe: { backgroundColor: "#2563eb" },
  greenStripe: { backgroundColor: "#22c55e" },
  purpleStripe: { backgroundColor: "#a855f7" },
  brownStripe: { backgroundColor: "#8b5a2b" },
  redStripe: { backgroundColor: "#dc2626" },
  blackStripe: { backgroundColor: "#111111" },
  curriculumButtonLabelWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(17, 17, 17, 0.12)",
    paddingHorizontal: 16,
  },
  beltLabel: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#24272ded", paddingHorizontal: 18, paddingVertical: 12, borderRadius: 24 },
  categoryIcon: { width: 46, height: 46, borderRadius: 15, backgroundColor: "#ffffff1a", alignItems: "center", justifyContent: "center" },
  categoryLabel: { flexDirection: "row", alignItems: "flex-end", gap: 6, width: "100%" },
  categoryText: { flex: 1, fontSize: 17, lineHeight: 23, fontWeight: "600", color: "#fff" },
  categoryRow: { flexDirection: "row", gap: 12 },
  categoryButton: {
    flex: 1,
    aspectRatio: 1,
    padding: 18,
    borderRadius: 18,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  kataButton: {
    backgroundColor: categoryColors.kata.accent,
  },
  partnerButton: {
    backgroundColor: categoryColors.partnerDrill.accent,
  },
  weaponButton: {
    backgroundColor: categoryColors.weaponKata.accent,
  },
  selfDefenseButton: {
    backgroundColor: categoryColors.selfDefense.accent,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
