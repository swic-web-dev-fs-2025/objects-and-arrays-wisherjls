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

const getClassAverage = (courseId) => {
  const foundCourse = gradeBook.courses.find(({ id }) => id === courseId);
  const totalStudents = foundCourse.students.length;

  return Math.round(
    foundCourse.students
      .map(({ id }) => getStudentPercentage(courseId, id))
      ?.reduce((acc, percentage) => acc + percentage, 0) / totalStudents
  );
};

const addAssignment = ({ courseId, assignmentName, maxPoints }) => {
  const clonedGradeBook = structuredClone(gradeBook);

  const foundCourse = clonedGradeBook.courses.find(({ id }) => id === courseId);
  const newAssignment = { name: assignmentName, points: null, maxPoints };

  foundCourse.students = foundCourse.students.map((student) => ({
    ...student,
    assignments: [...student.assignments, newAssignment],
  }));

  return clonedGradeBook;
};
