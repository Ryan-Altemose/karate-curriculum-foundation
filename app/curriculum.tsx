import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import CollapsibleSection from "../src/components/CollapsibleSection";
import { curriculum, getRankById } from "../src/data/curriculum";
import BeltSwatch from "../src/components/BeltSwatch";
import { currentStudent } from "../src/data/student";

export default function CurriculumScreen() {
  const currentRank = getRankById(currentStudent.currentRankId);
  const currentRankOrder = currentRank?.order ?? 0;

  const tigerRanks = curriculum.filter((r) => r.type === "tigerBelt");
  const underbelts = curriculum.filter((r) => r.type === "underBelt");
  const blackBelts = curriculum.filter((r) => r.type === "conditionalBlackBelt" || r.type === "fullBlackBelt");

  const renderRankRow = (rank: any, index: number) => {
    const locked = rank.order > currentRankOrder;
    const current = rank.id === currentRank?.id;
    const hideBeltVisual = rank.id === "no-belt" || rank.id === "tiger-no-belt";

    // determine if this is a black belt rank type
    const isBlack = rank.type === "conditionalBlackBelt" || rank.type === "fullBlackBelt";

    return (
      React.createElement(
        Pressable,
        {
          key: rank.id,
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
          { style: styles.rankInfo },
          React.createElement(
            View,
            { style: styles.rankText },
            React.createElement(Text, { style: [styles.rankName, locked && styles.lockedText] }, rank.name),
            React.createElement(Text, { style: [styles.status, locked && styles.lockedText] }, locked ? "Locked" : current ? "Current rank" : "Available")
          ),
          !hideBeltVisual
            ? React.createElement(BeltSwatch, { rankId: rank.id, degree: rank.degree, locked, style: styles.beltSwatch })
            : React.createElement(View, { style: styles.hiddenBeltSwatch })
        ),
        React.createElement(Ionicons, { name: locked ? "lock-closed-outline" : "chevron-forward", size: 22, color: locked ? "#999" : "#222" })
      )
    );
  };

  return (
    React.createElement(ScrollView, { contentContainerStyle: styles.container },
      React.createElement(Text, { style: styles.title }, "Curriculum"),
      React.createElement(Text, { style: styles.subtitle }, `Your current rank is ${currentRank?.name ?? "not set"}. You can access this rank and all previous ranks.`),

      React.createElement(View, { style: styles.list },
        React.createElement(CollapsibleSection, { title: "TIGER BELTS", initiallyOpen: false },
          tigerRanks.map(renderRankRow)
        ),

        React.createElement(View, { style: styles.fullDivider }),

        React.createElement(CollapsibleSection, { title: "UNDERBELTS", initiallyOpen: false },
          underbelts.map(renderRankRow)
        ),

        React.createElement(View, { style: styles.fullDivider }),

        React.createElement(CollapsibleSection, { title: "BLACK BELTS", initiallyOpen: false },
          blackBelts.map(renderRankRow)
        )
      )
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
  fullDivider: { height: 1, backgroundColor: "#ddd", marginVertical: 12 },
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
    marginTop: 8,
  },
  rankInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  beltSwatch: {
    marginLeft: 14,
  },
  hiddenBeltSwatch: {
    width: 0,
    height: 0,
    marginLeft: 0,
  },
  lockedBeltSwatch: {
    opacity: 0.35,
  },
  rankText: {
    flex: 1,
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
