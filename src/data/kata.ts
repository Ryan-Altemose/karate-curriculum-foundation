export type Kata = {
  id: string;
  name: string;
  order: number;
  notes?: string;
  minimumRankOrder?: number;
  isPartial?: boolean;
  videoAsset?: number;
  videoUrl?: string;
};

export const kataCatalog: Kata[] = [
    { id: "zenkutsu-drill", name: "Zenkutsu Drill", order: 0, minimumRankOrder: -10 },
    { id: "zenkutsu-drill-four", name: "Zenkutsu Drill (first 4 moves)", order: 0, minimumRankOrder: -10, isPartial: true },
    { id: "zenkutsu-drill-six", name: "Zenkutsu Drill (first 6 moves)", order: 0, minimumRankOrder: -10, isPartial: true },
    { id: "fukyugata-ichi", name: "Fukyugata Ichi", order: 1, minimumRankOrder: -5 },
    { id: "cat-stance-chest-block-exercise", name: "Cat Stance Chest Block Exercise", order: 2, minimumRankOrder: -2 },
    { id: "fukyugata-ni", name: "Fukyugata Ni", order: 3, minimumRankOrder: 2 },
    { id: "oyo-tan-ren", name: "Oyo Tan Ren", order: 4, minimumRankOrder: 3 },
    { id: "pinan-shodan", name: "Pinan Shodan", order: 5, minimumRankOrder: 4 },
    { id: "pinan-nidan", name: "Pinan Nidan", order: 6, minimumRankOrder: 5 },
    { id: "pinan-sandan", name: "Pinan Sandan", order: 7, minimumRankOrder: 6 },
    { id: "pinan-yondan", name: "Pinan Yondan", order: 8, minimumRankOrder: 7 },
    { id: "pinan-godan", name: "Pinan Godan", order: 9, minimumRankOrder: 9 },
    { id: "naihanchi-shodan", name: "Naihanchi Shodan", order: 10, minimumRankOrder: 11 },
    { id: "naihanchi-nidan", name: "Naihanchi Nidan", order: 11, minimumRankOrder: 11 },
    { id: "naihanchi-sandan", name: "Naihanchi Sandan", order: 12, minimumRankOrder: 11 },
    { id: "ananku", name: "Ananku", order: 13, minimumRankOrder: 12 },
    { id: "fukyugata-sandan", name: "Fukyugata Sandan", order: 14, minimumRankOrder: 13 },
    { id: "wankan", name: "Wankan", order: 15, minimumRankOrder: 14 },
    { id: "rohai", name: "Rohai", order: 16, minimumRankOrder: 15 },
    { id: "wanshu", name: "Wanshu", order: 17, minimumRankOrder: 16 },
    { id: "passai", name: "Passai", order: 18, minimumRankOrder: 17 },
    { id: "gojushiho", name: "Gojushiho", order: 19, minimumRankOrder: 18, videoAsset: require("../../app/assets/videos/gojushiho_tournament.mp4") },
    { id: "chinto", name: "Chinto", order: 20, minimumRankOrder: 19 },
    { id: "kusanku", name: "Kusanku", order: 21, minimumRankOrder: 20 },

];

export function getKataById(kataId: string): Kata | undefined {
  return kataCatalog.find((kata) => kata.id === kataId);
}

export function getKataItemById(kataId: string) {
  const kata = getKataById(kataId);
  return kata
    ? { id: kata.id, name: kata.name, order: kata.order, minimumRankOrder: kata.minimumRankOrder }
    : undefined;
}
