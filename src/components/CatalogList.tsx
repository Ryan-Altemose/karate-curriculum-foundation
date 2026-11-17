import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { RequirementCategory } from "../data/rank";
import { colors, ui } from "../theme";
import CatalogRow from "./CatalogRow";

type CatalogEntry = {
  id: string;
  name: string;
  isPartial?: boolean;
};

type Props = {
  items: readonly CatalogEntry[];
  category: RequirementCategory;
};

export default function CatalogList({ items, category }: Props) {
  const [query, setQuery] = useState("");
  const [reverseRankOrder, setReverseRankOrder] = useState(false);
  const search = query.trim().toLowerCase();
  const visibleItems = items.filter((item) =>
    !item.isPartial &&
    item.id !== "none" &&
    item.name.toLowerCase() !== "none" &&
    item.name.toLowerCase().includes(search)
  );

  // The catalogs define the curriculum sequence. Reverse a filtered copy so
  // browsing never mutates the shared data used by the belt requirements.
  if (reverseRankOrder) visibleItems.reverse();

  return (
    <ScrollView contentContainerStyle={[ui.screen, styles.container]} keyboardShouldPersistTaps="handled">
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={22} color={colors.muted} />
        <TextInput
          accessibilityLabel="Search entries"
          placeholder="Search"
          placeholderTextColor={colors.muted}
          inputMode="search"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
        {query.length > 0 && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            onPress={() => setQuery("")}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={22} color="#666" />
          </Pressable>
        )}
      </View>

      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Reverse-rank order</Text>
        <Switch
          accessibilityLabel="Reverse-rank order"
          value={reverseRankOrder}
          onValueChange={setReverseRankOrder}
          trackColor={{ false: "#ccc", true: "#0ea713" }}
        />
      </View>

      <View testID="catalog-entries" style={styles.list}>
        {visibleItems.map((item) => <CatalogRow key={item.id} item={item} category={category} />)}
      </View>
      {visibleItems.length === 0 && (
        <Text accessibilityLiveRegion="polite" style={styles.emptyText}>No entries match your search.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, paddingBottom: 40, backgroundColor: colors.background },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  searchInput: { flex: 1, minWidth: 0, minHeight: 52, paddingHorizontal: 10, fontSize: 16, color: colors.ink },
  clearButton: { minWidth: 44, minHeight: 48, justifyContent: "center", alignItems: "center" },
  sortRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 44,
    gap: 12,
    marginTop: 12,
    marginBottom: 16,
  },
  sortLabel: { flex: 1, fontSize: 14, fontWeight: "600", color: colors.muted },
  list: { gap: 10 },
  emptyText: { marginTop: 24, fontSize: 16, lineHeight: 24, textAlign: "center", color: colors.muted },
});
