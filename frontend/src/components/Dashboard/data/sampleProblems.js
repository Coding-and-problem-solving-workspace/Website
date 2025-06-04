const testCase1 = {
    _id: "01",
    problemId: "problem1ObjectId",
    input: "5\n1 2 3 4 5", 
    expectedOutput: "15",
  };
  
  const testCase2 = {
    _id: "02",
    problemId: "problem1ObjectId", 
    input: "3\n1 1 1", 
    expectedOutput: "3", 
  };
  
  const testCase3 = {
    _id: "03",
    problemId: "problem2ObjectId", 
    input: "10\n5 5 5 5 5 5 5 5 5 5", 
    expectedOutput: "50", 
  };
  
  const testCase4 = {
    _id: "04",
    problemId: "problem2ObjectId", 
    input: "2\n0 0", 
    expectedOutput: "0", 
  };
  
  const testCase5 = {
    _id: "05",
    problemId: "problem3ObjectId", 
    input: "3\n1 2 3", 
    expectedOutput: "6",
  };
  
  const testCase6 = {
    _id: "06",
    problemId: "problem3ObjectId", 
    input: "4\n2 2 2 2", 
    expectedOutput: "8", 
  };
  

  const solution1 = {
    _id: "01",
    problemId: "problem1ObjectId",
    code: "function sum(arr) { return arr.reduce((a, b) => a + b, 0); }", 
    explanation: "This solution sums up the numbers in the array using the reduce function.",
  };
  
  const solution2 = {
    _id: "02",
    problemId: "problem2ObjectId", 
    code: "function multiply(arr) { return arr.reduce((a, b) => a * b, 1); }", 
    explanation: "This solution multiplies all the numbers in the array using the reduce function.",
  };
  
  const solution3 = {
    _id: "03",
    problemId: "problem3ObjectId", 
    code: "function sum(arr) { return arr.reduce((a, b) => a + b, 0); }",
    explanation: "This solution sums up the numbers in the array using the reduce function.",
  };
  
  export const sampleProblems = [
    {
      _id: "01",
      title: "Sum of Array (Easy)",
      description: "Given an array of integers, return the sum of the array.",
      category: ["Array", "Mathematics"],
      difficulty: "Easy",
      likes: 100,
      dislikes: 2,
      images: ["https://example.com/images/sum_of_array.png"],
      testCases: [testCase1, testCase2],
      solutions: [solution1],
    },
    {
      _id: "02",
      title: "Product of Array (Hard)",
      description: "Given an array of integers, return the product of the array.",
      category: ["Array", "Mathematics"],
      difficulty: "Hard",
      likes: 200,
      dislikes: 3,
      images: ["https://example.com/images/product_of_array.png"],
      testCases: [testCase3, testCase4],
      solutions: [solution2],
    },
    {
      _id: "03",
      title: "Sum of Positive Integers (Medium)",
      description: "Given an array of integers, return the sum of the positive integers.",
      category: ["Array", "Mathematics"],
      difficulty: "Medium",
      likes: 150,
      dislikes: 1,
      images: ["https://example.com/images/sum_of_positive_integers.png"],
      testCases: [testCase5, testCase6],
      solutions: [solution3],
    },
  ];
  
  