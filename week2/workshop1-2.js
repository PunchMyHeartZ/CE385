// ประกาศตัวแปรครบทุกชนิด
const textValue = "สวัสดี";
const numberValue = 42;
const booleanValue = true;
let undefinedValue;      // ประกาศแล้วยังไม่กำหนดค่า
const nullValue = null;  // ค่าว่าง
const arrayValue = [1, 2, 3];

// แสดงค่ากับชนิดของแต่ละตัว
console.log(`ค่า: ${textValue} | ชนิด: ${typeof textValue}`);
console.log(`ค่า: ${numberValue} | ชนิด: ${typeof numberValue}`);
console.log(`ค่า: ${booleanValue} | ชนิด: ${typeof booleanValue}`);
console.log(`ค่า: ${undefinedValue} | ชนิด: ${typeof undefinedValue}`);
console.log(`ค่า: ${nullValue} | ชนิด: ${typeof nullValue}`);
console.log(`ค่า: ${arrayValue} | ชนิด: ${typeof arrayValue}`);

// typeof null ได้ "object" ซึ่งเป็น bug เก่าแก่ของ JavaScript
// ความจริง null คือค่าว่าง ไม่ใช่ object ผลจึงไม่ถูกต้อง
console.log(`typeof null ได้ผลเป็น: ${typeof nullValue}`);
console.log(`ผลนี้ถูกต้องตามความเป็นจริงหรือไม่: ไม่ถูกต้อง`);

// ตัวแปรที่ประกาศแล้วยังไม่กำหนดค่า จะมีชนิดเป็น undefined
console.log(`ตัวแปรที่ประกาศแล้วยังไม่กำหนดค่ามีชนิดเป็น: ${typeof undefinedValue}`);

// แปลงข้อความที่เป็นตัวเลขไม่ได้ จะได้ NaN (Not a Number)
const notANumber = Number("abc");
console.log(`typeof NaN ได้ผลเป็น: ${typeof notANumber}`);
console.log(`ค่าที่สร้างเป็น NaN หรือไม่: ${Number.isNaN(notANumber)}`);

// การแปลง string เป็น number ก่อนนำไปคำนวณ
const inputAge = "20";
const inputScore = "85.5";
console.log(`inputAge บวก 5: ${Number(inputAge) + 5}`);
console.log(`inputScore มีทศนิยม 1 ตำแหน่ง: ${Number(inputScore).toFixed(1)}`);

// string "20" ไม่เท่ากับ number 20 (=== เทียบทั้งค่าและชนิด)
console.log(`inputAge === 20: ${inputAge === 20}`);
// แปลงเป็น number แล้วจึงเท่ากัน
console.log(`Number(inputAge) === 20: ${Number(inputAge) === 20}`);
