import React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { getRankById, getRankByOrder } from "../src/data/curriculum";
import { getRequiredClasses } from "../src/data/rank";
import { currentStudent } from "../src/data/student";

export default function HomeScreen() {
  const currentRank = getRankByOrder(currentStudent.rankOrder);
  const nextRank = getRankById(currentStudent.nextRankId);
  const requiredClasses = currentRank ? getRequiredClasses(currentRank) : 0;
  const graduationDate = new Date(`${currentStudent.graduationDate}T00:00:00`).toLocaleDateString(
    undefined,
    { month: "long", day: "numeric", year: "numeric" }
  );

  return React.createElement(
    ScrollView,
    { contentContainerStyle: styles.container },
    React.createElement(StatusBar, { style: "auto" }),
    React.createElement(
      View,
      { style: styles.header },
      React.createElement(Text, { style: styles.schoolName }, "Karate Curriculum"),
      React.createElement(Text, { style: styles.welcome }, `Welcome, ${currentStudent.name}!`)
    ),
    React.createElement(
      View,
      { style: styles.rankCard },
      React.createElement(Text, { style: styles.rankLabel }, "CURRENT RANK"),
      React.createElement(Text, { style: styles.rank }, currentRank?.name ?? "Rank not set")
    ),
    React.createElement(
      View,
      { style: styles.progressCard },
      React.createElement(Text, { style: styles.cardLabel }, "CLASSES ATTENDED"),
      React.createElement(
        Text,
        { style: styles.classProgress },
        `${currentStudent.classCount} of ${requiredClasses}`
      ),
      React.createElement(Text, { style: styles.cardLabel }, "NEXT RANK"),
      React.createElement(Text, { style: styles.cardValue }, nextRank?.name ?? "Not set"),
      React.createElement(Text, { style: styles.cardLabel }, "NEXT GRADUATION DATE"),
      React.createElement(Text, { style: styles.cardValue }, graduationDate)
    ),
    React.createElement(
      Pressable,
      {
        style: ({ pressed }) => [styles.button, pressed && styles.buttonPressed],
        onPress: () => router.push("/curriculum"),
      },
      React.createElement(Text, { style: styles.buttonText }, "View Curriculum")
    )
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
  rankCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
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
  cardValue: {
    marginTop: 6,
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
  },
  button: {
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
