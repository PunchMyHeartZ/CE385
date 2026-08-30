// Workshop 1 · ข้อที่ 6 — ระบบตรวจสอบสิทธิ์ (รวมทุกหัวข้อ)

// ===== ข้อมูลที่ถูกต้องในระบบ =====
const VALID_USERNAME = "admin";
const VALID_PASSWORD = "ce385pass";
const MIN_AGE = 18;

// ===== ส่วนที่ 1: ฟังก์ชัน login =====
// คืนค่าเป็น "ข้อความผลลัพธ์" เท่านั้น (ไม่ console.log ข้างใน)
function login(inputUser, inputPass, role, isActive, age) {
  // ลำดับ 1: ตรวจตัวตนก่อนเสมอ (ใช้ || เพราะผิดอย่างใดอย่างหนึ่ง = ไม่ผ่าน)
  if (inputUser !== VALID_USERNAME || inputPass !== VALID_PASSWORD) {
    return "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"; // เทียบกับ 401
  }

  // ลำดับ 2: บัญชีถูกระงับหรือไม่
  if (isActive === false) {
    return "บัญชีนี้ถูกระงับการใช้งาน"; // เทียบกับ 403
  }

  // ลำดับ 3: ตรวจอายุ
  if (age < MIN_AGE) {
    return "อายุไม่ถึงเกณฑ์";
  }

  // ลำดับ 4-5: พิสูจน์ตัวตนผ่านแล้ว จึงค่อยแยกสิทธิ์ตาม role
  if (role === "อาจารย์") {
    return "เข้าสู่ระบบสำเร็จ (สิทธิ์ผู้ดูแล)"; // 200
  }
  return "เข้าสู่ระบบสำเร็จ (สิทธิ์ทั่วไป)"; // นักศึกษา
}

// ===== ส่วนที่ 2: ทดสอบอย่างน้อย 6 กรณี =====
let testCases = [
  { title: "สำเร็จ (อาจารย์)", inputUser: "admin", inputPass: "ce385pass", role: "อาจารย์", isActive: true, age: 30 },
  { title: "สำเร็จ (นักศึกษา)", inputUser: "admin", inputPass: "ce385pass", role: "นักศึกษา", isActive: true, age: 20 },
  { title: "รหัสผ่านผิด", inputUser: "admin", inputPass: "wrongpass", role: "อาจารย์", isActive: true, age: 30 },
  { title: "ชื่อผู้ใช้ผิด", inputUser: "hacker", inputPass: "ce385pass", role: "อาจารย์", isActive: true, age: 30 },
  { title: "บัญชีถูกระงับ", inputUser: "admin", inputPass: "ce385pass", role: "นักศึกษา", isActive: false, age: 20 },
  { title: "อายุไม่ถึง", inputUser: "admin", inputPass: "ce385pass", role: "นักศึกษา", isActive: true, age: 15 },
];

console.log("========== ทดสอบระบบ Login ==========");
for (let tc of testCases) {
  // เรียกใช้ฟังก์ชันแล้วค่อย log ผลลัพธ์ตอนเรียกใช้ (ตามเงื่อนไขข้อ)
  let result = login(tc.inputUser, tc.inputPass, tc.role, tc.isActive, tc.age);
  console.log(`${tc.title} -> ${result}`);
}

// ===== ส่วนที่ 3: คำตอบท้ายข้อ =====
// คำถามที่ 1: ทำไมต้องตรวจ username/password ก่อน ตรวจ role?
// ตอบ: role คือข้อมูล "หลังจาก" พิสูจน์ตัวตนสำเร็จแล้ว (authorization)
// หากยังไม่ผ่านการตรวจ username/password ก็ยังไม่รู้เลยว่าคนที่ยื่นคำขอเป็นใคร
// ให้ตรวจ role ก่อนเท่ากับเปิดช่องให้คนแปลกหน้าแค่ส่ง role = "อาจารย์" มากับมือ
// เพื่อขอสิทธิ์ผู้ดูแล ทั้งที่ตัวตนยังไม่ได้รับการยืนยัน
//
// คำถามที่ 2: ถ้าย้าย "อายุไม่ถึงเกณฑ์" ขึ้นไปเป็นข้อแรก จะเกิดปัญหาอะไร?
// ตอบ: ระบบจะเปิดเผยข้อมูลให้คนที่ "ยังไม่ได้พิสูจน์ตัวตน" มากเกินจำเป็น
// เช่น คนที่กรอกรหัสผ่านผิด ๆ ก็ได้รับรู้ว่าระบบมีเกณฑ์อายุ 18 ปี
// ที่สำคัญ ข้อความตอบกลับที่ต่างจากปกติ (ตรวจอายุก่อน 401) ทำให้ผู้โจมตี
// ใช้ข้อความที่ได้รับไปเดา/แยกแยะพฤติกรรมการตรวจสอบของระบบ (information leak)
// หลักความปลอดภัยจึงกำหนดว่าต้องตรวจตัวตน (401) ให้ผ่านก่อนเสมอ
// แล้วจึงค่อยตรวจสิทธิ์/เงื่อนไขอื่น ๆ ทีละขั้น
