import { getPartnerDrillById, partnerDrillCatalog, type PartnerDrillGroupId } from "../data/partner-drill";
import CatalogGroup from "./CatalogGroup";

export default function PartnerDrillGroup({ groupId }: { groupId: PartnerDrillGroupId }) {
  const group = getPartnerDrillById(groupId);
  const items = partnerDrillCatalog.filter((item) => item.groupId === groupId && !item.isPartial);

  return <CatalogGroup title={group?.name ?? "Group not found"} items={items} category="partnerDrill" />;
}
