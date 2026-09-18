export type Student = {
  id: string;
  name: string;
  rankOrder: number;
  classCount: number;
  graduationDate: string;
  nextRankId: string;
};

// Temporary mock student. This will eventually come from authentication + API.
export const currentStudent: Student = {
  id: "student-1",
  name: "Ryan",
  rankOrder: 5,
  classCount: 13,
  graduationDate: "2026-12-31",
  nextRankId: "green",
};
