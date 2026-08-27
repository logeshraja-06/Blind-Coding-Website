import bcrypt from 'bcryptjs';
import { Question } from '../models/Question.js';
import { Admin } from '../models/Admin.js';
import { EventConfig } from '../models/EventConfig.js';
import { Student } from '../models/Student.js';
import { QuizAttempt } from '../models/QuizAttempt.js';

export const INITIAL_QUESTIONS = [
  {
    questionId: 1,
    category: "JavaScript",
    difficulty: "Medium",
    question: "What will be the logged output of the following JavaScript code snippet?",
    codeSnippet: "console.log(typeof (typeof 1));",
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
    questionId: 2,
    category: "Python",
    difficulty: "Easy",
    question: "What is the output of the following Python list manipulation?",
    codeSnippet: "nums = [1, 2, 3, 4]\nnums.append([5, 6])\nprint(len(nums))",
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
    questionId: 3,
    category: "C++",
    difficulty: "Medium",
    question: "Predict the output of the following C++ pointer arithmetic:",
    codeSnippet: "int arr[] = {10, 20, 30, 40};\nint *ptr = arr;\ncout << *(ptr + 2) << \" \" << *ptr + 2;",
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
    ],
    correctAnswer: "C",
    explanation: "In a balanced BST, each comparison halves the search space, giving an average time complexity of O(log N)."
  },
  {
    questionId: 5,
    category: "JavaScript",
    difficulty: "Medium",
    question: "What is printed to the console when this asynchronous JavaScript code executes?",
    codeSnippet: "console.log(\"A\");\nsetTimeout(() => console.log(\"B\"), 0);\nPromise.resolve().then(() => console.log(\"C\"));\nconsole.log(\"D\");",
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
    questionId: 6,
    category: "Bitwise Logic",
    difficulty: "Medium",
    question: "What does the expression `(x & (x - 1)) == 0` check for any positive integer `x`?",
    codeSnippet: "bool result = (x & (x - 1)) == 0;",
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
    questionId: 7,
    category: "C++",
    difficulty: "Hard",
    question: "What is printed when this C++ code with static variables runs?",
    codeSnippet: "#include <iostream>\nusing namespace std;\nvoid countCalls() {\n    static int count = 0;\n    int local = 0;\n    cout << ++count << \":\" << ++local << \" \";\n}\nint main() {\n    countCalls();\n    countCalls();\n    return 0;\n}",
    options: [
      { id: "A", text: "1:1 1:1" },
      { id: "B", text: "1:1 2:1" },
      { id: "C", text: "1:1 2:2" },
      { id: "D", text: "0:0 1:1" }
    ],
    correctAnswer: "B",
    explanation: "Static variables retain their value across calls (`count` goes 0->1->2), while automatic/local variables are reinitialized each invocation (`local` is 1 both times)."
  },
  {
    questionId: 8,
    category: "Python",
    difficulty: "Medium",
    question: "What is the result of multiplying a list containing a mutable list in Python?",
    codeSnippet: "grid = [[0]] * 3\ngrid[0][0] = 99\nprint(grid)",
    options: [
      { id: "A", text: "[[99], [0], [0]]" },
      { id: "B", text: "[[99], [99], [99]]" },
      { id: "C", text: "[[0], [0], [99]]" },
      { id: "D", text: "TypeError: invalid assignment" }
    ],
    correctAnswer: "B",
    explanation: "The `*` operator on a list creates shallow copies that reference the same sublist object in memory. Mutating one mutates all references."
  },
  {
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
    ],
    correctAnswer: "B",
    explanation: "DFS traverses deep along paths before backtracking, matching the Last-In First-Out (LIFO) order of a Stack or recursive call stack."
  },
  {
    questionId: 10,
    category: "Recursion",
    difficulty: "Medium",
    question: "What is the return value of `mystery(4, 3)` for the recursive function below?",
    codeSnippet: "int mystery(int a, int b) {\n    if (b == 0) return 0;\n    if (b % 2 == 0) return mystery(a + a, b / 2);\n    return mystery(a + a, b / 2) + a;\n}",
    options: [
      { id: "A", text: "7" },
      { id: "B", text: "12" },
      { id: "C", text: "64" },
      { id: "D", text: "1" }
    ],
    correctAnswer: "B",
    explanation: "This computes Russian Peasant Multiplication (`a * b`). For 4 and 3: 4 * 3 = 12."
  },
  {
    questionId: 11,
    category: "JavaScript",
    difficulty: "Hard",
    question: "What is the output of the loop with `var` closures?",
    codeSnippet: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 10);\n}",
    options: [
      { id: "A", text: "0 1 2" },
      { id: "B", text: "3 3 3" },
      { id: "C", text: "undefined undefined undefined" },
      { id: "D", text: "2 2 2" }
    ],
    correctAnswer: "B",
    explanation: "`var` is function-scoped. When the callbacks fire from the macrotask queue, the loop has completed and `i` equals 3."
  },
  {
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
    ],
    correctAnswer: "C",
    explanation: "Selecting the first element on a sorted array partitions elements into unbalanced subarrays of sizes 0 and N-1, degrading recursion depth to O(N) and total operations to O(N²)."
  },
  {
    questionId: 13,
    category: "Python",
    difficulty: "Medium",
    question: "What does this Python dictionary comprehension generate?",
    codeSnippet: "d = {x: x**2 for x in (1, 2, 3) if x % 2 != 0}\nprint(sum(d.values()))",
    options: [
      { id: "A", text: "10" },
      { id: "B", text: "14" },
      { id: "C", text: "9" },
      { id: "D", text: "1" }
    ],
    correctAnswer: "A",
    explanation: "The condition filters for odd numbers: 1 (1² = 1) and 3 (3² = 9). The sum of values 1 + 9 is 10."
  },
  {
    questionId: 14,
    category: "Bitwise Logic",
    difficulty: "Easy",
    question: "What is the value of `5 ^ 5 ^ 7` in integer bitwise operations?",
    codeSnippet: "int val = 5 ^ 5 ^ 7;",
    options: [
      { id: "A", text: "0" },
      { id: "B", text: "5" },
      { id: "C", text: "7" },
      { id: "D", text: "17" }
    ],
    correctAnswer: "C",
    explanation: "XOR is associative and self-inverting: `x ^ x = 0` and `0 ^ y = y`. Thus `5 ^ 5 ^ 7 = 0 ^ 7 = 7`."
  },
  {
    questionId: 15,
    category: "C++",
    difficulty: "Medium",
    question: "What is the size of the following C++ struct on a standard 64-bit architecture with default structure alignment?",
    codeSnippet: "struct Node {\n    char c;    // 1 byte\n    int x;     // 4 bytes\n    short s;   // 2 bytes\n};",
    options: [
      { id: "A", text: "7 bytes" },
      { id: "B", text: "8 bytes" },
      { id: "C", text: "12 bytes" },
      { id: "D", text: "16 bytes" }
    ],
    correctAnswer: "C",
    explanation: "`c` takes 1 byte + 3 bytes padding (for int alignment). `x` takes 4 bytes. `s` takes 2 bytes + 2 bytes padding to match struct alignment (4 bytes). Total: 12 bytes."
  },
  {
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
    ],
    correctAnswer: "B",
    explanation: "In zero-based binary heap array indexing, left child is `2*i + 1` and right child is `2*i + 2`."
  },
  {
    questionId: 17,
    category: "JavaScript",
    difficulty: "Hard",
    question: "What evaluates when comparing an array with an empty string in JavaScript?",
    codeSnippet: "console.log([] == ![]);",
    options: [
      { id: "A", text: "true" },
      { id: "B", text: "false" },
      { id: "C", text: "TypeError" },
      { id: "D", text: "NaN" }
    ],
    correctAnswer: "A",
    explanation: "`![]` evaluates to `false`. Then `[] == false` converts `[]` to `\"\"` and both to `0`, resulting in `0 == 0` which is `true`."
  },
  {
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
    ],
    correctAnswer: "B",
    explanation: "Dijkstra iteratively extracts the unvisited vertex with minimal tentative distance using a greedy selection step."
  },
  {
    questionId: 19,
    category: "Python",
    difficulty: "Easy",
    question: "What is printed by this string slicing snippet in Python?",
    codeSnippet: "s = \"BLINDCODE\"\nprint(s[-4:])",
    options: [
      { id: "A", text: "\"BLIN\"" },
      { id: "B", text: "\"CODE\"" },
      { id: "C", text: "\"DCODE\"" },
      { id: "D", text: "\"EDOC\"" }
    ],
    correctAnswer: "B",
    explanation: "Negative slice index `-4:` extracts the last 4 characters of the string: \"CODE\"."
  },
  {
    questionId: 20,
    category: "SQL & DB Logic",
    difficulty: "Medium",
    question: "How does `COUNT(*)` differ from `COUNT(column_name)` in standard SQL?",
    codeSnippet: "SELECT COUNT(*), COUNT(bonus) FROM Employees;",
    options: [
      { id: "A", text: "They always return the exact same count" },
      { id: "B", text: "COUNT(*) counts all rows including NULLs; COUNT(column) ignores NULL values in that column" },
      { id: "C", text: "COUNT(column) counts distinct values only" },
      { id: "D", text: "COUNT(*) throws an error if table has NULL keys" }
    ],
    correctAnswer: "B",
    explanation: "`COUNT(*)` computes the total row count of the table regardless of column content, whereas `COUNT(column)` omits null values."
  },
  {
    questionId: 21,
    category: "Recursion",
    difficulty: "Hard",
    question: "What is the time complexity of the standard recursive Fibonacci without memoization?",
    codeSnippet: "int fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n}",
    options: [
      { id: "A", text: "O(N)" },
      { id: "B", text: "O(N²)" },
      { id: "C", text: "O(2ᴺ)" },
      { id: "D", text: "O(N log N)" }
    ],
    correctAnswer: "C",
    explanation: "Each invocation branches into two recursive calls, creating a recursion tree with O(2^N) total calls."
  },
  {
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
    ],
    correctAnswer: "B",
    explanation: "Overriding a virtual method in a derived class enables dynamic dispatch (runtime polymorphism) via the vtable."
  },
  {
    questionId: 23,
    category: "Bitwise Logic",
    difficulty: "Hard",
    question: "What does the expression `x ^ (x >> 1)` produce when computing on a binary integer?",
    codeSnippet: "unsigned int g = x ^ (x >> 1);",
    options: [
      { id: "A", text: "Reverses all bits of x" },
      { id: "B", text: "Converts binary to its corresponding Gray code representation" },
      { id: "C", text: "Counts total set bits" },
      { id: "D", text: "Finds the two's complement" }
    ],
    correctAnswer: "B",
    explanation: "The formula `x ^ (x >> 1)` maps any integer to its Gray code equivalent, where consecutive values differ by exactly one bit."
  },
  {
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
    ],
    correctAnswer: "B",
    explanation: "In-order traversal visits nodes in `Left <= Root <= Right` order, yielding elements in monotonically increasing sorted order."
  },
  {
    questionId: 25,
    category: "Logic & Code Reasoning",
    difficulty: "Hard",
    question: "Given `x = [1, 2, 3]` and `y = x`. Then `y += [4, 5]`. How does this differ from `y = y + [4, 5]` in Python?",
    codeSnippet: "x = [1, 2, 3]\ny = x\ny += [4, 5]",
    options: [
      { id: "A", text: "`+=` modifies the list in-place (mutates `x`), while `y = y + [...]` creates a new list leaving `x` unchanged" },
      { id: "B", text: "Both operations always leave `x` untouched" },
      { id: "C", text: "Both operations mutate `x`" },
      { id: "D", text: "`+=` raises an immutable error" }
    ],
    correctAnswer: "A",
    explanation: "`+=` on a Python list invokes `__iadd__()` which extends the list in-place (mutating `x`). `y = y + [...]` builds a new object and rebinds `y`."
  }
];

