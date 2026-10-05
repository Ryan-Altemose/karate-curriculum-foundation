// Shared rank model. Every rank in the static curriculum must follow this shape.
export type RequirementCategory =
  | "kata"
  | "weaponKata"
  | "partnerDrill"
  | "selfDefense";

export type CurriculumCategory = {
  id: RequirementCategory;
  name: string;
  order: number;
  description?: string;
};

export type CurriculumItem = {
  id: string;
  name: string;
  order: number;
  notes?: string;
  videoUrl?: string;
  minimumRankOrder?: number;
};

export type RankRequirement = {
  id: string;
  category: RequirementCategory;
  name: string;
  order: number;
  items: CurriculumItem[];
  notes?: string;
  videoUrl?: string;
};

export type RankType =
  | "tigerBelt"
  | "underBelt"
  | "conditionalBlackBelt"
  | "fullBlackBelt";

export type BeltColorSegment = {
  color: string;
  weight: number;
};

export type BeltVisual = {
  segments: BeltColorSegment[];
};

// Visual belt colors are keyed by stable rank ID so screens do not need to
// duplicate dojo-specific belt-color rules.
const beltVisuals: Record<string, BeltVisual> = {
  "no-belt": { segments: [] },
  white: { segments: [{ color: "#FFFFFF", weight: 1 }] },
  "yellow-white-yellow": {
    segments: [
      { color: "#F5D547", weight: 3 },
      { color: "#FFFFFF", weight: 3 },
      { color: "#F5D547", weight: 3 },
    ],
  },
  yellow: { segments: [{ color: "#F5D547", weight: 1 }] },
  "yellow-orange": {
    segments: [
      { color: "#F5D547", weight: 1 },
      { color: "#F28C28", weight: 1 },
    ],
  },
  orange: { segments: [{ color: "#F28C28", weight: 1 }] },
  blue: { segments: [{ color: "#2F80ED", weight: 1 }] },
  green: { segments: [{ color: "#35A854", weight: 1 }] },
  "green-purple": {
    segments: [
      { color: "#35A854", weight: 1 },
      { color: "#8E5BBE", weight: 1 },
    ],
  },
  purple: { segments: [{ color: "#8E5BBE", weight: 1 }] },
  "purple-brown": {
    segments: [
      { color: "#8E5BBE", weight: 1 },
      { color: "#7A4A21", weight: 1 },
    ],
  },
  brown: { segments: [{ color: "#7A4A21", weight: 1 }] },
  red: { segments: [{ color: "#D9342B", weight: 1 }] },
  "red-black": {
    segments: [
      { color: "#D9342B", weight: 1 },
      { color: "#1B1B1B", weight: 1 },
    ],
  },
};

const tigerBeltColors: Record<string, string> = {
  "tiger-white": "#FFFFFF",
  "tiger-no-belt": "#FFFFFF",
  "tiger-yellow": "#F5D547",
  "tiger-orange": "#F28C28",
  "tiger-blue": "#2F80ED",
  "tiger-green": "#35A854",
  "tiger-purple": "#8E5BBE",
  "tiger-brown": "#7A4A21",
  "tiger-red": "#D9342B",
};

export const requiredClassesByRankType: Record<
  Exclude<RankType, "tigerBelt">,
  number
> = {
  underBelt: 24,
  conditionalBlackBelt: 104,
  fullBlackBelt: 208,
};

export type Rank = {
  id: string;
  name: string;
  beltDescription?: string;
  order: number;
  type: RankType;
  degree?: number;
  requirements: RankRequirement[];
};

export function getRequiredClasses(rank: Rank): number | undefined {
  if (rank.type === "tigerBelt") {
    return undefined;
  }

  return requiredClassesByRankType[rank.type];
}

function getBlackBeltVisual(stripeColor: string, stripeCount: number): BeltVisual {
  const stripes = Array.from({ length: stripeCount }, (_, index) => [
    { color: stripeColor, weight: 1 },
    ...(index < stripeCount - 1 ? [{ color: "#1B1B1B", weight: 0.6 }] : []),
  ]).flat();

  return {
    segments: [
      { color: "#1B1B1B", weight: Math.max(4, 14 - stripeCount) },
      ...stripes,
      { color: "#1B1B1B", weight: 2 },
    ],
  };
}

export function getBeltVisual(rankId: string, degree?: number): BeltVisual {
  const stripeCount = degree ?? 1;

  if (rankId === "no-belt" || rankId === "tiger-no-belt") {
    return { segments: [] };
  }

  if (rankId === "tiger-white") {
    return { segments: [{ color: "#FFFFFF", weight: 1 }] };
  }

  if (rankId.startsWith("tiger-")) {
    const rankColor = tigerBeltColors[rankId] ?? "#FFFFFF";

    return {
      segments: [
        { color: "#435B2D", weight: 1 },
        { color: rankColor, weight: 1 },
        { color: "#4E6832", weight: 1 },
      ],
    };
  }

  // Conditional black belts use the suffix `-ho` (e.g. `shodan-ho`)
  if (rankId.endsWith("-ho")) {
    return getBlackBeltVisual("#FFFFFF", stripeCount);
  }

  // Full black belts use the japanese name as the id (e.g. `shodan`, `nidan`, ...)
  const fullBlackNames = [
    "shodan",
    "nidan",
    "sandan",
    "yondan",
    "godan",
    "rokudan",
    "shichidan",
    "hachidan",
    "kudan",
  ];

  if (fullBlackNames.includes(rankId)) {
    const stripeColor = ["sandan", "yondan", "godan", "rokudan", "shichidan", "hachidan", "kudan"].includes(rankId)
      ? "#F5C542"
      : "#D9342B";

    return getBlackBeltVisual(stripeColor, stripeCount);
  }

  return beltVisuals[rankId] ?? beltVisuals["no-belt"];
}
