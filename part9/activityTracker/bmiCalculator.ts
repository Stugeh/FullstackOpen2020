
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


const parseArguments = (args: Array<string>): { height: number, weight: number } => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}


try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}