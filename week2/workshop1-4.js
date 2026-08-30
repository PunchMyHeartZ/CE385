// Workshop 1 · ข้อที่ 4 — ตัดเกรดจากคะแนน (CE385)

// ===== ฟังก์ชันตัดเกรด =====
// คืนค่าเป็นเกรด (string) หรือ null ถ้าคะแนนไม่ถูกต้อง
function toGrade(score) {
  // ส่วนที่ 2: ตรวจข้อมูลนำเข้าก่อน — คะแนนต้องอยู่ระหว่าง 0-100 เท่านั้น
  if (score < 0 || score > 100) {
    return null; // ไม่ตัดเกรดให้คะแนนที่เกินช่วง
  }

  // ส่วนที่ 1: เรียงเงื่อนไขจากคะแนนมากไปน้อย
  // เพราะ if/else if จะจบทันทีที่เจอเงื่อนไขแรกที่เป็นจริง
  // จึงแค่เช็ค "ตั้งแต่เกณฑ์ขั้นล่างขึ้นไป" (เช่น >= 80) โดยไม่ต้องเช็คขอบบนซ้ำ
  // ถ้าเรียงจากน้อยไปมาก เงื่อนไขบนจะกลืนคะแนนสูงกว่าเสมอ (เช่น score >= 50 จะจับ 95 ไว้ก่อน)
  if (score >= 80) {
    return "A";
  } else if (score >= 75) {
    return "B+";
  } else if (score >= 70) {
    return "B";
  } else if (score >= 65) {
    return "C+";
  } else if (score >= 60) {
    return "C";
  } else if (score >= 55) {
    return "D+";
  } else if (score >= 50) {
    return "D";
  } else {
    return "F"; // 0-49
  }
}

// ===== ส่วนที่ 1: ตัวอย่างคะแนน 78 =====
let sampleScore = 78;
let sampleGrade = toGrade(sampleScore);
console.log(`คะแนน ${sampleScore} -> เกรด ${sampleGrade}`);

// ===== ส่วนที่ 3: ทดสอบให้ครบทุกค่าด้วย for...of =====
let testScores = [95, 80, 79, 75, 70, 65, 60, 55, 50, 49, 0, -5, 120];

console.log("\n========== ทดสอบตัดเกรดทุกค่า ==========");
for (let score of testScores) {
  let grade = toGrade(score);

  if (grade === null) {
    console.log(`คะแนน ${score} -> คะแนนไม่ถูกต้อง ต้องอยู่ระหว่าง 0-100`);
  } else {
    console.log(`คะแนน ${score} -> เกรด ${grade}`);
  }
}
