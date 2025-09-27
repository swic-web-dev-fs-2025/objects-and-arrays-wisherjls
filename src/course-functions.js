const course = {
  id: "CS277",
  title: "Web Development Technologies",
  instructor: "Prof. manav",
  credits: 3,
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

const getHighPerformers = (students, threshold = 85) => {
  return students.filter((student) => {
    const avg = getStudentAverage(students, student.id);
    return avg >= threshold;
  });
};

console.info("=== Testing Course Functions ===");

const jonAverage = getStudentAverage(course.students, "s001");
console.info("Jon's average:", jonAverage);

const topStudents = getHighPerformers(course.students, 85);
console.info(
  "High performers:",
  topStudents.map((s) => s.name)
);

const excellentStudents = getHighPerformers(course.students, 90);
console.info(
  "Excellent students (90+):",
  excellentStudents.map((s) => s.name)
);
