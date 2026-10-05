export type WeaponKata = {
  id: string;
  name: string;
  order: number;
  notes?: string;
  minimumRankOrder?: number;
  isPartial?: boolean;
};

export const weaponKataCatalog: WeaponKata[] = [
    { id: "none", name: "None", order: 1 },
    { id: "hajime-no-tai-so", name: "Hajime No Tai So", order: 1, minimumRankOrder: -6 },
    { id: "futatsume-no-tai-so", name: "Futatsume No Tai So", order: 2, minimumRankOrder: 3 },
    { id: "haku-sho-no-kun-half", name: "Haku Sho No Kun (Half)", order: 3, minimumRankOrder: 4, isPartial: true },
    { id: "haku-sho-no-kun", name: "Haku Sho No Kun", order: 4, minimumRankOrder: 5 }, 
    { id: "bojitsu-shodan-half", name: "Bojitsu Shodan (Half)", order: 5, minimumRankOrder: 6, isPartial: true },
    { id: "bojitsu-shodan", name: "Bojitsu Shodan", order: 6, minimumRankOrder: 7 },
    { id: "escrima-pattern-1", name: "Escrima Pattern 1", order: 7, minimumRankOrder: 8 },
    { id: "escrima-pattern-2", name: "Escrima Pattern 2", order: 8, minimumRankOrder: 8 },
    { id: "six-count-one-stick", name: "Six Count One Stick", order: 9, minimumRankOrder: 8 },
    { id: "four-count-two-stick", name: "Four Count Two Stick", order: 10, minimumRankOrder: 8 },
    { id: "six-count-two-stick", name: "Six Count Two Stick", order: 11, minimumRankOrder: 8 },
    { id: "nunchuku-exercise", name: "Nunchuku Exercise", order: 12, minimumRankOrder: 9 },
    { id: "tonfa-kihon-1", name: "Tonfa Kihon 1", order: 12, minimumRankOrder: 10 },
    { id: "tonfa-kihon-2", name: "Tonfa Kihon 2", order: 13, minimumRankOrder: 10 },
    { id: "tonfa-kihon-3", name: "Tonfa Kihon 3", order: 14, minimumRankOrder: 10 },
    { id: "tonfa-kihon-4", name: "Tonfa Kihon 4", order: 15, minimumRankOrder: 10 },
    { id: "tonfa-kihon-5", name: "Tonfa Kihon 5", order: 16, minimumRankOrder: 10 },
      { id: "tonfa-kihon-6", name: "Tonfa Kihon 6", order: 17, minimumRankOrder: 10 },
      { id: "tonfa-kihon-7", name: "Tonfa Kihon 7", order: 18, minimumRankOrder: 10 },
      { id: "tonfa-kihon-8", name: "Tonfa Kihon 8", order: 19, minimumRankOrder: 11 },
      { id: "tonfa-kihon-9", name: "Tonfa Kihon 9", order: 20, minimumRankOrder: 11 },
      { id: "tonfa-kihon-10", name: "Tonfa Kihon 10", order: 21, minimumRankOrder: 11 },
      { id: "tonfa-kihon-11", name: "Tonfa Kihon 11", order: 22, minimumRankOrder: 11 },
    { id: "sai-shorei-no-kata-dai-ichi", name: "Sai Shorei No Kata Dai Ichi", order: 23, minimumRankOrder: 12 },
    { id: "sai-kihon-1", name: "Sai Kihon 1", order: 24, minimumRankOrder: 13 },
    { id: "sai-kihon-2", name: "Sai Kihon 2", order: 25, minimumRankOrder: 13 },
    { id: "sai-kihon-3", name: "Sai Kihon 3", order: 26, minimumRankOrder: 13 },
    { id: "sai-kihon-4", name: "Sai Kihon 4", order: 27, minimumRankOrder: 13 },
    { id: "sai-kihon-5", name: "Sai Kihon 5", order: 28, minimumRankOrder: 13 },
    { id: "sai-kihon-6", name: "Sai Kihon 6", order: 29, minimumRankOrder: 13 },
    { id: "sai-kihon-7", name: "Sai Kihon 7", order: 30, minimumRankOrder: 13 },
    { id: "sai-kihon-8", name: "Sai Kihon 8", order: 31, minimumRankOrder: 13 },
    { id: "sai-kihon-9", name: "Sai Kihon 9", order: 32, minimumRankOrder: 13 },
    { id: "sai-kihon-10", name: "Sai Kihon 10", order: 33, minimumRankOrder: 13 },
    { id: "sai-kihon-11", name: "Sai Kihon 11", order: 34, minimumRankOrder: 13 },
    { id: "sai-kihon-12", name: "Sai Kihon 12", order: 35, minimumRankOrder: 13 },
    { id: "sho-sai", name: "Sho Sai", order: 36, minimumRankOrder: 14 },
    { id: "shichi-no-kun-sho", name: "Shichi No Kun Sho", order: 37, minimumRankOrder: 15 },
    { id: "kama-sho-kata", name: "Kama Sho Kata", order: 38, minimumRankOrder: 16 },
    { id: "ni-sai", name: "Ni Sai", order: 39, minimumRankOrder: 17 },
    { id: "suji-no-kun", name: "Suji No Kun", order: 40, minimumRankOrder: 18 },
    { id: "san-sai", name: "San Sai", order: 41, minimumRankOrder: 19 },
    { id: "mizoniatoshi", name: "Mizoniatoshi", order: 42, minimumRankOrder: 20 },
];

export function getWeaponKataById(weaponKataId: string): WeaponKata | undefined {
  return weaponKataCatalog.find((item) => item.id === weaponKataId);
}

export function getWeaponKataItemById(weaponKataId: string) {
  const item = getWeaponKataById(weaponKataId);
  return item ? { id: item.id, name: item.name, order: item.order, minimumRankOrder: item.minimumRankOrder } : undefined;
}
