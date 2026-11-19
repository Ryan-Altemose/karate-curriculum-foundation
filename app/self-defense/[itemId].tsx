import { useLocalSearchParams } from "expo-router";
import CatalogDetail from "../../src/components/CatalogDetail";
import { getSelfDefenseById } from "../../src/data/self-defense";

export default function SelfDefenseItemPage() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const item = itemId ? getSelfDefenseById(itemId) : undefined;

  return <CatalogDetail item={item} category="selfDefense" />;
}
