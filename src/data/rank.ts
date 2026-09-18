// Shared rank model. Every rank in the static curriculum must follow this shape.
export type RequirementCategory =
  | "kata"
  | "weaponKata"
  | "partnerDrill"
  | "selfDefense";

export type RankRequirement = {
  id: string;
  category: RequirementCategory;
  name: string;
  items: string[];
  notes?: string;
  videoUrl?: string;
};

export type RankType = "underBelt" | "conditionalBlackBelt" | "fullBlackBelt";

export const requiredClassesByRankType: Record<RankType, number> = {
  underBelt: 24,
  conditionalBlackBelt: 104,
  fullBlackBelt: 208,
};

export type Rank = {
  id: string;
  name: string;
  order: number;
  type: RankType;
  requirements: RankRequirement[];
};

export function getRequiredClasses(rank: Rank): number {
  return requiredClassesByRankType[rank.type];
}
