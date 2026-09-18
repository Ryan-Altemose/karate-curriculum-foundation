import type { Rank } from "./rank";

// This is the app's static curriculum source of truth. Keep it in version control
// and update it only after the school approves a curriculum change.

// Fill the empty `items` lists with the school's approved curriculum.
// Example: items: ["Pinan Shodan", "Pinan Nidan"]
export const curriculum: Rank[] = [
  {
    id: "white",
    name: "White Belt",
    order: 1,
    type: "underBelt",
    requirements: [
      { id: "white-kata", category: "kata", name: "Kata", items: ['Fukyugata Ichi'] },
      { id: "white-weapon-kata", category: "weaponKata", name: "Weapon Kata", items: ['None'] },
      { id: "white-partner-drill", category: "partnerDrill", name: "Partner Drill", items: ['Fighting Attack 1', 'Fighting Attack 2', 'Fighting Attack 3 (No Takedown'] },
      { id: "white-self-defense", category: "selfDefense", name: "Self-Defense", items: ['Cross-Arm Grab', 'Double Wrist Grab'] },
    ],
  },
  {
    id: "yellow",
    name: "Yellow Belt",
    order: 2,
    type: "underBelt",
    requirements: [
      { id: "yellow-kata", category: "kata", name: "Kata", items: ['Oyo Tan Ren'] },
      { id: "yellow-weapon-kata", category: "weaponKata", name: "Weapon Kata", items: ['Futatsume No Tai So'] },
      { id: "yellow-partner-drill", category: "partnerDrill", name: "Partner Drill", items: ['Fighting Attack 1', 'Fighting Attack 2', 'Fighting Attack 3 (Takedown)'] },
      { id: "yellow-self-defense", category: "selfDefense", name: "Self-Defense", items: ['Rear Choke'] },
    ],
  },
  {
    id: "orange",
    name: "Orange Belt",
    order: 3,
    type: "underBelt",
    requirements: [
      { id: "orange-kata", category: "kata", name: "Kata", items: ['Pinan Nidan'] },
      { id: "orange-weapon-kata", category: "weaponKata", name: "Weapon Kata", items: ['Haku Sho No Kun'] },
      { id: "orange-partner-drill", category: "partnerDrill", name: "Partner Drill", items: ['Uke Waza 3', 'Uke Waza 4'] },
      { id: "orange-self-defense", category: "selfDefense", name: "Self-Defense", items: ['Front Choke (idk)'] },
    ],
  },
  {
    id: "blue",
    name: "Blue Belt",
    order: 4,
    type: "underBelt",
    requirements: [
      { id: "blue-kata", category: "kata", name: "Kata", items: ['Pinan Sandan'] },
      { id: "blue-weapon-kata", category: "weaponKata", name: "Weapon Kata", items: ['Bojitsu Shodan (Half)'] },
      { id: "blue-partner-drill", category: "partnerDrill", name: "Partner Drill", items: ['Uke Waza 5', 'Uke Waza 6'] },
      { id: "blue-self-defense", category: "selfDefense", name: "Self-Defense", items: ['Single Lapel (idk)'] },
    ],
  },
  {
    id: "green",
    name: "Green Belt",
    order: 5,
    type: "underBelt",
    requirements: [
      { id: "green-kata", category: "kata", name: "Kata", items: ['Pinan Yondan'] },
      { id: "green-weapon-kata", category: "weaponKata", name: "Weapon Kata", items: ['Bojitsu Shodan (Full)'] },
      { id: "green-partner-drill", category: "partnerDrill", name: "Partner Drill", items: ['Uke Waza 7'] },
      { id: "green-self-defense", category: "selfDefense", name: "Self-Defense", items: ['Full Nelson', 'Side Headlock'] },
    ],
  },
  {
    id: "purple",
    name: "Purple Belt",
    order: 6,
    type: "underBelt",
    requirements: [
      { id: "purple-kata", category: "kata", name: "Kata", items: [] },
      { id: "purple-weapon-kata", category: "weaponKata", name: "Weapon Kata", items: [] },
      { id: "purple-partner-drill", category: "partnerDrill", name: "Partner Drill", items: [] },
      { id: "purple-self-defense", category: "selfDefense", name: "Self-Defense", items: [] },
    ],
  },
  {
    id: "brown",
    name: "Brown Belt",
    order: 7,
    type: "underBelt",
    requirements: [
      { id: "brown-kata", category: "kata", name: "Kata", items: [] },
      { id: "brown-weapon-kata", category: "weaponKata", name: "Weapon Kata", items: [] },
      { id: "brown-partner-drill", category: "partnerDrill", name: "Partner Drill", items: [] },
      { id: "brown-self-defense", category: "selfDefense", name: "Self-Defense", items: [] },
    ],
  },
  {
    id: "black",
    name: "Shodan Ho",
    order: 8,
    type: "conditionalBlackBelt",
    requirements: [
      { id: "black-kata", category: "kata", name: "Kata", items: [] },
      { id: "black-weapon-kata", category: "weaponKata", name: "Weapon Kata", items: [] },
      { id: "black-partner-drill", category: "partnerDrill", name: "Partner Drill", items: [] },
      { id: "black-self-defense", category: "selfDefense", name: "Self-Defense", items: [] },
    ],
  },
  {
    id: "full-black",
    name: "Shodan",
    order: 9,
    type: "fullBlackBelt",
    requirements: [
      { id: "full-black-kata", category: "kata", name: "Kata", items: [] },
      { id: "full-black-weapon-kata", category: "weaponKata", name: "Weapon Kata", items: [] },
      { id: "full-black-partner-drill", category: "partnerDrill", name: "Partner Drill", items: [] },
      { id: "full-black-self-defense", category: "selfDefense", name: "Self-Defense", items: [] },
    ],
  },
];

export function getRankById(rankId: string): Rank | undefined {
  return curriculum.find((rank) => rank.id === rankId);
}

export function getRankByOrder(rankOrder: number): Rank | undefined {
  return curriculum.find((rank) => rank.order === rankOrder);
}
