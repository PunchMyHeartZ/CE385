// Workshop 3 · ข้อที่ 4 — เลือก Combinator ให้ถูกงาน
// ตัวเลือก: all / allSettled / any / race — แต่ละสถานการณ์มี comment เหตุผลกำกับ

// เครื่องมือจำลอง (ห้ามแก้ ตามโจทย์)
const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
  });

// ตัวจับเวลาสำหรับสถานการณ์ 4 (เขียนเองตามโจทย์)
// ไม่ resolve แต่ reject เมื่อครบเวลา เพื่อให้ race ตัดสินว่า "เลิกรอ" ทันที
const timeoutPromise = (ms) =>
  new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`หมดเวลา ${ms}ms`)), ms);
  });

// ===== สถานการณ์ 1 — หน้าแรก: ต้องครบทุกชิ้นถึงจะเปิดได้ =====
// เลือก: Promise.all
// เหตุผล: หน้าแรกต้องการข้อมูล "ครบทุกชิ้น" ถ้าชิ้นใดชิ้นหนึ่งล้มเหลว
// ก็ไม่มีประโยชน์ที่จะเปิดหน้าเปล่า ๆ -> ทั้งหมดสำเร็จค่อย resolve
// ชิ้นเดียวล้ม = reject ทันที (fail-fast) ตรงกับ "ชิ้นใดล้ม หน้าแรกเปิดไม่ได้"

const scenario1 = async () => {
  console.log("== สถานการณ์ 1: หน้าแรก (Promise.all) ==");

  // เคส A: ทุกชิ้นสำเร็จ
  try {
    const [profile, schedule, news] = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ"),
    ]);
    console.log(`เปิดหน้าแรก: ${profile} + ${schedule} + ${news}`);
  } catch (error) {
    console.log(`หน้าแรกเปิดไม่ได้: ${error.message}`);
  }

  // เคส B: ประกาศล้มเหลว (willFail=true)
  try {
    const [profile, schedule, news] = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ", true), // <- ชิ้นนี้พัง
    ]);
    console.log(`เปิดหน้าแรก: ${profile} + ${schedule} + ${news}`);
  } catch (error) {
    console.log(`หน้าแรกเปิดไม่ได้: ${error.message}`);
  }
};

// ===== สถานการณ์ 2 — แจ้งเตือนผลสอบ: ต้องรู้ผล "ทุกช่อง" =====
// เลือก: Promise.allSettled
// เหตุผล: รายงานต้องครบทุกช่อง ช่องที่ล้มก็ต้องรายงานว่า "ล้ม"
// ไม่ใช่ทำทั้งรายงานพังตาม -> allSettled ไม่ reject เลย รอทุกตัวจบ
// แล้วคืนสถานะ fulfilled/rejected ของแต่ละช่องมาให้ครบ

const scenario2 = async () => {
  console.log("== สถานการณ์ 2: แจ้งเตือนผลสอบ (Promise.allSettled) ==");

  const results = await Promise.allSettled([
    wait(300, "ผลสอบส่งทางอีเมล"),
    wait(500, "ผลสอบส่งทาง SMS", true), // <- ช่องนี้ล้ม
    wait(400, "ผลสอบส่งทางแอป"),
  ]);

  const channels = ["อีเมล", "SMS", "แอป"];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      console.log(`${channels[i]}: สำเร็จ (${r.value})`);
    } else {
      console.log(`${channels[i]}: ล้มเหลว (${r.reason.message})`);
    }
  });
  console.log("รายงานครบทุกช่อง — ช่องเดียวล้มไม่ทำให้รายงานพัง");
};

// ===== สถานการณ์ 3 — mirror server: เอา "ตัวแรกที่สำเร็จ" =====
// เลือก: Promise.any
// เหตุผล: mirror หลายตัวเก็บข้อมูลเดียวกัน ขอแค่ตัวใดตัวหนึ่งตอบมาก็พอ
// A ล้ม (300ms) แต่ B สำเร็จ (600ms) -> ใช้ B ต่อ
// any รอเฉพาะ "ตัวแรกที่ fulfilled" จะ reject ก็ต่อเมื่อพังทุกตัว (AggregateError)

const scenario3 = async () => {
  console.log("== สถานการณ์ 3: mirror server (Promise.any) ==");

  try {
    const data = await Promise.any([
      wait(300, "ข้อมูลจาก mirror-A", true), // <- เร็วกว่าแต่ล้ม ถูกข้าม
      wait(600, "ข้อมูลจาก mirror-B"),
    ]);
    console.log(`ใช้ข้อมูลจาก: ${data}`);
  } catch (error) {
    console.log(`mirror พังทั้งหมด: ${error.message}`);
  }
};

// ===== สถานการณ์ 4 — ค้นหา: ผู้ใช้รอได้จำกัด 800ms =====
// เลือก: Promise.race
// เหตุผล: งานคือ "ตัวแรกที่จบเป็นต้นชนะ" ไม่สนว่าจะสำเร็จหรือล้ม
// วาง DB (1200ms) แข่งกับ timeoutPromise(800) -> ตัวจับเวลาจบก่อน (800 < 1200)
// เมื่อ timeout reject ให้ catch แล้วเปลี่ยนไปใช้แคชเก่าแทน
// (แม้ DB จะยังวิ่งเบื้องหลังจนจบ แต่เราเลิกรอแล้ว)

const scenario4 = async () => {
  console.log("== สถานการณ์ 4: ค้นหา + timeout (Promise.race) ==");

  try {
    const result = await Promise.race([
      wait(1200, "ผลล่าสุดจากฐานข้อมูล"),
      timeoutPromise(800),
    ]);
    console.log(`ใช้ผลล่าสุด: ${result}`);
  } catch (error) {
    console.log(`${error.message} -> เลิกรอ ใช้แคชเก่าแทน`);
  }
};

// ===== main(): เรียง 4 สถานการณ์ในลำดับเดียว =====

const main = async () => {
  await scenario1();
  console.log("");
  await scenario2();
  console.log("");
  await scenario3();
  console.log("");
  await scenario4();
};

main();
