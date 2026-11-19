import { colors, ui } from "../../src/theme";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getRankById } from "../../src/data/curriculum";
import CatalogRow from "../../src/components/CatalogRow";
import BeltSwatch from "../../src/components/BeltSwatch";
import ContentAccessRow from "../../src/components/ContentAccessRow";
import type { RequirementCategory } from "../../src/data/rank";
import { categoryPaths } from "../../src/navigation";

const reviewContent: Record<RequirementCategory, { label: string; message: string }> = {
  kata: { label: "View All Kata", message: "Review previously learned kata." },
  weaponKata: { label: "View All Weapon Kata", message: "Review previously learned weapon kata." },
  partnerDrill: { label: "View All Partner Drills", message: "Review previously learned partner drills." },
  selfDefense: { label: "View All Self-Defense", message: "Review previously learned self-defense techniques." },
};

export default function RankRequirementsScreen() {
  const { rankId } = useLocalSearchParams<{ rankId: string }>();
  const router = useRouter();
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
    <ScrollView contentContainerStyle={[ui.screen, styles.container]}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{rank.name}</Text>
        <BeltSwatch rankId={rank.id} degree={rank.degree} width={64} height={16} style={{ marginLeft: 12 }} />
      </View>
      <Text style={styles.subtitle}>Main requirements for this rank</Text>
      <View style={styles.list}>
        {rank.requirements.map((requirement) => (
          <View key={requirement.id} style={styles.requirementCard}>
            <Text style={styles.requirementName}>{requirement.name}</Text>
            {requirement.items.length > 0 ? (
              requirement.items.map((item) => (
                <CatalogRow key={item.id} item={item} category={requirement.category} />
              ))
            ) : requirement.reviewPrevious ? (
              <>
                <Text style={styles.emptyRequirement}>{reviewContent[requirement.category].message}</Text>
                <ContentAccessRow
                  variant="outline"
                  label={reviewContent[requirement.category].label}
                  onPress={() => router.push(categoryPaths[requirement.category])}
                />
              </>
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
  container: { flexGrow: 1, padding: 20, paddingBottom: 40, backgroundColor: "transparent" },
  title: { ...ui.title, color: colors.ink, marginBottom: 8 },
  subtitle: { fontSize: 15, color: colors.muted, marginBottom: 24 },
  list: { gap: 10 },
  titleRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", marginBottom: 8 },
  requirementCard: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    backgroundColor: "transparent",
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "transparent",
  },
  requirementName: { fontSize: 13, fontWeight: "700", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 4, color: colors.accent },
  emptyRequirement: { marginTop: 8, fontSize: 14, color: colors.muted, fontStyle: "italic" },
  notes: { marginTop: 10, fontSize: 14, lineHeight: 20, color: colors.muted },
  emptyState: { flex: 1, padding: 24, justifyContent: "center", alignItems: "center", backgroundColor: "transparent" },
  emptyTitle: { fontSize: 22, fontWeight: "700", color: colors.ink },
  emptyText: { marginTop: 8, color: colors.muted, textAlign: "center" },
});
