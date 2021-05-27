interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const getRating = (target: number, average: number) => {
    const ratio = average / target;
    if (ratio > 1) return 3;
    if (ratio > 0.8) return 2;
    return 1;
}

const calculateExercises = (loggedHoursArray: Array<number>): Result => {
    const target = 2;
    const average = loggedHoursArray
        .reduce((total, current) => total + current) / loggedHoursArray.length;
    const rating = getRating(target, average);

    const descriptions = {
        1: "Activity fell far below target. You can do better.",
        2: "Not too bad but could be better",
        3: "Went above the target! Well done.",
    }

    return {
        periodLength: loggedHoursArray.length,
        trainingDays: loggedHoursArray.filter(hours => hours > 0).length,
        success: average > target,
        ratingDescription: descriptions[rating],
        rating,
        average,
        target,
    }
}

console.log(`calculateExercises([])`, calculateExercises([3, 0, 2, 4.5, 0, 3, 1]))