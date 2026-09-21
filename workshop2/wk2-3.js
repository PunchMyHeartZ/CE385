// ---------- ข้อมูลตั้งต้น ----------
const students =[
    {id: "66010001", name: "สมชาย", major: "CE ", score: 78, contact: {email: "somchai@dpu.ac.th", phone: "081-111-1111"}},
    {id: "66010002", name: "สมหญิง", major: "CE ", score: 91, contact: {email: "somying@dpu.ac.th", phone: "082-222-2222"}},
    {id: "66010003", name: "สมปอง", major: "CE ", score: 65, contact: {email: "somporn@dpu.ac.th", phone: "083-333-3333"}} ,
    {id: "66010004", name: "สมศรี", major: "CE ", score: 45, contact: {email: "somsri@dpu.ac.th", phone: "084-444-4444"}},
    {id: "66010005", name: "สมถุย", major: "CE ", score: 66, contact: {email: "somthuy@dpu.ac.th", phone: "085-555-5555"}},
    {id: "66010006", name: "สมเก่ง", major: "CE ", score: 65, contact: {email: "somkeng@dpu.ac.th", phone: "086-666-6666"}}
];

const GRADE_A = 80, GRADE_B_PLUS = 75, GRADE_B = 70, GRADE_C_PLUS = 65, GRADE_C = 60, GRADE_D_PLUS = 55, GRADE_D = 50;

const toGrade = (score) => {
    if (score >= GRADE_A) return "A";
    if (score >= GRADE_B_PLUS) return "B+";
    if (score >= GRADE_B) return "B";
    if (score >= GRADE_C_PLUS) return "C+";
    if (score >= GRADE_C) return "C";
    if (score >= GRADE_D_PLUS) return "D+";
    if (score >= GRADE_D) return "D";
    return "F"; 
}

// ---------- ส่วนที่ 1 : ฟังก์ชันสรุปข้อมูล ----------
// ชื่อทุกคน
function getNames(students, id) {
    const student = students.find((s) => s.id === id);
    return student?.name ?? "ไม่พบข้อมูล";
}

// คนที่ผ่าน (คะแนน >= 50)
function getPassedStudents(students){
    return students.filter((s) => s.score >= 50);
}

// ผลรวมคะแนน
function getTotalScore(students){
    return students.reduce((total,s) => total + s.score, 0);
}

// คะแนนเฉลี่ย 2 ตำแหน่ง — array ว่างคืน 0 กัน NaN
function getAverageScore(students){
    return +(getTotalScore(students) / students.length).toFixed(2);
}

// นับจำนวนแยกตามเกรด — reduce ค่าเริ่มต้นเป็น {} แล้วสะสมทีละคน
function countByGrade(students) {
  return students.reduce((count, s) => {
    const grade = toGrade(s.score);
    count[grade] = (count[grade] ?? 0) + 1; 
    return count;
  }, {});
}

// คนที่คะแนนสูงสุด — reduce เทียบทีละคน
function getTopStudent(students) {
  return students.reduce(
    (best, s) => (best === null || s.score > best.score ? s : best),
    null
  );
}

// ---------- ส่วนที่ 2 : ท่อข้อมูล filter → map → reduce ----------
// เฉลี่ยของสาขา CE ที่สอบผ่าน (บรรทัดเดียว: filter คัดคน → map เอาคะแนน → reduce หาค่าเฉลี่ย)
const cePassedAvg = students.filter((s) => s.major === "CE" && s.score >= 50).map((s) => s.score).reduce((sum, sc, i, arr) => (i === arr.length - 1 ? (sum + sc) / arr.length : sum + sc), 0);

// ---------- แสดงผล ----------
console.log("ชื่อทุกคน        =", getNames(students));
console.log("ผู้ผ่าน          =", getPassedStudents(students).map((s) => s.name));
console.log("รวมคะแนน        =", getTotalScore(students));
console.log("เฉลี่ย           =", getAverageScore(students));
console.log("นับตามเกรด      =", JSON.stringify(countByGrade(students)));
console.log("คะแนนสูงสุด     =", getTopStudent(students).name, getTopStudent(students).score);
console.log("เฉลี่ย CE ที่ผ่าน =", cePassedAvg);

// ---------- ส่วนที่ 3 : ทดสอบ array ว่าง ไม่มีตัวไหน error ----------
console.log("--------------------");
console.log("getNames([])          =", getNames([]));
console.log("getPassedStudents([]) =", getPassedStudents([]));
console.log("getTotalScore([])     =", getTotalScore([]));
console.log("getAverageScore([])   =", getAverageScore([]), "<-- เป็น 0 ไม่ใช่ NaN");
console.log("countByGrade([])      =", JSON.stringify(countByGrade([])));
console.log("getTopStudent([])     =", getTopStudent([]), "<-- null ไม่ error");