function getPriceBuggy(size) {
  let price = 0;
  switch (size) {
    case "S":  price = 30; break;
    case "M":  price = 45; break;
    case "L":  price = 60; break;
    default:   price = 0;
  }
  return price;
}

function getPriceFixed(size) {
  switch (size) {
    case "S": return 30;
    case "M": return 45;
    case "L": return 60;
    default:  return 0;
  }
}

for (const s of ["S", "M", "L", "XL"]) {
  console.log("ขนาด " + s + " → มีบั๊ก: " + getPriceBuggy(s) + " | แก้แล้ว: " + getPriceFixed(s));
}