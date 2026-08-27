// 25 Curated High-Quality Blind Coding & Programming Logic Questions
// Sanitized for client-side security: Correct answers are strictly held and graded on the backend server.
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    questionId: 1,
    category: "JavaScript",
    difficulty: "Medium",
    question: "What will be the logged output of the following JavaScript code snippet?",
    codeSnippet: `console.log(typeof (typeof 1));`,
    options: [
      { id: "A", text: "\"number\"" },
      { id: "B", text: "\"string\"" },
      { id: "C", text: "\"undefined\"" },
      { id: "D", text: "\"object\"" }
    ]
  },
  {
    id: 2,
    questionId: 2,
    category: "Python",
    difficulty: "Easy",
    question: "What is the output of the following Python list manipulation?",
    codeSnippet: `nums = [1, 2, 3, 4]
nums.append([5, 6])
print(len(nums))`,
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "5" },
      { id: "C", text: "4" },
      { id: "D", text: "Error" }
    ]
  },
  {
    id: 3,
    questionId: 3,
    category: "C++",
    difficulty: "Medium",
    question: "Predict the output of the following C++ pointer arithmetic:",
    codeSnippet: `int arr[] = {10, 20, 30, 40};
int *ptr = arr;
cout << *(ptr + 2) << " " << *ptr + 2;`,
    options: [
      { id: "A", text: "30 12" },
      { id: "B", text: "30 30" },
      { id: "C", text: "20 12" },
      { id: "D", text: "30 20" }
    ]
  },
  {
    id: 4,
    questionId: 4,
    category: "Algorithms",
    difficulty: "Easy",
    question: "What is the average time complexity of searching an element in a balanced Binary Search Tree (BST) with N nodes?",
    codeSnippet: null,
    options: [
      { id: "A", text: "O(1)" },
      { id: "B", text: "O(N)" },
      { id: "C", text: "O(log N)" },
      { id: "D", text: "O(N log N)" }
    ]
  },
  {
    id: 5,
    questionId: 5,
    category: "JavaScript",
    difficulty: "Medium",
    question: "What is printed to the console when this asynchronous JavaScript code executes?",
    codeSnippet: `console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");`,
    options: [
      { id: "A", text: "A -> B -> C -> D" },
      { id: "B", text: "A -> D -> B -> C" },
      { id: "C", text: "A -> D -> C -> B" },
      { id: "D", text: "C -> A -> D -> B" }
    ]
  },
  {
    id: 6,
    questionId: 6,
    category: "Bitwise Logic",
    difficulty: "Medium",
    question: "What does the expression `(x & (x - 1)) == 0` check for any positive integer `x`?",
    codeSnippet: `bool result = (x & (x - 1)) == 0;`,
    options: [
      { id: "A", text: "Whether x is an even number" },
      { id: "B", text: "Whether x is a power of 2" },
      { id: "C", text: "Whether x is a prime number" },
      { id: "D", text: "Whether x is divisible by 4" }
    ]
  },
  {
    id: 7,
    questionId: 7,
    category: "C++",
    difficulty: "Hard",
    question: "What is printed when this C++ code with static variables runs?",
    codeSnippet: `#include <iostream>
using namespace std;
void countCalls() {
    static int count = 0;
    int local = 0;
    cout << ++count << ":" << ++local << " ";
}
int main() {
    countCalls();
    countCalls();
    return 0;
}`,
    options: [
      { id: "A", text: "1:1 1:1" },
      { id: "B", text: "1:1 2:1" },
      { id: "C", text: "1:1 2:2" },
      { id: "D", text: "0:0 1:1" }
    ]
  },
  {
    id: 8,
    questionId: 8,
    category: "Python",
    difficulty: "Medium",
    question: "What is the result of multiplying a list containing a mutable list in Python?",
    codeSnippet: `grid = [[0]] * 3
grid[0][0] = 99
print(grid)`,
    options: [
      { id: "A", text: "[[99], [0], [0]]" },
      { id: "B", text: "[[99], [99], [99]]" },
      { id: "C", text: "[[0], [0], [99]]" },
      { id: "D", text: "TypeError: invalid assignment" }
    ]
  },
  {
    id: 9,
    questionId: 9,
    category: "Data Structures",
    difficulty: "Easy",
    question: "Which data structure is fundamentally utilized for Depth-First Search (DFS) in a graph?",
    codeSnippet: null,
    options: [
      { id: "A", text: "Queue (FIFO)" },
      { id: "B", text: "Stack (LIFO)" },
      { id: "C", text: "Circular Buffer" },
      { id: "D", text: "Priority Heap" }
    ]
  },
  {
    id: 10,
    questionId: 10,
    category: "Recursion",
    difficulty: "Medium",
    question: "What is the return value of `mystery(4, 3)` for the recursive function below?",
    codeSnippet: `int mystery(int a, int b) {
    if (b == 0) return 0;
    if (b % 2 == 0) return mystery(a + a, b / 2);
    return mystery(a + a, b / 2) + a;
}`,
    options: [
      { id: "A", text: "7" },
      { id: "B", text: "12" },
      { id: "C", text: "64" },
      { id: "D", text: "1" }
    ]
  },
  {
    id: 11,
    questionId: 11,
    category: "JavaScript",
    difficulty: "Hard",
    question: "What is the output of the IIFE loop with `var` versus `let` closures?",
    codeSnippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10);
}`,
    options: [
      { id: "A", text: "0 1 2" },
      { id: "B", text: "3 3 3" },
      { id: "C", text: "undefined undefined undefined" },
      { id: "D", text: "2 2 2" }
    ]
  },
  {
    id: 12,
    questionId: 12,
    category: "Algorithms",
    difficulty: "Medium",
    question: "What is the worst-case time complexity of QuickSort when using the naive first-element pivot on an already sorted array?",
    codeSnippet: null,
    options: [
      { id: "A", text: "O(N log N)" },
      { id: "B", text: "O(N)" },
      { id: "C", text: "O(N²)" },
      { id: "D", text: "O(log N)" }
    ]
  },
  {
    id: 13,
    questionId: 13,
    category: "Python",
    difficulty: "Medium",
    question: "What does this Python dictionary comprehension generate?",
    codeSnippet: `d = {x: x**2 for x in (1, 2, 3) if x % 2 != 0}
