import { getWeaponKataById, weaponKataCatalog, type WeaponKataGroupId } from "../data/weapon-kata";
import CatalogGroup from "./CatalogGroup";

export default function WeaponKataGroup({ groupId }: { groupId: WeaponKataGroupId }) {
  const group = getWeaponKataById(groupId);
  const items = weaponKataCatalog.filter((item) => item.groupId === groupId);

  return <CatalogGroup title={group?.name ?? "Group not found"} items={items} category="weaponKata" />;
}
