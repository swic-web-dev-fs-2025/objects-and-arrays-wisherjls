const course = {
  students: [
    {
      id: "s001",
      name: "Jon Sayers",
      email: "Jon.sayers@swic.edu",
      grades: [94, 92, 95, 93],
    },
    {
      id: "s002",
      name: "areal person",
      email: "areal.person@swic.edu",
      grades: [96, 45, 64, 92],
    },
    {
      id: "s003",
      name: "McLOVIN",
      email: "McLOVIN@swic.edu",
      grades: [65, 32, 15, 32],
    },
  ],
};

const getStudentAverage = (students, studentId) => {
  const student = students.find((s) => s.id === studentId);
  if (!student || student.grades.length === 0) return 0;
  const total = student.grades.reduce((sum, grade) => sum + grade, 0);
  return Math.round(total / student.grades.length);
};

console.info("=== Essential Array Methods for React ===");

// 1. MAP - Transform each element
const studentNames = course.students.map((student) => student.name);
console.info("All student names:", studentNames);

// 2. FILTER

const topPerformers = course.students.filter((student) => {
  const avg = getStudentAverage(course.students, student.id);
  return avg >= 90;
});
console.info(
  "Top performers:",
  topPerformers.map((s) => s.name)
);

// 3. FIND - Get the first element that matches a condition
const firstHighAchiever = course.students.find((student) => {
  const avg = getStudentAverage(course.students, student.id);
  return avg >= 85; // Predicate function again!
});
console.info("First high achiever:", firstHighAchiever.name);

// 4. REDUCE - Combine all elements into a single value
const totalGrades = course.students.reduce((total, student) => {
  return total + student.grades.length;
}, 0);
console.info("Total number of grades recorded:", totalGrades);

// Bonus: Check if something is an array
if (Array.isArray(course.students)) {
  console.info(`We have ${course.students.length} students`);
}

// chaining methods
const highPerformerEmails = course.students
  .filter((student) => getStudentAverage(course.students, student.id) >= 85)
  .map((student) => student.email);

console.info("High performer emails:", highPerformerEmails);
