export type WeaponKataGroupId = "sai-kihon" | "tonfa-kihon" | "escrima-stick-patterns";

export type WeaponKata = {
  id: string;
  name: string;
  order: number;
  notes?: string;
  isPartial?: boolean;
  groupId?: WeaponKataGroupId;
};

export const weaponKataCatalog: WeaponKata[] = [
    { id: "none", name: "None", order: 1 },
    { id: "hajime-no-tai-so", name: "Hajime No Tai So", order: 1 },
    { id: "futatsume-no-tai-so", name: "Futatsume No Tai So", order: 2 },
    { id: "haku-sho-no-kun-half", name: "Haku Sho No Kun (Half)", order: 3, isPartial: true },
    { id: "haku-sho-no-kun", name: "Haku Sho No Kun", order: 4 },
    { id: "bojitsu-shodan-half", name: "Bojitsu Shodan (Half)", order: 5, isPartial: true },
    { id: "bojitsu-shodan", name: "Bojitsu Shodan", order: 6 },
    { id: "escrima-stick-patterns", name: "Escrima Stick Patterns", order: 7 },
    { id: "escrima-pattern-1", name: "Escrima Pattern 1", order: 7, groupId: "escrima-stick-patterns" },
    { id: "escrima-pattern-2", name: "Escrima Pattern 2", order: 8, groupId: "escrima-stick-patterns" },
    { id: "six-count-one-stick", name: "Six Count One Stick", order: 9, groupId: "escrima-stick-patterns" },
    { id: "four-count-two-stick", name: "Four Count Two Stick", order: 10, groupId: "escrima-stick-patterns" },
    { id: "six-count-two-stick", name: "Six Count Two Stick", order: 11, groupId: "escrima-stick-patterns" },
    { id: "nunchuku-exercise", name: "Nunchuku Exercise", order: 12 },
    { id: "tonfa-kihon", name: "Tonfa Kihon", order: 12 },
    { id: "tonfa-kihon-1", name: "Tonfa Kihon 1", order: 12, groupId: "tonfa-kihon" },
    { id: "tonfa-kihon-2", name: "Tonfa Kihon 2", order: 13, groupId: "tonfa-kihon" },
    { id: "tonfa-kihon-3", name: "Tonfa Kihon 3", order: 14, groupId: "tonfa-kihon" },
    { id: "tonfa-kihon-4", name: "Tonfa Kihon 4", order: 15, groupId: "tonfa-kihon" },
    { id: "tonfa-kihon-5", name: "Tonfa Kihon 5", order: 16, groupId: "tonfa-kihon" },
      { id: "tonfa-kihon-6", name: "Tonfa Kihon 6", order: 17, groupId: "tonfa-kihon" },
      { id: "tonfa-kihon-7", name: "Tonfa Kihon 7", order: 18, groupId: "tonfa-kihon" },
      { id: "tonfa-kihon-8", name: "Tonfa Kihon 8", order: 19, groupId: "tonfa-kihon" },
      { id: "tonfa-kihon-9", name: "Tonfa Kihon 9", order: 20, groupId: "tonfa-kihon" },
      { id: "tonfa-kihon-10", name: "Tonfa Kihon 10", order: 21, groupId: "tonfa-kihon" },
      { id: "tonfa-kihon-11", name: "Tonfa Kihon 11", order: 22, groupId: "tonfa-kihon" },
    { id: "sai-shorei-no-kata-dai-ichi", name: "Sai Shorei No Kata Dai Ichi", order: 23 },
    { id: "sai-kihon", name: "Sai Kihon", order: 24 },
    { id: "sai-kihon-1", name: "Sai Kihon 1", order: 24, groupId: "sai-kihon" },
    { id: "sai-kihon-2", name: "Sai Kihon 2", order: 25, groupId: "sai-kihon" },
    { id: "sai-kihon-3", name: "Sai Kihon 3", order: 26, groupId: "sai-kihon" },
    { id: "sai-kihon-4", name: "Sai Kihon 4", order: 27, groupId: "sai-kihon" },
    { id: "sai-kihon-5", name: "Sai Kihon 5", order: 28, groupId: "sai-kihon" },
    { id: "sai-kihon-6", name: "Sai Kihon 6", order: 29, groupId: "sai-kihon" },
    { id: "sai-kihon-7", name: "Sai Kihon 7", order: 30, groupId: "sai-kihon" },
    { id: "sai-kihon-8", name: "Sai Kihon 8", order: 31, groupId: "sai-kihon" },
    { id: "sai-kihon-9", name: "Sai Kihon 9", order: 32, groupId: "sai-kihon" },
    { id: "sai-kihon-10", name: "Sai Kihon 10", order: 33, groupId: "sai-kihon" },
    { id: "sai-kihon-11", name: "Sai Kihon 11", order: 34, groupId: "sai-kihon" },
    { id: "sai-kihon-12", name: "Sai Kihon 12", order: 35, groupId: "sai-kihon" },
    { id: "sho-sai", name: "Sho Sai", order: 36 },
    { id: "shichi-no-kun-sho", name: "Shichi No Kun Sho", order: 37 },
    { id: "kama-sho-kata", name: "Kama Sho Kata", order: 38 },
    { id: "ni-sai", name: "Ni Sai", order: 39 },
    { id: "suji-no-kun", name: "Suji No Kun", order: 40 },
    { id: "san-sai", name: "San Sai", order: 41 },
    { id: "mizoniatoshi", name: "Mizoniatoshi", order: 42 },
    { id: "fuguzatsu-bo-kata-shodan", name: "Fuguzatsu Bo Kata Shodan", order: 43 },
    { id: "shikina-no-tonfa", name: "Shikina No Tonfa", order: 44 },
    { id: "futagi", name: "Futagi", order: 45 },
];

export function getWeaponKataById(weaponKataId: string): WeaponKata | undefined {
  return weaponKataCatalog.find((item) => item.id === weaponKataId);
}

export function getWeaponKataItemById(weaponKataId: string, options: { name?: string } = {}) {
  const item = getWeaponKataById(weaponKataId);
  return item ? { id: item.id, name: options.name ?? item.name, order: item.order } : undefined;
}
