// ประกาศตัวแปรข้อมูลนักศึกษา
const student_name = "John Doe";
const std_id = "123456";
const age = 25;
const department = "Computer Science";
const registered_course = ["Data Structures", "Algorithms", "Operating Systems", "Database Management"];
const year_of_end = 2569;

// แสดงบัตรแนะนำตัวนักศึกษา
console.log("=== บัตรแนะนำตัวนักศึกษา ===");
console.log("Name:", student_name);
console.log("Student ID:", std_id);
console.log("Age:", age);
console.log("Department:", department);
// แสดงรายวิชาที่ลงทะเบียนโดยรวมเป็นข้อความเดียว
console.log("Registered Courses:", registered_course.join(", "));
console.log("Year of End:", year_of_end);
console.log("========================");