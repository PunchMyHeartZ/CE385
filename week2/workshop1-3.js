// Workshop 1 · ข้อที่ 3 — เครื่องคิดเลขคะแนน CE385

// ส่วนที่ 1: คะแนนดิบของแต่ละส่วน
const workshopRaw = 48;   // เต็ม 60
const attendance = 9;
const project = 17;
const midterm = 15;
const final = 24;

// เกณฑ์คงที่ของรายวิชา
const workshopTotal = 60;
const workshopWeight = 20;
const maxScore = 100;
const targetScore = 80;

// ส่วนที่ 2: คำนวณคะแนน

// สูตรแปลง Workshop: (คะแนนดิบ / เต็ม 60) * 20
const workshopScore = (workshopRaw / workshopTotal) * workshopWeight;

// คะแนนรวม = ทุกส่วนรวมกัน
const totalScore = workshopScore + attendance + project + midterm + final;

// เปอร์เซ็นต์ = (คะแนนรวม / 100) * 100
const percentageScore = (totalScore / maxScore) * 100;

// ขาดอีกกี่คะแนนถึง 80 (ถ้าเกินแล้วจะติดลบ)
const scoreNeeded = targetScore - totalScore;

// ส่วนที่ 3: แสดงใบสรุปคะแนน
console.log(`===== ใบสรุปคะแนน CE385 =====`);
console.log(`Workshop (ดิบ)      : ${workshopRaw} / ${workshopTotal}`);
console.log(`Workshop (แปลงแล้ว) : ${workshopScore.toFixed(2)} / ${workshopWeight}`);
console.log(`Attendance          : ${attendance}`);
console.log(`Project             : ${project}`);
console.log(`Midterm             : ${midterm}`);
console.log(`Final               : ${final}`);
console.log(`-----------------------------`);
console.log(`คะแนนรวม   : ${totalScore.toFixed(2)} / ${maxScore}`);
console.log(`เปอร์เซ็นต์ : ${percentageScore.toFixed(2)}%`);
console.log(`ขาดอีกถึง ${targetScore} : ${scoreNeeded.toFixed(2)} คะแนน`);
