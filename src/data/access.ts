export type UnlockableItem = {
  minimumRankOrder?: number;
};

export function isItemUnlocked(item: UnlockableItem | undefined, currentRankOrder: number): boolean {
  return (item?.minimumRankOrder ?? 0) <= currentRankOrder;
}

export function filterUnlockedItems<T extends UnlockableItem>(items: T[], currentRankOrder: number): T[] {
  return items.filter((item) => isItemUnlocked(item, currentRankOrder));
}
