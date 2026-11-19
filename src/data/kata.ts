export type Kata = {
  id: string;
  name: string;
  order: number;
  notes?: string;
  isPartial?: boolean;
};

export const kataCatalog: Kata[] = [
    { id: "zenkutsu-drill", name: "Zenkutsu Drill", order: 0 },
    { id: "zenkutsu-drill-four", name: "Zenkutsu Drill (first 4 moves)", order: 0, isPartial: true },
    { id: "zenkutsu-drill-six", name: "Zenkutsu Drill (first 6 moves)", order: 0, isPartial: true },
    { id: "fukyugata-ichi", name: "Fukyugata Ichi", order: 1 },
    { id: "cat-stance-chest-block-exercise", name: "Cat Stance Chest Block Exercise", order: 2 },
    { id: "fukyugata-ni", name: "Fukyugata Ni", order: 3 },
    { id: "oyo-tan-ren", name: "Oyo Tan Ren", order: 4 },
    { id: "pinan-shodan", name: "Pinan Shodan", order: 5 },
    { id: "pinan-nidan", name: "Pinan Nidan", order: 6 },
    { id: "pinan-sandan", name: "Pinan Sandan", order: 7 },
    { id: "pinan-yondan", name: "Pinan Yondan", order: 8 },
    { id: "pinan-godan", name: "Pinan Godan", order: 9 },
    { id: "naihanchi-shodan", name: "Naihanchi Shodan", order: 10 },
    { id: "naihanchi-nidan", name: "Naihanchi Nidan", order: 11 },
    { id: "naihanchi-sandan", name: "Naihanchi Sandan", order: 12 },
    { id: "ananku", name: "Ananku", order: 13 },
    { id: "fukyugata-sandan", name: "Fukyugata Sandan", order: 14 },
    { id: "wankan", name: "Wankan", order: 15 },
    { id: "rohai", name: "Rohai", order: 16 },
    { id: "wanshu", name: "Wanshu", order: 17 },
    { id: "passai", name: "Passai", order: 18 },
    { id: "gojushiho", name: "Gojushiho", order: 19 },
    { id: "chinto", name: "Chinto", order: 20 },
    { id: "kusanku", name: "Kusanku", order: 21 },

];

export function getKataById(kataId: string): Kata | undefined {
  return kataCatalog.find((kata) => kata.id === kataId);
}

export function getKataItemById(kataId: string) {
  const kata = getKataById(kataId);
  return kata
    ? { id: kata.id, name: kata.name, order: kata.order }
    : undefined;
}
