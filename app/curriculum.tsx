import { colors, ui } from "../src/theme";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import CollapsibleSection from "../src/components/CollapsibleSection";
import { curriculum } from "../src/data/curriculum";
import BeltSwatch from "../src/components/BeltSwatch";
import type { Rank } from "../src/data/rank";

export default function CurriculumScreen() {
  const tigerRanks = curriculum.filter((r) => r.type === "tigerBelt");
  const underbelts = curriculum.filter((r) => r.type === "underBelt");
  const blackBelts = curriculum.filter((r) => r.type === "conditionalBlackBelt" || r.type === "fullBlackBelt");

  const renderRankRow = (rank: Rank) => {
    const hideBeltVisual = rank.id === "no-belt" || rank.id === "tiger-no-belt";

    return (
      <Pressable
        key={rank.id}
        accessibilityRole="button"
        accessibilityLabel={rank.name}
        onPress={() => router.push({ pathname: "/curriculum/[rankId]", params: { rankId: rank.id } })}
        style={({ pressed }) => [
          ui.card,
          styles.rankRow,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.rankInfo}>
          <View style={styles.rankText}>
            <Text style={styles.rankName}>{rank.name}</Text>
          </View>
          {hideBeltVisual ? (
            <View style={styles.hiddenBeltSwatch} />
          ) : (
            <BeltSwatch rankId={rank.id} degree={rank.degree} style={styles.beltSwatch} />
          )}
        </View>
        <Ionicons name="chevron-forward" size={22} color={colors.muted} />
      </Pressable>
    );
  };

  return (
    <ScrollView contentContainerStyle={[ui.screen, styles.container]}>
      <Text style={styles.title}>Curriculum</Text>
      <Text style={styles.subtitle}>Browse requirements for every belt and rank.</Text>
      <View style={styles.list}>
        <CollapsibleSection title="TIGER BELTS">
          {tigerRanks.map(renderRankRow)}
        </CollapsibleSection>
        <CollapsibleSection title="UNDERBELTS">
          {underbelts.map(renderRankRow)}
        </CollapsibleSection>
        <CollapsibleSection title="BLACK BELTS">
          {blackBelts.map(renderRankRow)}
        </CollapsibleSection>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "transparent",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    letterSpacing: -0.6,
    fontWeight: "700",
    color: colors.ink,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.muted,
    marginBottom: 24,
  },
  list: {
    gap: 10,
  },
  rankRow: {
    minHeight: 76,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  rankInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  beltSwatch: {
    marginLeft: 14,
  },
  hiddenBeltSwatch: {
    width: 0,
    height: 0,
    marginLeft: 0,
  },
  rankText: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  rankName: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "600",
    color: colors.ink,
  },
});
