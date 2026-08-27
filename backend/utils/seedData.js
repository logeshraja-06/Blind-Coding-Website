import bcrypt from 'bcryptjs';
import { Question } from '../models/Question.js';
import { Admin } from '../models/Admin.js';
import { EventConfig } from '../models/EventConfig.js';
import { Student } from '../models/Student.js';
import { QuizAttempt } from '../models/QuizAttempt.js';

export const INITIAL_QUESTIONS = [
  // ==========================================
  // PYTHON QUESTIONS (10 Questions: Q1 - Q10)
  // ==========================================
  {
    questionId: 1,
    category: "Python",
    difficulty: "Easy",
    question: "What does the 'is' operator check in Python?",
    questionText: "What does the 'is' operator check in Python?",
    codeSnippet: null,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "Value equality" },
      { id: "B", text: "Identity (same object in memory)" },
      { id: "C", text: "Data type only" },
      { id: "D", text: "String comparison" }
    ],
    correctAnswer: "B",
    explanation: "The `is` operator tests object identity by comparing memory addresses (id), whereas `==` checks value equality."
  },
  {
    questionId: 2,
    category: "Python",
    difficulty: "Easy",
    question: "Which of these will correctly create a dictionary comprehension for squares of numbers 1 to 3?",
    questionText: "Which of these will correctly create a dictionary comprehension for squares of numbers 1 to 3?",
    codeSnippet: null,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "{x: x**2 for x in range(1,4)}" },
      { id: "B", text: "[x: x**2 for x in range(1,4)]" },
      { id: "C", text: "{x, x**2 for x in range(1,4)}" },
      { id: "D", text: "(x: x**2 for x in range(1,4))" }
    ],
    correctAnswer: "A",
    explanation: "Dictionary comprehension syntax uses curly braces `{key: value for item in iterable}`."
  },
  {
    questionId: 3,
    category: "Python",
    difficulty: "Medium",
    question: "What is the time complexity of searching an element in a Python set using 'in'?",
    questionText: "What is the time complexity of searching an element in a Python set using 'in'?",
    codeSnippet: null,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "O(n)" },
      { id: "B", text: "O(1) on average" },
      { id: "C", text: "O(log n)" },
      { id: "D", text: "O(n^2)" }
    ],
    correctAnswer: "B",
    explanation: "Python sets are implemented as hash tables, providing O(1) average time complexity for membership tests (`in`)."
  },
  {
    questionId: 4,
    category: "Python",
    difficulty: "Medium",
    question: "What will be the output of the following Python function with a mutable default parameter?",
    questionText: "What will be the output of the following Python function with a mutable default parameter?",
    codeSnippet: `def func(a, b=[]):
    b.append(a)
    return b

print(func(1))
print(func(2))`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "[1] then [2]" },
      { id: "B", text: "[1] then [1, 2]" },
      { id: "C", text: "[1, 2] then [1, 2]" },
      { id: "D", text: "Error" }
    ],
    correctAnswer: "B",
    explanation: "Default arguments in Python are evaluated once at function definition. The list `b` persists and mutates across calls."
  },
  {
    questionId: 5,
    category: "Python",
    difficulty: "Medium",
    question: "What is the output of the following list slicing and appending code?",
    questionText: "What is the output of the following list slicing and appending code?",
    codeSnippet: `a = [1, 2, 3]
b = a[:]
b.append(4)
print(a)`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "[1, 2, 3, 4]" },
      { id: "B", text: "[1, 2, 3]" },
      { id: "C", text: "Error" },
      { id: "D", text: "[4]" }
    ],
    correctAnswer: "B",
    explanation: "`a[:]` creates a shallow copy of list `a`. Modifying `b` does not mutate the original list `a`."
  },
  {
    questionId: 6,
    category: "Python",
    difficulty: "Easy",
    question: "Which of these correctly creates a lambda function to add two numbers in Python?",
    questionText: "Which of these correctly creates a lambda function to add two numbers in Python?",
    codeSnippet: null,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "lambda x, y: x + y" },
      { id: "B", text: "lambda(x, y) = x + y" },
      { id: "C", text: "def lambda(x, y): x + y" },
      { id: "D", text: "lambda x, y -> x + y" }
    ],
    correctAnswer: "A",
    explanation: "Lambda functions in Python use the syntax `lambda arguments: expression`."
  },
  {
    questionId: 7,
    category: "Python",
    difficulty: "Easy",
    question: "What does the *args parameter allow in a function definition?",
    questionText: "What does the *args parameter allow in a function definition?",
    codeSnippet: null,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "Only one argument" },
      { id: "B", text: "A variable number of positional arguments" },
      { id: "C", text: "A variable number of keyword arguments" },
      { id: "D", text: "No arguments at all" }
    ],
    correctAnswer: "B",
    explanation: "`*args` allows a function to accept any number of positional arguments as a tuple."
  },
  {
    questionId: 8,
    category: "Python",
    difficulty: "Easy",
    question: "Which keyword is used to create a loop that runs through a sequence or range of values?",
    questionText: "Which keyword is used to create a loop that runs through a sequence or range of values?",
    codeSnippet: null,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "while" },
      { id: "B", text: "for" },
      { id: "C", text: "loop" },
      { id: "D", text: "repeat" }
    ],
    correctAnswer: "B",
    explanation: "The `for` loop in Python iterates over elements of a sequence or `range()`."
  },
  {
    questionId: 9,
    category: "Python",
    difficulty: "Medium",
    question: "What is the output of the following class inheritance snippet?",
    questionText: "What is the output of the following class inheritance snippet?",
    codeSnippet: `class A:
    def __init__(self):
        self.x = 1

class B(A):
    def __init__(self):
        super().__init__()
        self.x = 2

obj = B()
print(obj.x)`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "2" },
      { id: "C", text: "Error" },
      { id: "D", text: "None" }
    ],
    correctAnswer: "B",
    explanation: "`super().__init__()` sets `x = 1`, and then `self.x = 2` reassigns `x` to 2 in `B`'s initializer."
  },
  {
    questionId: 10,
    category: "Python",
    difficulty: "Medium",
    question: "What is the output of the following exception handling block?",
    questionText: "What is the output of the following exception handling block?",
    codeSnippet: `try:
    x = 1 / 0
except ZeroDivisionError:
    print("A")
except Exception:
    print("B")
finally:
    print("C")`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "A then C" },
      { id: "B", text: "B then C" },
      { id: "C", text: "A only" },
      { id: "D", text: "C only" }
    ],
    correctAnswer: "A",
    explanation: "`ZeroDivisionError` catches division by zero printing 'A', and `finally` executes unconditionally printing 'C'."
  },

  // ==========================================
  // JAVA QUESTIONS (10 Questions: Q11 - Q20)
  // ==========================================
  {
    questionId: 11,
    category: "Java",
    difficulty: "Easy",
    question: "What is the output of the following Java string concatenation expression?",
    questionText: "What is the output of the following Java string concatenation expression?",
    codeSnippet: `System.out.println(10 + 20 + "Java" + 10 + 20);`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "30Java1020" },
      { id: "B", text: "30Java30" },
      { id: "C", text: "1020Java1020" },
      { id: "D", text: "30Java10" }
    ],
    correctAnswer: "A",
    explanation: "Left-to-right evaluation: `10 + 20` yields integer `30`, concatenated with `\"Java\"` yields `\"30Java\"`, and subsequent additions become string concatenations."
  },
  {
    questionId: 12,
    category: "Java",
    difficulty: "Easy",
    question: "Which of the following is NOT a primitive data type in Java?",
    questionText: "Which of the following is NOT a primitive data type in Java?",
    codeSnippet: null,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "boolean" },
      { id: "B", text: "float" },
      { id: "C", text: "String" },
      { id: "D", text: "double" }
    ],
    correctAnswer: "C",
    explanation: "`String` is a reference class type in Java, whereas `boolean`, `float`, and `double` are primitive types."
  },
  {
    questionId: 13,
    category: "Java",
    difficulty: "Easy",
    question: "What will be the printed output of integer division and remainder in Java?",
    questionText: "What will be the printed output of integer division and remainder in Java?",
    codeSnippet: `int a = 17;
int b = 5;
System.out.println((a / b) + " " + (a % b));`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "3 2" },
      { id: "B", text: "3.4 2" },
      { id: "C", text: "3 0" },
      { id: "D", text: "3.4 0" }
    ],
    correctAnswer: "A",
    explanation: "`17 / 5` truncates to integer `3`, and `17 % 5` yields remainder `2`."
  },
  {
    questionId: 14,
    category: "Java",
    difficulty: "Medium",
    question: "What is the output when an array reference is passed to a method in Java?",
    questionText: "What is the output when an array reference is passed to a method in Java?",
    codeSnippet: `public class Test {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};
        change(arr);
        System.out.println(arr[0]);
    }
    static void change(int[] a) {
        a[0] = 99;
    }
}`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "99" },
      { id: "C", text: "0" },
      { id: "D", text: "Compilation Error" }
    ],
    correctAnswer: "B",
    explanation: "Java passes object references by value. The method receives a copy of the array reference, allowing element mutations to affect the original array."
  },
  {
    questionId: 15,
    category: "Java",
    difficulty: "Medium",
    question: "What is printed when comparing String objects created with literal vs `new`?",
    questionText: "What is printed when comparing String objects created with literal vs `new`?",
    codeSnippet: `String s1 = "Java";
String s2 = new String("Java");
System.out.println((s1 == s2) + " " + s1.equals(s2));`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "true true" },
      { id: "B", text: "false true" },
      { id: "C", text: "true false" },
      { id: "D", text: "false false" }
    ],
    correctAnswer: "B",
    explanation: "`s1 == s2` evaluates to `false` because they reference different heap objects. `s1.equals(s2)` evaluates to `true` because string content is identical."
  },
  {
    questionId: 16,
    category: "Java",
    difficulty: "Medium",
    question: "Predict the output of the following Java switch statement without break statements:",
    questionText: "Predict the output of the following Java switch statement without break statements:",
    codeSnippet: `int x = 2;
switch(x) {
    case 1: System.out.print("1 ");
    case 2: System.out.print("2 ");
    case 3: System.out.print("3 ");
    default: System.out.print("D");
}`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "2 " },
      { id: "B", text: "2 3 D" },
      { id: "C", text: "1 2 3 D" },
      { id: "D", text: "D" }
    ],
    correctAnswer: "B",
    explanation: "Because there are no `break` statements, execution falls through starting from `case 2` through `case 3` and `default`."
  },
  {
    questionId: 17,
    category: "Java",
    difficulty: "Medium",
    question: "What will be the output of constructor execution in Java inheritance?",
    questionText: "What will be the output of constructor execution in Java inheritance?",
    codeSnippet: `class Parent {
    Parent() { System.out.print("P "); }
}
class Child extends Parent {
    Child() { System.out.print("C "); }
}
public class Test {
    public static void main(String[] args) {
        Child obj = new Child();
    }
}`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "C " },
      { id: "B", text: "P C " },
      { id: "C", text: "C P " },
      { id: "D", text: "P " }
    ],
    correctAnswer: "B",
    explanation: "The child constructor automatically invokes `super()` first, executing the `Parent` constructor before `Child`."
  },
  {
    questionId: 18,
    category: "Java",
    difficulty: "Medium",
    question: "What is printed when exception handling with `finally` is executed?",
    questionText: "What is printed when exception handling with `finally` is executed?",
    codeSnippet: `try {
    int data = 25 / 0;
} catch (ArithmeticException e) {
    System.out.print("Catch ");
} finally {
    System.out.print("Finally ");
}`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "Catch " },
      { id: "B", text: "Finally " },
      { id: "C", text: "Catch Finally " },
      { id: "D", text: "ArithmeticException Error" }
    ],
    correctAnswer: "C",
    explanation: "Division by zero throws `ArithmeticException` which is caught ('Catch '), and `finally` executes unconditionally ('Finally ')."
  },
  {
    questionId: 19,
    category: "Java",
    difficulty: "Hard",
    question: "What is the printed number pattern output of the following nested loop code in Java?",
    questionText: "What is the printed number pattern output of the following nested loop code in Java?",
    codeSnippet: `int n = 4;
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print(j);
    }
    System.out.println();
}`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "1\n12\n123\n1234" },
      { id: "B", text: "1234\n123\n12\n1" },
      { id: "C", text: "1\n22\n333\n4444" },
      { id: "D", text: "4321\n321\n21\n1" }
    ],
    correctAnswer: "A",
    explanation: "Row 1 prints 1, Row 2 prints 12, Row 3 prints 123, Row 4 prints 1234."
  },
  {
    questionId: 20,
    category: "Java",
    difficulty: "Hard",
    question: "What is the printed star pattern output of the following nested loop code in Java?",
    questionText: "What is the printed star pattern output of the following nested loop code in Java?",
    codeSnippet: `int n = 4;
for (int i = n; i >= 1; i--) {
    for (int j = 1; j <= i; j++) {
        System.out.print("*");
    }
    System.out.println();
}`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "****\n***\n**\n*" },
      { id: "B", text: "*\n**\n***\n****" },
      { id: "C", text: "****\n****\n****\n****" },
      { id: "D", text: "*\n**\n*\n**" }
    ],
    correctAnswer: "A",
    explanation: "The outer loop runs `i = 4, 3, 2, 1`. The inner loop prints `i` stars per line, producing a descending triangle pattern."
  },

  // ==========================================
  // SQL QUESTIONS (5 Questions: Q21 - Q25)
  // ==========================================
  {
    questionId: 21,
    category: "SQL",
    difficulty: "Easy",
    question: "Given the following Employees table, what is the output of the query below?",
    questionText: "Given the following Employees table, what is the output of the query below?",
    tableName: "Employees",
    tableData: {
      headers: ["ID", "Name", "Salary"],
      rows: [
        [1, "Alice", 70000],
        [2, "Bob", 50000],
        [3, "Charlie", null]
      ]
    },
    codeSnippet: `SELECT COUNT(Salary) FROM Employees;`,
    outputBlock: null,
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "2" },
      { id: "C", text: "NULL" },
      { id: "D", text: "0" }
    ],
    correctAnswer: "B",
    explanation: "`COUNT(column_name)` ignores NULL values in that column. Since Charlie's salary is NULL, the result is 2."
  },
  {
    questionId: 22,
    category: "SQL",
    difficulty: "Medium",
    question: "Given the following Orders table, which SQL query correctly calculates total order amount for customers with a total greater than 200?",
    questionText: "Given the following Orders table, which SQL query correctly calculates total order amount for customers with a total greater than 200?",
    tableName: "Orders",
    tableData: {
      headers: ["ID", "CustomerID", "Amount"],
      rows: [
        [101, "C1", 150],
        [102, "C2", 300],
        [103, "C1", 250],
        [104, "C3", 100]
      ]
    },
    codeSnippet: null,
    outputBlock: null,
    options: [
      { id: "A", text: "SELECT CustomerID, SUM(Amount) FROM Orders WHERE SUM(Amount) > 200 GROUP BY CustomerID;" },
      { id: "B", text: "SELECT CustomerID, Amount FROM Orders WHERE Amount > 200;" },
      { id: "C", text: "SELECT CustomerID, SUM(Amount)\nFROM Orders\nGROUP BY CustomerID\nHAVING SUM(Amount) > 200;" },
      { id: "D", text: "SELECT CustomerID, SUM(Amount) FROM Orders HAVING SUM(Amount) > 200;" }
    ],
    correctAnswer: "C",
    explanation: "Filtering aggregate function results like `SUM(Amount)` requires a `HAVING` clause paired with `GROUP BY`."
  },
  {
    questionId: 23,
    category: "SQL",
    difficulty: "Medium",
    question: "What is the difference between `UNION` and `UNION ALL` in SQL?",
    questionText: "What is the difference between `UNION` and `UNION ALL` in SQL?",
    codeSnippet: `SELECT City FROM Customers
UNION
SELECT City FROM Suppliers;`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "UNION removes duplicate rows, whereas UNION ALL includes all duplicate rows." },
      { id: "B", text: "UNION ALL removes duplicates, whereas UNION keeps duplicates." },
      { id: "C", text: "UNION only works on single tables." },
      { id: "D", text: "There is no difference." }
    ],
    correctAnswer: "A",
    explanation: "`UNION` eliminates duplicate records from the final combined result set, whereas `UNION ALL` preserves duplicates."
  },
  {
    questionId: 24,
    category: "SQL",
    difficulty: "Medium",
    question: "Given `Students` (ID, Name, DeptID) and `Departments` (DeptID, DeptName), which JOIN type returns all student records even if they have no matching department in `Departments`?",
    questionText: "Given `Students` (ID, Name, DeptID) and `Departments` (DeptID, DeptName), which JOIN type returns all student records even if they have no matching department in `Departments`?",
    codeSnippet: `SELECT s.Name, d.DeptName
FROM Students s
LEFT JOIN Departments d ON s.DeptID = d.DeptID;`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "LEFT JOIN (or LEFT OUTER JOIN)" },
      { id: "B", text: "INNER JOIN" },
      { id: "C", text: "RIGHT JOIN" },
      { id: "D", text: "FULL JOIN" }
    ],
    correctAnswer: "A",
    explanation: "A `LEFT JOIN` returns all records from the left table (`Students`), filling unmatched right table columns with NULL."
  },
  {
    questionId: 25,
    category: "SQL",
    difficulty: "Hard",
    question: "Given the following Scores table, what rank is returned for ID 3 (Score 90) by the query below?",
    questionText: "Given the following Scores table, what rank is returned for ID 3 (Score 90) by the query below?",
    tableName: "Scores",
    tableData: {
      headers: ["ID", "Score"],
      rows: [
        [1, 100],
        [2, 90],
        [3, 90],
        [4, 80]
      ]
    },
    codeSnippet: `SELECT ID, Score, DENSE_RANK() OVER (ORDER BY Score DESC) AS rk 
FROM Scores;`,
    outputBlock: null,
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "1" },
      { id: "C", text: "2" },
      { id: "D", text: "4" }
    ],
    correctAnswer: "C",
    explanation: "`DENSE_RANK()` assigns rank 1 to 100, rank 2 to both 90s, and rank 3 to 80 without skipping rank numbers."
  }
];

