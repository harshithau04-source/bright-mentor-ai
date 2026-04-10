export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  topic: string;
}

export const aptitudeQuestions: Question[] = [
  {
    id: 1,
    question: "A train running at 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    options: ["120 m", "150 m", "180 m", "200 m"],
    answer: "150 m",
    explanation: "Speed = 60 × 5/18 = 50/3 m/s. Length = Speed × Time = 50/3 × 9 = 150 m.",
    topic: "Speed & Distance"
  },
  {
    id: 2,
    question: "If the cost price of 12 items equals the selling price of 10 items, what is the profit percentage?",
    options: ["10%", "15%", "20%", "25%"],
    answer: "20%",
    explanation: "Let CP of each item = 1. Total CP = 12. SP of 10 items = 12. SP per item = 1.2. Profit = 20%.",
    topic: "Profit & Loss"
  },
  {
    id: 3,
    question: "What is the next number in the series: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    answer: "42",
    explanation: "Differences: 4, 6, 8, 10, 12. Next number = 30 + 12 = 42.",
    topic: "Number Series"
  },
  {
    id: 4,
    question: "A can do a work in 15 days and B in 20 days. If they work together for 4 days, what fraction of work is left?",
    options: ["7/15", "8/15", "1/3", "11/15"],
    answer: "8/15",
    explanation: "Combined work per day = 1/15 + 1/20 = 7/60. Work in 4 days = 28/60 = 7/15. Left = 1 - 7/15 = 8/15.",
    topic: "Time & Work"
  },
  {
    id: 5,
    question: "The average of 5 numbers is 27. If one number is excluded, the average becomes 25. What is the excluded number?",
    options: ["30", "33", "35", "37"],
    answer: "35",
    explanation: "Total = 5 × 27 = 135. After exclusion = 4 × 25 = 100. Excluded = 135 - 100 = 35.",
    topic: "Averages"
  },
  {
    id: 6,
    question: "What is 15% of 15% of 1500?",
    options: ["22.5", "33.75", "45", "56.25"],
    answer: "33.75",
    explanation: "15% of 1500 = 225. 15% of 225 = 33.75.",
    topic: "Percentages"
  },
  {
    id: 7,
    question: "In how many ways can 5 people be seated in a row?",
    options: ["25", "60", "120", "720"],
    answer: "120",
    explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120.",
    topic: "Permutations"
  },
  {
    id: 8,
    question: "If log₂(x) = 5, what is x?",
    options: ["10", "25", "32", "64"],
    answer: "32",
    explanation: "log₂(x) = 5 means 2⁵ = x = 32.",
    topic: "Logarithms"
  },
  {
    id: 9,
    question: "A cistern can be filled by pipe A in 12 hours and emptied by pipe B in 15 hours. How long to fill if both are open?",
    options: ["40 hrs", "50 hrs", "60 hrs", "72 hrs"],
    answer: "60 hrs",
    explanation: "Net fill rate = 1/12 - 1/15 = 1/60. Time = 60 hours.",
    topic: "Pipes & Cisterns"
  },
  {
    id: 10,
    question: "The ratio of ages of A and B is 4:3. After 6 years, the ratio becomes 26:21. What is A's present age?",
    options: ["32", "36", "40", "48"],
    answer: "40",
    explanation: "Let ages be 4x and 3x. (4x+6)/(3x+6) = 26/21. Solving: x = 10. A's age = 40.",
    topic: "Ages"
  },
  {
    id: 11,
    question: "A boat can travel 20 km upstream in 4 hours and 20 km downstream in 2 hours. What is the speed of the current?",
    options: ["2 km/hr", "2.5 km/hr", "3 km/hr", "3.5 km/hr"],
    answer: "2.5 km/hr",
    explanation: "Upstream speed = 5 km/hr. Downstream speed = 10 km/hr. Current = (10-5)/2 = 2.5 km/hr.",
    topic: "Boats & Streams"
  },
  {
    id: 12,
    question: "What is the probability of getting at least one head when tossing 3 coins?",
    options: ["1/8", "3/8", "5/8", "7/8"],
    answer: "7/8",
    explanation: "P(no head) = (1/2)³ = 1/8. P(at least one head) = 1 - 1/8 = 7/8.",
    topic: "Probability"
  },
  {
    id: 13,
    question: "If a number is increased by 20% and then decreased by 20%, what is the net change?",
    options: ["-4%", "-2%", "0%", "4%"],
    answer: "-4%",
    explanation: "Net change = -20×20/100 = -4%. This is the successive percentage change formula.",
    topic: "Percentages"
  },
  {
    id: 14,
    question: "The simple interest on ₹5000 at 8% per annum for 3 years is:",
    options: ["₹1000", "₹1100", "₹1200", "₹1300"],
    answer: "₹1200",
    explanation: "SI = PRT/100 = 5000 × 8 × 3 / 100 = ₹1200.",
    topic: "Simple Interest"
  },
  {
    id: 15,
    question: "How many diagonals does a hexagon have?",
    options: ["6", "7", "8", "9"],
    answer: "9",
    explanation: "Diagonals = n(n-3)/2 = 6(6-3)/2 = 9.",
    topic: "Geometry"
  },
  {
    id: 16,
    question: "If x + 1/x = 5, what is x² + 1/x²?",
    options: ["21", "23", "25", "27"],
    answer: "23",
    explanation: "(x + 1/x)² = x² + 2 + 1/x². So x² + 1/x² = 25 - 2 = 23.",
    topic: "Algebra"
  },
  {
    id: 17,
    question: "A shopkeeper marks goods 30% above cost price and gives 10% discount. What is the profit%?",
    options: ["15%", "17%", "20%", "22%"],
    answer: "17%",
    explanation: "Let CP = 100. MP = 130. SP = 130 × 0.9 = 117. Profit = 17%.",
    topic: "Profit & Loss"
  },
  {
    id: 18,
    question: "The HCF of 36, 48, and 60 is:",
    options: ["6", "8", "12", "24"],
    answer: "12",
    explanation: "36 = 2²×3², 48 = 2⁴×3, 60 = 2²×3×5. HCF = 2²×3 = 12.",
    topic: "HCF & LCM"
  },
  {
    id: 19,
    question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
    options: ["0°", "7.5°", "15°", "22.5°"],
    answer: "7.5°",
    explanation: "At 3:15, minute hand at 90°. Hour hand at 90° + 15×0.5° = 97.5°. Angle = 7.5°.",
    topic: "Clocks"
  },
  {
    id: 20,
    question: "In a class of 50 students, 30 play cricket, 25 play football, and 10 play both. How many play neither?",
    options: ["3", "5", "7", "10"],
    answer: "5",
    explanation: "Students playing at least one = 30 + 25 - 10 = 45. Neither = 50 - 45 = 5.",
    topic: "Sets"
  }
];

