import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import DemonstrationVideo from "../../src/components/DemonstrationVideo";
import { getKataById } from "../../src/data/kata";

export default function KataItemPage() {
  const params = useLocalSearchParams();
  const { itemId } = params as { itemId?: string };
  const kata = itemId ? getKataById(itemId) : undefined;

  if (!kata) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Item not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{kata.name}</Text>

      <DemonstrationVideo source={kata.videoAsset ?? kata.videoUrl} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{kata.notes ?? "No description yet."}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    paddingBottom: 60,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 16, color: "#111" },
  section: { marginTop: 6 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  description: { fontSize: 15, lineHeight: 22, color: "#333" },
});
