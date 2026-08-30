// ===== ส่วนที่ 1: หาราคาเมนู =====
// คืนราคาของเมนู (0 ถ้าไม่มีในรายการ)
// .trim() กันช่องว่างหน้า/หลัง เพราะ switch เทียบค่าแบบ === เป๊ะ ๆ
function getMenuPrice(menu) {
  switch (menu.trim()) {
    // fall-through โดยจงใจ: 3 เมนูนี้ราคา 50 เท่ากัน
    // จึงรวม case เข้าด้วยกันแทนการเขียน return ซ้ำ 3 ครั้ง
    case "ข้าวผัด":
    case "ข้าวมันไก่":
    case "ข้าวหมูแดง":
      return 50;
    case "ผัดไทย":
      return 60;
    case "ต้มยำกุ้ง":
      return 120;
    default:
      return 0; // ไม่มีในรายการ
  }
}

// ===== ส่วนที่ 2: ตัวคูณขนาด =====
function getSizeMultiplier(size) {
  switch (size.trim()) {
    case "ธรรมดา":
      return 1;
    case "พิเศษ":
      return 1.5;
    case "จัมโบ้":
      return 2;
    default:
      return 1; // ขนาดอื่น ๆ ถือว่าธรรมดา
  }
}

// ===== ส่วนที่ 3: คิดราคารวมของออร์เดอร์ =====
let orders = [
  { menu: "ผัดไทย", size: "พิเศษ", qty: 2 },
  { menu: "ข้าวผัด", size: "ธรรมดา", qty: 1 },
  { menu: "ต้มยำกุ้ง", size: "จัมโบ้", qty: 1 },
  { menu: "ข้าวหมูแดง", size: "พิเศษ", qty: 3 },
  { menu: "ส้มตำ", size: "ธรรมดา", qty: 2 }, // เมนูไม่มีในรายการ (ทดสอบ default)
];

console.log("========== ใบสั่งอาหาร ==========");
let total = 0;

for (let order of orders) {
  // สูตรราคาต่อรายการ: ราคาเมนู × ตัวคูณขนาด × จำนวนที่สั่ง
  let lineTotal = getMenuPrice(order.menu) * getSizeMultiplier(order.size) * order.qty;
  total += lineTotal;

  // แสดงโน้ตถ้าเป็นเมนูที่ไม่มีในรายการ
  let note = getMenuPrice(order.menu) === 0 ? "  (ไม่มีในรายการ)" : "";
  console.log(`${order.menu} (${order.size}) x${order.qty} = ${lineTotal} บาท${note}`);
}

console.log("---------------------------------");
console.log(`รวมทั้งบิล: ${total} บาท`);
