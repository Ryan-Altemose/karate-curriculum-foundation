export type PartnerDrillGroupId = "conditioning-drills" | "fighting-attacks" | "uke-waza" | "promise-kumite";

export type PartnerDrill = {
  id: string;
  name: string;
  order: number;
  notes?: string;
  isPartial?: boolean;
  groupId?: PartnerDrillGroupId;
};

export const partnerDrillCatalog: PartnerDrill[] = [
  { id: "conditioning-drills", name: "Conditioning Drills", order: 0 },
  { id: "punching-blocking-drill", name: "Punching Blocking Drill", order: 0, groupId: "conditioning-drills" },
  { id: "three-point-arm-training", name: "Three Point Arm Training", order: 1, groupId: "conditioning-drills" },
  { id: "high-low-blocking-drill", name: "High-Low Blocking Drill", order: 2, groupId: "conditioning-drills" },
  { id: "inside-outside-blocking-drill", name: "Inside-Outside Blocking Drill", order: 3, groupId: "conditioning-drills" },
  { id: "circle-kicking-blocking-drill", name: "Circle Kicking Blocking Drill", order: 4, groupId: "conditioning-drills" },
  { id: "fighting-attacks", name: "Fighting Attacks", order: 1 },
  { id: "fighting-attack-1", name: "Fighting Attack 1", order: 1, groupId: "fighting-attacks" },
  { id: "fighting-attack-2", name: "Fighting Attack 2", order: 2, groupId: "fighting-attacks" },
  { id: "fighting-attack-3-no-takedown", name: "Fighting Attack 3 (No Takedown)", order: 3, isPartial: true, groupId: "fighting-attacks" },
  { id: "fighting-attack-3", name: "Fighting Attack 3", order: 4, groupId: "fighting-attacks" },
  { id: "uke-waza", name: "Uke Waza", order: 5 },
  { id: "uke-waza-1", name: "Uke Waza 1", order: 5, groupId: "uke-waza" },
  { id: "uke-waza-2", name: "Uke Waza 2", order: 6, groupId: "uke-waza" },
  { id: "uke-waza-3", name: "Uke Waza 3", order: 7, groupId: "uke-waza" },
  { id: "uke-waza-4", name: "Uke Waza 4", order: 8, groupId: "uke-waza" },
  { id: "uke-waza-5", name: "Uke Waza 5", order: 9, groupId: "uke-waza" },
  { id: "uke-waza-6", name: "Uke Waza 6", order: 10, groupId: "uke-waza" },
  { id: "uke-waza-7", name: "Uke Waza 7", order: 11, groupId: "uke-waza" },
  { id: "promise-kumite", name: "Promise Kumite", order: 12 },
  { id: "promise-kumite-1", name: "Promise Kumite 1", order: 12, groupId: "promise-kumite" },
  { id: "promise-kumite-2", name: "Promise Kumite 2", order: 13, groupId: "promise-kumite" },
  { id: "promise-kumite-3", name: "Promise Kumite 3", order: 14, groupId: "promise-kumite" },
  { id: "promise-kumite-4", name: "Promise Kumite 4", order: 15, groupId: "promise-kumite" },
  { id: "promise-kumite-5", name: "Promise Kumite 5", order: 16, groupId: "promise-kumite" },
  { id: "promise-kumite-6", name: "Promise Kumite 6", order: 17, groupId: "promise-kumite" },
  { id: "promise-kumite-7", name: "Promise Kumite 7", order: 18, groupId: "promise-kumite" },
];

export function getPartnerDrillById(partnerDrillId: string): PartnerDrill | undefined {
  return partnerDrillCatalog.find((item) => item.id === partnerDrillId);
}

export function getPartnerDrillItemById(partnerDrillId: string) {
  const item = getPartnerDrillById(partnerDrillId);
  return item ? { id: item.id, name: item.name, order: item.order } : undefined;
}
