import { colors, ui } from "../theme";
import { ScrollView, StyleSheet, Text } from "react-native";
import { getWeaponKataById, weaponKataCatalog, type WeaponKataGroupId } from "../data/weapon-kata";
import CatalogRow from "./CatalogRow";

export default function WeaponKataGroup({ groupId }: { groupId: WeaponKataGroupId }) {
  const group = getWeaponKataById(groupId);
  const items = weaponKataCatalog.filter((item) => item.groupId === groupId);

  return (
    <ScrollView contentContainerStyle={[ui.screen, styles.container]}>
      <Text style={styles.title} accessibilityRole="header">{group?.name ?? "Group not found"}</Text>
      {items.map((item) => <CatalogRow key={item.id} item={item} category="weaponKata" />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, paddingBottom: 40, backgroundColor: "transparent", gap: 10 },
  title: { ...ui.title, color: colors.ink, marginBottom: 6 },
});
