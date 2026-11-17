import CatalogList from "../src/components/CatalogList";
import { kataCatalog } from "../src/data/kata";

export default function KataScreen() {
  return <CatalogList items={kataCatalog} category="kata" />;
}
