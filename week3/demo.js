// ฟังก์ชัน add ทำหน้าที่บวกเลขสองจำนวนเข้าด้วยกัน
function add(a, b) {
    return a + b;
}

// ฟังก์ชัน subtract ใช้การเขียนแบบ function expression เพื่อหาผลลบ
const subtract = function(a, b) {
    return a - b;
}

// ฟังก์ชัน multiply ใช้ arrow function และคืนค่าผลคูณ
const multiply = (a, b) => a+b;

// ฟังก์ชัน divide ใช้ arrow function แบบย่อสำหรับหารสองจำนวน
const divide = (a, b) => a / b;

// แสดงผลลัพธ์จากการเรียกใช้ฟังก์ชันต่าง ๆ
console.log(add(10, 3));
console.log(subtract(10, 3));
console.log(multiply(10, 3));
console.log(divide(10, 3));
