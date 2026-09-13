// ===== ส่วนที่ 0 — คัดลอก fetchStudentByIdAsync (เวอร์ชัน Promise จากข้อ 2) =====

const students = [
    {id: "6501", name: "Som Chai", major: "Computer Science", score: 78},
    {id: "6502", name: "John Doe", major: "Information Technology", score: 85},
    {id: "6503", name: "Jane Smith", major: "Software Engineering", score: 92},
    {id: "6504", name: "Alice Johnson", major: "Data Science", score: 88}
];

const fetchStudentByIdAsync = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof id !== "string" || id.trim() === "") {
                reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
                return;
            }

            const student = students.find((s) => s.id === id);

            if (!student) {
                reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
                return;
            }

            resolve({ ...student }); // คืนสำเนาเสมอ เหมือน ex1/ex2
        }, 300);
    });
};

// กฎตัดเกรดเดิมจาก week2/week3 (ใช้ในส่วนที่ 3)
const GRADE_RULES = [
    { minScore: 80, grade: "A" },
    { minScore: 75, grade: "B+" },
    { minScore: 70, grade: "B" },
    { minScore: 65, grade: "C+" },
    { minScore: 60, grade: "C" },
    { minScore: 55, grade: "D+" },
    { minScore: 50, grade: "D" },
    { minScore: 0,  grade: "F" }
];

const toGrade = (score) => GRADE_RULES.find((r) => score >= r.minScore).grade;

// รายชื่อรหัสที่ต้องดึง (เดียวกันทั้งข้อ 1 และข้อ 2)
const IDS = ["6501", "6502", "6503"];

// เก็บเวลาของข้อ 1 ไว้ให้ข้อ 2 นำไปเทียบ
let seqTimeMs = 0;

// ===== ส่วนที่ 1 — reportSequential(): ดึงทีละคนด้วย await ใน for...of =====

const reportSequential = async () => {
    console.log("== ส่วนที่ 1: ดึงตามลำดับ (await ใน for...of) ==");

    const start = Date.now();

    for (const id of IDS) {
        const student = await fetchStudentByIdAsync(id); // รอครบ 300ms ถึงไปตัวถัดไป
        console.log(`  พบ: ${student.id} ${student.name} (score ${student.score})`);
    }

    seqTimeMs = Date.now() - start;
    console.log(`  ใช้เวลา: ${seqTimeMs}ms (คาดหวัง ~900ms = 3 x 300ms)`);
};

// ===== ส่วนที่ 2 — reportParallel(): Promise.all + map พร้อมกัน =====

const reportParallel = async () => {
    console.log("== ส่วนที่ 2: ดึงขนาน (Promise.all + map) ==");

    const start = Date.now();

    // เริ่มทุกงานพร้อมกัน -> รอพร้อมกันทีเดียว (~300ms ไม่ใช่ 900ms)
    const results = await Promise.all(IDS.map((id) => fetchStudentByIdAsync(id)));

    const elapsed = Date.now() - start;

    for (const student of results) {
        console.log(`  พบ: ${student.id} ${student.name} (score ${student.score})`);
    }

    console.log(`  ใช้เวลา: ${elapsed}ms (คาดหวัง ~300ms)`);
    console.log(`  เทียบข้อ 1: เร็วขึ้น ~${(seqTimeMs / elapsed).toFixed(2)} เท่า`);
};

// ===== ส่วนที่ 3 — safeReport(id): try-catch-finally ครบ =====

const safeReport = async (id) => {
    try {
        const student = await fetchStudentByIdAsync(id); // reject จะกลายเป็น throw
        console.log(`พบข้อมูล: ${student.name} (เกรด ${toGrade(student.score)})`);
    } catch (error) {
        console.log(`ตรวจไม่พบ: ${error.message}`); // ไม่ crash เพราะจับไว้แล้ว
    } finally {
        console.log(`-- จบการตรวจสอบ ${id} --`);
    }
};

// ===== main(): หัวหน้าเรียกทุกส่วนตามลำดับ =====

const main = async () => {
    await reportSequential();   // จบข้อ 1 ก่อน
    console.log("");
    await reportParallel();     // ค่อยเริ่มข้อ 2
    console.log("");
    console.log("== ส่วนที่ 3: safeReport (try-catch-finally) ==");
    await safeReport("6501");   // เคสพบข้อมูล
    await safeReport("9999");   // เคสไม่พบ — ต้องไม่ crash
};

main();

// ===== ส่วนที่ 4 — ตอบคำถาม =====
//
// ① ทำไม try-catch ครอบ await จับ reject ได้ แต่ครอบการเรียก callback ธรรมดาไม่ได้?
//
//    เมื่อ await ตัว Promise ที่ reject  runtime จะ "เปลี่ยน" ค่าที่ reject มา
//    เป็น exception โยนออกจากจุดที่เขียน await ใน async function
//    เสมือนเขียน throw error ไว้บรรทัดนั้นเอง ดังนั้น catch ที่ครอบ await
//    อยู่จึงจับได้ตามกลไก try-catch ปกติ เพียงแต่ "รอ" ก่อนโยน
//
//    ส่วน callback ธรรมดา เช่น fetchStudentById(id, cb) การเรียกฟังก์ชัน
//    แค่ "ลงทะเบียน" callback แล้ว return ทันที try-catch จบไปแล้ว
//    ตอนที่ error เกิดจริง (ภายใน setTimeout ในภายหลัง) โค้ดกำลังรันอยู่
//    ใน event loop นอกบล็อก try จึงโยนข้าม catch ไปเลย -> crash
//    สรุป: await ทำให้ error แบบ async มี "เวลา/สถานที่" ที่จับได้
//    callback ไม่มีจุดรอให้ try-catch ครอบถึง
//
// ② ทดลอง "ลืม await" หน้า Promise.all แล้วเอาผลไปใช้ต่อ — เกิดอะไรขึ้น?
//
//    สมมติเขียน: const results = Promise.all(IDS.map(...)); (ไม่มี await)
//    - results ที่ได้ไม่ใช่ array ของนักศึกษา แต่เป็น "Promise ที่ยัง pending"
//    - เอาไปใช้ต่อทันที เช่น results.map(...) -> TypeError: results.map is not a function
//      หรือพิมพ์ใน template string จะได้ "[object Promise]"
//    - งานด้านในยังรันอยู่เบื้องหลังตามปกติ (setTimeout ยังตั้ง) แต่ main
//      ไม่รอ เดินต่อทันที ลำดับการพิมพ์เลยเพี้ยน
//    - ถ้าสุดท้าย Promise ตัวนั้น reject จะกลายเป็น "unhandled rejection"
//      เพราะไม่มี await ตัวไหนส่ง error เข้า try-catch ของเรา
//    สรุป: ลืม await = เก็บ "ใบสัญญา" ไว้แทน "ของจริง" ต้อง await เสมอ
//    ก่อนนำผลไปใช้
