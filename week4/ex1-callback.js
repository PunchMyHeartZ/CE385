const students = [
    {id: "6501", name: "Som Chai", major: "Computer Science", score: 78},
    {id: "6502", name: "John Doe", major: "Information Technology", score: 85},
    {id: "6503", name: "Jane Smith", major: "Software Engineering", score: 92},
    {id: "6504", name: "Alice Johnson", major: "Data Science", score: 88}
];

const fetchStudentById = (id, callback) => {
    setTimeout(() => {
        if (typeof id !== "string" || id.trim() === "") {
            callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
            return;
        }

        const student = students.find(student => student.id === id);

        if (!student) {
            callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
            return;
        }

        callback(null, { ...student });
    }, 300)
};

const printResult = (error, student) => {
    if (error) {
        console.log(error.message);
        return;
    }

    console.log(student);
};

// ก) รหัสนักศึกษาที่มีจริง
fetchStudentById("6501", printResult);

// ข) รหัสนักศึกษาที่ไม่มี
fetchStudentById("9999", printResult);

// ค) รหัสนักศึกษาผิดรูปแบบ
fetchStudentById(42, printResult);

// ① ถ้าลืมตรวจ error แล้วอ่าน .name ทันที เมื่อเกิด error ตัว student จะเป็น undefined
//    ทำให้เกิด TypeError: Cannot read properties of undefined (reading 'name')
//    และเพราะโค้ดนี้ทำงานอยู่ใน setTimeout (asynchronous) exception นี้ไม่ได้วิ่งกลับ
//    มาทางพารามิเตอร์ error ของ callback แต่จะกลายเป็น uncaught exception
//    ที่ผู้พัฒนาเห็นใน console และทำให้โปรแกรม crash ทันที
// ② ต้อง return หลังเรียก callback(error) เพื่อหยุดการทำงานของฟังก์ชันทันที
//    ไม่เช่นนั้นโค้ดด้านล่างจะยังทำงานต่อ ซึ่งอาจเรียก callback ซ้ำ (double callback)
//    หรือพยายามใช้ข้อมูลที่ไม่ถูกต้อง



