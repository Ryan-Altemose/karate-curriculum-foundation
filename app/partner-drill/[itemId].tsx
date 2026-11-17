import { colors, ui } from "../../src/theme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import DemonstrationVideo from "../../src/components/DemonstrationVideo";
import { getPartnerDrillById } from "../../src/data/partner-drill";

export default function PartnerDrillItemPage() {
  const params = useLocalSearchParams();
  const { itemId } = params as { itemId?: string };
  const item = itemId ? getPartnerDrillById(itemId) : undefined;

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

      <DemonstrationVideo source={item.videoUrl} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{item.notes ?? "No description yet."}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
    paddingBottom: 60,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { ...ui.title, marginBottom: 16, color: colors.ink },
  section: { ...ui.card, padding: 20, marginTop: 6 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  description: { fontSize: 15, lineHeight: 24, color: colors.muted },
});
