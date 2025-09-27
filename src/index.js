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
    .map(({ id }) => getStudentPercentage(courses, courseId, id))
    .reduce((sum, percentage) => sum + percentage, 0);

  return Math.round(totalPercentage / totalStudents);
};

export const addAssignment = (
  courses,
  { courseId, assignmentName, maxPoints }
) => {
  const clonedGradeBook = structuredClone(courses);

  const foundCourse = clonedGradeBook.courses.find(({ id }) => id === courseId);
  const newAssignment = { name: assignmentName, points: null, maxPoints };

  foundCourse.students = foundCourse.students.map((student) => ({
    ...student,
    assignments: [...student.assignments, newAssignment],
  }));

  return clonedGradeBook;
};
