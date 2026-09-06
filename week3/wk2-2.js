const FAILING_SCORE = 50; // เกณฑ์สอบตก

// ---------- ส่วนที่ 1 : ข้อมูลตั้งต้น array ของ object 6 คน ----------

const students = [
  { id: "6601", name: "สมชาย",  major: "CE", score: 82, contact: { email: "somchai@mail.com",  phone: "081-111-1111" } },
  { id: "6602", name: "สมหญิง",  major: "IT", score: 45, contact: { email: "somying@mail.com", phone: "082-222-2222" } },
  { id: "6603", name: "มานะ",    major: "CE", score: 67, contact: { email: "mana@mail.com",    phone: "083-333-3333" } },
  { id: "6604", name: "มานี",    major: "IT", score: 91, contact: { email: "manee@mail.com",   phone: "084-444-4444" } },
  { id: "6605", name: "ปิติ",    major: "CE", score: 38, contact: { email: "piti@mail.com",    phone: "085-555-5555" } },
  { id: "6606", name: "ใหม่",    major: "IT", score: 74, contact: { email: "mai@mail.com",     phone: "086-666-6666" } },
];

// ---------- ส่วนที่ 2 : ฟังก์ชันค้นหา (ทุกตัว return ค่า ห้ามแก้ array ต้นฉบับ) ----------

// คืนนักศึกษาคนนั้น หรือ undefined ถ้าไม่พบ
function findById(studentList, id) {
  return studentList.find((s) => s.id === id);
}

// คืน array ของนักศึกษาในสาขานั้น (filter สร้าง array ใหม่ ไม่แก้ต้นฉบับ)
function findByMajor(studentList, major) {
  return studentList.filter((s) => s.major === major);
}

// คืน true ถ้ามีอย่างน้อย 1 คนที่คะแนนต่ำกว่า 50
function hasFailingStudent(studentList) {
  return studentList.some((s) => s.score < FAILING_SCORE);
}

// คืนอีเมล หรือ "ไม่พบข้อมูลติดต่อ" ถ้าไม่มี (ใช้ ?. และ ??)
// ?. ช่วยกัน error ตอนเข้าถึง .email ของ undefined หรือคนที่ไม่มี contact
// ?? คืนค่าขวาเมื่อซ้ายเป็น undefined หรือ null
function getEmail(studentList, id) {
  return findById(studentList, id)?.contact?.email ?? "ไม่พบข้อมูลติดต่อ";
}

// ---------- ส่วนที่ 3 : ทดสอบ ----------

console.log("=== ทดสอบค้นหา ===");
console.log("findById CE 6601        :", findById(students, "6601"));
console.log("findByMajor IT          :", findByMajor(students, "IT").map((s) => s.name));
console.log("hasFailingStudent       :", hasFailingStudent(students));
console.log("getEmail 6601           :", getEmail(students, "6601"));

console.log("\n=== ทดสอบกรณีหาไม่เจอ (ต้องไม่ error) ===");
console.log("findById(students, \"9999\")  :", findById(students, "9999"));
console.log("getEmail(students, \"9999\")  :", getEmail(students, "9999"));

console.log("\n=== เพิ่มนักศึกษาที่ไม่มี contact (ใช้ spread สร้าง array ใหม่ ไม่ใช้ push) ===");
const newStudent = { id: "6607", name: "จอห์น", major: "CE", score: 55 }; // ไม่มี contact
const updatedStudents = [...students, newStudent]; // array ใหม่ ต้นฉบับไม่ถูกแก้

console.log("จำนวน array เดิม       :", students.length, "(ยังเท่าเดิม)");
console.log("จำนวน array ใหม่       :", updatedStudents.length);
console.log("getEmail 6607 (ไม่มี contact):", getEmail(updatedStudents, "6607"));
