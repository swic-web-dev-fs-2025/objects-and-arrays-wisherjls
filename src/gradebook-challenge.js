const gradeBook = {
  courses: [
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
  ],
};

// Get a student's percentage
const getStudentPercentage = ({ gradeBookData, courseId, studentId }) => {
  const course = gradeBookData.courses.find((c) => c.id === courseId);
  if (!course) return 0;

  const student = course.students.find((s) => s.id === studentId);
  if (!student || student.assignments.length === 0) return 0;

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

// Get class average
const getClassAverage = ({ gradeBookData, courseId }) => {
  const course = gradeBookData.courses.find((c) => c.id === courseId);
  if (!course) return 0;

  const percentages = course.students
    .map((student) =>
      getStudentPercentage({ gradeBookData, courseId, studentId: student.id })
    )
    .filter((pct) => typeof pct === "number" && pct > 0);

  if (percentages.length === 0) return 0;

  const total = percentages.reduce((sum, pct) => sum + pct, 0);
  return Math.round(total / percentages.length);
};

// Add a new assignment to all students
const addAssignment = ({
  gradeBookData,
  courseId,
  assignmentName,
  maxPoints,
}) => {
  return {
    ...gradeBookData,
    courses: gradeBookData.courses.map((course) => {
      if (course.id !== courseId) return course;
      return {
        ...course,
        students: course.students.map((student) => ({
          ...student,
          assignments: [
            ...student.assignments,
            { name: assignmentName, points: 0, maxPoints },
          ],
        })),
      };
    }),
  };
};

const getClassRanking = ({ gradeBookData, courseId }) => {
  const course = gradeBookData.courses.find((c) => c.id === courseId);
  if (!course || course.students.length === 0) return [];

  const studentsPercent = course.students.map((student) => ({
    name: student.name,
    percentage: getStudentPercentage({
      gradeBookData,
      courseId,
      studentId: student.id,
    }),
  }));

  studentsPercent.sort((a, b) => b.percentage - a.percentage);

  return studentsPercent;
};

// Testing everything
console.info("=== Grade Book Testing ===");

const mariaPercentage = getStudentPercentage({
  gradeBookData: gradeBook,
  courseId: "CS277",
  studentId: 1,
});
console.info("Maria's percentage:", mariaPercentage);

const classAverage = getClassAverage({
  gradeBookData: gradeBook,
  courseId: "CS277",
});
console.info("Class average:", classAverage);

const updatedGradeBook = addAssignment({
  gradeBookData: gradeBook,
  courseId: "CS277",
  assignmentName: "Homework 1",
  maxPoints: 50,
});
console.info("Updated gradebook:", JSON.stringify(updatedGradeBook, null, 2));

const ranking = getClassRanking({
  gradeBookData: gradeBook,
  courseId: "CS277",
});
console.info("Class ranking:", ranking);