/**
 * Idempotent Production Database Seeder
 * Safe: Never deletes existing students, attempts, answers, or scores on server restart.
 * Seeds only missing core assets (Admin, Config, and 25 Questions).
 */
export const seedDatabase = async () => {
  try {
    // 1. Seed Questions (Exactly 25 questions, idempotent)
    const existingQuestionCount = await Question.countDocuments();
    if (existingQuestionCount === 0) {
      console.log('🌱 [SEED] Inserting 25 curated assessment questions into MongoDB...');
      await Question.insertMany(INITIAL_QUESTIONS);
      console.log('✅ [SEED] Exactly 25 questions successfully persisted.');
    } else {
      console.log(`ℹ️ [SEED] Questions collection verified (${existingQuestionCount} questions). Preserving database records.`);
    }

    // 2. Seed Default Admin Account (Idempotent)
    const adminEmail = 'admin@cse.techforce.edu';
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      console.log('🌱 [SEED] Initializing default Event Administrator...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Admin@2026', salt);
      await Admin.create({
        name: 'TECH FORCE Convenor',
        email: adminEmail,
        password: hashedPassword,
        role: 'EVENT_ADMIN',
      });
      console.log(`✅ [SEED] Event Admin registered (${adminEmail} / Admin@2026).`);
    } else {
      console.log(`ℹ️ [SEED] Event Admin account verified (${adminEmail}).`);
    }

    // 3. Seed Event Configuration (Idempotent)
    const eventId = 'BLIND_CODING_2026';
    const existingConfig = await EventConfig.findOne({ eventId });
    if (!existingConfig) {
      console.log('🌱 [SEED] Initializing official event parameters in MongoDB...');
      await EventConfig.create({
        eventId,
        eventTitle: 'BLIND CODING',
        quizDurationMinutes: 60,
        totalQuestions: 25,
        eventStartAt: null,
        eventEndAt: null,
        quizAvailability: 'ACTIVE',
        maxActivityWarnings: 2,
        autoSubmitOnWarningLimit: true,
        fullscreenRequired: true,
        tabSwitchMonitoring: true,
        passingPercentage: 50,
        allowAnswerChange: true,
      });
      console.log('✅ [SEED] Event configuration created in MongoDB.');
    } else {
      console.log(`ℹ️ [SEED] Event configuration active for: "${existingConfig.eventTitle}".`);
    }

    // Check student count to confirm existing student records persist
    const studentCount = await Student.countDocuments();
    const attemptCount = await QuizAttempt.countDocuments();
    console.log(`📊 [MONGODB STATUS] Verified: ${studentCount} Registered Students, ${attemptCount} Official Attempts.\n`);
  } catch (error) {
    console.error('❌ [SEED ERROR] Failed during database initialization:', error);
    throw error;
  }
};
