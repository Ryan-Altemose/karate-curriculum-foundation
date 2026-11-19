import { StyleSheet, Text, View } from "react-native";
import ContentAccessRow from "./ContentAccessRow";
import { useRouter } from "expo-router";
import type { RequirementCategory } from "../data/rank";
import { categoryPaths } from "../navigation";

type CatalogItem = { id: string; name: string };

type Props = {
  item: CatalogItem;
  category: RequirementCategory;
};

export default function CatalogRow({ item, category }: Props) {
  const router = useRouter();
  // Special-case placeholder items like "None" which should not be buttons
  if (!item.id || item.id === "none" || item.name.toLowerCase() === "none") {
    return (
      <View style={styles.noneRow}>
        <Text style={styles.noneText}>None</Text>
      </View>
    );
  }

  return (
    <ContentAccessRow
      label={item.name}
      onPress={() => router.push(`${categoryPaths[category]}/${item.id}`)}
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
