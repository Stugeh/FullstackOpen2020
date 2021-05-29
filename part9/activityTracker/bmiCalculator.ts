
type BmiOutput = { height: number, weight: number, bmi: string };

export const calculateBmi = (inputs: { height: string, weight: string }): Record<string,unknown> => {
    const parsedHeight = parseInt(inputs.height);
    const parsedWeight = parseInt(inputs.weight);

    if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
        return { error: "Malformatted params" };
    }

    const bmi = parsedWeight / Math.pow(parsedHeight / 100, 2);
    const result: BmiOutput = {
        height: parsedHeight,
        weight: parsedWeight,
        bmi: ''
    };

    if (bmi > 40) result.bmi = "Obese Class III (Very severely obese)";
    else if (bmi > 35) result.bmi = "Obese Class II (Severely obese)";
    else if (bmi > 30) result.bmi = "Obese Class I (Moderately obese)";
    else if (bmi > 25) result.bmi = "Overweight";
    else if (bmi > 18.5) result.bmi = "Normal (healthy weight)";
    else if (bmi > 16) result.bmi = "Underweight";
    else if (bmi > 15) result.bmi = "Severely underweight";
    else result.bmi = "Very severely underweight";

    return result;
};

// const parseArguments = (args: Array<string>): { height: number, weight: number } => {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many arguments');

//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             height: Number(args[2]),
//             weight: Number(args[3])
//         }
//     } else {
//         throw new Error('Provided values were not numbers!');
//     }
// }


// try {
//     const { height, weight } = parseArguments(process.argv);
//     console.log(calculateBmi(height, weight));
// } catch (e) {
//     console.log('Error, something bad happened, message: ', e.message);
// }