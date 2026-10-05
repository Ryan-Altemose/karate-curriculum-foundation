import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CatalogRow from "../src/components/CatalogRow";
import { getRankById } from "../src/data/curriculum";
import { currentStudent } from "../src/data/student";
import { selfDefenseCatalog } from "../src/data/self-defense";

export default function SelfDefenseScreen() {
  const currentRank = getRankById(currentStudent.currentRankId);
  const currentRankOrder = currentRank?.order ?? 0;

  return React.createElement(
    ScrollView,
    { contentContainerStyle: styles.container },
    React.createElement(
      View,
      { style: styles.list },
      ...selfDefenseCatalog.map((item) => {
        return React.createElement(CatalogRow, {
          key: item.id,
          item,
          category: "selfDefense",
        });
      })
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#f5f5f5",
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
});
