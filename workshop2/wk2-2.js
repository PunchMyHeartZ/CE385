// ---------- ส่วนที่ 1 : ข้อมูลตั้งต้น ----------
const students =[
    {id: "66010001", name: "สมชาย", major: "CE ", score: 78, contact: {email: "somchai@dpu.ac.th", phone: "081-111-1111"}},
    {id: "66010002", name: "สมหญิง", major: "CE ", score: 91, contact: {email: "somying@dpu.ac.th", phone: "082-222-2222"}},
    {id: "66010003", name: "สมปอง", major: "CE ", score: 65, contact: {email: "somporn@dpu.ac.th", phone: "083-333-3333"}} ,
    {id: "66010004", name: "สมศรี", major: "CE ", score: 45, contact: {email: "somsri@dpu.ac.th", phone: "084-444-4444"}},
    {id: "66010005", name: "สมถุย", major: "CE ", score: 66, contact: {email: "somthuy@dpu.ac.th", phone: "085-555-5555"}},
    {id: "66010006", name: "สมเก่ง", major: "CE ", score: 65, contact: {email: "somkeng@dpu.ac.th", phone: "086-666-6666"}}
];

// ---------- ส่วนที่ 2 : ฟังก์ชันค้นหา (คืนค่าทุกตัว ห้ามแก้ array ต้นฉบับ) ----------
function findById(students, id) {
    return students.find((s) => s.id === id);
}

function findByMajor(students, major) {
    return students.filter((s) => s.major === major);
}

function hasFailStudents(students) {
    return students.some((s) => s.score < 50);
}

function getEmail(students, id) {
  const student = findById(students, id);
  return student?.contact?.email ?? "ไม่พบข้อมูลติดต่อ";
}

// ---------- ส่วนที่ 3 : ทดสอบ ----------
console.log("findById ที่มีอยู่ =", findById(students, "66010001").name);
console.log("findById ไม่มีจริง =", findById(students, "9999"), "<-- undefined ไม่ error");
console.log("getEmail ไม่มีจริง =", getEmail(students, "9999"));

const ceStudents = findByMajor(students, "CE");
console.log("นักศึกษา CE =", ceStudents.map((s) => s.name).join(", "));
console.log("มีคนต่ำกว่า 50 ไหม =", hasFailStudents(students));
console.log("อีเมล 66010002 =", getEmail(students, "66010002"));

// เพิ่มนักศึกษาใหม่ที่ไม่มี contact — ใช้ spread สร้าง array ใหม่ ไม่ใช้ push
const newStudents = [
  ...students,
  { id: "66010007", name: "สมน้อย", major: "IT", score: 55 },
];
console.log("อีเมลคนไม่มี contact =", getEmail(newStudents, "66010007"));
console.log("array เดิมมีกี่คน     =", students.length, "<-- ยัง 6 คน ต้นฉบับไม่ถูกแก้");
