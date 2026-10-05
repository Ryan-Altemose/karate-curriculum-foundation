import type { CurriculumItem, Rank, RequirementCategory } from "./rank";
import { getKataItemById } from "./kata";
import { getPartnerDrillItemById } from "./partner-drill";
import { getWeaponKataItemById } from "./weapon-kata";
import { getSelfDefenseItemById } from "./self-defense";

// This is the app's static curriculum source of truth. Keep it in version control
// and update it only after the school approves a curriculum change.
export const curriculumCategories = [
  { id: "kata", name: "Kata", order: 1 },
  { id: "weaponKata", name: "Weapon Kata", order: 2 },
  { id: "partnerDrill", name: "Partner Drill", order: 3 },
  { id: "selfDefense", name: "Self-Defense", order: 4 },
] as const;

type CategoryRequirementInput = CurriculumItem[] | { items: CurriculumItem[]; notes?: string };

type RankSpec = Omit<Rank, "requirements"> & {
  requirements: Partial<Record<RequirementCategory, CategoryRequirementInput>>;
};

function buildRequirements(
  rankId: string,
  requirements: Partial<Record<RequirementCategory, CategoryRequirementInput>>
): Rank["requirements"] {
  return curriculumCategories
    .map(({ id, name, order }) => {
      const input = requirements[id];
      if (!input) return null;

      const items = Array.isArray(input) ? input : input.items;
      const notes = Array.isArray(input) ? undefined : input.notes;

      // Ensure any undefined/null items (from missing lookups) are removed
      const filteredItems = (items as Array<any>).filter(Boolean);

      return {
        id: `${rankId}-${id}`,
        category: id,
        name,
        order,
        items: filteredItems,
        notes,
      };
    })
    .filter((requirement): requirement is NonNullable<typeof requirement> => Boolean(requirement));
}

const blackBeltDegrees = [
  { degree: 1, name: "Shodan" },
  { degree: 2, name: "Nidan" },
  { degree: 3, name: "Sandan" },
  { degree: 4, name: "Yondan" },
  { degree: 5, name: "Godan" },
  { degree: 6, name: "Rokudan" },
  { degree: 7, name: "Shichidan" },
  { degree: 8, name: "Hachidan" },
  { degree: 9, name: "Kudan" },
];

const additionalBlackBeltRanks: Rank[] = blackBeltDegrees.flatMap(({ degree, name }) => {
  const conditionalId = `${name.toLowerCase()}-ho`;
  const fullId = name.toLowerCase();
  const firstOrder = 14 + (degree - 1) * 2;

  // provide example requirements for the first two degrees; later degrees remain empty templates
  const conditionalReqs: Partial<Record<RequirementCategory, CategoryRequirementInput>> =
    degree === 1
      ? {
          kata: [getKataItemById("wankan")!],
          weaponKata: [getWeaponKataItemById("sho-sai")!],
          partnerDrill: [],
          selfDefense: [],
        }
      : degree === 2
      ? {
          kata: [getKataItemById("wanshu")!],
          weaponKata: [getWeaponKataItemById("kama-sho-kata")!],
          partnerDrill: [],
          selfDefense: [],
        }
      : degree === 3
      ? {
          kata: [getKataItemById("gojushiho")!],
          weaponKata: [getWeaponKataItemById("suji-no-kun")!],
          partnerDrill: [],
          selfDefense: [],
        }
      : degree === 4
      ? {
          kata: [getKataItemById("kusanku")!],
          weaponKata: [getWeaponKataItemById("mizoniatoshi")!],
          partnerDrill: [],
          selfDefense: [],
        }
      : degree === 5
      ? {
          kata: [],
          weaponKata: [],
          partnerDrill: [],
          selfDefense: [],
        }
      : { kata: [], weaponKata: [], partnerDrill: [], selfDefense: [] };

  const fullReqs: Partial<Record<RequirementCategory, CategoryRequirementInput>> =
    degree === 1
      ? {
          kata: [getKataItemById("rohai")!],
          weaponKata: [getWeaponKataItemById("shichi-no-kun-sho")!],
          partnerDrill: [],
          selfDefense: [],
        }
      : degree === 2
      ? {
          kata: [getKataItemById("passai")!],
          weaponKata: [getWeaponKataItemById("ni-sai")!],
          partnerDrill: [],
          selfDefense: [],
        }
      : degree === 3
      ? {
          kata: [getKataItemById("chinto")!],
          weaponKata: [getWeaponKataItemById("suji-no-kun")!],
          partnerDrill: [],
          selfDefense: [],
        }
      : degree === 4
      ? {
          kata: [],
          weaponKata: [],
          partnerDrill: [],
          selfDefense: [],
        }
      : { kata: [], weaponKata: [], partnerDrill: [], selfDefense: [] };

  return [
    {
      id: conditionalId,
      name: `${name} Ho`,
      beltDescription: "Black belt with a small white stripe",
      order: firstOrder,
      type: "conditionalBlackBelt",
      degree,
      requirements: buildRequirements(conditionalId, conditionalReqs),
    },
    {
      id: fullId,
      name,
      beltDescription: "Black belt with a small red stripe",
      order: firstOrder + 1,
      type: "fullBlackBelt",
      degree,
      requirements: buildRequirements(fullId, fullReqs),
    },
  ];
});

