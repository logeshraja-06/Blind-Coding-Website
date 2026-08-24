import bcrypt from 'bcryptjs';
import { memoryStore } from '../config/db.js';

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
    id: 2,
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
    id: 3,
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
    ],
    correctAnswer: "C",
    explanation: "In a balanced BST, each comparison halves the search space, giving an average time complexity of O(log N)."
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
    questionId: 7,
    category: "Python",
    difficulty: "Hard",
    question: "What is the output of the following Python default argument trap?",
    codeSnippet: "def addItem(item, lst=[]):\n    lst.append(item)\n    return lst\n\nprint(addItem(1))\nprint(addItem(2))",
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
    questionId: 8,
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
    questionId: 9,
    category: "JavaScript",
    difficulty: "Hard",
    question: "What is the evaluation of `[] + {}` and `{} + []` in standard JavaScript expression contexts?",
    codeSnippet: "let val1 = [] + {};\nlet val2 = {} + [];",
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
    questionId: 10,
    category: "Recursion",
    difficulty: "Medium",
    question: "What does the following recursive function compute for inputs `mystery(3, 4)`?",
    codeSnippet: "int mystery(int a, int b) {\n    if (b == 0) return 0;\n    if (b % 2 == 0) return mystery(a + a, b / 2);\n    return mystery(a + a, b / 2) + a;\n}",
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
    questionId: 11,
    category: "C++",
    difficulty: "Medium",
    question: "What is the output of this C++ pre/post increment expression?",
    codeSnippet: "int a = 5;\nint b = ++a + a++;\ncout << a << \" \" << b;",
    options: [
      { id: "A", text: "7 12" },
      { id: "B", text: "7 11" },
      { id: "C", text: "6 12" },
      { id: "D", text: "Undefined" }
    ],
    correctAnswer: "A",
    explanation: "`++a` increments `a` to 6. `a++` provides 6 (and increments to 7). Total for `b` is 6 + 6 = 12."
  },
  {
    id: 12,
    questionId: 12,
    category: "Logic & Math",
    difficulty: "Easy",
    question: "If you have an unsorted array of size N containing integers from 1 to N+1 with exactly one missing number, what is the fastest method to find it?",
    codeSnippet: null,
    options: [
      { id: "A", text: "Sort the array and scan linearly (O(N log N))" },
      { id: "B", text: "Compare Expected Sum vs Actual Sum (O(N) time, O(1) space)" },
      { id: "C", text: "Use nested loops (O(N^2))" },
      { id: "D", text: "Insert into Hash Set (O(N) space)" }
    ],
    correctAnswer: "B",
    explanation: "The sum formula `(N+1)*(N+2)/2` minus the array sum directly yields the missing number."
  },
  {
    id: 13,
    questionId: 13,
    category: "Python",
    difficulty: "Medium",
    question: "What is the result of the following Python slicing syntax?",
    codeSnippet: "text = \"BLINDCODE\"\nprint(text[1:7:2])",
    options: [
      { id: "A", text: "\"LNC\"" },
      { id: "B", text: "\"LIC\"" },
      { id: "C", text: "\"LNO\"" },
      { id: "D", text: "\"BND\"" }
    ],
    correctAnswer: "A",
    explanation: "Indices 1 ('L'), 3 ('N'), and 5 ('C') produce 'LNC'."
  },
  {
    id: 14,
    questionId: 14,
    category: "Data Structures",
    difficulty: "Medium",
    question: "Which collision resolution technique in Hash Tables uses a linked list at each bucket?",
    codeSnippet: null,
    options: [
      { id: "A", text: "Linear Probing" },
      { id: "B", text: "Quadratic Probing" },
      { id: "C", text: "Separate Chaining" },
      { id: "D", text: "Double Hashing" }
    ],
    correctAnswer: "C",
    explanation: "Separate Chaining stores multiple keys that hash to the same bucket in a linked list."
  },
  {
    id: 15,
    questionId: 15,
    category: "JavaScript",
    difficulty: "Hard",
    question: "What does the following snippet return when invoked with `func(1)(2)(3)()`?",
    codeSnippet: "const func = a => b => b !== undefined ? func(a + b) : a;",
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "Function object" },
      { id: "C", text: "undefined" },
      { id: "D", text: "NaN" }
    ],
    correctAnswer: "A",
    explanation: "Infinite currying accumulator sums 1 + 2 + 3 = 6 when called with empty argument."
  },
  {
    id: 16,
    questionId: 16,
    category: "Algorithms",
    difficulty: "Medium",
    question: "What is the worst-case time complexity of QuickSort when the pivot chosen is always an extreme element?",
    codeSnippet: null,
    options: [
      { id: "A", text: "O(N log N)" },
      { id: "B", text: "O(N^2)" },
      { id: "C", text: "O(N)" },
      { id: "D", text: "O(log N)" }
    ],
    correctAnswer: "B",
    explanation: "Unbalanced partitioning creates recursion depth of N, yielding O(N^2) worst case."
  },
  {
    id: 17,
    questionId: 17,
    category: "C++",
    difficulty: "Medium",
    question: "What is the output of the following struct size in standard 64-bit alignment?",
    codeSnippet: "struct Example {\n    char a;\n    int b;\n    char c;\n};\ncout << sizeof(Example);",
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "8" },
      { id: "C", text: "12" },
      { id: "D", text: "16" }
    ],
    correctAnswer: "C",
    explanation: "Due to struct member alignment padding, the total size aligns to 12 bytes."
  },
  {
    id: 18,
    questionId: 18,
    category: "SQL & DB Logic",
    difficulty: "Easy",
    question: "Which clause in SQL is used to filter aggregated grouped results?",
    codeSnippet: "SELECT department, COUNT(*)\nFROM participants\nGROUP BY department\n______ COUNT(*) > 10;",
    options: [
      { id: "A", text: "WHERE" },
      { id: "B", text: "HAVING" },
      { id: "C", text: "FILTER" },
      { id: "D", text: "ORDER BY" }
    ],
    correctAnswer: "B",
    explanation: "The `HAVING` clause filters aggregated groupings."
  },
  {
    id: 19,
    questionId: 19,
    category: "Python",
    difficulty: "Easy",
    question: "What is the output of `bool('False')` and `bool([])` in Python?",
    codeSnippet: "print(bool('False'), bool([]))",
    options: [
      { id: "A", text: "False False" },
      { id: "B", text: "True True" },
      { id: "C", text: "True False" },
      { id: "D", text: "False True" }
    ],
    correctAnswer: "C",
    explanation: "Any non-empty string is `True`, empty list is `False`."
  },
  {
    id: 20,
    questionId: 20,
    category: "Bitwise Logic",
    difficulty: "Medium",
    question: "What is the value of `5 ^ 5` followed by `5 ^ 0` using the XOR operator?",
    codeSnippet: "int res1 = 5 ^ 5;\nint res2 = 5 ^ 0;",
    options: [
      { id: "A", text: "0 and 5" },
      { id: "B", text: "5 and 0" },
      { id: "C", text: "5 and 5" },
      { id: "D", text: "1 and 0" }
    ],
    correctAnswer: "A",
    explanation: "`x ^ x = 0` and `x ^ 0 = x`."
  },
  {
    id: 21,
    questionId: 21,
    category: "JavaScript",
    difficulty: "Medium",
    question: "What is the output of `0.1 + 0.2 === 0.3` in standard IEEE 754 floating point arithmetic?",
    codeSnippet: "console.log(0.1 + 0.2 === 0.3);",
    options: [
      { id: "A", text: "true" },
      { id: "B", text: "false" },
      { id: "C", text: "undefined" },
      { id: "D", text: "NaN" }
    ],
    correctAnswer: "B",
    explanation: "Binary floating point representation produces precision rounding (0.30000000000000004)."
  },
  {
    id: 22,
    questionId: 22,
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
    explanation: "The maximum element is situated among the leaf nodes, requiring an O(N) scan."
  },
  {
    id: 23,
    questionId: 23,
    category: "Object-Oriented Programming",
    difficulty: "Easy",
    question: "Which OOP concept describes wrapping data and code into a single unit while restricting direct outside access?",
    codeSnippet: null,
    options: [
      { id: "A", text: "Polymorphism" },
      { id: "B", text: "Inheritance" },
      { id: "C", text: "Encapsulation" },
      { id: "D", text: "Abstraction" }
    ],
    correctAnswer: "C",
    explanation: "Encapsulation binds data and functions together."
  },
  {
    id: 24,
    questionId: 24,
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
    explanation: "BFS explores neighbor vertices level-by-level using a FIFO Queue."
  },
  {
    id: 25,
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
    explanation: "In Python, `+=` calls `__iadd__()` mutating the list in-place, while binary `+` creates a new list object."
  }
];

