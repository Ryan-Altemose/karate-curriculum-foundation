export type SelfDefense = {
  id: string;
  name: string;
  order: number;
  notes?: string;
};

export const selfDefenseCatalog: SelfDefense[] = [
    { id: "hello", name: "Hello", order: 0 },
    { id: "goodbye", name: "Goodbye", order: 1 },
    {id: "pull-back", name: "Pull Back", order: 2 },
    { id: "zipper", name: "Zipper", order: 3 },
    { id: "cross-arm-grab", name: "Cross-Arm Grab", order: 1 },
    { id: "double-wrist-grab", name: "Double Wrist Grab", order: 2 },
    { id: "defense-against-a-kick", name: "Defense Against a Kick", order: 3 },
    { id: "front-choke", name: "Front Choke", order: 4 },
    { id: "rear-choke", name: "Rear Choke", order: 3 },
    { id: "single-arm-grab-advanced", name: "Single Arm Grab Advanced", order: 4 },
    { id: "single-lapel", name: "Single Lapel", order: 5 },
    { id: "double-lapel", name: "Double Lapel", order: 6 },
    { id: "side-headlock", name: "Side Headlock", order: 7 },
    { id: "full-nelson", name: "Full Nelson", order: 6 },
    { id: "rear-strangle-hold", name: "Rear Strangle Hold", order: 7 },
    { id: "double-wrist-grab-advanced", name: "Double Wrist Grab Advanced", order: 8 },
    { id: "front-choke-advanced", name: "Front Choke Advanced", order: 9 },
    { id: "bear-hug-arms-free", name: "Bear Hug Arms Free", order: 10 },
    { id: "bear-hug-arms-pinned", name: "Bear Hug Arms Pinned", order: 11 },
    { id: "single-hand-throat-grab", name: "Single Hand Throat Grab", order: 12 },
    { id: "hammer-lock", name: "Hammer Lock", order: 13 },
    { id: "knife-attack-1", name: "Knife Attack 1", order: 14 },
    { id: "knife-attack-2", name: "Knife Attack 2", order: 15 },
    { id: "knife-attack-3", name: "Knife Attack 3", order: 16 },
    { id: "knife-attack-4", name: "Knife Attack 4", order: 17 },
];

export function getSelfDefenseById(selfDefenseId: string): SelfDefense | undefined {
  return selfDefenseCatalog.find((item) => item.id === selfDefenseId);
}

export function getSelfDefenseItemById(selfDefenseId: string) {
  const item = getSelfDefenseById(selfDefenseId);
  return item ? { id: item.id, name: item.name, order: item.order } : undefined;
}
