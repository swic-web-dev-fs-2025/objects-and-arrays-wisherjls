console.info("=== Modern JavaScript Features ===");

// Sample student object for destructuring practice
const student = {
  name: "Jon Sayers",
  age: 19,
  major: "Computer Science",
  gpa: 3.8,
  address: {
    street: "123 sesame street",
    city: "Belleville",
    state: "Illinois",
  },
};

// OBJECT DESTRUCTURING
console.info("\n--- Object Destructuring ---");

// Old way
const name = student.name;
const age = student.age;

// Destructuring
const { name: studentName, age: studentAge, major } = student;
console.info("Student info:", studentName, studentAge, major);

// Rename variables during destructuring
const { name: fullName, gpa: gradePointAverage } = student;
console.info("GPA info:", fullName, gradePointAverage);

// Default values
const { graduationYear = 2025 } = student;
console.info("Expected graduation:", graduationYear);

// Nested destructuring
const {
  address: { city, state },
} = student;
console.info("Location:", city, state);

// ARRAY DESTRUCTURING
console.info("\n--- Array Destructuring ---");

const grades = [85, 92, 78, 88, 94];

// Extract first few grades
const [first, second, third] = grades;
console.info("First three grades:", first, second, third);

// Skip elements
const [firstGrade, , thirdGrade] = grades;
console.info("First and third:", firstGrade, thirdGrade);

// Rest operator
const [highest, ...remainingGrades] = grades.sort((a, b) => b - a);
console.info("Highest grade:", highest);
console.info("Remaining grades:", remainingGrades);

// SPREAD OPERATOR
console.info("\n--- Spread Operator ---");

// Array spreading
const originalGrades = [85, 92, 78];
const newGrades = [88, 94];
const allGrades = [...originalGrades, ...newGrades];
console.info("All grades combined:", allGrades);

// Object spreading (copying and extending)
const basicStudent = {
  name: "McLOVIN",
  age: 20,
};

const detailedStudent = {
  ...basicStudent,
  major: "Buissnes",
  gpa: 3.5,
  age: 21, // This overrides the age from basicStudent
};

console.info("Detailed student:", detailedStudent);

// Practical example: Adding a new student (React pattern)
const existingStudents = [
  { id: 1, name: "Jon", gpa: 3.8 },
  { id: 2, name: "McLOVIN", gpa: 3.2 },
];

const newStudent = { id: 3, name: "JO", gpa: 3.9 };
const updatedStudents = [...existingStudents, newStudent];

console.info("Updated student list:", updatedStudents);
