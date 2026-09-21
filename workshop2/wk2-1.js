const grade_A = 80;
const grade_B_plus = 75;
const grade_B = 70;
const grade_C_plus = 65;
const grade_C = 60;
const grade_D_plus = 55;
const grade_D = 50;

const isValidScore = (score) =>
    typeof score === "number" && score >= 0 && score <= 100;

const toGrade = (score) => {
    if (!isValidScore(score)) return "Invalid score";
    if (score >= grade_A) return "A";
    if (score >= grade_B_plus) return "B+";
    if (score >= grade_B) return "B";
    if (score >= grade_C_plus) return "C+";
    if (score >= grade_C) return "C";
    if (score >= grade_D_plus) return "D+";
    if (score >= grade_D) return "D";
    return "F";
};

function calculateAverage(raw, full = 60, weight = 20){
    return (raw / full) * weight;
}

function calculatewkscore(workshop, attendance, project, midterm, final){
    return workshop + attendance + project + midterm + final;
}

const students = [
  { name: "สมชาย", workshop: 48, attendance: 8, project: 12, midterm: 18, final: 21 },
  { name: "สมหญิง", workshop: 45, attendance: 10, project: 13, midterm: 20, final: 26 },
  { name: "สมปอง", workshop: 30, attendance: 5, project: 9, midterm: 13, final: 15 },
];

console.log("ชื่อ     รวม   เกรด");
console.log("--------------------");

for (const s of students) {
  const ws = calculateWorkshopScore(s.workshop);
  const total = calculateTotal(ws, s.attendance, s.project, s.midterm, s.final);
  console.log(s.name.padEnd(8), String(total).padEnd(6), toGrade(total));
}

// ---------- ส่วนที่ 3 : พิสูจน์ว่าค่าเริ่มต้นทำงาน ----------
console.log("--------------------");
console.log("calculateWorkshopScore(48)                =", calculateWorkshopScore(48));
console.log("calculateWorkshopScore(48, 60, 20)        =", calculateWorkshopScore(48, 60, 20));
console.log("calculateWorkshopScore(48, undefined, 25) =", calculateWorkshopScore(48, undefined, 25));
