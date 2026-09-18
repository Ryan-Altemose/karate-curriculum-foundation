import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getRankById } from "../../src/data/curriculum";

export default function RankRequirementsScreen() {
  const { rankId } = useLocalSearchParams<{ rankId: string }>();
  const rank = getRankById(rankId);

  if (!rank) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Rank not found</Text>
        <Text style={styles.emptyText}>Please return to the curriculum and try again.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{rank.name}</Text>
      <Text style={styles.subtitle}>Main requirements for this rank</Text>
      <View style={styles.list}>
        {rank.requirements.map((requirement) => (
          <View key={requirement.id} style={styles.requirementCard}>
            <Text style={styles.requirementName}>{requirement.name}</Text>
            {requirement.items.length > 0 ? (
              requirement.items.map((item) => (
                <Text key={item} style={styles.requirementItem}>• {item}</Text>
              ))
            ) : (
              <Text style={styles.emptyRequirement}>Curriculum details will be added soon.</Text>
            )}
            {requirement.notes ? <Text style={styles.notes}>{requirement.notes}</Text> : null}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, paddingBottom: 40, backgroundColor: "#f5f5f5" },
  title: { fontSize: 30, fontWeight: "700", color: "#111", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#666", marginBottom: 24 },
  list: { gap: 10 },
  requirementCard: { paddingHorizontal: 18, paddingVertical: 16, backgroundColor: "#fff", borderRadius: 12, borderWidth: 1, borderColor: "#ddd" },
  requirementName: { fontSize: 18, fontWeight: "600", color: "#111" },
  requirementItem: { marginTop: 8, fontSize: 15, lineHeight: 21, color: "#333" },
  emptyRequirement: { marginTop: 8, fontSize: 14, color: "#777", fontStyle: "italic" },
  notes: { marginTop: 10, fontSize: 14, lineHeight: 20, color: "#666" },
  emptyState: { flex: 1, padding: 24, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  emptyTitle: { fontSize: 22, fontWeight: "700", color: "#111" },
  emptyText: { marginTop: 8, color: "#666", textAlign: "center" },
});
