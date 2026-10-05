export type Student = {
  id: string;
  name: string;
  currentRankId: string;
  classCount: number;
  graduationDate: string;
  nextRankId: string;
};

export function getGraduationDate(student: Student): Date {
  return new Date(`${student.graduationDate}T00:00:00`);
}

export function getClassesPerWeekNeeded(student: Student, requiredClasses?: number): number | null {
  if (requiredClasses === undefined) {
    return null;
  }

  const remaining = Math.max(requiredClasses - student.classCount, 0);
  if (remaining === 0) {
    return 0;
  }

  const graduationDate = getGraduationDate(student);
  const today = new Date();
  const msRemaining = graduationDate.getTime() - today.getTime();

  if (msRemaining <= 0) {
    return Number((remaining / 1).toFixed(1));
  }

  const daysRemaining = Math.max(1, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));
  const weeksRemaining = Math.max(1, Math.ceil(daysRemaining / 7));

  return Number((remaining / weeksRemaining).toFixed(1));
}

function resolveNextRankId(currentRankId: string): string {
  try {
    // lazy import to avoid circular ordering issues during module initialization
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getRankById, getRankByOrder } = require("./curriculum");
    const rank = getRankById(currentRankId);
    if (!rank) return currentRankId;

    const next = getRankByOrder(rank.order + 1);
    return next ? next.id : currentRankId;
  } catch (e) {
    return currentRankId;
  }
}

function buildMockStudent(
  base: Pick<Student, "id" | "name" | "currentRankId" | "classCount" | "graduationDate"> & Partial<Pick<Student, "nextRankId">>
): Student {
  return {
    ...base,
    nextRankId: base.nextRankId ?? resolveNextRankId(base.currentRankId),
  };
}

// Temporary mock students. These can be switched in one place to test different ranks and progress states.
export const mockStudents: Record<string, Student> = {
  ryan: buildMockStudent({
    id: "student-1",
    name: "Ryan",
    currentRankId: "yondan-ho",
    classCount: 23,
    graduationDate: "2027-8-7",
  }),
  kyle: buildMockStudent({
    id: "student-2",
    name: "Kyle",
    currentRankId: "sandan",
    classCount: 1,
    graduationDate: "2028-8-8",
  }),
  james: buildMockStudent({
    id: "student-3",
    name: "James",
    currentRankId: "red",
    classCount: 26,
    graduationDate: "2026-10-17",
  }),
  mike: buildMockStudent({
    id: "student-4",
    name: "Mike",
    currentRankId: "yellow",
    classCount: 3,
    graduationDate: "2026-12-19",
  }),
  emily: buildMockStudent({
    id: "student-5",
    name: "Emily", 
    currentRankId: "no-belt",
    classCount: 8,
    graduationDate: "2026-12-19",
  }),
};

export let activeMockStudentKey = "ryan";
export let currentStudent: Student = mockStudents[activeMockStudentKey];

export function setActiveMockStudent(studentKey: keyof typeof mockStudents): Student {
  const student = mockStudents[studentKey];
  if (!student) {
    throw new Error(`Unknown mock student: ${String(studentKey)}`);
  }

  activeMockStudentKey = studentKey;
  currentStudent = student;
  return currentStudent;
}
