import React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { getRankById } from "../src/data/curriculum";
import { getRequiredClasses } from "../src/data/rank";
import { currentStudent, getClassesPerWeekNeeded } from "../src/data/student";
import BeltSwatch from "../src/components/BeltSwatch";

export default function HomeScreen() {
  const currentRank = getRankById(currentStudent.currentRankId);
  const nextRank = getRankById(currentStudent.nextRankId);
  const requiredClasses = currentRank ? getRequiredClasses(currentRank) : undefined;
  const nextRequiredClasses = nextRank ? getRequiredClasses(nextRank) : undefined;
  const nextRankLocked = nextRequiredClasses === undefined ? false : currentStudent.classCount < nextRequiredClasses;
  const graduationDate = new Date(`${currentStudent.graduationDate}T00:00:00`).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const classesRemaining = requiredClasses !== undefined ? Math.max(requiredClasses - currentStudent.classCount, 0) : 0;
  const classesPerWeekNeeded = getClassesPerWeekNeeded(currentStudent, requiredClasses);

  const progressRatio = requiredClasses && requiredClasses > 0 ? Math.min(currentStudent.classCount / requiredClasses, 1) : 0;
  const progressPercent = Math.round(progressRatio * 100);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.schoolName}>Empire State Karate</Text>
        <Text style={styles.welcome}>{`Welcome, ${currentStudent.name}!`}</Text>
      </View>

      <Pressable
        disabled={!currentRank}
        onPress={() => currentRank && router.push({ pathname: "/curriculum/[rankId]", params: { rankId: currentRank.id } })}
        style={({ pressed }) => [styles.rankButton, pressed && styles.buttonPressed, !currentRank && { opacity: 0.65 }]}
      >
        <View style={styles.rankInfo}>
          <View style={styles.rankText}>
            <Text style={styles.rank} accessibilityRole="header">{currentRank?.name ?? "Rank not set"}</Text>
            <Text style={styles.rankLabel}>CURRENT RANK</Text>
          </View>
          <BeltSwatch rankId={currentStudent.currentRankId} degree={currentRank?.degree} width={88} height={18} style={styles.beltSwatch} />
          <Ionicons name="chevron-forward" size={22} color="#222" />
        </View>
      </Pressable>

      <View style={styles.progressCard}>
        <Text style={styles.cardLabel}>CLASSES ATTENDED</Text>
        <Text style={styles.classProgress}>
          {requiredClasses === undefined ? `${currentStudent.classCount} classes attended` : `${currentStudent.classCount} of ${requiredClasses}`}
        </Text>

        {requiredClasses !== undefined && (
          <>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
            </View>
            <Text style={styles.progressMeta}>{progressPercent}% complete</Text>
          </>
        )}

        {requiredClasses !== undefined && classesPerWeekNeeded !== null && (
          <Text style={styles.progressMeta}>
            {classesRemaining > 0 && `Need ${classesPerWeekNeeded.toFixed(1)} class${classesPerWeekNeeded === 1 ? "" : "es"}/week`}
          </Text>
        )}

        <Text style={styles.cardLabel}>NEXT RANK</Text>
        <View style={styles.nextRankRow}>
          <Text style={styles.cardValue}>{nextRank?.name ?? "Not set"}</Text>
          <BeltSwatch
            rankId={currentStudent.nextRankId}
            degree={nextRank?.degree}
            width={72}
            height={16}
            style={{ marginLeft: 8 }}
          />
        </View>

        <Text style={styles.cardLabel}>NEXT GRADUATION DATE</Text>
        <Text style={styles.cardValue}>{graduationDate}</Text>
      </View>

      <View style={styles.buttonStack}>
        <Pressable
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

        <Pressable style={({ pressed }) => [styles.kataButton, pressed && styles.buttonPressed]} onPress={() => router.push("/kata")}>
          <Text style={styles.buttonText}>View Kata</Text>
        </Pressable>

        <Pressable style={({ pressed }) => [styles.partnerButton, pressed && styles.buttonPressed]} onPress={() => router.push("/partner-drill")}>
          <Text style={styles.buttonText}>View Partner Drills</Text>
        </Pressable>

        <Pressable style={({ pressed }) => [styles.weaponButton, pressed && styles.buttonPressed]} onPress={() => router.push("/weapon-kata")}>
          <Text style={styles.buttonText}>View Weapon Kata</Text>
        </Pressable>

        <Pressable style={({ pressed }) => [styles.selfDefenseButton, pressed && styles.buttonPressed]} onPress={() => router.push("/self-defense")}>
          <Text style={styles.buttonText}>View Self-Defense</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginTop: 40,
    marginBottom: 28,
  },
  schoolName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },
  welcome: {
    marginTop: 8,
    fontSize: 17,
    color: "#666",
  },
  rankButton: {
    minHeight: 76,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 12,
  },
  rankInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  rankText: { flex: 1 },
  rankLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#777",
  },
  rank: {
    marginTop: 8,
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
  },
  beltSwatch: { marginLeft: 14 },
  progressCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardLabel: {
    marginTop: 18,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#777",
  },
  classProgress: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
  },
  progressBarTrack: {
    height: 10,
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 12,
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#1f7a1f",
    borderRadius: 999,
  },
  progressMeta: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 4,
  },
  cardValue: {
    marginTop: 6,
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
  },
  nextRankRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
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
  title: { fontSize: 30, fontWeight: "700", color: "#111", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#666", marginBottom: 24 },
  list: { gap: 10 },
  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  requirementCard: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    backgroundColor: "transparent",
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "transparent",
  },
  requirementName: { fontSize: 18, fontWeight: "600", color: "#111" },
  requirementItem: { marginTop: 8, fontSize: 15, lineHeight: 21, color: "#333" },
  emptyRequirement: { marginTop: 8, fontSize: 14, color: "#777", fontStyle: "italic" },
  notes: { marginTop: 10, fontSize: 14, lineHeight: 20, color: "#666" },
  emptyState: { flex: 1, padding: 24, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  emptyTitle: { fontSize: 22, fontWeight: "700", color: "#111" },
  emptyText: { marginTop: 8, color: "#666", textAlign: "center" },
  rankDetails: { marginBottom: 18 },
});
