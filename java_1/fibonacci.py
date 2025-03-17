#Function to calculate the nth Fibonacci number
# The Fibonacci sequence starts with 0 and 1
# Each subsequent number is the sum of the two preceding ones
# Example: 0, 1, 1, 2, 3, 5, 8, 13, ...
# Parameter: n (int) - the position in the sequence (0-indexed)
# Returns: the nth Fibonacci number

def fibonacci(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)
    
# Test cases  
print(fibonacci(0)) # 0
print(fibonacci(1)) # 1
print(fibonacci(2)) # 1
print(fibonacci(3)) # 2 

# Improve fibonacci function
