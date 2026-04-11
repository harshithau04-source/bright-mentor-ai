export interface CodingQuestion {
  id: number;
  title: string;
  description: string;
  category: 'dsa' | 'sql';
  difficulty: 'easy' | 'medium' | 'hard';
  starterCode: Record<string, string>;
  testCases: string;
  expectedOutput: string;
}

export const dsaQuestions: CodingQuestion[] = [
  {
    id: 1,
    title: 'Two Sum',
    description: 'Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`.\n\nExample:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]',
    category: 'dsa',
    difficulty: 'easy',
    starterCode: {
      python: 'def two_sum(nums, target):\n    # Your code here\n    pass\n\n# Test\nprint(two_sum([2,7,11,15], 9))',
      javascript: 'function twoSum(nums, target) {\n  // Your code here\n}\n\nconsole.log(twoSum([2,7,11,15], 9));',
      java: 'import java.util.*;\n\nclass Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(twoSum(new int[]{2,7,11,15}, 9)));\n    }\n}',
      cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> nums = {2,7,11,15};\n    auto result = twoSum(nums, 9);\n    for(int i : result) cout << i << " ";\n    return 0;\n}',
    },
    testCases: 'nums = [2,7,11,15], target = 9',
    expectedOutput: '[0, 1]',
  },
  {
    id: 2,
    title: 'Reverse a Linked List',
    description: 'Given the head of a singly linked list, reverse the list and return it.\n\nExample:\nInput: 1 -> 2 -> 3 -> 4 -> 5\nOutput: 5 -> 4 -> 3 -> 2 -> 1',
    category: 'dsa',
    difficulty: 'easy',
    starterCode: {
      python: 'class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_list(head):\n    # Your code here\n    pass\n\n# Test\nhead = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5)))))\nresult = reverse_list(head)\nwhile result:\n    print(result.val, end=" ")\n    result = result.next',
      javascript: 'class ListNode {\n  constructor(val = 0, next = null) {\n    this.val = val;\n    this.next = next;\n  }\n}\n\nfunction reverseList(head) {\n  // Your code here\n}\n\nconst head = new ListNode(1, new ListNode(2, new ListNode(3)));\nlet r = reverseList(head);\nlet out = [];\nwhile(r) { out.push(r.val); r = r.next; }\nconsole.log(out.join(" "));',
      java: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int v) { val = v; }\n}\n\nclass Solution {\n    public static ListNode reverseList(ListNode head) {\n        // Your code here\n        return head;\n    }\n\n    public static void main(String[] args) {\n        ListNode head = new ListNode(1);\n        head.next = new ListNode(2);\n        head.next.next = new ListNode(3);\n        ListNode r = reverseList(head);\n        while(r != null) { System.out.print(r.val + " "); r = r.next; }\n    }\n}',
      cpp: '#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int v) : val(v), next(nullptr) {}\n};\n\nListNode* reverseList(ListNode* head) {\n    // Your code here\n    return head;\n}\n\nint main() {\n    ListNode* head = new ListNode(1);\n    head->next = new ListNode(2);\n    head->next->next = new ListNode(3);\n    ListNode* r = reverseList(head);\n    while(r) { cout << r->val << " "; r = r->next; }\n    return 0;\n}',
    },
    testCases: '1 -> 2 -> 3 -> 4 -> 5',
    expectedOutput: '5 4 3 2 1',
  },
  {
    id: 3,
    title: 'Valid Parentheses',
    description: 'Given a string containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.\n\nExample:\nInput: "()[]{}"\nOutput: true',
    category: 'dsa',
    difficulty: 'easy',
    starterCode: {
      python: 'def is_valid(s):\n    # Your code here\n    pass\n\nprint(is_valid("()[]{}"))\nprint(is_valid("(]"))',
      javascript: 'function isValid(s) {\n  // Your code here\n}\n\nconsole.log(isValid("()[]{}"));\nconsole.log(isValid("(]"));',
      java: 'import java.util.*;\n\nclass Solution {\n    public static boolean isValid(String s) {\n        // Your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isValid("()[]{}"));\n        System.out.println(isValid("(]"));\n    }\n}',
      cpp: '#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nbool isValid(string s) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    cout << isValid("()[]{}") << endl;\n    cout << isValid("(]") << endl;\n    return 0;\n}',
    },
    testCases: '"()[]{}", "(]"',
    expectedOutput: 'true, false',
  },
  {
    id: 4,
    title: 'Maximum Subarray',
    description: 'Given an integer array `nums`, find the contiguous subarray with the largest sum.\n\nExample:\nInput: [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6 (subarray [4,-1,2,1])',
    category: 'dsa',
    difficulty: 'medium',
    starterCode: {
      python: 'def max_subarray(nums):\n    # Your code here\n    pass\n\nprint(max_subarray([-2,1,-3,4,-1,2,1,-5,4]))',
      javascript: 'function maxSubArray(nums) {\n  // Your code here\n}\n\nconsole.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));',
      java: 'class Solution {\n    public static int maxSubArray(int[] nums) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4}));\n    }\n}',
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> nums = {-2,1,-3,4,-1,2,1,-5,4};\n    cout << maxSubArray(nums) << endl;\n    return 0;\n}',
    },
    testCases: '[-2,1,-3,4,-1,2,1,-5,4]',
    expectedOutput: '6',
  },
  {
    id: 5,
    title: 'Binary Search',
    description: 'Implement binary search on a sorted array. Return the index of the target, or -1 if not found.\n\nExample:\nInput: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4',
    category: 'dsa',
    difficulty: 'easy',
    starterCode: {
      python: 'def binary_search(nums, target):\n    # Your code here\n    pass\n\nprint(binary_search([-1,0,3,5,9,12], 9))',
      javascript: 'function binarySearch(nums, target) {\n  // Your code here\n}\n\nconsole.log(binarySearch([-1,0,3,5,9,12], 9));',
      java: 'class Solution {\n    public static int binarySearch(int[] nums, int target) {\n        // Your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(binarySearch(new int[]{-1,0,3,5,9,12}, 9));\n    }\n}',
      cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint binarySearch(vector<int>& nums, int target) {\n    // Your code here\n    return -1;\n}\n\nint main() {\n    vector<int> nums = {-1,0,3,5,9,12};\n    cout << binarySearch(nums, 9) << endl;\n    return 0;\n}',
    },
    testCases: 'nums = [-1,0,3,5,9,12], target = 9',
    expectedOutput: '4',
  },
];