print(sum(d.values()))`,
    options: [
      { id: "A", text: "10" },
      { id: "B", text: "14" },
      { id: "C", text: "9" },
      { id: "D", text: "1" }
    ]
  },
  {
    id: 14,
    questionId: 14,
    category: "Bitwise Logic",
    difficulty: "Easy",
    question: "What is the value of `5 ^ 5 ^ 7` in integer bitwise operations?",
    codeSnippet: `int val = 5 ^ 5 ^ 7;`,
    options: [
      { id: "A", text: "0" },
      { id: "B", text: "5" },
      { id: "C", text: "7" },
      { id: "D", text: "17" }
    ]
  },
  {
    id: 15,
    questionId: 15,
    category: "C++",
    difficulty: "Medium",
    question: "What is the size of the following C++ struct on a standard 64-bit architecture with default structure alignment?",
    codeSnippet: `struct Node {
    char c;    // 1 byte
    int x;     // 4 bytes
    short s;   // 2 bytes
};`,
    options: [
      { id: "A", text: "7 bytes" },
      { id: "B", text: "8 bytes" },
      { id: "C", text: "12 bytes" },
      { id: "D", text: "16 bytes" }
    ]
  },
  {
    id: 16,
    questionId: 16,
    category: "Data Structures",
    difficulty: "Medium",
    question: "In a min-heap stored as a 0-indexed array, where is the left child of node at index `i` located?",
    codeSnippet: null,
    options: [
      { id: "A", text: "2 * i" },
      { id: "B", text: "2 * i + 1" },
      { id: "C", text: "2 * i + 2" },
      { id: "D", text: "i / 2" }
    ]
  },
  {
    id: 17,
    questionId: 17,
    category: "JavaScript",
    difficulty: "Hard",
    question: "What evaluates when comparing an array with an empty string in JavaScript?",
    codeSnippet: `console.log([] == ![]);`,
    options: [
      { id: "A", text: "true" },
      { id: "B", text: "false" },
      { id: "C", text: "TypeError" },
      { id: "D", text: "NaN" }
    ]
  },
  {
    id: 18,
    questionId: 18,
    category: "Algorithms",
    difficulty: "Medium",
    question: "Which algorithmic paradigm is applied by Dijkstra's Single-Source Shortest Path algorithm?",
    codeSnippet: null,
    options: [
      { id: "A", text: "Dynamic Programming" },
      { id: "B", text: "Greedy Strategy" },
      { id: "C", text: "Divide and Conquer" },
      { id: "D", text: "Backtracking" }
    ]
  },
  {
    id: 19,
    questionId: 19,
    category: "Python",
    difficulty: "Easy",
    question: "What is printed by this string slicing snippet in Python?",
    codeSnippet: `s = "BLINDCODE"
