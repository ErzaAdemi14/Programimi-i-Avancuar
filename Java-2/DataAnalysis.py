
import pandas as pd
import argparse

# Function to read the CSV file
def read_csv(file_path):
    """
    Reads the CSV file and returns the data as a pandas DataFrame.
    """
    try:
        data = pd.read_csv(file_path)
        return data
    except Exception as e:
        print(f"Error reading file: {e}")
        return None

# Function to calculate basic statistics: mean, median, mode, std deviation
def calculate_stats(data, column):
    """
    Calculates the mean, median, mode, and standard deviation of a given column.
    """
    if column in data.columns:
        mean = data[column].mean()
        median = data[column].median()
        mode = data[column].mode()[0]  # First mode in case of multiple modes
        std_dev = data[column].std()
        return f"Mean: {mean}, Median: {median}, Mode: {mode}, Std Dev: {std_dev}"
    else:
        return f"Column '{column}' not found in data."

# Function to generate a simple text-based histogram
def generate_histogram(data, column, bins):
    """
    Generates a text-based histogram representation of a given column.
    """
    if column in data.columns:
        values = data[column]
        min_val, max_val = values.min(), values.max()
        step = (max_val - min_val) / bins
        bins_list = [min_val + i * step for i in range(bins + 1)]
        histogram = {f"{bins_list[i]:.2f}-{bins_list[i+1]:.2f}": 0 for i in range(bins)}
        
        for value in values:
            for i in range(len(bins_list) - 1):
                if bins_list[i] <= value < bins_list[i + 1]:
                    histogram[f"{bins_list[i]:.2f}-{bins_list[i+1]:.2f}"] += 1
                    break
        
        return "\n".join([f"{k}: {'#' * v}" for k, v in histogram.items()])
    else:
        return f"Column '{column}' not found."

# Function to find correlation between two columns
def find_correlation(data, column1, column2):
    """
    Calculates the Pearson correlation between two columns.
    """
    if column1 in data.columns and column2 in data.columns:
        correlation = data[column1].corr(data[column2])
        return f"Correlation between {column1} and {column2}: {correlation}"
    else:
        return f"Columns '{column1}' or '{column2}' not found."

# Function to find outliers based on the Interquartile Range (IQR) method
def find_outliers(data, column, threshold):
    """
    Identifies outliers in a given column using the IQR method.
    """
    if column in data.columns:
        Q1 = data[column].quantile(0.25)
        Q3 = data[column].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - threshold * IQR
        upper_bound = Q3 + threshold * IQR
        
        outliers = data[(data[column] < lower_bound) | (data[column] > upper_bound)]
        return outliers
    else:
        return f"Column '{column}' not found."

# Main function to handle command-line arguments and execute the appropriate command
def main():
    """
    Main function to handle command-line input and run the selected analysis on the data.
    """
    # Setting up command-line argument parsing
    parser = argparse.ArgumentParser(description="Analyze CSV Data")
    parser.add_argument('file', type=str, help='CSV file to analyze')
    parser.add_argument('command', type=str, choices=['stats', 'histogram', 'correlation', 'outliers'], help='Analysis type')
    parser.add_argument('column1', type=str, help='Column for analysis')
    parser.add_argument('column2', type=str, nargs='?', default=None, help='Second column for correlation')
    parser.add_argument('bins', type=int, nargs='?', default=10, help='Number of bins for histogram')
    
    args = parser.parse_args()
    
    # Reading the CSV data
    data = read_csv(args.file)
    
    if data is not None:
        # Execute command based on user input
        if args.command == 'stats':
            print(calculate_stats(data, args.column1))
        elif args.command == 'histogram':
            print(generate_histogram(data, args.column1, args.bins))
        elif args.command == 'correlation' and args.column2:
            print(find_correlation(data, args.column1, args.column2))
        elif args.command == 'outliers':
            print(find_outliers(data, args.column1, args.bins))
        else:
            print("Invalid command or missing argument.")
    else:
        print("No data to analyze.")

# Running the script when called from the command line
if __name__ == "__main__":
    main()

# Example Usage : 
# python DataAnalysis.py sample_data.csv stats temperature
# python DataAnalysis.py sample_data.csv histogram humidity 10
# python DataAnalysis.py sample_data.csv correlation temperature humidity
# python DataAnalysis.py sample_data.csv outliers wind_speed 2.0