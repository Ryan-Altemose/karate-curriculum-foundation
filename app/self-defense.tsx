import CatalogList from "../src/components/CatalogList";
import { selfDefenseCatalog } from "../src/data/self-defense";

export default function SelfDefenseScreen() {
  return <CatalogList items={selfDefenseCatalog} category="selfDefense" />;
}
