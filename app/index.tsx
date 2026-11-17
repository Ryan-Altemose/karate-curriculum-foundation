import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.schoolName} accessibilityRole="header">Empire State Karate</Text>
        <Text style={styles.subtitle}>Curriculum reference</Text>
        <Text style={styles.description}>Browse kata, weapons, partner drills, and self-defense at every rank.</Text>
      </View>
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
              <Text style={styles.buttonText}>View All Belts</Text>
            </View>
          </View>
        </Pressable>

        <Pressable accessibilityRole="button" style={({ pressed }) => [styles.kataButton, pressed && styles.buttonPressed]} onPress={() => router.push("/kata")}>
          <Text style={styles.buttonText}>View Kata</Text>
        </Pressable>

        <Pressable accessibilityRole="button" style={({ pressed }) => [styles.partnerButton, pressed && styles.buttonPressed]} onPress={() => router.push("/partner-drill")}>
          <Text style={styles.buttonText}>View Partner Drills</Text>
        </Pressable>

        <Pressable accessibilityRole="button" style={({ pressed }) => [styles.weaponButton, pressed && styles.buttonPressed]} onPress={() => router.push("/weapon-kata")}>
          <Text style={styles.buttonText}>View Weapon Kata</Text>
        </Pressable>

        <Pressable accessibilityRole="button" style={({ pressed }) => [styles.selfDefenseButton, pressed && styles.buttonPressed]} onPress={() => router.push("/self-defense")}>
          <Text style={styles.buttonText}>View Self-Defense</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: "#f5f5f5" },
  header: { marginTop: 40, marginBottom: 28 },
  schoolName: { fontSize: 28, fontWeight: "700", color: "#111" },
  subtitle: { marginTop: 8, fontSize: 20, fontWeight: "600", color: "#333" },
  description: { marginTop: 8, fontSize: 15, lineHeight: 22, color: "#666" },
  buttonStack: {
    gap: 12,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  curriculumButton: {
    borderRadius: 12,
    alignItems: "center",
    overflow: "hidden",
  },
  curriculumButtonInner: {
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%",
    minHeight: 52,
    position: "relative",
  },
  curriculumStripe: {
    flex: 1,
    minHeight: 52,
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
    backgroundColor: "rgba(17, 17, 17, 0.18)",
    paddingHorizontal: 16,
  },
  kataButton: {
    backgroundColor: "#d11a2a",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  partnerButton: {
    backgroundColor: "#d97706",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  weaponButton: {
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  selfDefenseButton: {
    backgroundColor: "#7c3aed",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