const tigerBeltColors = ["No Belt", "White", "Yellow", "Orange", "Blue", "Green", "Purple", "Brown", "Red"];
// Tiger no belt = -9
// Tiger red = -1
const tigerBeltRanks: Rank[] = tigerBeltColors.map((color, index) => {
  const id = `tiger-${color.toLowerCase().replace(" ", "-")}`;
  const lower = color.toLowerCase();

  const tigerReqs: Partial<Record<RequirementCategory, CategoryRequirementInput>> =
    lower === "no belt"
      ? {

          kata: [getKataItemById("zenkutsu-drill-four")!],
          weaponKata: [getWeaponKataItemById("none")!],
          partnerDrill: [getPartnerDrillItemById("punching-blocking-drill")!],
          selfDefense: [getSelfDefenseItemById("hello")!, getSelfDefenseItemById("goodbye")!],
        }
      : lower === "white"
      ? {
          kata: [getKataItemById("zenkutsu-drill-six")!],
          weaponKata: [getWeaponKataItemById("none")!],
          partnerDrill: [getPartnerDrillItemById("punching-blocking-drill")!],
          selfDefense: [
            getSelfDefenseItemById("hello")!, 
            getSelfDefenseItemById("goodbye")!,
            getSelfDefenseItemById("pull-back")!, 
            getSelfDefenseItemById("zipper")!],
        }
      : lower === "yellow"
      ? {
          kata: [getKataItemById("zenkutsu-drill")!],
          weaponKata: [getWeaponKataItemById("none")!],
          partnerDrill: [getPartnerDrillItemById("punching-blocking-drill")!],
          selfDefense: [
            getSelfDefenseItemById("hello")!, 
            getSelfDefenseItemById("goodbye")!,
            getSelfDefenseItemById("pull-back")!, 
            getSelfDefenseItemById("zipper")!],
        }
      : lower === "orange"
      ? {
          kata: [getKataItemById("zenkutsu-drill")!],
          weaponKata: [getWeaponKataItemById("hajime-no-tai-so")!],
          partnerDrill: [getPartnerDrillItemById("punching-blocking-drill")!],
          selfDefense: [
            getSelfDefenseItemById("hello")!, 
            getSelfDefenseItemById("goodbye")!,
            getSelfDefenseItemById("pull-back")!, 
            getSelfDefenseItemById("zipper")!],
        }
      : lower === "blue"
      ? {
          kata: [getKataItemById("fukyugata-ichi")!],
          weaponKata: [getWeaponKataItemById("hajime-no-tai-so")!],
          partnerDrill: [getPartnerDrillItemById("punching-blocking-drill")!],
          selfDefense: [
            getSelfDefenseItemById("hello")!, 
            getSelfDefenseItemById("goodbye")!,
            getSelfDefenseItemById("pull-back")!, 
            getSelfDefenseItemById("zipper")!],
        }
      : lower === "green"
      ? {
          kata: [getKataItemById("fukyugata-ichi")!],
          weaponKata: [getWeaponKataItemById("hajime-no-tai-so")!],
          partnerDrill: [getPartnerDrillItemById("punching-blocking-drill")!],
          selfDefense: [
            getSelfDefenseItemById("hello")!, 
            getSelfDefenseItemById("goodbye")!,
            getSelfDefenseItemById("pull-back")!, 
            getSelfDefenseItemById("zipper")!],
        }
      : lower === "purple"
      ? {
          kata: [getKataItemById("fukyugata-ichi")!],
          weaponKata: [getWeaponKataItemById("hajime-no-tai-so")!],
          partnerDrill: [getPartnerDrillItemById("punching-blocking-drill")!],
          selfDefense: [
            getSelfDefenseItemById("hello")!, 
            getSelfDefenseItemById("goodbye")!,
            getSelfDefenseItemById("pull-back")!, 
            getSelfDefenseItemById("zipper")!],
        }
      : lower === "brown"
      ? {
          kata: [getKataItemById("cat-stance-chest-block-exercise")!],
          weaponKata: [getWeaponKataItemById("hajime-no-tai-so")!],
          partnerDrill: [getPartnerDrillItemById("punching-blocking-drill")!],
          selfDefense: [
            getSelfDefenseItemById("hello")!, 
            getSelfDefenseItemById("goodbye")!,
            getSelfDefenseItemById("pull-back")!, 
            getSelfDefenseItemById("zipper")!],
        }
      : lower === "red"
      ? {
          kata: [getKataItemById("fukyugata-ichi")!],
          weaponKata: [getWeaponKataItemById("hajime-no-tai-so")!],
          partnerDrill: [getPartnerDrillItemById("punching-blocking-drill")!],
          selfDefense: [
            getSelfDefenseItemById("hello")!, 
            getSelfDefenseItemById("goodbye")!,
            getSelfDefenseItemById("pull-back")!, 
            getSelfDefenseItemById("zipper")!],
        }
      : { kata: [], weaponKata: [], partnerDrill: [], selfDefense: [] };

  return {
    id,
    name: `Tiger ${color}`,
    beltDescription: "Camouflage-patterned Tiger belt",
    order: index - tigerBeltColors.length,
    type: "tigerBelt",
    requirements: buildRequirements(id, tigerReqs),
  };
});

