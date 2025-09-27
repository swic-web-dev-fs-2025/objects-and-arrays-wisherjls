const courses = [
  {
    id: "CS277",
    name: "Web Development",
    students: [
      {
        id: 1,
        name: "Maria",
        assignments: [
          { name: "Project 1", points: 85, maxPoints: 100 },
          { name: "Quiz 1", points: 18, maxPoints: 20 },
        ],
      },
      {
        id: 2,
        name: "John",
        assignments: [
          { name: "Project 1", points: 92, maxPoints: 100 },
          { name: "Quiz 1", points: 19, maxPoints: 20 },
        ],
      },
    ],
  },
];

const getStudentPercentage = (courseId, studentId) => {
  const { totalPoints, totalMaxPoints } = gradeBook.courses
    .find(({ id }) => id === courseId)
    .students.find(({ id }) => id === studentId)
    ?.assignments.reduce(
      (totalPointsAccumulator, { points, maxPoints }) => ({
        totalPoints: totalPointsAccumulator.totalPoints + points,
        totalMaxPoints: totalPointsAccumulator.totalMaxPoints + maxPoints,
      }),
      { totalPoints: 0, totalMaxPoints: 0 }
    ) || { totalPoints: 0, totalMaxPoints: 0 };

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