print(s[-4:])`,
    options: [
      { id: "A", text: "\"BLIN\"" },
      { id: "B", text: "\"CODE\"" },
      { id: "C", text: "\"DCODE\"" },
      { id: "D", text: "\"EDOC\"" }
    ]
  },
  {
    id: 20,
    questionId: 20,
    category: "SQL & DB Logic",
    difficulty: "Medium",
    question: "How does `COUNT(*)` differ from `COUNT(column_name)` in standard SQL?",
    codeSnippet: `SELECT COUNT(*), COUNT(bonus) FROM Employees;`,
    options: [
      { id: "A", text: "They always return the exact same count" },
      { id: "B", text: "COUNT(*) counts all rows including NULLs; COUNT(column) ignores NULL values in that column" },
      { id: "C", text: "COUNT(column) counts distinct values only" },
      { id: "D", text: "COUNT(*) throws an error if table has NULL keys" }
    ]
  },
  {
    id: 21,
    questionId: 21,
    category: "Recursion",
    difficulty: "Hard",
    question: "What is the time complexity of the standard recursive Fibonacci without memoization?",
    codeSnippet: `int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}`,
    options: [
      { id: "A", text: "O(N)" },
      { id: "B", text: "O(N²)" },
      { id: "C", text: "O(2ᴺ)" },
      { id: "D", text: "O(N log N)" }
    ]
  },
  {
    id: 22,
    questionId: 22,
    category: "Object-Oriented Programming",
    difficulty: "Medium",
    question: "What occurs when a derived class declares a method with the identical signature as a virtual method in its base class?",
    codeSnippet: null,
    options: [
      { id: "A", text: "Method Overloading" },
      { id: "B", text: "Method Overriding (Runtime Polymorphism)" },
      { id: "C", text: "Compile-time abstraction error" },
      { id: "D", text: "Encapsulation breach" }
    ]
  },
  {
    id: 23,
    questionId: 23,
    category: "Bitwise Logic",
    difficulty: "Hard",
    question: "What does the expression `x ^ (x >> 1)` produce when computing on a binary integer?",
    codeSnippet: `unsigned int g = x ^ (x >> 1);`,
    options: [
      { id: "A", text: "Reverses all bits of x" },
      { id: "B", text: "Converts binary to its corresponding Gray code representation" },
      { id: "C", text: "Counts total set bits" },
      { id: "D", text: "Finds the two's complement" }
    ]
  },
  {
    id: 24,
    questionId: 24,
    category: "Data Structures",
    difficulty: "Easy",
    question: "Which traversal of a Binary Search Tree (BST) produces sorted output in ascending order?",
    codeSnippet: null,
    options: [
      { id: "A", text: "Pre-order (Root -> Left -> Right)" },
      { id: "B", text: "In-order (Left -> Root -> Right)" },
      { id: "C", text: "Post-order (Left -> Right -> Root)" },
      { id: "D", text: "Level-order (BFS)" }
    ]
  },
  {
    id: 25,
    questionId: 25,
    category: "Logic & Code Reasoning",
    difficulty: "Hard",
    question: "Given `x = [1, 2, 3]` and `y = x`. Then `y += [4, 5]`. How does this differ from `y = y + [4, 5]` in Python?",
    codeSnippet: `x = [1, 2, 3]
y = x
y += [4, 5]`,
    options: [
      { id: "A", text: "`+=` modifies the list in-place (mutates `x`), while `y = y + [...]` creates a new list leaving `x` unchanged" },
      { id: "B", text: "Both operations always leave `x` untouched" },
      { id: "C", text: "Both operations mutate `x`" },
      { id: "D", text: "`+=` raises an immutable error" }
    ]
  }
];

export const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;
export const QUIZ_DURATION_MINUTES = 60;
export const QUIZ_DURATION_SECONDS = QUIZ_DURATION_MINUTES * 60;
