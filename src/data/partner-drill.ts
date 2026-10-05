export type PartnerDrill = {
  id: string;
  name: string;
  order: number;
  notes?: string;
  minimumRankOrder?: number;
  isPartial?: boolean;
};

export const partnerDrillCatalog: PartnerDrill[] = [
  { id: "punching-blocking-drill", name: "Punching Blocking Drill", order: 0, minimumRankOrder: -10 },
  { id: "fighting-attack-1", name: "Fighting Attack 1", order: 1, minimumRankOrder: 1 },
  { id: "fighting-attack-2", name: "Fighting Attack 2", order: 2, minimumRankOrder: 1 },
  { id: "fighting-attack-3-no-takedown", name: "Fighting Attack 3 (No Takedown)", order: 3, minimumRankOrder: 1, isPartial: true },
  { id: "fighting-attack-3", name: "Fighting Attack 3", order: 4, minimumRankOrder: 3 },
  { id: "uke-waza-1", name: "Uke Waza 1", order: 5, minimumRankOrder: 4 },
  { id: "uke-waza-2", name: "Uke Waza 2", order: 6, minimumRankOrder: 4 },
  { id: "uke-waza-3", name: "Uke Waza 3", order: 7, minimumRankOrder: 5 },
  { id: "uke-waza-4", name: "Uke Waza 4", order: 8, minimumRankOrder: 5 },
  { id: "uke-waza-5", name: "Uke Waza 5", order: 9, minimumRankOrder: 6 },
  { id: "uke-waza-6", name: "Uke Waza 6", order: 10, minimumRankOrder: 6 },
  { id: "uke-waza-7", name: "Uke Waza 7", order: 11, minimumRankOrder: 7 },
  { id: "promise-kumite-1", name: "Promise Kumite 1", order: 12, minimumRankOrder: 8},
  { id: "promise-kumite-2", name: "Promise Kumite 2", order: 13, minimumRankOrder: 8},
  { id: "promise-kumite-3", name: "Promise Kumite 3", order: 14, minimumRankOrder: 9},
  { id: "promise-kumite-4", name: "Promise Kumite 4", order: 15, minimumRankOrder: 9},
  { id: "promise-kumite-5", name: "Promise Kumite 5", order: 16, minimumRankOrder: 10},
  { id: "promise-kumite-6", name: "Promise Kumite 6", order: 17, minimumRankOrder: 10},
  { id: "promise-kumite-7", name: "Promise Kumite 7", order: 18, minimumRankOrder: 11},
];

export function getPartnerDrillById(partnerDrillId: string): PartnerDrill | undefined {
  return partnerDrillCatalog.find((item) => item.id === partnerDrillId);
}

export function getPartnerDrillItemById(partnerDrillId: string) {
  const item = getPartnerDrillById(partnerDrillId);
  return item ? { id: item.id, name: item.name, order: item.order, minimumRankOrder: item.minimumRankOrder } : undefined;
}
