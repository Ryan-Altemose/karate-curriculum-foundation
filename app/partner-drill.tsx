import CatalogList from "../src/components/CatalogList";
import { partnerDrillCatalog } from "../src/data/partner-drill";

const topLevelItems = partnerDrillCatalog.filter((item) => !item.groupId);

export default function PartnerDrillScreen() {
  return <CatalogList items={topLevelItems} category="partnerDrill" showControls={false} />;
}