const rankSpecs: RankSpec[] = [
  {
    id: "no-belt",
    name: "No Belt",
    order: 0,
    type: "underBelt",
    requirements: {
      kata: [getKataItemById("zenkutsu-drill")!],
      weaponKata: [getWeaponKataItemById("none")!],
      partnerDrill: [getPartnerDrillItemById("punching-blocking-drill")!],
      selfDefense: [
        getSelfDefenseItemById("hello")!, 
        getSelfDefenseItemById("goodbye")!, 
        getSelfDefenseItemById("pull-back")!,
        getSelfDefenseItemById("zipper")!
      ],
    },
  },
  {
    id: "white",
    name: "Shiro Obi",
    order: 1,
    type: "underBelt",
    requirements: {
      kata: [getKataItemById("fukyugata-ichi")!],
      weaponKata: [getWeaponKataItemById("none")!],
      partnerDrill: [
        getPartnerDrillItemById("fighting-attack-1")!,
        getPartnerDrillItemById("fighting-attack-2")!,
        getPartnerDrillItemById("fighting-attack-3-no-takedown")!,
      ],
      selfDefense: [
        getSelfDefenseItemById("cross-arm-grab")!,
        getSelfDefenseItemById("double-wrist-grab")!,
      ],
    },
  },
  {
    id: "yellow-white-yellow",
    name: "Hachi Kyu",
    beltDescription: "Yellow belt with a white stripe",
    order: 2,
    type: "underBelt",
    requirements: {
      kata: [getKataItemById("fukyugata-ni")!],
      weaponKata: [getWeaponKataItemById("hajime-no-tai-so")!],
      partnerDrill: [
        getPartnerDrillItemById("fighting-attack-1")!,
        getPartnerDrillItemById("fighting-attack-2")!,
        getPartnerDrillItemById("fighting-attack-3-no-takedown")!,
      ],
      selfDefense: [],
    },
  },
  {
    id: "yellow",
    name: "Shichi Kyu",
    order: 3,
    type: "underBelt",
    requirements: {
      kata: [getKataItemById("oyo-tan-ren")!],
      weaponKata: [getWeaponKataItemById("futatsume-no-tai-so")!],
      partnerDrill: [
        getPartnerDrillItemById("fighting-attack-1")!,
        getPartnerDrillItemById("fighting-attack-2")!,
        getPartnerDrillItemById("fighting-attack-3")!,
      ],
      selfDefense: [getSelfDefenseItemById("rear-choke")!],
    },
  },
  {
    id: "yellow-orange",
    name: "Ro Kyu",
    beltDescription: "Half yellow and orange belt",
    order: 4,
    type: "underBelt",
    requirements: {
      kata: [getKataItemById("pinan-shodan")! ],
      weaponKata: [getWeaponKataItemById("haku-sho-no-kun-half")!],
      partnerDrill: [getPartnerDrillItemById("uke-waza-1")!, getPartnerDrillItemById("uke-waza-2")!],
      selfDefense: [],
    },
  },
  {
    id: "orange",
    name: "Orengi Obi",
    order: 5,
    type: "underBelt",
    requirements: {
      kata: [getKataItemById("pinan-nidan")!],
      weaponKata: [getWeaponKataItemById("haku-sho-no-kun")!],
      partnerDrill: [
        getPartnerDrillItemById("uke-waza-3")!,
        getPartnerDrillItemById("uke-waza-4")!,
      ],
      selfDefense: [getSelfDefenseItemById("front-choke-idk")!],
    },
  },
  {
    id: "blue",
    name: "Go Kyu",
    order: 6,
    type: "underBelt",
    requirements: {
      kata: [getKataItemById("pinan-sandan")!],
      weaponKata: [getWeaponKataItemById("bojitsu-shodan-half")!],
      partnerDrill: [
        getPartnerDrillItemById("uke-waza-5")!,
        getPartnerDrillItemById("uke-waza-6")!,
      ],
      selfDefense: [getSelfDefenseItemById("single-lapel-idk")!],
    },
  },
  {
    id: "green",
    name: "Yon Kyu",
    order: 7,
    type: "underBelt",
    requirements: {
      kata: [getKataItemById("pinan-yondan")!],
      weaponKata: [getWeaponKataItemById("bojitsu-shodan")!],
      partnerDrill: [getPartnerDrillItemById("uke-waza-7")!],
      selfDefense: [
        getSelfDefenseItemById("full-nelson")!,
        getSelfDefenseItemById("side-headlock")!,
      ],
    },
  },
  {
    id: "green-purple",
    name: "San Kyu Ho",
    beltDescription: "Half green and purple belt",
    order: 8,
    type: "underBelt",
    requirements: {
      kata: [getKataItemById("pinan-godan")!],
      weaponKata: [
        getWeaponKataItemById("escrima-pattern-1")!,
        getWeaponKataItemById("escrima-pattern-2")!,
        getWeaponKataItemById("six-count-one-stick")!,
        getWeaponKataItemById("four-count-two-stick")!,
        getWeaponKataItemById("six-count-two-stick")!,
      ],
      partnerDrill: [
        getPartnerDrillItemById("promise-kumite-1")!, 
        getPartnerDrillItemById("promise-kumite-2")!
      ],
      selfDefense: [],
    },
  },
  {
    id: "purple",
    name: "San Kyu",
    order: 9,
    type: "underBelt",
    requirements: {
      kata: [getKataItemById("naihanchi-shodan")!],
      weaponKata: [getWeaponKataItemById("nunchuku-exercise")!],
      partnerDrill: [
        getPartnerDrillItemById("promise-kumite-3")!, 
        getPartnerDrillItemById("promise-kumite-4")!
      ],
      selfDefense: [],
    },
  },
  {
    id: "purple-brown",
    name: "Ni Kyu Ho",
    beltDescription: "Half purple and brown belt",
    order: 10,
    type: "underBelt",
    requirements: {
      kata: [getKataItemById("naihanchi-nidan")!],
      weaponKata: [
        getWeaponKataItemById("tonfa-kihon-1")!,
        getWeaponKataItemById("tonfa-kihon-2")!,
        getWeaponKataItemById("tonfa-kihon-3")!,
        getWeaponKataItemById("tonfa-kihon-4")!,
        getWeaponKataItemById("tonfa-kihon-5")!,
        getWeaponKataItemById("tonfa-kihon-6")!,
        getWeaponKataItemById("tonfa-kihon-7")!,
      ],
      partnerDrill: [getPartnerDrillItemById("promise-kumite-5")!, 
        getPartnerDrillItemById("promise-kumite-6")!
      ],
      selfDefense: [],
    },
  },
  {
    id: "brown",
    name: "Ni Kyu",
    order: 11,
    type: "underBelt",
    requirements: {
      kata: [getKataItemById("naihanchi-sandan")!],
      weaponKata: [
        getWeaponKataItemById("tonfa-kihon-8")!,
        getWeaponKataItemById("tonfa-kihon-9")!,
        getWeaponKataItemById("tonfa-kihon-10")!,
        getWeaponKataItemById("tonfa-kihon-11")!,
      ],
      partnerDrill: [getPartnerDrillItemById("promise-kumite-7")!],
      selfDefense: [],
    },
  },
  {
    id: "red",
    name: "Ikkyu Ho",
    beltDescription: "Red belt",
    order: 12,
    type: "underBelt",
    requirements: {
      kata: [getKataItemById("ananku")!],
      weaponKata: [getWeaponKataItemById("sai-shorei-no-kata-dai-ichi")!],
      partnerDrill: [getPartnerDrillItemById("promise-kumite-1")!,
        getPartnerDrillItemById("promise-kumite-2")!,
        getPartnerDrillItemById("promise-kumite-3")!,
        getPartnerDrillItemById("promise-kumite-4")!,
        getPartnerDrillItemById("promise-kumite-5")!,
        getPartnerDrillItemById("promise-kumite-6")!,
        getPartnerDrillItemById("promise-kumite-7")!
      ],
      selfDefense: [],
    },
  },
  {
    id: "red-black",
    name: "Ikkyu",
    beltDescription: "Half red and black belt",
    order: 13,
    type: "underBelt",
    requirements: {
      kata: [getKataItemById("fukyugata-sandan")!],
      weaponKata: [
        getWeaponKataItemById("sai-kihon-1")!,
        getWeaponKataItemById("sai-kihon-2")!,
        getWeaponKataItemById("sai-kihon-3")!,
        getWeaponKataItemById("sai-kihon-4")!,
        getWeaponKataItemById("sai-kihon-5")!,
        getWeaponKataItemById("sai-kihon-6")!,
        getWeaponKataItemById("sai-kihon-7")!,
        getWeaponKataItemById("sai-kihon-8")!,
        getWeaponKataItemById("sai-kihon-9")!,
        getWeaponKataItemById("sai-kihon-10")!,
        getWeaponKataItemById("sai-kihon-11")!,
        getWeaponKataItemById("sai-kihon-12")!,
      ],
      partnerDrill: [],
      selfDefense: [],
    },
  },

];

export const curriculum: Rank[] = [
  ...tigerBeltRanks,
  ...rankSpecs.map((rank) => ({
    ...rank,
    requirements: buildRequirements(rank.id, rank.requirements),
  })),
  ...additionalBlackBeltRanks,
];

export function getRankById(rankId: string): Rank | undefined {
  return curriculum.find((rank) => rank.id === rankId);
}

export function getRankByOrder(rankOrder: number): Rank | undefined {
  return curriculum.find((rank) => rank.order === rankOrder);
}