/**
 * Production Database Seeder
 * Upserts the official 25 structured questions into MongoDB cleanly.
 */
export const seedDatabase = async () => {
  try {
    console.log('🌱 [SEED] Initializing 25 structured production questions in MongoDB...');
    await Question.deleteMany({});
    await Question.insertMany(INITIAL_QUESTIONS);
    console.log('✅ [SEED] Exactly 25 structured questions (10 Python, 10 Java, 5 SQL) successfully persisted.');

    // Seed Default Admin Account (Idempotent)
    const adminEmail = (process.env.DEFAULT_ADMIN_EMAIL || 'admin@cse.techforce.edu').trim().toLowerCase();
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@2026';
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      console.log('🌱 [SEED] Initializing default Event Administrator...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      await Admin.create({
        name: 'TECH FORCE Convenor',
        email: adminEmail,
        password: hashedPassword,
        role: 'EVENT_ADMIN',
      });
      console.log(`✅ [SEED] Event Admin registered (${adminEmail}).`);
    }

    // Seed Event Configuration (Idempotent)
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
    }

    const studentCount = await Student.countDocuments();
    const attemptCount = await QuizAttempt.countDocuments();
    console.log(`📊 [MONGODB STATUS] Verified: ${studentCount} Registered Students, ${attemptCount} Official Attempts.\n`);
  } catch (error) {
    console.error('❌ [SEED ERROR] Failed during database initialization:', error);
    throw error;
  }
};
