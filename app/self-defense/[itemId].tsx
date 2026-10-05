import React from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getSelfDefenseById } from "../../src/data/self-defense";
import { Ionicons } from "@expo/vector-icons";

export default function SelfDefenseItemPage() {
  const params = useLocalSearchParams();
  const { itemId } = params as { itemId?: string };
  const item = itemId ? getSelfDefenseById(itemId) : undefined;

  if (!item) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Item not found</Text>
      </View>
    );
  }

  const openVideo = () => {
    const maybeUrl = item.notes?.trim();
    if (maybeUrl && (maybeUrl.startsWith("http://") || maybeUrl.startsWith("https://"))) {
      Linking.openURL(maybeUrl);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{item.name}</Text>

      <TouchableOpacity style={styles.videoContainer} onPress={openVideo} activeOpacity={0.8}>
        <Ionicons name="play-circle" size={64} color="#fff" />
        <Text style={styles.videoHint}>{item.notes ? "Open video / resource" : "No video available"}</Text>
      </TouchableOpacity>

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
    backgroundColor: "#f5f5f5",
    paddingBottom: 60,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 16, color: "#111" },
  videoContainer: {
    height: 200,
    backgroundColor: "#000",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  videoHint: { color: "#fff", marginTop: 8 },
  section: { marginTop: 6 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  description: { fontSize: 15, lineHeight: 22, color: "#333" },
});
