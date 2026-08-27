// 25 Curated High-Quality Production Assessment Questions (10 Python, 10 Java, 5 SQL)
// Structured Data Format: Sanitized for client-side security (answers graded on server).
export const QUIZ_QUESTIONS = [
  // ==========================================
  // PYTHON QUESTIONS (Q1 - Q10)
  // ==========================================
  {
    id: 1,
    questionId: 1,
    category: "Python",
    difficulty: "Easy",
    questionText: "What does the 'is' operator check in Python?",
    codeSnippet: null,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "Value equality" },
      { id: "B", text: "Identity (same object in memory)" },
      { id: "C", text: "Data type only" },
      { id: "D", text: "String comparison" }
    ]
  },
  {
    id: 2,
    questionId: 2,
    category: "Python",
    difficulty: "Easy",
    questionText: "Which of these will correctly create a dictionary comprehension for squares of numbers 1 to 3?",
    codeSnippet: null,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "{x: x**2 for x in range(1,4)}" },
      { id: "B", text: "[x: x**2 for x in range(1,4)]" },
      { id: "C", text: "{x, x**2 for x in range(1,4)}" },
      { id: "D", text: "(x: x**2 for x in range(1,4))" }
    ]
  },
  {
    id: 3,
    questionId: 3,
    category: "Python",
    difficulty: "Medium",
    questionText: "What is the time complexity of searching an element in a Python set using 'in'?",
    codeSnippet: null,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "O(n)" },
      { id: "B", text: "O(1) on average" },
      { id: "C", text: "O(log n)" },
      { id: "D", text: "O(n^2)" }
    ]
  },
  {
    id: 4,
    questionId: 4,
    category: "Python",
    difficulty: "Medium",
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
    ]
  },
  {
    id: 5,
    questionId: 5,
    category: "Python",
    difficulty: "Medium",
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
    ]
  },
  {
    id: 6,
    questionId: 6,
    category: "Python",
    difficulty: "Easy",
    questionText: "Which of these correctly creates a lambda function to add two numbers in Python?",
    codeSnippet: null,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "lambda x, y: x + y" },
      { id: "B", text: "lambda(x, y) = x + y" },
      { id: "C", text: "def lambda(x, y): x + y" },
      { id: "D", text: "lambda x, y -> x + y" }
    ]
  },
  {
    id: 7,
    questionId: 7,
    category: "Python",
    difficulty: "Easy",
    questionText: "What does the *args parameter allow in a function definition?",
    codeSnippet: null,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "Only one argument" },
      { id: "B", text: "A variable number of positional arguments" },
      { id: "C", text: "A variable number of keyword arguments" },
      { id: "D", text: "No arguments at all" }
    ]
  },
  {
    id: 8,
    questionId: 8,
    category: "Python",
    difficulty: "Easy",
    questionText: "Which keyword is used to create a loop that runs through a sequence or range of values?",
    codeSnippet: null,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "while" },
      { id: "B", text: "for" },
      { id: "C", text: "loop" },
      { id: "D", text: "repeat" }
    ]
  },
  {
    id: 9,
    questionId: 9,
    category: "Python",
    difficulty: "Medium",
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
    ]
  },
  {
    id: 10,
    questionId: 10,
    category: "Python",
    difficulty: "Medium",
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
    ]
  },

  // ==========================================
  // JAVA QUESTIONS (Q11 - Q20)
  // ==========================================
  {
    id: 11,
    questionId: 11,
    category: "Java",
    difficulty: "Easy",
    questionText: "What is the output of the following Java string concatenation expression?",
    codeSnippet: `System.out.println(10 + 20 + "Java" + 10 + 20);`,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "30Java1020" },
      { id: "B", text: "30Java30" },
      { id: "C", text: "1020Java1020" },
      { id: "D", text: "30Java10" }
    ]
  },
  {
    id: 12,
    questionId: 12,
    category: "Java",
    difficulty: "Easy",
    questionText: "Which of the following is NOT a primitive data type in Java?",
    codeSnippet: null,
    tableData: null,
    outputBlock: null,
    options: [
      { id: "A", text: "boolean" },
      { id: "B", text: "float" },
      { id: "C", text: "String" },
      { id: "D", text: "double" }
    ]
  },
  {
    id: 13,
    questionId: 13,
    category: "Java",
    difficulty: "Easy",
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
    ]
  },
  {
    id: 14,
    questionId: 14,
    category: "Java",
    difficulty: "Medium",
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
    ]
  },
  {
    id: 15,
    questionId: 15,
    category: "Java",
    difficulty: "Medium",
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
    ]
  },
  {
    id: 16,
    questionId: 16,
    category: "Java",
    difficulty: "Medium",
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
    ]
  },
  {
    id: 17,
    questionId: 17,
    category: "Java",
    difficulty: "Medium",
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
    ]
  },
  {
    id: 18,
    questionId: 18,
    category: "Java",
    difficulty: "Medium",
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
    ]
  },
  {
    id: 19,
    questionId: 19,
    category: "Java",
    difficulty: "Hard",
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
    ]
  },
  {
    id: 20,
    questionId: 20,
    category: "Java",
    difficulty: "Hard",
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
    ]
  },

  // ==========================================
  // SQL QUESTIONS (Q21 - Q25)
  // ==========================================
  {
    id: 21,
    questionId: 21,
    category: "SQL",
    difficulty: "Easy",
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
    ]
  },
  {
    id: 22,
    questionId: 22,
    category: "SQL",
    difficulty: "Medium",
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
    ]
  },
  {
    id: 23,
    questionId: 23,
    category: "SQL",
    difficulty: "Medium",
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
    ]
  },
  {
    id: 24,
    questionId: 24,
    category: "SQL",
    difficulty: "Medium",
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
    ]
  },
  {
    id: 25,
    questionId: 25,
    category: "SQL",
    difficulty: "Hard",
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
    ]
  }
];

export const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;
export const QUIZ_DURATION_MINUTES = 60;
export const QUIZ_DURATION_SECONDS = QUIZ_DURATION_MINUTES * 60;
