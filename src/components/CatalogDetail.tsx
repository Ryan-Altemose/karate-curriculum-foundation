import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { CurriculumItem, RequirementCategory } from "../data/rank";
import { getVideoSource } from "../data/videos";
import { colors, ui } from "../theme";
import DemonstrationVideo from "./DemonstrationVideo";

type Props = {
  item?: Pick<CurriculumItem, "id" | "name" | "notes">;
  category: RequirementCategory;
};

export default function CatalogDetail({ item, category }: Props) {
  if (!item) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Item not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[ui.screen, styles.container]}>
      <Text style={styles.title}>{item.name}</Text>
      <DemonstrationVideo source={getVideoSource(category, item.id)} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{item.notes ?? "No description yet."}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "transparent", paddingBottom: 60 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { ...ui.title, marginBottom: 16, color: colors.ink },
  section: { ...ui.card, padding: 20, marginTop: 6 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  description: { fontSize: 15, lineHeight: 24, color: colors.muted },
});
