const min_score = 0;
const max_score = 100;
const WORKSHOP_FULL_SCORE = 60;
const WORKSHOP_WEIGHT = 20;

const GRADE_RULES = [
    {minscore: 80, grade: "A"},
    {minscore: 75, grade: "B+"},
    {minscore: 70, grade: "B"},
    {minscore: 65, grade: "C+"},
    {minscore: 60, grade: "C"},
    {minscore: 55, grade: "D+"},
    {minscore: 50, grade: "D"},
    {minscore: 0, grade: "F"},
];

// ---------- ส่วนที่ 1 : ฟังก์ชัน (ทุกฟังก์ชันทำเรื่องเดียว ห้าม console.log ข้างใน) ----------
// ตรวจว่าเป็นตัวเลข 0–100 หรือไม่ (arrow function)
const isValidScore = (score) =>
  typeof score === "number" && !Number.isNaN(score) && score >= min_score && score <= max_score;

// แปลงคะแนนเป็นเกรด (ต้องตรวจคะแนนก่อนเสมอ)
function toGrade(score) {
  if (!isValidScore(score)) return "คะแนนไม่ถูกต้อง";
  const rule = GRADE_RULES.find((r) => score >= r.minscore);
  return rule.grade;
}

// แปลงคะแนนดิบเป็นคะแนนจริง (raw ÷ full) × weight (arrow function + default parameters)
const calculateWorkshopScore = (raw, full = WORKSHOP_FULL_SCORE, weight = WORKSHOP_WEIGHT) =>
  (raw / full) * weight;

// รวมคะแนนทั้ง 5 ก้อน
function calculateTotal(workshop, attendance, project, midterm, final) {
  return workshop + attendance + project + midterm + final;
}

// ---------- ส่วนที่ 2 : ทดสอบกับนักศึกษา 3 คน แสดงผลเป็นตาราง ----------

const students = [
  { name: "สมชาย",  workshop: 55, attendance: 8,  project: 18, midterm: 12, final: 30 },
  { name: "สมหญิง",  workshop: 42, attendance: 6,  project: 14, midterm: 9,  final: 21 },
  { name: "มานะ",    workshop: 60, attendance: 9,  project: 17, midterm: 10, final: 22 },
];

const resultTable = students.map((s) => {
  const workshopScore = calculateWorkshopScore(s.workshop);
  const total = calculateTotal(workshopScore, s.attendance, s.project, s.midterm, s.final);
  return {
    ชื่อ: s.name,
    "Workshop (20)": workshopScore.toFixed(2),
    "เช็คชื่อ (10)": s.attendance,
    "โปรเจกต์ (20)": s.project,
    "กลางภาค (15)": s.midterm,
    "ปลายภาค (35)": s.final,
    รวม: total.toFixed(2),
    เกรด: toGrade(total),
  };
});

console.log("=== ส่วนที่ 2 : คะแนนรายวิชาของนักศึกษา 3 คน ===");
console.table(resultTable);

// ---------- ส่วนที่ 3 : พิสูจน์ว่า default parameters ทำงาน ----------

console.log("=== ส่วนที่ 3 : พิสูจน์ค่าเริ่มต้นของพารามิเตอร์ ===");

const scoreDefault = calculateWorkshopScore(48);        // ใช้ค่าเริ่มต้น full=60, weight=20
const scoreFull    = calculateWorkshopScore(48, 60, 20); // ส่งค่าเองแบบเจาะจง
console.log("calculateWorkshopScore(48)        =", scoreDefault);
console.log("calculateWorkshopScore(48, 60, 20) =", scoreFull);
console.log("ผลเท่ากันไหม?", scoreDefault === scoreFull);

const scoreSkipFull = calculateWorkshopScore(48, undefined, 25);
console.log("calculateWorkshopScore(48, undefined, 25) =", scoreSkipFull);