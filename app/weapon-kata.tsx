import CatalogList from "../src/components/CatalogList";
import { weaponKataCatalog } from "../src/data/weapon-kata";

const topLevelItems = weaponKataCatalog.filter((item) => !item.groupId);

export default function WeaponKataScreen() {
  return <CatalogList items={topLevelItems} category="weaponKata" />;
}
