// ===== ส่วนที่ 1 — fetchStudentByIdAsync (เวอร์ชัน Promise ของ ex1) =====
// คัดลอกข้อมูลและโค้ดตรวจสอบจาก ex1 มาใช้ (ไม่แก้ไข ex1)
// เปลี่ยน callback(err, x) -> reject(err) / resolve(x)

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

            resolve({ ...student }); // คืนสำเนาเสมอ เหมือน ex1
        }, 300);
    });
};

// ===== ส่วนที่ 2 — เรียกใช้ครบ 3 กรณีด้วย .then / .catch / .finally =====

// ก) รหัสที่มีจริง
fetchStudentByIdAsync("6501")
    .then((student) => console.log("ก) สำเร็จ:", student))
    .catch((error) => console.log("ก) ล้มเหลว:", error.message))
    .finally(() => console.log("ก) เสร็จสิ้นการทำงาน"));

// ข) รหัสที่ไม่มี
fetchStudentByIdAsync("9999")
    .then((student) => console.log("ข) สำเร็จ:", student))
    .catch((error) => console.log("ข) ล้มเหลว:", error.message))
    .finally(() => console.log("ข) เสร็จสิ้นการทำงาน"));

// ค) รหัสผิดรูปแบบ
fetchStudentByIdAsync(42)
    .then((student) => console.log("ค) สำเร็จ:", student))
    .catch((error) => console.log("ค) ล้มเหลว:", error.message))
    .finally(() => console.log("ค) เสร็จสิ้นการทำงาน"));

// ===== ส่วนที่ 3 — โซ่ 3 ขั้น แต่ละขั้น return ส่งต่อ =====
// ขั้น 1: แปลงเป็น { name, grade } (กฎตัดเกรดเดิมจาก week2/week3)
// ขั้น 2: แปลงเป็นข้อความรายงาน 1 บรรทัด
// ขั้น 3: พิมพ์ออกทาง console

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

fetchStudentByIdAsync("6501")
    .then((student) => {
        // ขั้น 1: { name, grade }
        return { name: student.name, grade: toGrade(student.score) };
    })
    .then(({ name, grade }) => {
        // ขั้น 2: ข้อความรายงาน 1 บรรทัด
        return `รายงาน: นักศึกษา ${name} ได้เกรด ${grade}`;
    })
    .then((report) => {
        // ขั้น 3: พิมพ์ออกทาง console
        return console.log(report);
    })
    .catch((error) => console.log("โซ่ล้มเหลว:", error.message));

// ===== ส่วนที่ 4 (โบนัส) — promisify(fn) อเนกประสงค์ =====
// รับฟังก์ชัน error-first ใด ๆ -> คืนเวอร์ชัน Promise

const promisify = (fn) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        });
    };
};

// ทดสอบกับฟังก์ชัน error-first ตัวอย่างอื่น (ไม่ใช่ข้อ 1): ฐานข้อมูลรายวิชา
const courses = [
    { code: "CE385", title: "Web Programming", credits: 3 },
    { code: "CE401", title: "Machine Learning", credits: 3 }
];

const fetchCourseByCode = (code, callback) => {
    setTimeout(() => {
        if (typeof code !== "string" || code.trim() === "") {
            callback(new Error("รหัสวิชาไม่ถูกต้อง"));
            return;
        }
        const course = courses.find((c) => c.code === code);
        if (!course) {
            callback(new Error(`ไม่พบรหัสวิชา ${code}`));
            return;
        }
        callback(null, { ...course });
    }, 200);
};

const fetchCourseByCodeAsync = promisify(fetchCourseByCode);

fetchCourseByCodeAsync("CE385")
    .then((course) => console.log("โบนัส สำเร็จ:", course))
    .catch((error) => console.log("โบนัส ล้มเหลว:", error.message));

fetchCourseByCodeAsync("CE999")
    .then((course) => console.log("โบนัส สำเร็จ:", course))
    .catch((error) => console.log("โบนัส ล้มเหลว:", error.message));
