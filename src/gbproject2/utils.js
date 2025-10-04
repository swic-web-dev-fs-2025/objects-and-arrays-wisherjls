import COURSES from "./data.js";
import {
  getStudentPercentage,
  getClassAverage,
  addAssignment,
} from "./index.js";

const courseId = "CS277";

console.info(
  `Maria's percentage: ${getStudentPercentage({ courses: COURSES, courseId, studentId: 1 })}%`
);
console.info(
  `John's percentage: ${getStudentPercentage({ courses: COURSES, courseId, studentId: 2 })}%`
);
console.info(`Class average: ${getClassAverage(COURSES, courseId)}%`);

console.info("\n--- Adding Assignment ---");
console.info(`Original data: ${JSON.stringify(COURSES, null, 2)}`);

const updatedCourses = addAssignment(COURSES, {
  courseId,
  assignmentName: "Final Exam",
  maxPoints: 200,
});

console.info(`Updated data: ${JSON.stringify(updatedCourses, null, 2)}`);

