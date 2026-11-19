import { useLocalSearchParams } from "expo-router";
import CatalogDetail from "../../src/components/CatalogDetail";
import { getKataById } from "../../src/data/kata";

export default function KataItemPage() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const item = itemId ? getKataById(itemId) : undefined;

  return <CatalogDetail item={item} category="kata" />;
}
