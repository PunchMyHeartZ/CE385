const students = [
  { id: "6501", name: "สมชาย", score: 78 },
  { id: "6502", name: "สมหญิง", score: 91 },
  { id: "6503", name: "มานี", score: 45 },
  { id: "6504", name: "ปิติ", score: 66 },
];

function toGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  return "F";
}

const scores = [78, 91, 45, 66];
const grades = scores.map((score) => toGrade(score));
console.log("scores  =", scores);
console.log("grades  =", grades);
console.log("ต้นฉบับ  =", scores, " <-- map ไม่แก้ต้นฉบับ");

// ใช้กับ array ของ object — รูปแบบที่เจอบ่อยที่สุดในงาน Backend
const summary = students.map((student) => ({
  id: student.id,
  name: student.name,
  grade: toGrade(student.score),
}));
console.log("\nแปลงเป็นรูปแบบที่จะส่งออกทาง API:");
console.log(summary);

// ข้อผิดพลาดที่พบบ่อย: ลืม return ในฟังก์ชันที่มีปีกกา
const forgot = scores.map((score) => { toGrade(score); });
console.log("\nลืม return =", forgot, " <-- ได้ undefined ทั้งหมด");