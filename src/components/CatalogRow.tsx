import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ContentAccessRow from "./ContentAccessRow";
import { useRouter } from "expo-router";
import { isItemUnlocked } from "../data/access";
import { getRankById } from "../data/curriculum";
import { currentStudent } from "../data/student";

type CatalogItem = { id: string; name: string; minimumRankOrder?: number };

type Props = {
  item: CatalogItem;
  category: "kata" | "partnerDrill" | "weaponKata" | "selfDefense" | string;
  onPressOverride?: () => void;
};

export default function CatalogRow({ item, category, onPressOverride }: Props) {
  const router = useRouter();
  const studentRank = getRankById(currentStudent.currentRankId);
  const studentOrder = studentRank?.order ?? 0;
  const locked = !isItemUnlocked(item as any, studentOrder);

  const routeForCategory = (category: string, itemId: string) => {
    switch (category) {
      case "kata":
        return `/kata/${itemId}`;
      case "partnerDrill":
        return `/partner-drill/${itemId}`;
      case "weaponKata":
        return `/weapon-kata/${itemId}`;
      case "selfDefense":
        return `/self-defense/${itemId}`;
      default:
        return undefined;
    }
  };

  const route = routeForCategory(category, item.id);

  const handlePress = onPressOverride ?? (() => {
    if (!locked && route) router.push(route);
  });
  // Special-case placeholder items like "None" which should not be buttons
  if (!item.id || item.id === "none" || (item.name || "").toLowerCase() === "none") {
    return (
      <View style={styles.noneRow}>
        <Text style={styles.noneText}>None</Text>
      </View>
    );
  }

  return (
    <ContentAccessRow
      label={item.name}
      locked={locked}
      onPress={locked ? undefined : handlePress}
    />
  );
}

const styles = StyleSheet.create({
  noneRow: {
    minHeight: 56,
    paddingHorizontal: 18,
    paddingVertical: 12,
    justifyContent: "center",
  },
  noneText: {
    fontSize: 15,
    color: "#666",
    fontStyle: "italic",
  },
});
