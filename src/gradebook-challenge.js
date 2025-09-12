/* eslint-disable max-params */
/* eslint-disable complexity */
/* eslint-disable id-length */
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

  getStudentPercentage(courseId, studentId) {
    const course = this.courses.find((c) => c.id === courseId);
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
  },

  getClassAverage(courseId) {
    const course = this.courses.find((c) => c.id === courseId);
    if (!course || !course.students || course.students.length === 0) return 0;

    const percentages = course.students
      .map((student) => this.getStudentPercentage(courseId, student.id))
      .filter((pct) => typeof pct === "number" && pct > 0);

    if (percentages.length === 0) return 0;

    const total = percentages.reduce((sum, pct) => sum + pct, 0);
    return Math.round(total / percentages.length);
  },

  addAssignment(courseId, assignmentName, maxPoints) {
    return {
      ...this,
      courses: this.courses.map((course) => {
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
  },
};

// Testing
console.info("=== Grade Book Testing ===");

const mariaPercentage = gradeBook.getStudentPercentage("CS277", 1);
console.info("Maria's percentage:", mariaPercentage);

const classAverage = gradeBook.getClassAverage("CS277");
console.info("Class average:", classAverage);

const updatedGradeBook = gradeBook.addAssignment("CS277", "Homework 1", 50);
console.info("Updated gradebook:", JSON.stringify(updatedGradeBook, null, 2));
