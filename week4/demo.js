const students = [
    {id: "6501" , name: "Som Hee", score: 78},
    {id: "6502" , name: "John Doe", score: 85},
];

function fetchstudentbyID(id, callback) {
    setTimeout(() => {
        const student = students.find(student => student.id === id);
        callback(student);
    }, 400);
}

fetchstudentbyID("6501", (student) => {
    console.log("ได้ข้อมูลนักเรียน:", student);
});

fetchstudentbyID("6502", (student) => {
    console.log("ได้ข้อมูลนักเรียน:", student);
});

console.log("กำลังดึงข้อมูลนักเรียน...");

function fetchStudentSafe(id, callback) {
  setTimeout(() => {
    if (typeof id !== "string" || id.trim() === "") {
      return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));  // พารามิเตอร์ 1 = error
    }
    const student = students.find((s) => s.id === id);
    if (!student) {
      return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    }
    callback(null, student);       // สำเร็จ: error = null, ข้อมูลอยู่พารามิเตอร์ 2
  }, 400);
}

fetchStudentSafe("9999", (error, student) => {
  if (error) return console.log("ล้มเหลว:", error.message); // ตรวจ error ก่อนเสมอ!
  console.log("สำเร็จ  :", student.name);
});