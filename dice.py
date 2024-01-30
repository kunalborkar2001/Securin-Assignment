import numpy as np

# Part A

# 1. Calculate Total Combinations
total_combinations = 6 * 6  # Total combinations when rolling two six-sided dice
print("Total combinations:", total_combinations)

# 2. Calculate Distribution of All Possible Combinations
distribution = np.zeros(13, dtype=int)
for i in range(1, 7):
    for j in range(1, 7):
        sum_val = i + j
        distribution[sum_val] += 1  # Increment count for each sum
print("Distribution of combinations:", distribution[2:])

# 3. Calculate Probability of All Possible Sums
probability = distribution[2:] / total_combinations  # Probability = count / total
print("Probability of sums:", probability)

# Part B

# Function to Reattach Spots on the Dice while maintaining probabilities
def undoom_dice(Die_A, Die_B):
    New_Die_A = []
    New_Die_B = []
    sum_counts = np.zeros(11, dtype=int)  # Array to store counts of sums 2 to 12

    # Loop through all combinations of Die A and Die B
    for i in range(len(Die_A)):
        for j in range(len(Die_B)):
            sum_val = Die_A[i] + Die_B[j]
            sum_counts[sum_val - 2] += 1  # Increment count for this sum (2 to 12)
            if Die_A[i] <= 4:  # Check condition for Die A
                New_Die_A.append(Die_A[i])  # Keep Die A as is if spots <= 4
                New_Die_B.append(Die_B[j])  # Keep Die B as is

    # Adjust Die B if necessary to maintain probabilities
    for i in range(len(New_Die_B)):
        sum_val = New_Die_A[i] + New_Die_B[i]
        expected_count = total_combinations * probability[sum_val - 2]  # Expected count based on probability
        current_count = sum_counts[sum_val - 2]  # Current count of this sum
        if current_count < expected_count:
            # Add spots to Die B to match expected count
            while current_count < expected_count:
                New_Die_B[i] += 1
                current_count += 1

    return New_Die_A, New_Die_B  # Return the transformed dice




# Test the function
Die_A = [1, 2, 3, 4, 5, 6]
Die_B = Die_A
New_Die_A, New_Die_B = undoom_dice(Die_A, Die_B)
print("New Die A:", New_Die_A)
print("New Die B:", New_Die_B)
