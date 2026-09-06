# Workshop 2 สรุป — wk2-1 ถึง wk2-3

## wk2-1.js — ฟังก์ชันคำนวณคะแนน

คำนวณคะแนนรายวิชาและตัดเกรด โดยแต่ละฟังก์ชันทำเรื่องเดียวและคืนค่า (ไม่มี `console.log` ข้างใน)

| ฟังก์ชัน | ทำอะไร | หลักการที่ใช้ |
|---|---|---|
| `isValidScore(score)` | ตรวจว่าเป็นตัวเลข 0–100 | arrow function |
| `toGrade(score)` | ตัดเกรด A–F (เรียก `isValidScore` ก่อนเสมอ) | array ของกฎ + `find` |
| `calculateWorkshopScore(raw, full = 60, weight = 20)` | แปลงคะแนนดิบ (raw ÷ full) × weight | default parameters |
| `calculateTotal(...)` | รวมคะแนน 5 ก้อน | บวกธรรมดา |

- เกณฑ์ตัวเลขทั้งหมดเป็น `const` ที่ตั้งชื่อสื่อความหมาย (`MIN_SCORE`, `MAX_SCORE`, `WORKSHOP_FULL_SCORE`, `WORKSHOP_WEIGHT`)
- ทดสอบกับนักศึกษา 3 คน แสดงผลด้วย `console.table`
- พิสูจน์ default parameters: `calculateWorkshopScore(48)` กับ `(48, 60, 20)` ได้ 16 เท่ากัน · ส่ง `undefined` แทน `full` ทำให้ JS ใช้ค่าเริ่มต้น 60 แทน แต่ `weight = 25` ที่ส่งมาถูกใช้ → (48÷60)×25 = 20

## wk2-2.js — ทะเบียนนักศึกษา

ข้อมูลนักศึกษา 6 คน (id, name, major: CE/IT, score, contact: { email, phone }) พร้อมฟังก์ชันค้นหา — ทุกตัว return ค่า และไม่แก้ array ต้นฉบับ

| ฟังก์ชัน | คืนอะไร | ใช้ |
|---|---|---|
| `findById(students, id)` | นักศึกษา หรือ `undefined` | `find` |
| `findByMajor(students, major)` | array ของคนในสาขานั้น | `filter` |
| `hasFailingStudent(students)` | `true` ถ้ามีคนต่ำกว่า 50 | `some` |
| `getEmail(students, id)` | อีเมล หรือ `"ไม่พบข้อมูลติดต่อ"` | `?.` และ `??` |

- `getEmail` ใช้ optional chaining กัน error: `findById(...)?.contact?.email ?? "ไม่พบข้อมูลติดต่อ"`
- ทดสอบกรณีหาไม่เจอ `id "9999"` → ได้ `undefined` / `"ไม่พบข้อมูลติดต่อ"` ไม่ error
- เพิ่มนักศึกษาไม่มี contact ด้วย spread `[...students, newStudent]` (ไม่ใช้ `push`) — array เดิมยัง 6 คน ใหม่ 7 คน และ `getEmail` กับคนไม่มี contact ก็ไม่ error

## wk2-3.js — สรุปผลการเรียน

สรุปข้อมูลจากทะเบียนเดียวกับข้อ 2 ด้วย `map` / `filter` / `reduce` ล้วน (ห้าม for / while)

| ฟังก์ชัน | คืนอะไร | ใช้ |
|---|---|---|
| `getNames(students)` | array ชื่อทุกคน | `map` |
| `getPassedStudents(students)` | array คนที่คะแนน ≥ 50 | `filter` |
| `getTotalScore(students)` | ผลรวมคะแนน | `reduce` (เริ่ม 0) |
| `getAverageScore(students)` | เฉลี่ยทศนิยม 2 ตำแหน่ง (array ว่างคืน 0) | `reduce` + เช็ค length |
| `countByGrade(students)` | object เช่น `{ A: 2, F: 2 }` | `reduce` (เริ่ม `{}`) + `??` |
| `getTopStudent(students)` | คนที่คะแนนสูงสุด | `reduce` |

- ท่อข้อมูลบรรทัดเดียว `filter → map → reduce` หาค่าเฉลี่ยสาขา CE ที่สอบผ่าน = 74.5
- ทดสอบกรณีขอบ `[]` — ทุกฟังก์ชันคืน `[]` / `0` / `{}` / `null` ไม่มีตัวไหน error

## แนวคิดหลักของ Workshop 2

1. ฟังก์ชันบริสุทธิ์ — ทำเรื่องเดียว, return ค่า, ไม่ `console.log` ข้างใน, ไม่แก้ข้อมูลต้นฉบับ
2. ค่าคงที่ตั้งชื่อสื่อความหมาย — ห้ามโยนตัวเลข magic number ลงในโค้ด
3. Immutability — สร้างของใหม่ด้วย `filter` / `map` / spread แทนการ `push` แก้ของเดิม
4. จัดการค่าว่างให้ปลอดภัย — `?.` กัน error ตอนเข้าถึงข้อมูลที่อาจไม่มี, `??` กำหนดค่าสำรอง
5. default parameters — `undefined` ในตำแหน่งพารามิเตอร์ทำให้ถูกแทนด้วยค่าเริ่มต้น
6. reduce ต้องมีค่าเริ่มต้นเสมอ — กัน error กับ array ว่าง และทำให้ผลลัพธ์คาดเดาได้
