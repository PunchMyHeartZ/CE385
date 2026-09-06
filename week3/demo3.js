const course = {
    code: "CE385",
    instructor: {name: "สมชาย", email: "somchai@example.com"},
    schedules: {day: "Monday", room: "5555"}
};

console.log("Course code = ", course.code);
console.log("Instructor email = ", course.instructor.email);
console.log("course.assistance = ", course.assistance);

try {
    console.log(course.assistance.name);
} catch (error) {
    console.log("course.assistant.name   =", error.name + ": " + error.message);
}

console.log("\ncourse.assistance?.name = ", course.assistance?.name, "<--- ไม่ error");
console.log("?. กับ ?? ใช้คู่กัน =", course.assistance?.name ?? "ไม่มีผู้ช่วยสอน");