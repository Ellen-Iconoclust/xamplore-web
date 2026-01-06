// questions.js - Question Bank & Data Storage Backend
export const QUESTION_BANK = {
  A: [
    { 
      id: 1, 
      type: "MCQ", 
      question: "What is 2+2?", 
      options: ["3", "4", "5", "6"], 
      correctAnswer: "4", 
      marks: 1 
    },
    { 
      id: 2, 
      type: "TrueFalse", 
      question: "The sky is blue.", 
      correctAnswer: "True", 
      marks: 1 
    },
    { 
      id: 3, 
      type: "MCQ", 
      question: "Which language runs in a web browser?", 
      options: ["Java", "C", "Python", "JavaScript"], 
      correctAnswer: "JavaScript", 
      marks: 2 
    },
    { 
      id: 4, 
      type: "MCQ", 
      question: "What does HTML stand for?", 
      options: [
        "Hyper Text Markup Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language"
      ], 
      correctAnswer: "Hyper Text Markup Language", 
      marks: 2 
    },
    { 
      id: 5, 
      type: "TrueFalse", 
      question: "CSS is used for styling web pages.", 
      correctAnswer: "True", 
      marks: 1 
    }
  ],
  
  B: [
    { 
      id: 1, 
      type: "MCQ", 
      question: "What is the capital of France?", 
      options: ["London", "Berlin", "Paris", "Madrid"], 
      correctAnswer: "Paris", 
      marks: 1 
    },
    { 
      id: 2, 
      type: "MCQ", 
      question: "Which planet is known as the Red Planet?", 
      options: ["Venus", "Mars", "Jupiter", "Saturn"], 
      correctAnswer: "Mars", 
      marks: 1 
    },
    { 
      id: 3, 
      type: "TrueFalse", 
      question: "Water boils at 100°C at sea level.", 
      correctAnswer: "True", 
      marks: 1 
    },
    { 
      id: 4, 
      type: "MCQ", 
      question: "Who wrote 'Romeo and Juliet'?", 
      options: [
        "Charles Dickens",
        "William Shakespeare",
        "Mark Twain",
        "Jane Austen"
      ], 
      correctAnswer: "William Shakespeare", 
      marks: 2 
    },
    { 
      id: 5, 
      type: "MCQ", 
      question: "What is the largest mammal?", 
      options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"], 
      correctAnswer: "Blue Whale", 
      marks: 2 
    }
  ],
  
  C: [
    { 
      id: 1, 
      type: "MCQ", 
      question: "What is the square root of 64?", 
      options: ["6", "7", "8", "9"], 
      correctAnswer: "8", 
      marks: 1 
    },
    { 
      id: 2, 
      type: "TrueFalse", 
      question: "Light travels faster than sound.", 
      correctAnswer: "True", 
      marks: 1 
    },
    { 
      id: 3, 
      type: "MCQ", 
      question: "Which element has the chemical symbol 'O'?", 
      options: ["Gold", "Oxygen", "Osmium", "Oganesson"], 
      correctAnswer: "Oxygen", 
      marks: 1 
    },
    { 
      id: 4, 
      type: "MCQ", 
      question: "How many continents are there?", 
      options: ["5", "6", "7", "8"], 
      correctAnswer: "7", 
      marks: 2 
    },
    { 
      id: 5, 
      type: "MCQ", 
      question: "What is the main ingredient in guacamole?", 
      options: ["Tomato", "Onion", "Avocado", "Pepper"], 
      correctAnswer: "Avocado", 
      marks: 1 
    }
  ]
};

// Store all student attempts (in-memory)
export let ATTEMPTS = {};

// Admin password (hashed for demo purposes)
// In production, this should be properly hashed with salt
export const ADMIN_PASSWORD_HASH = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"; // "test123"

// Initialize from localStorage if available
export function initializeStorage() {
  const stored = localStorage.getItem('exam_attempts');
  if (stored) {
    try {
      ATTEMPTS = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored attempts:", e);
      ATTEMPTS = {};
    }
  }
}

// Save attempts to localStorage
export function saveAttempts() {
  localStorage.setItem('exam_attempts', JSON.stringify(ATTEMPTS));
}

// Add a new attempt
export function addAttempt(attempt) {
  const key = `${attempt.name}_${new Date(attempt.timestamp).toISOString().split('T')[0]}`;
  ATTEMPTS[key] = attempt;
  saveAttempts();
  return key;
}

// Get all attempts
export function getAllAttempts() {
  return Object.values(ATTEMPTS).sort((a, b) => b.timestamp - a.timestamp);
}

// Reset all attempts
export function resetAllAttempts() {
  ATTEMPTS = {};
  localStorage.removeItem('exam_attempts');
}

// Reset attempts for a specific student
export function resetStudentAttempts(studentName) {
  const keys = Object.keys(ATTEMPTS);
  keys.forEach(key => {
    if (key.startsWith(studentName + '_')) {
      delete ATTEMPTS[key];
    }
  });
  saveAttempts();
}

// Check if student has attempted today
export function hasAttemptedToday(studentName) {
  const today = new Date().toISOString().split('T')[0];
  const key = `${studentName}_${today}`;
  return ATTEMPTS.hasOwnProperty(key);
}

// Calculate score
export function calculateScore(answers, pattern) {
  let score = 0;
  const questions = QUESTION_BANK[pattern];
  
  if (!questions) return 0;
  
  questions.forEach(q => {
    if (answers[q.id] === q.correctAnswer) {
      score += q.marks;
    }
  });
  
  return score;
}

// Initialize on load
initializeStorage();
