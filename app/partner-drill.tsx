import CatalogList from "../src/components/CatalogList";
import { partnerDrillCatalog } from "../src/data/partner-drill";

export default function PartnerDrillScreen() {
  return <CatalogList items={partnerDrillCatalog} category="partnerDrill" />;
}
