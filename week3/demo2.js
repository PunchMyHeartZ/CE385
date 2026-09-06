function createStudent(name, year=1, isActive=true) {
    return {name, year, isActive};
}

console.log("ไม่ส่ง Year = ", createStudent("สมชาย"));
console.log("ส่งครบ = ", createStudent("สมหญิง", 2, false));
console.log("ส่ง Undefined = ", createStudent("สมปอง", undefined));
console.log("ส่ง Null = ", createStudent("สมศรี", null));
console.log("ส่ง 0 = ", createStudent("สมถุย", 0));

function sumAll(...numbers) {
    return numbers.reduce((total,num) => total + num, 0);
}

console.log("\n sumAll(10,20,30) =", sumAll(10,20,30));
console.log("sumAll() = ", sumAll());

function formatscores(studentName, ...scores) {
    return `${studentName} : ${scores.join(", ")}`;
}
console.log("\n", formatscores("สมชาย", 78, 91, 45));