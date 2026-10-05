export type SelfDefense = {
  id: string;
  name: string;
  order: number;
  notes?: string;
  minimumRankOrder?: number;
};

export const selfDefenseCatalog: SelfDefense[] = [
    { id: "hello", name: "Hello", order: 0, minimumRankOrder: -9 },
    { id: "goodbye", name: "Goodbye", order: 1, minimumRankOrder: -9 },
    {id: "pull-back", name: "Pull Back", order: 2, minimumRankOrder: -8 },
    { id: "zipper", name: "Zipper", order: 3, minimumRankOrder: -8 },
    { id: "cross-arm-grab", name: "Cross-Arm Grab", order: 1, minimumRankOrder: -10 },
    { id: "double-wrist-grab", name: "Double Wrist Grab", order: 2, minimumRankOrder: -10 },
    { id: "front-choke", name: "Front Choke", order: 4, minimumRankOrder: -10 },
    { id: "rear-choke", name: "Rear Choke", order: 3, minimumRankOrder: -10 },
    { id: "single-lapel", name: "Single Lapel", order: 5 },
    { id: "full-nelson", name: "Full Nelson", order: 6 },
    { id: "side-headlock", name: "Side Headlock", order: 7 },
];

export function getSelfDefenseById(selfDefenseId: string): SelfDefense | undefined {
  return selfDefenseCatalog.find((item) => item.id === selfDefenseId);
}

export function getSelfDefenseItemById(selfDefenseId: string) {
  const item = getSelfDefenseById(selfDefenseId);
  return item ? { id: item.id, name: item.name, order: item.order, minimumRankOrder: item.minimumRankOrder } : undefined;
}
