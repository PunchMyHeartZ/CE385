const PASS_SCORE = 50; // เกณฑ์สอบผ่าน

// เกณฑ์เกรด + ฟังก์ชันตัดเกรด (ยืมจากข้อ 1)
const GRADE_RULES = [
  { minScore: 80, grade: "A" },
  { minScore: 75, grade: "B+" },
  { minScore: 70, grade: "B" },
  { minScore: 65, grade: "C+" },
  { minScore: 60, grade: "C" },
  { minScore: 55, grade: "D+" },
  { minScore: 50, grade: "D" },
  { minScore: 0,  grade: "F" },
];

const toGrade = (score) => GRADE_RULES.find((r) => score >= r.minScore).grade;

// ---------- ข้อมูล (ชุดเดียวกับข้อ 2) ----------

const students = [
  { id: "6601", name: "สมชาย", major: "CE", score: 82 },
  { id: "6602", name: "สมหญิง", major: "IT", score: 45 },
  { id: "6603", name: "มานะ",   major: "CE", score: 67 },
  { id: "6604", name: "มานี",   major: "IT", score: 91 },
  { id: "6605", name: "ปิติ",   major: "CE", score: 38 },
  { id: "6606", name: "ใหม่",   major: "IT", score: 74 },
];

// ---------- ส่วนที่ 1 : ฟังก์ชันสรุปข้อมูล (ทุกตัวสร้างของใหม่ ไม่แก้ array ต้นฉบับ) ----------

// array ของชื่อทุกคน
function getNames(studentList) {
  return studentList.map((s) => s.name);
}

// array ของคนที่คะแนน ≥ 50
function getPassedStudents(studentList) {
  return studentList.filter((s) => s.score >= PASS_SCORE);
}

// ผลรวมคะแนนทั้งหมด (reduce มีค่าเริ่มต้น 0 เสมอ)
function getTotalScore(studentList) {
  return studentList.reduce((sum, s) => sum + s.score, 0);
}

// คะแนนเฉลี่ยทศนิยม 2 ตำแหน่ง (array ว่างคืน 0 ไม่ใช่ NaN)
function getAverageScore(studentList) {
  if (studentList.length === 0) return 0;
  return Math.round((getTotalScore(studentList) / studentList.length) * 100) / 100;
}

// object นับจำนวนแยกตามเกรด (reduce ค่าเริ่มต้น {})
function countByGrade(studentList) {
  return studentList.reduce((acc, s) => {
    const grade = toGrade(s.score);
    acc[grade] = (acc[grade] ?? 0) + 1;
    return acc;
  }, {});
}

// นักศึกษาที่คะแนนสูงสุด (ใช้ reduce)
function getTopStudent(studentList) {
  if (studentList.length === 0) return null;
  return studentList.reduce((best, s) => (s.score > best.score ? s : best), studentList[0]);
}

// ---------- ส่วนที่ 2 : ท่อข้อมูลต่อกัน บรรทัดเดียว (filter → map → reduce) ----------
// หาคะแนนเฉลี่ยของนักศึกษาสาขา CE ที่สอบผ่าน

const cePassedAvg = Math.round(
  students.filter((s) => s.major === "CE" && s.score >= PASS_SCORE)
    .map((s) => s.score)
    .reduce((sum, score) => sum + score, 0) /
  students.filter((s) => s.major === "CE" && s.score >= PASS_SCORE).length * 100
) / 100;

// ---------- ส่วนที่ 3 : ทดสอบ ----------

console.log("=== ส่วนที่ 1 : ทดสอบฟังก์ชันกับข้อมูลจริง ===");
console.log("getNames          :", getNames(students));
console.log("getPassedStudents :", getPassedStudents(students).map((s) => s.name));
console.log("getTotalScore     :", getTotalScore(students));
console.log("getAverageScore   :", getAverageScore(students));
console.log("countByGrade      :", countByGrade(students));
console.log("getTopStudent     :", getTopStudent(students).name, getTopStudent(students).score);

console.log("\n=== ส่วนที่ 2 : คะแนนเฉลี่ยสาขา CE ที่สอบผ่าน ===");
console.log("cePassedAvg       :", cePassedAvg);

console.log("\n=== ส่วนที่ 3 : ทดสอบกรณีขอบ (array ว่าง ต้องไม่ error) ===");
console.log("getNames([])          :", getNames([]));
console.log("getPassedStudents([]) :", getPassedStudents([]));
console.log("getTotalScore([])     :", getTotalScore([]));
console.log("getAverageScore([])   :", getAverageScore([]));
console.log("countByGrade([])      :", countByGrade([]));
console.log("getTopStudent([])     :", getTopStudent([]));
console.log("ทุกฟังก์ชันทำงานได้ ไม่มี error");