export const sqlQuestions: CodingQuestion[] = [
  {
    id: 6,
    title: 'Select All Employees',
    description: 'Write a SQL query to select all employees from the `employees` table ordered by salary descending.\n\nTable: employees(id, name, department, salary)',
    category: 'sql',
    difficulty: 'easy',
    starterCode: {
      sql: '-- Write your SQL query here\nSELECT ',
    },
    testCases: 'employees table with sample data',
    expectedOutput: 'All employees ordered by salary DESC',
  },
  {
    id: 7,
    title: 'Department Average Salary',
    description: 'Write a SQL query to find the average salary for each department. Only include departments with an average salary greater than 50000.\n\nTable: employees(id, name, department, salary)',
    category: 'sql',
    difficulty: 'medium',
    starterCode: {
      sql: '-- Write your SQL query here\nSELECT ',
    },
    testCases: 'employees table grouped by department',
    expectedOutput: 'Departments with avg salary > 50000',
  },
  {
    id: 8,
    title: 'Join Orders with Customers',
    description: 'Write a SQL query to find all orders with customer names. Include orders where the customer might not exist (LEFT JOIN).\n\nTables:\n- customers(id, name, email)\n- orders(id, customer_id, amount, order_date)',
    category: 'sql',
    difficulty: 'medium',
    starterCode: {
      sql: '-- Write your SQL query here\nSELECT ',
    },
    testCases: 'customers and orders tables',
    expectedOutput: 'Orders with customer names',
  },
  {
    id: 9,
    title: 'Second Highest Salary',
    description: 'Write a SQL query to find the second highest salary from the employees table. Return NULL if there is no second highest.\n\nTable: employees(id, name, salary)',
    category: 'sql',
    difficulty: 'medium',
    starterCode: {
      sql: '-- Write your SQL query here\nSELECT ',
    },
    testCases: 'employees table',
    expectedOutput: 'Second highest salary or NULL',
  },
  {
    id: 10,
    title: 'Duplicate Emails',
    description: 'Write a SQL query to find all duplicate email addresses in the `users` table.\n\nTable: users(id, email, name)',
    category: 'sql',
    difficulty: 'easy',
    starterCode: {
      sql: '-- Write your SQL query here\nSELECT ',
    },
    testCases: 'users table with duplicate emails',
    expectedOutput: 'Duplicate email addresses',
  },
];

export const codingLanguages = [
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'javascript', label: 'JavaScript', icon: '🟨' },
  { id: 'java', label: 'Java', icon: '☕' },
  { id: 'cpp', label: 'C++', icon: '⚡' },
  { id: 'sql', label: 'SQL', icon: '🗃️' },
] as const;

export type CodingLanguage = typeof codingLanguages[number]['id'];