export const seedDatabase = async () => {
  // Populate memoryStore with questions
  INITIAL_QUESTIONS.forEach((q) => {
    memoryStore.questions.set(String(q.questionId), q);
  });

  // Seed default admin
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('Admin@2026', salt);

  const defaultAdmin = {
    id: 'admin-001',
    name: 'TECH FORCE Convenor',
    email: 'admin@cse.techforce.edu',
    password: hashedPassword,
    role: 'SUPER_ADMIN',
  };
  memoryStore.admins.set('admin-001', defaultAdmin);

  // Seed mock participant attempts for rich Admin dashboard
  const mockStudents = [
    {
      id: 'stud-001',
      name: 'Aarav Sharma',
      registerNumber: '953710',
      department: 'Computer Science and Engineering',
      year: 'IV Year',
      class: 'IV CSE A',
      section: 'A',
      score: 25,
      percentage: 100,
      timeTakenSeconds: 2340,
      timeFormatted: '39:00',
      status: 'COMPLETED',
      submittedAt: '2026-08-24T09:45:00.000Z',
    },
    {
      id: 'stud-002',
      name: 'K. V. Hari Krishnan',
      registerNumber: '953711',
      department: 'Computer Science and Engineering',
      year: 'IV Year',
      class: 'IV CSE B',
      section: 'B',
      score: 24,
      percentage: 96,
      timeTakenSeconds: 2480,
      timeFormatted: '41:20',
      status: 'COMPLETED',
      submittedAt: '2026-08-24T09:50:00.000Z',
    },
    {
      id: 'stud-003',
      name: 'Sneha Reddy',
      registerNumber: '953712',
      department: 'Computer Science and Engineering',
      year: 'III Year',
      class: 'III CSE A',
      section: 'A',
      score: 24,
      percentage: 96,
      timeTakenSeconds: 2750,
      timeFormatted: '45:50',
      status: 'COMPLETED',
      submittedAt: '2026-08-24T09:55:00.000Z',
    },
    {
      id: 'stud-004',
      name: 'Vigneshwaran M',
      registerNumber: '953713',
      department: 'Computer Science and Engineering',
      year: 'IV Year',
      class: 'IV CSE C',
      section: 'C',
      score: 23,
      percentage: 92,
      timeTakenSeconds: 2510,
      timeFormatted: '41:50',
      status: 'COMPLETED',
      submittedAt: '2026-08-24T09:52:00.000Z',
    },
    {
      id: 'stud-005',
      name: 'Priyanka Nair',
      registerNumber: '953714',
      department: 'Computer Science and Engineering',
      year: 'II Year',
      class: 'II CSE B',
      section: 'B',
      score: 22,
      percentage: 88,
      timeTakenSeconds: 2890,
      timeFormatted: '48:10',
      status: 'COMPLETED',
      submittedAt: '2026-08-24T10:01:00.000Z',
    },
    {
      id: 'stud-006',
      name: 'Karthik S',
      registerNumber: '953715',
      department: 'Computer Science and Engineering',
      year: 'III Year',
      class: 'III CSE B',
      section: 'B',
      score: 21,
      percentage: 84,
      timeTakenSeconds: 2950,
      timeFormatted: '49:10',
      status: 'COMPLETED',
      submittedAt: '2026-08-24T10:04:00.000Z',
    },
    {
      id: 'stud-007',
      name: 'Ananya Iyer',
      registerNumber: '953716',
      department: 'Computer Science and Engineering',
      year: 'III Year',
      class: 'III CSE A',
      section: 'A',
      score: 20,
      percentage: 80,
      timeTakenSeconds: 3100,
      timeFormatted: '51:40',
      status: 'COMPLETED',
      submittedAt: '2026-08-24T10:08:00.000Z',
    },
    {
      id: 'stud-008',
      name: 'Rohan Chatterjee',
      registerNumber: '953717',
      department: 'Computer Science and Engineering',
      year: 'II Year',
      class: 'II CSE A',
      section: 'A',
      score: null,
      percentage: null,
      timeTakenSeconds: null,
      timeFormatted: '--:--',
      status: 'IN_PROGRESS',
      startedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    },
  ];

  mockStudents.forEach((st) => {
    memoryStore.students.set(st.registerNumber, {
      id: st.id,
      name: st.name,
      registerNumber: st.registerNumber,
      department: st.department,
      year: st.year,
      class: st.class,
      section: st.section,
    });

    memoryStore.quizAttempts.set(st.registerNumber, {
      id: `attempt-${st.registerNumber}`,
      studentId: st.id,
      studentName: st.name,
      registerNumber: st.registerNumber,
      department: st.department,
      year: st.year,
      class: st.class,
      section: st.section,
      answers: {},
      startedAt: st.startedAt || new Date(Date.now() - 3600 * 1000).toISOString(),
      submittedAt: st.submittedAt || null,
      timeTakenSeconds: st.timeTakenSeconds,
      timeFormatted: st.timeFormatted,
      score: st.score,
      totalQuestions: 25,
      percentage: st.percentage,
      status: st.status,
      tabSwitchCount: st.status === 'COMPLETED' ? (Math.random() > 0.5 ? 1 : 0) : 0,
      fullscreenExitCount: 0,
      totalWarnings: st.status === 'COMPLETED' ? (Math.random() > 0.5 ? 1 : 0) : 0,
      activityLogs: [
        {
          type: 'QUIZ_STARTED',
          timestamp: st.startedAt || new Date(Date.now() - 3600 * 1000).toISOString(),
          details: 'Quiz session initiated',
        },
        ...(st.status === 'COMPLETED'
          ? [
              {
                type: 'QUIZ_SUBMITTED',
                timestamp: st.submittedAt || new Date().toISOString(),
                details: 'Assessment finalized and submitted',
              },
            ]
          : []),
      ],
    });
  });

  console.log('🌱 [SEED] 25 Questions, Default Admin (admin@cse.techforce.edu / Admin@2026), and Initial Records Initialized.');
};
