import { StyleSheet, Text, View, Pressable, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { categoryColors, colors, ui } from "../src/theme";

const BELT_GOLD = "#c9a34d";

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
          <Pressable accessibilityRole="button" accessibilityLabel="View All Belts"
            style={({ pressed }) => [ui.card, styles.curriculumButton, pressed && styles.buttonPressed]}
            onPress={() => router.push("/curriculum")}
          >
            <View style={styles.curriculumButtonInner}>
              <View style={styles.curriculumLabel}>
                <Ionicons name="book" size={24} color={BELT_GOLD} accessible={false} />
                <Text style={styles.buttonText}>View All Belts</Text>
              </View>
              <View style={styles.curriculumChevron}>
                <Ionicons name="chevron-forward" size={20} color={colors.surface} />
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
    minHeight: 104,
    backgroundColor: colors.ink,
    borderColor: colors.ink,
    borderLeftWidth: 6,
    borderLeftColor: BELT_GOLD,
    overflow: "hidden",
  },
  curriculumButtonInner: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 12,
  },
  curriculumLabel: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10 },
  curriculumChevron: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff1a" },
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
    color: BELT_GOLD,
    flexShrink: 1,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
