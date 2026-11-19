import { useLocalSearchParams } from "expo-router";
import CatalogDetail from "../../src/components/CatalogDetail";
import { getPartnerDrillById } from "../../src/data/partner-drill";

export default function PartnerDrillItemPage() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const item = itemId ? getPartnerDrillById(itemId) : undefined;

  return <CatalogDetail item={item} category="partnerDrill" />;
}
