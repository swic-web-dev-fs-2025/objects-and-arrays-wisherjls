/* eslint-disable max-lines-per-function */
import { describe, test, expect } from "vitest";
import COURSES from "./data.js";
import {
  getStudentPercentage,
  getClassAverage,
  addAssignment,
  calculateDiscount,
  formatGrade,
  isValidScore,
  generateStudentId,
  calculateLetterGrade,
  findTopStudent,
} from "./index.js";

const CIS277 = COURSES[0];


describe("Student Management Functions", () => {
  test("calculates Maria's percentage correctly", () => {
    const maria = CIS277.students.find(({ name }) => name === "Maria");
    expect(getStudentPercentage({ courses: [CIS277], courseId: CIS277.id, studentId: maria.id })).toBe(86);
  });

  test("calculates John's percentage correctly", () => {
    const john = CIS277.students.find(({ name }) => name === "John");
    expect(getStudentPercentage({ courses: [CIS277], courseId: CIS277.id, studentId: john.id })).toBe(93);
  });

  test("handles a single student course", () => {
    const course = { ...CIS277, students: [{ id: 99, name: "Solo", assignments: [{ name: "Exam", points: 100, maxPoints: 100 }] }] };
    expect(getStudentPercentage({ courses: [course], courseId: course.id, studentId: 99 })).toBe(100);
    expect(getClassAverage([course], course.id)).toBe(100);
  });

  test("handles 3 students with varied scores", () => {
    const course = { ...CIS277, students: [
      { id: 1, name: "Anthony", assignments: [{ name: "T1", points: 50, maxPoints: 100 }] },
      { id: 2, name: "Brian", assignments: [{ name: "T1", points: 100, maxPoints: 100 }] },
      { id: 3, name: "Catherine", assignments: [{ name: "T1", points: 0, maxPoints: 100 }] },
    ]};
    const percentages = course.students.map(s => getStudentPercentage({ courses: [course], courseId: course.id, studentId: s.id }));
    expect(percentages).toEqual([50, 100, 0]);
    expect(getClassAverage([course], course.id)).toBeCloseTo(50, 1);
  });

  test("handles perfect scores", () => {
    const course = { ...CIS277, students: [{ id: 3, name: "Patty", assignments: [{ name: "HW1", points: 20, maxPoints: 20 }, { name: "Exam", points: 100, maxPoints: 100 }] }] };
    expect(getStudentPercentage({ courses: [course], courseId: course.id, studentId: 3 })).toBe(100);
  });

  test("handles partial + zero scores", () => {
    const course = { ...CIS277, students: [{ id: 4, name: "Zack", assignments: [{ name: "HW1", points: 0, maxPoints: 20 }, { name: "Exam", points: 50, maxPoints: 100 }] }] };
    expect(getStudentPercentage({ courses: [course], courseId: course.id, studentId: 4 })).toBe(42);
  });

  test("handles different numbers of assignments", () => {
    const course = { ...CIS277, students: [
      { id: 5, name: "Sam", assignments: [{ name: "Exam", points: 80, maxPoints: 100 }] },
      { id: 6, name: "Lisa", assignments: [{ name: "Q1", points: 10, maxPoints: 20 }, { name: "Q2", points: 15, maxPoints: 20 }, { name: "Exam", points: 70, maxPoints: 100 }] },
    ]};
    expect(getStudentPercentage({ courses: [course], courseId: course.id, studentId: 5 })).toBe(80);
    expect(getStudentPercentage({ courses: [course], courseId: course.id, studentId: 6 })).toBeCloseTo(68, 1);
  });

  test("adds a new assignment to all students", () => {
    const updatedCourses = addAssignment([structuredClone(CIS277)], { courseId: CIS277.id, assignmentName: "Final Project", maxPoints: 100 });
    updatedCourses.find(c => c.id === CIS277.id).students.forEach(s => {
      const added = s.assignments.find(a => a.name === "Final Project");
      expect(added).toBeDefined();
      expect(added.points).toBe(null);
      expect(added.maxPoints).toBe(100);
    });
  });
});


describe("Utility Functions", () => {
  test("calculateDiscount works with 0%, 50%, 100%, decimals", () => {
    expect(calculateDiscount(100, 0)).toBe(100);
    expect(calculateDiscount(200, 50)).toBe(100);
    expect(calculateDiscount(100, 100)).toBe(0);
    expect(calculateDiscount(100, 12.5)).toBe(87.5);
  });

  test("formatGrade returns correct letter grades", () => {
    expect(formatGrade(95)).toBe("A");
    expect(formatGrade(90)).toBe("A");
    expect(formatGrade(80)).toBe("B");
    expect(formatGrade(70)).toBe("C");
    expect(formatGrade(60)).toBe("D");
    expect(formatGrade(59)).toBe("F");
  });

  test("isValidScore checks ranges correctly", () => {
    expect(isValidScore(0, 100)).toBe(true);
    expect(isValidScore(50, 100)).toBe(true);
    expect(isValidScore(100, 100)).toBe(true);
    expect(isValidScore(-1, 100)).toBe(false);
    expect(isValidScore(101, 100)).toBe(false);
    expect(isValidScore(0, 0)).toBe(true);
    expect(isValidScore(1, 0)).toBe(false);
  });
});

test("should generate student ID correctly", () => {
const id = generateStudentId("John", "Smith");
expect(id).toMatch(/^jsmith\d{3}$/); // Pattern: jsmith + 3 digits
});

// part 5
test("should calculate letter grades correctly", () => { 
expect(calculateLetterGrade(95)).toBe("A");
expect(calculateLetterGrade(85)).toBe("B");
expect(calculateLetterGrade(75)).toBe("C");
expect(calculateLetterGrade(65)).toBe("D");
expect(calculateLetterGrade(55)).toBe("F");
});

test("should find student with highest percentage", () => {
const testCourse = {
students: [
{ name: "Alice", assignments: [{ maxPoints: 100, pointsEarned: 85 }] },
{ name: "Bob", assignments: [{ maxPoints: 100, pointsEarned: 95 }] },
{ name: "Charlie", assignments: [{ maxPoints: 100, pointsEarned: 75 }] }
]
};
const topStudent = findTopStudent(testCourse);
expect(topStudent.name).toBe("Bob");
});

test("addAssignmentToCourse does not mutate original data and returns correct new data", () => {
  const original = structuredClone(CIS277);
  const courses = [structuredClone(CIS277)];
  const assignment = { courseId: CIS277.id, assignmentName: "Immutability HW", maxPoints: 42 };

  const updatedCourses = addAssignment(courses, assignment);

  expect(courses).toEqual([original]);
  courses[0].students.forEach((student, i) => {
    expect(student.assignments).toEqual(original.students[i].assignments);
  });

  const updated = updatedCourses.find(c => c.id === CIS277.id);
  expect(updated).toBeDefined();
  updated.students.forEach(student => {
    const added = student.assignments.find(a => a.name === "Immutability HW");
    expect(added).toBeDefined();
    expect(added.points).toBe(null);
    expect(added.maxPoints).toBe(42);
  });
});