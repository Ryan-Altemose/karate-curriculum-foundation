import { useLocalSearchParams } from "expo-router";
import CatalogDetail from "../../src/components/CatalogDetail";
import { getWeaponKataById } from "../../src/data/weapon-kata";

export default function WeaponKataItemPage() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const item = itemId ? getWeaponKataById(itemId) : undefined;

  return <CatalogDetail item={item} category="weaponKata" />;
}
