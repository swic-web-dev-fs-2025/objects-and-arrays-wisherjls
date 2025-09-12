const course = {
  id: "CS277",
  title: "Web Development Technologies",
  instructor: "Prof. manav",
  credits: 3,
  students: [
    {
      id: "s001",
      name: "Jon Sayers",
      email: "mrodriguez@swic.edu",
      grades: [85, 92, 78, 88],
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

console.info("Course:", course.title);
console.info("Instructor:", course.instructor);
console.info("Number of students:", course.students.length);

console.info("First student:", course.students[0].name);
console.info("First student's grades:", course.students[0].grades);
console.info("First student's email:", course.students[0].email);

console.info("Second student:", course.students[1].name);
console.info("Second student's grades:", course.students[1].grades);
console.info("Second student's email:", course.students[1].email);

console.info(
  "Last student name:",
  course.students[course.students.length - 1].name
);
console.info(
  "Last student grades:",
  course.students[course.students.length - 1].grades
);
console.info(
  "Last student email:",
  course.students[course.students.length - 1].email
);
