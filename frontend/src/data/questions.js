// 25 Curated High-Quality Blind Coding & Programming Logic Questions
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: "JavaScript",
    difficulty: "Medium",
    question: "What will be the logged output of the following JavaScript code snippet?",
    codeSnippet: `console.log(typeof (typeof 1));`,
    options: [
      { id: "A", text: "\"number\"" },
      { id: "B", text: "\"string\"" },
      { id: "C", text: "\"undefined\"" },
      { id: "D", text: "\"object\"" }
    ],
    correctAnswer: "B",
    explanation: "`typeof 1` returns the string \"number\". Then `typeof \"number\"` evaluates to \"string\"."
  },
  {
    id: 2,
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
    ],
    correctAnswer: "B",
    explanation: "`append()` adds the entire list `[5, 6]` as a single element at index 4, making the length 5 instead of 6."
  },
  {
    id: 3,
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
    ],
    correctAnswer: "A",
    explanation: "`*(ptr + 2)` dereferences index 2 (value 30). `*ptr + 2` dereferences index 0 (10) and adds 2, yielding 12."
  },
  {
    id: 4,
    category: "Algorithms",
    difficulty: "Easy",
    question: "What is the average time complexity of searching an element in a balanced Binary Search Tree (BST) with N nodes?",
    codeSnippet: null,
    options: [
      { id: "A", text: "O(1)" },
      { id: "B", text: "O(N)" },
      { id: "C", text: "O(log N)" },
      { id: "D", text: "O(N log N)" }
    ],
    correctAnswer: "C",
    explanation: "In a balanced BST, each comparison halves the search space, giving an average time complexity of O(log N)."
  },
  {
    id: 5,
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
    ],
    correctAnswer: "C",
    explanation: "Synchronous code runs first ('A', 'D'). Microtasks (Promises) run next ('C'). Macrotasks (setTimeout) execute in the next tick ('B')."
  },
  {
    id: 6,
    category: "Bitwise Logic",
    difficulty: "Medium",
    question: "What does the expression `(x & (x - 1)) == 0` check for any positive integer `x`?",
    codeSnippet: `bool result = (x & (x - 1)) == 0;`,
    options: [
      { id: "A", text: "Whether x is an even number" },
      { id: "B", text: "Whether x is a power of 2" },
      { id: "C", text: "Whether x is a prime number" },
      { id: "D", text: "Whether x is divisible by 4" }
    ],
    correctAnswer: "B",
    explanation: "Subtracting 1 from a power of 2 inverts all bits after the only set bit. Bitwise ANDing them results in 0."
  },
  {
    id: 7,
    category: "Python",
    difficulty: "Hard",
    question: "What is the output of the following Python default argument trap?",
    codeSnippet: `def addItem(item, lst=[]):
    lst.append(item)
    return lst

print(addItem(1))
print(addItem(2))`,
    options: [
      { id: "A", text: "[1] followed by [2]" },
      { id: "B", text: "[1] followed by [1, 2]" },
      { id: "C", text: "[1, 2] followed by [1, 2]" },
      { id: "D", text: "TypeError: mutable default argument" }
    ],
    correctAnswer: "B",
    explanation: "Default parameter values in Python are evaluated once at function definition time, so the list persists across multiple calls."
  },
  {
    id: 8,
    category: "Data Structures",
    difficulty: "Easy",
    question: "Which data structure follows the Last In, First Out (LIFO) principle and is used for function call stacks?",
    codeSnippet: null,
    options: [
      { id: "A", text: "Queue" },
      { id: "B", text: "Stack" },
      { id: "C", text: "Linked List" },
      { id: "D", text: "Heap" }
    ],
    correctAnswer: "B",
    explanation: "A Stack works on LIFO (Last In, First Out) ordering, making it the standard structure for recursion and call stack management."
  },
  {
    id: 9,
    category: "JavaScript",
    difficulty: "Hard",
    question: "What is the evaluation of `[] + {}` and `{} + []` in standard JavaScript engine contexts?",
    codeSnippet: `let val1 = [] + {};
let val2 = {} + [];`,
    options: [
      { id: "A", text: "\"[object Object]\" and \"[object Object]\" (in expression context)" },
      { id: "B", text: "\"undefined\" and \"NaN\"" },
      { id: "C", text: "\"0\" and \"0\"" },
      { id: "D", text: "TypeError" }
    ],
    correctAnswer: "A",
    explanation: "In expression context, `[]` converts to `\"\"` and `{}` converts to `\"[object Object]\"`, resulting in concatenation to `\"[object Object]\"`."
  },
  {
    id: 10,
    category: "Recursion",
    difficulty: "Medium",
    question: "What does the following recursive function compute for inputs `mystery(3, 4)`?",
    codeSnippet: `int mystery(int a, int b) {
    if (b == 0) return 0;
    if (b % 2 == 0) return mystery(a + a, b / 2);
    return mystery(a + a, b / 2) + a;
}`,
    options: [
      { id: "A", text: "3^4 = 81" },
      { id: "B", text: "3 + 4 = 7" },
      { id: "C", text: "3 * 4 = 12" },
      { id: "D", text: "3 * 2^4 = 48" }
    ],
    correctAnswer: "C",
    explanation: "This implements Russian Peasant (binary) multiplication, returning the product of `a * b` (12)."
  },
  {
    id: 11,
    category: "C++",
    difficulty: "Medium",
    question: "What is the output of this C++ pre/post increment expression?",
    codeSnippet: `int a = 5;
int b = ++a + a++;
cout << a << " " << b;`,
    options: [
      { id: "A", text: "7 12" },
      { id: "B", text: "7 11" },
      { id: "C", text: "6 12" },
      { id: "D", text: "Undefined / 7 12 (C++17 standard order)" }
    ],
    correctAnswer: "A",
    explanation: "`++a` increments `a` to 6. `a++` provides 6 (and later increments `a` to 7). Total for `b` is 6 + 6 = 12, while `a` ends at 7."
  },
  {
    id: 12,
    category: "Logic & Math",
    difficulty: "Easy",
    question: "If you have an unsorted array of size N containing integers from 1 to N+1 with exactly one number missing, what is the fastest way to find the missing number?",
    codeSnippet: null,
    options: [
      { id: "A", text: "Sort the array and scan linearly (O(N log N))" },
      { id: "B", text: "Compare Expected Sum vs Actual Sum (O(N) time, O(1) space)" },
      { id: "C", text: "Use nested loops to check each number (O(N^2))" },
      { id: "D", text: "Insert elements into a Hash Set (O(N) space)" }
    ],
    correctAnswer: "B",
    explanation: "The sum formula `(N+1)*(N+2)/2` minus the array sum directly yields the missing number in O(N) time and O(1) space."
  },
  {
    id: 13,
    category: "Python",
    difficulty: "Medium",
    question: "What is the result of the following Python slicing syntax?",
    codeSnippet: `text = "BLINDCODE"
print(text[1:7:2])`,
    options: [
      { id: "A", text: "\"LNC\"" },
      { id: "B", text: "\"LIC\"" },
      { id: "C", text: "\"LNO\"" },
      { id: "D", text: "\"BND\"" }
    ],
    correctAnswer: "A",
    explanation: "Slice from index 1 to 7 (exclusive) with step 2 takes indices 1 ('L'), 3 ('N'), and 5 ('C'), producing 'LNC'."
  },
  {
    id: 14,
    category: "Data Structures",
    difficulty: "Medium",
    question: "Which collision resolution technique in Hash Tables uses a linked list at each bucket location?",
    codeSnippet: null,
    options: [
      { id: "A", text: "Linear Probing" },
      { id: "B", text: "Quadratic Probing" },
      { id: "C", text: "Separate Chaining" },
      { id: "D", text: "Double Hashing" }
    ],
    correctAnswer: "C",
    explanation: "Separate Chaining stores multiple keys that hash to the same bucket in a linked list or auxiliary search structure at that bucket."
  },
  {
    id: 15,
    category: "JavaScript",
    difficulty: "Hard",
    question: "What does the following snippet return when invoked with `func(1)(2)(3)()`?",
    codeSnippet: `const func = a => b => b !== undefined ? func(a + b) : a;`,
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "Function object" },
      { id: "C", text: "undefined" },
      { id: "D", text: "NaN" }
    ],
    correctAnswer: "A",
    explanation: "This is an infinite currying accumulator function. Calling `()` with no arguments terminates the chain and returns the sum 1 + 2 + 3 = 6."
  },
  {
    id: 16,
    category: "Algorithms",
    difficulty: "Medium",
    question: "What is the worst-case time complexity of QuickSort when the pivot chosen is always the smallest or largest element?",
    codeSnippet: null,
    options: [
      { id: "A", text: "O(N log N)" },
      { id: "B", text: "O(N^2)" },
      { id: "C", text: "O(N)" },
      { id: "D", text: "O(log N)" }
    ],
    correctAnswer: "B",
    explanation: "If the partition creates subproblems of size 0 and N-1 repeatedly, the recursion depth is N, resulting in O(N^2) worst-case time."
  },
  {
    id: 17,
    category: "C++",
    difficulty: "Medium",
    question: "What is the output of the following struct size in standard 64-bit alignment?",
    codeSnippet: `struct Example {
    char a;    // 1 byte
    int b;     // 4 bytes
    char c;    // 1 byte
};
cout << sizeof(Example);`,
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "8" },
      { id: "C", text: "12" },
      { id: "D", text: "16" }
    ],
    correctAnswer: "C",
    explanation: "Due to struct member alignment padding, `char a` has 3 bytes padding before `int b`, and `char c` has 3 trailing bytes padding, totaling 12 bytes."
  },
  {
    id: 18,
    category: "SQL & DB Logic",
    difficulty: "Easy",
    question: "Which clause in SQL is used to filter aggregated grouped results?",
    codeSnippet: `SELECT department, COUNT(*) 
FROM participants 
GROUP BY department 
______ COUNT(*) > 10;`,
    options: [
      { id: "A", text: "WHERE" },
      { id: "B", text: "HAVING" },
      { id: "C", text: "FILTER" },
      { id: "D", text: "ORDER BY" }
    ],
    correctAnswer: "B",
    explanation: "The `HAVING` clause is used to filter records after `GROUP BY` aggregation, whereas `WHERE` filters rows prior to aggregation."
  },
  {
    id: 19,
    category: "Python",
    difficulty: "Easy",
    question: "What is the output of `bool('False')` and `bool([])` in Python?",
    codeSnippet: `print(bool('False'), bool([]))`,
    options: [
      { id: "A", text: "False False" },
      { id: "B", text: "True True" },
      { id: "C", text: "True False" },
      { id: "D", text: "False True" }
    ],
    correctAnswer: "C",
    explanation: "Any non-empty string in Python evaluates to `True` (even `'False'`), whereas an empty collection `[]` evaluates to `False`."
  },
  {
    id: 20,
    category: "Bitwise Logic",
    difficulty: "Medium",
    question: "What is the value of `5 ^ 5` followed by `5 ^ 0` using the XOR operator?",
    codeSnippet: `int res1 = 5 ^ 5;
int res2 = 5 ^ 0;`,
    options: [
      { id: "A", text: "0 and 5" },
      { id: "B", text: "5 and 0" },
      { id: "C", text: "5 and 5" },
      { id: "D", text: "1 and 0" }
    ],
    correctAnswer: "A",
    explanation: "XOR of any number with itself is 0 (`x ^ x = 0`), and XOR of any number with 0 is the number itself (`x ^ 0 = x`)."
  },
  {
    id: 21,
    category: "JavaScript",
    difficulty: "Medium",
    question: "What is the output of `0.1 + 0.2 === 0.3` in standard IEEE 754 floating point arithmetic?",
    codeSnippet: `console.log(0.1 + 0.2 === 0.3);`,
    options: [
      { id: "A", text: "true" },
      { id: "B", text: "false" },
      { id: "C", text: "undefined" },
      { id: "D", text: "NaN" }
    ],
    correctAnswer: "B",
    explanation: "Binary floating point representation of 0.1 and 0.2 produces precision rounding (0.30000000000000004), making strict equality `false`."
  },
  {
    id: 22,
    category: "Data Structures",
    difficulty: "Hard",
    question: "In a min-heap with N elements, what is the time complexity to find the maximum element?",
    codeSnippet: null,
    options: [
      { id: "A", text: "O(1)" },
      { id: "B", text: "O(log N)" },
      { id: "C", text: "O(N)" },
      { id: "D", text: "O(N log N)" }
    ],
    correctAnswer: "C",
    explanation: "In a min-heap, the minimum element is at the root O(1), but the maximum element can be at any of the leaf nodes (approx N/2 leaves), requiring O(N) linear scan."
  },
  {
    id: 23,
    category: "Object-Oriented Programming",
    difficulty: "Easy",
    question: "Which OOP concept describes wrapping data and code operating on the data into a single unit while restricting direct access?",
    codeSnippet: null,
    options: [
      { id: "A", text: "Polymorphism" },
      { id: "B", text: "Inheritance" },
      { id: "C", text: "Encapsulation" },
      { id: "D", text: "Abstraction" }
    ],
    correctAnswer: "C",
    explanation: "Encapsulation binds data and functions together and shields direct modification through private access specifiers and public getters/setters."
  },
  {
    id: 24,
    category: "Algorithms",
    difficulty: "Medium",
    question: "Which graph traversal algorithm uses a Queue and visits nodes level-by-level?",
    codeSnippet: null,
    options: [
      { id: "A", text: "Depth-First Search (DFS)" },
      { id: "B", text: "Breadth-First Search (BFS)" },
      { id: "C", text: "Dijkstra's Algorithm with Priority Queue" },
      { id: "D", text: "Topological Sort" }
    ],
    correctAnswer: "B",
    explanation: "BFS explores all neighboring vertices at the present depth level before moving on to vertices at the next depth level using a FIFO Queue."
  },
  {
    id: 25,
    category: "Logic & Code Reasoning",
    difficulty: "Hard",
    question: "Given `x = [1, 2, 3]` and `y = x`. Then `y += [4, 5]`. How does this differ from `y = y + [4, 5]` in Python?",
    codeSnippet: `x = [1, 2, 3]
y = x
y += [4, 5]
# vs
# y = y + [4, 5]`,
    options: [
      { id: "A", text: "`+=` modifies the list in-place (mutates `x`), while `y = y + [...]` creates a new list leaving `x` unchanged" },
      { id: "B", text: "Both operations always leave `x` untouched" },
      { id: "C", text: "Both operations mutate `x`" },
      { id: "D", text: "`+=` raises an immutable error on lists" }
    ],
    correctAnswer: "A",
    explanation: "In Python, `+=` calls `__iadd__()` which mutates the underlying list in-place (affecting both `x` and `y`). Binary `+` calls `__add__()` which constructs a fresh object."
  }
];

export const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;
export const QUIZ_DURATION_MINUTES = 60;
export const QUIZ_DURATION_SECONDS = QUIZ_DURATION_MINUTES * 60;
