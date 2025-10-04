/* eslint-disable complexity */
export const getStudentPercentage = ({ courses, courseId, studentId }) => {
  const foundCourse = courses.find(({ id }) => id === courseId);
  if (!foundCourse) return 0;

  const student = foundCourse.students.find(({ id }) => id === studentId);
  if (!student) return 0;

  const totalPoints = student.assignments.reduce(
    (sum, assignment) => sum + assignment.points,
    0
  );

  const totalMaxPoints = student.assignments.reduce(
    (sum, assignment) => sum + assignment.maxPoints,
    0
  );

  return Math.round((totalPoints / totalMaxPoints) * 100);
};

export const getClassAverage = (courses, courseId) => {
  const foundCourse = courses.find(({ id }) => id === courseId);
  if (!foundCourse) return 0;

  const totalStudents = foundCourse.students.length;
  if (totalStudents === 0) return 0;

  const totalPercentage = foundCourse.students
    .map(({ id }) => getStudentPercentage({ courses, courseId, studentId: id }))
    .reduce((sum, percentage) => sum + percentage, 0);

  return Math.round(totalPercentage / totalStudents);
};

export const addAssignment = (
  courses,
  { courseId, assignmentName, maxPoints }
) => {
  const clonedGradeBook = structuredClone(courses);

  const foundCourse = clonedGradeBook.find(({ id }) => id === courseId);
  const newAssignment = { name: assignmentName, points: null, maxPoints };

  foundCourse.students = foundCourse.students.map((student) => ({
    ...student,
    assignments: [...student.assignments, newAssignment],
  }));

  return clonedGradeBook;
};

// utils.js

export const calculateDiscount = (price, discountPercent) => {
  return price - (price * discountPercent) / 100;
};

export const formatGrade = (percentage) => {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
};

export const isValidScore = (points, maxPoints) => {
  // FIX: allow maxPoints as a valid score
  return points >= 0 && points <= maxPoints;
};



// utils.js

// Generate student ID: lowercase first initial + lowercase last name + 3 random digits
export const generateStudentId = (firstName, lastName) => {
  const firstInitial = firstName[0].toLowerCase();
  const last = lastName.toLowerCase();
  const randomDigits = Math.floor(100 + Math.random() * 900); // ensures 3 digits
  return `${firstInitial}${last}${randomDigits}`;
};

// Calculate letter grade based on percentage
export const calculateLetterGrade = (percentage) => {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
};

// Find student with highest percentage in a course
export const findTopStudent = (course) => {
  let topStudent = null;
  let topPercentage = -1;

  for (const student of course.students) {
    const totalMax = student.assignments.reduce((sum, a) => sum + a.maxPoints, 0);
    const totalEarned = student.assignments.reduce((sum, a) => sum + a.pointsEarned, 0);
    const percentage = (totalEarned / totalMax) * 100;

    if (percentage > topPercentage) {
      topPercentage = percentage;
      topStudent = student;
    }
  }

  return topStudent;
};

