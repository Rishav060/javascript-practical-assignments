
const score = 85;
let grade;

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "F";
}

switch (grade) {
    case "A":
        console.log("Excellent!");
        break;
    case "B":
        console.log("Good job!");
        break;
    case "C":
        console.log("Average");
        break;
    case "D":
        console.log("Needs improvement");
        break;
    default:
        console.log("Failed");
}

const status = score >= 40 ? "Passed" : "Failed";

console.log("Score: " + score);
console.log("Grade: " + grade);
console.log("Status: " + status);
