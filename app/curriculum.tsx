import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { curriculum, getRankByOrder } from "../src/data/curriculum";
import { currentStudent } from "../src/data/student";

export default function CurriculumScreen() {
  return React.createElement(
    ScrollView,
    { contentContainerStyle: styles.container },
    React.createElement(Text, { style: styles.title }, "Curriculum"),
    React.createElement(
      Text,
      { style: styles.subtitle },
      `Your current rank is ${getRankByOrder(currentStudent.rankOrder)?.name}. You can access this rank and all previous ranks.`
    ),
    React.createElement(
      View,
      { style: styles.list },
      ...curriculum.map((rank, index) => {
        const locked = rank.order > currentStudent.rankOrder;
        const current = rank.order === currentStudent.rankOrder;
        const startsBlackBeltSection =
          rank.type !== "underBelt" && curriculum[index - 1]?.type === "underBelt";

        return React.createElement(
          React.Fragment,
          { key: rank.id },
          startsBlackBeltSection
            ? React.createElement(
                View,
                { style: styles.sectionDivider },
                React.createElement(View, { style: styles.dividerLine }),
                React.createElement(Text, { style: styles.dividerLabel }, "BLACK BELTS"),
                React.createElement(View, { style: styles.dividerLine })
              )
            : null,
          React.createElement(
            Pressable,
            {
              disabled: locked,
              onPress: () => router.push({ pathname: "/curriculum/[rankId]", params: { rankId: rank.id } }),
              style: ({ pressed }: { pressed: boolean }) => [
                styles.rankRow,
                current && styles.currentRow,
                pressed && !locked && styles.pressed,
                locked && styles.lockedRow,
              ],
            },
            React.createElement(
              View,
              null,
              React.createElement(
                Text,
                { style: [styles.rankName, locked && styles.lockedText] },
                rank.name
              ),
              React.createElement(
                Text,
                { style: [styles.status, locked && styles.lockedText] },
                locked ? "Locked" : current ? "Current rank" : "Available"
              )
            ),
            React.createElement(Ionicons, {
              name: locked ? "lock-closed-outline" : "chevron-forward",
              size: 22,
              color: locked ? "#999" : "#222",
            })
          )
        );
      })
    )
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#666",
    marginBottom: 24,
  },
  list: {
    gap: 10,
  },
  sectionDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
    marginBottom: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#bbb",
  },
  dividerLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#666",
  },
  rankRow: {
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
  },
  currentRow: {
    borderWidth: 2,
    borderColor: "#222",
  },
  lockedRow: {
    backgroundColor: "#e9e9e9",
    borderColor: "#ddd",
  },
  pressed: {
    opacity: 0.7,
  },
  rankName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  status: {
    marginTop: 4,
    fontSize: 13,
    color: "#777",
  },
  lockedText: {
    color: "#999",
  },
});
