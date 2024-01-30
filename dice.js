// Part A

// 1. Calculate Total Combinations
const totalCombinations = 6 * 6; // Total combinations when rolling two six-sided dice
console.log("Total combinations:", totalCombinations);

// 2. Calculate Distribution of All Possible Combinations
const distribution = [];
for (let i = 1; i <= 6; i++) {
    for (let j = 1; j <= 6; j++) {
        const sum = i + j;
        distribution[sum] = (distribution[sum] || 0) + 1; // Increment count for each sum
    }
}
console.log("Distribution of combinations:", distribution);

// 3. Calculate Probability of All Possible Sums
const probability = distribution.map(count => count / totalCombinations); // Probability = count / total
console.log("Probability of sums:", probability);





// Part B

// Function to Reattach Spots on the Dice while maintaining probabilities
function undoom_dice(Die_A, Die_B) {
    const New_Die_A = [];
    const New_Die_B = [];
    let sumCounts = Array.from({ length: 11 }, () => 0); // Array to store counts of sums 2 to 12

    // Loop through all combinations of Die A and Die B
    for (let i = 0; i < Die_A.length; i++) {
        for (let j = 0; j < Die_B.length; j++) {
            const sum = Die_A[i] + Die_B[j];
            sumCounts[sum - 2]++; // Increment count for this sum (2 to 12)
            if (Die_A[i] <= 4) { // Check condition for Die A
                New_Die_A.push(Die_A[i]); // Keep Die A as is if spots <= 4
                New_Die_B.push(Die_B[j]); // Keep Die B as is
            }
        }
    }

    // Adjust Die B if necessary to maintain probabilities
    for (let i = 0; i < New_Die_B.length; i++) {
        const sum = New_Die_A[i] + New_Die_B[i];
        const expectedCount = totalCombinations * probability[sum]; // Expected count based on probability
        const currentCount = sumCounts[sum - 2]; // Current count of this sum
        if (currentCount < expectedCount) {
            // Add spots to Die B to match expected count
            while (currentCount < expectedCount) {
                New_Die_B[i]++;
                currentCount++;
            }
        }
    }

    return { New_Die_A, New_Die_B }; // Return the transformed dice
}

//We can test the code with the given example inputs


const Die_A = [1, 2, 3, 4, 5, 6];
const Die_B = Die_A;
const { New_Die_A, New_Die_B } = undoom_dice(Die_A, Die_B);
console.log("New Die A:", New_Die_A);
console.log("New Die B:", New_Die_B);