export const technicalQuestions: Question[] = [
  {
    id: 1,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: "O(log n)",
    explanation: "Binary search halves the search space each step, giving logarithmic time complexity.",
    topic: "Algorithms"
  },
  {
    id: 2,
    question: "Which data structure uses LIFO ordering?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    answer: "Stack",
    explanation: "Stack follows Last In First Out (LIFO) principle.",
    topic: "Data Structures"
  },
  {
    id: 3,
    question: "What does SQL stand for?",
    options: ["Strong Query Language", "Structured Query Language", "Simple Query Logic", "Standard Query Language"],
    answer: "Structured Query Language",
    explanation: "SQL stands for Structured Query Language, used for managing relational databases.",
    topic: "Databases"
  },
  {
    id: 4,
    question: "Which HTTP method is idempotent?",
    options: ["POST", "PATCH", "PUT", "None of these"],
    answer: "PUT",
    explanation: "PUT is idempotent — making the same request multiple times produces the same result.",
    topic: "Web Development"
  },
  {
    id: 5,
    question: "What is polymorphism in OOP?",
    options: ["Multiple inheritance", "Same interface, different implementations", "Data hiding", "Code reuse"],
    answer: "Same interface, different implementations",
    explanation: "Polymorphism allows objects of different classes to be treated through the same interface.",
    topic: "OOP Concepts"
  },
  {
    id: 6,
    question: "Which sorting algorithm has the best average-case time complexity?",
    options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
    answer: "Merge Sort",
    explanation: "Merge Sort has O(n log n) average and worst case, better than O(n²) of others listed.",
    topic: "Algorithms"
  },
  {
    id: 7,
    question: "What is a deadlock?",
    options: ["A process that runs forever", "Two processes waiting for each other indefinitely", "Memory overflow", "Stack overflow"],
    answer: "Two processes waiting for each other indefinitely",
    explanation: "Deadlock occurs when two or more processes are blocked, each waiting for the other to release resources.",
    topic: "Operating Systems"
  },
  {
    id: 8,
    question: "What is the purpose of an index in a database?",
    options: ["Store data", "Speed up queries", "Enforce constraints", "Backup data"],
    answer: "Speed up queries",
    explanation: "Indexes create a data structure that allows the database to find rows faster without scanning the full table.",
    topic: "Databases"
  },
  {
    id: 9,
    question: "In JavaScript, what does 'typeof null' return?",
    options: ["'null'", "'undefined'", "'object'", "'boolean'"],
    answer: "'object'",
    explanation: "This is a well-known JavaScript bug. typeof null returns 'object' due to how JS was originally implemented.",
    topic: "JavaScript"
  },
  {
    id: 10,
    question: "What is the difference between TCP and UDP?",
    options: ["TCP is faster", "UDP guarantees delivery", "TCP is connection-oriented, UDP is connectionless", "No difference"],
    answer: "TCP is connection-oriented, UDP is connectionless",
    explanation: "TCP establishes a connection and guarantees delivery. UDP sends data without connection setup for speed.",
    topic: "Networking"
  },
  { id: 11, question: "What is a closure in JavaScript?", options: ["A function with no parameters", "A function that remembers its lexical scope", "A class method", "An async function"], answer: "A function that remembers its lexical scope", explanation: "A closure is a function that has access to variables from its outer (enclosing) function scope even after the outer function has returned.", topic: "JavaScript" },
  { id: 12, question: "What does ACID stand for in databases?", options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Integration, Data", "Automated, Centralized, Indexed, Distributed", "None of these"], answer: "Atomicity, Consistency, Isolation, Durability", explanation: "ACID properties ensure reliable database transactions.", topic: "Databases" },
  { id: 13, question: "What is the space complexity of a recursive Fibonacci function?", options: ["O(1)", "O(n)", "O(n²)", "O(2ⁿ)"], answer: "O(n)", explanation: "The maximum depth of the recursion stack is n, so space complexity is O(n).", topic: "Algorithms" },
  { id: 14, question: "What is REST?", options: ["A database type", "A programming language", "An architectural style for APIs", "A testing framework"], answer: "An architectural style for APIs", explanation: "REST (Representational State Transfer) is an architectural style using HTTP methods for web services.", topic: "Web Development" },
  { id: 15, question: "What is the purpose of a virtual function in C++?", options: ["Memory management", "Runtime polymorphism", "Compile-time optimization", "Error handling"], answer: "Runtime polymorphism", explanation: "Virtual functions enable dynamic dispatch, allowing the correct function to be called based on the actual object type at runtime.", topic: "OOP Concepts" },
  { id: 16, question: "What is a hash collision?", options: ["Two keys mapping to the same index", "A database error", "Memory leak", "Stack overflow"], answer: "Two keys mapping to the same index", explanation: "A hash collision occurs when two different keys produce the same hash value, mapping to the same bucket.", topic: "Data Structures" },
  { id: 17, question: "What is the difference between '==' and '===' in JavaScript?", options: ["No difference", "'===' checks type too", "'==' is stricter", "'===' is deprecated"], answer: "'===' checks type too", explanation: "'==' performs type coercion before comparison, while '===' checks both value and type (strict equality).", topic: "JavaScript" },
  { id: 18, question: "What is normalization in databases?", options: ["Making data faster", "Organizing data to reduce redundancy", "Encrypting data", "Compressing data"], answer: "Organizing data to reduce redundancy", explanation: "Normalization structures a database to minimize data redundancy and dependency through division into tables.", topic: "Databases" },
  { id: 19, question: "What is Big-O notation used for?", options: ["Measuring exact runtime", "Describing upper bound of algorithm growth", "Counting lines of code", "Memory allocation"], answer: "Describing upper bound of algorithm growth", explanation: "Big-O describes the worst-case growth rate of an algorithm as input size increases.", topic: "Algorithms" },
  { id: 20, question: "What is Docker?", options: ["A programming language", "A containerization platform", "A database", "A web framework"], answer: "A containerization platform", explanation: "Docker packages applications and dependencies into lightweight containers that run consistently across environments.", topic: "DevOps" }
];

export const hrQuestions: Question[] = [
  { id: 1, question: "Tell me about yourself. Which approach is best?", options: ["Share your life story", "Give a structured professional summary", "Talk about hobbies only", "Ask them to read your resume"], answer: "Give a structured professional summary", explanation: "A concise, structured response covering education, experience, and career goals is most effective.", topic: "Introduction" },
  { id: 2, question: "What is the best way to answer 'What is your greatest weakness?'", options: ["Say you have none", "Mention a real weakness with improvement steps", "Turn a strength into a weakness", "Refuse to answer"], answer: "Mention a real weakness with improvement steps", explanation: "Being honest about a genuine weakness while showing self-awareness and improvement efforts demonstrates maturity.", topic: "Self-Assessment" },
  { id: 3, question: "When asked 'Where do you see yourself in 5 years?', you should:", options: ["Say you want the interviewer's job", "Show ambition aligned with the company", "Say you don't plan that far", "Mention starting your own company"], answer: "Show ambition aligned with the company", explanation: "Align your career goals with the company's growth trajectory to show long-term commitment.", topic: "Career Goals" },
  { id: 4, question: "How should you handle a question about salary expectations?", options: ["Demand the highest possible", "Research market rates and give a range", "Say any amount is fine", "Refuse to discuss"], answer: "Research market rates and give a range", explanation: "Providing a researched salary range shows preparation and professionalism while leaving room for negotiation.", topic: "Negotiation" },
  { id: 5, question: "When asked about a conflict with a coworker, the best approach is:", options: ["Blame the coworker", "Describe the situation and how you resolved it constructively", "Say you never have conflicts", "Avoid the question"], answer: "Describe the situation and how you resolved it constructively", explanation: "Using the STAR method to describe conflict resolution shows emotional intelligence and teamwork.", topic: "Behavioral" },
  { id: 6, question: "Why do you want to work here? Best approach:", options: ["Mention salary only", "Show knowledge of the company and alignment with values", "Say you need a job", "Compare with other companies"], answer: "Show knowledge of the company and alignment with values", explanation: "Researching the company and connecting your skills/values shows genuine interest and preparation.", topic: "Motivation" },
  { id: 7, question: "What's the best response to 'Why should we hire you?'", options: ["List your degrees", "Match your skills to the job requirements", "Say you're desperate", "Promise to work overtime"], answer: "Match your skills to the job requirements", explanation: "Connecting your specific skills and experience to the job description demonstrates clear value proposition.", topic: "Self-Promotion" },
  { id: 8, question: "How to answer 'Tell me about a time you failed?'", options: ["Say you never fail", "Describe a real failure and lessons learned", "Blame circumstances", "Make up a story"], answer: "Describe a real failure and lessons learned", explanation: "Sharing a genuine failure with concrete lessons shows growth mindset and resilience.", topic: "Behavioral" },
  { id: 9, question: "When asked about gaps in your resume:", options: ["Lie about it", "Explain honestly what you did during the gap", "Ignore the question", "Get defensive"], answer: "Explain honestly what you did during the gap", explanation: "Honest explanation with focus on what you learned or did productively during gaps builds trust.", topic: "Career History" },
  { id: 10, question: "Best way to handle stress at work:", options: ["Ignore it", "Prioritize tasks and take breaks", "Complain to everyone", "Work harder without breaks"], answer: "Prioritize tasks and take breaks", explanation: "Healthy stress management through prioritization and breaks maintains productivity and wellbeing.", topic: "Work Style" },
  { id: 11, question: "What does teamwork mean to you?", options: ["Everyone does their own thing", "Collaboration towards shared goals", "Following orders", "Competition"], answer: "Collaboration towards shared goals", explanation: "Effective teamwork involves open communication, shared responsibility, and working toward common objectives.", topic: "Teamwork" },
  { id: 12, question: "How do you handle feedback?", options: ["Argue back", "Listen, reflect, and improve", "Ignore it", "Take it personally"], answer: "Listen, reflect, and improve", explanation: "Receiving feedback gracefully and using it for growth shows professional maturity.", topic: "Growth" },
  { id: 13, question: "Best approach for 'What are your strengths?'", options: ["List everything", "Focus on relevant strengths with examples", "Be modest and say nothing special", "Exaggerate"], answer: "Focus on relevant strengths with examples", explanation: "Selecting strengths relevant to the role and backing them with specific examples is most impactful.", topic: "Self-Assessment" },
  { id: 14, question: "How to show leadership in an interview:", options: ["Talk about your title", "Give examples of influencing and guiding others", "Say you prefer working alone", "Mention you like giving orders"], answer: "Give examples of influencing and guiding others", explanation: "Leadership is demonstrated through concrete examples of motivating teams and driving results.", topic: "Leadership" },
  { id: 15, question: "What's the best way to end an interview?", options: ["Just leave", "Ask thoughtful questions about the role", "Ask about vacation days", "Negotiate salary immediately"], answer: "Ask thoughtful questions about the role", explanation: "Asking insightful questions shows genuine interest and helps you evaluate if the role is right for you.", topic: "Interview Etiquette" },
  { id: 16, question: "How to explain why you left your previous job:", options: ["Badmouth your old employer", "Focus on seeking growth opportunities", "Say you were bored", "Lie about the reason"], answer: "Focus on seeking growth opportunities", explanation: "Framing your departure positively around growth and new challenges reflects professionalism.", topic: "Career History" },
  { id: 17, question: "Describe your work style:", options: ["Say you work alone", "Describe adaptability with examples", "Say you have no preference", "Mention you're disorganized"], answer: "Describe adaptability with examples", explanation: "Showing flexibility in work style while having strong organizational habits is ideal.", topic: "Work Style" },
  { id: 18, question: "How to discuss your achievements:", options: ["Be vague", "Quantify results with numbers", "Take all credit", "Downplay everything"], answer: "Quantify results with numbers", explanation: "Using specific metrics (percentages, revenue, time saved) makes achievements concrete and memorable.", topic: "Self-Promotion" },
  { id: 19, question: "What motivates you at work?", options: ["Only money", "Impact, learning, and growth opportunities", "Nothing specific", "Avoiding getting fired"], answer: "Impact, learning, and growth opportunities", explanation: "Showing intrinsic motivation beyond compensation indicates long-term engagement and dedication.", topic: "Motivation" },
  { id: 20, question: "Best way to follow up after an interview:", options: ["Don't follow up", "Send a thank-you email within 24 hours", "Call repeatedly", "Connect on social media immediately"], answer: "Send a thank-you email within 24 hours", explanation: "A timely, personalized thank-you email reinforces your interest and leaves a positive impression.", topic: "Interview Etiquette" }
];

export type RoundType = 'aptitude' | 'technical' | 'hr';

export function getQuestions(round: RoundType): Question[] {
  switch (round) {
    case 'aptitude': return aptitudeQuestions;
    case 'technical': return technicalQuestions;
    case 'hr': return hrQuestions;
  }
}
