const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2);
    if (bmi > 40) return "Obese Class III (Very severely obese)";
    if (bmi > 35) return "Obese Class II (Severely obese)";
    if (bmi > 30) return "Obese Class I (Moderately obese)";
    if (bmi > 25) return "Overweight";
    if (bmi > 18.5) return "Normal (healthy weight)";
    if (bmi > 16) return "Underweight";
    if (bmi > 15) return "Severely underweight";
    return "Very severely underweight";

}

console.log(calculateBmi(180, 74));