import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { RequirementCategory } from "../data/rank";
import { colors, ui } from "../theme";
import CatalogRow from "./CatalogRow";

type Props = {
  title: string;
  items: readonly { id: string; name: string }[];
  category: RequirementCategory;
};

export default function CatalogGroup({ title, items, category }: Props) {
  return (
    <ScrollView contentContainerStyle={[ui.screen, styles.container]}>
      <Text style={styles.title} accessibilityRole="header">{title}</Text>
      <View testID="catalog-group-entries" style={styles.list}>
        {items.map((item) => <CatalogRow key={item.id} item={item} category={category} />)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, paddingBottom: 40, backgroundColor: "transparent", gap: 10 },
  title: { ...ui.title, color: colors.ink, marginBottom: 6 },
  list: { gap: 10 },
});
