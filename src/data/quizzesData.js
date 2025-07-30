export const week1Quiz = {
  id: 'week1-quiz',
  title: 'Week 1: Foundations & OWASP Top 10 Quiz',
  description: 'Test your knowledge of web security fundamentals and the OWASP Top 10.',
  totalQuestions: 10,
  passingScore: 70,
  questions: [
    {
      id: 1,
      question: 'What does HTTP stand for?',
      type: 'multiple-choice',
      options: [
        'HyperText Transfer Protocol',
        'High-Tech Transfer Process',
        'HyperText Transport Platform',
        'High-Level Transfer Protocol'
      ],
      correctAnswer: 0,
      explanation: 'HTTP stands for HyperText Transfer Protocol, which is the foundation of data communication on the World Wide Web.'
    },
    {
      id: 2,
      question: 'Which HTTP status code indicates a successful response?',
      type: 'multiple-choice',
      options: [
        '404',
        '500',
        '200',
        '301'
      ],
      correctAnswer: 2,
      explanation: 'HTTP status code 200 indicates a successful HTTP request. 404 means not found, 500 is server error, and 301 is permanent redirect.'
    },
    {
      id: 3,
      question: 'What is the #1 vulnerability in the OWASP Top 10 2021?',
      type: 'multiple-choice',
      options: [
        'Injection',
        'Broken Access Control',
        'Security Misconfiguration',
        'Cross-Site Scripting (XSS)'
      ],
      correctAnswer: 1,
      explanation: 'Broken Access Control is #1 in the OWASP Top 10 2021, moving up from the 5th position in 2017.'
    },
    {
      id: 4,
      question: 'SQL injection is a type of which OWASP Top 10 category?',
      type: 'multiple-choice',
      options: [
        'Security Misconfiguration',
        'Injection',
        'Broken Authentication',
        'Sensitive Data Exposure'
      ],
      correctAnswer: 1,
      explanation: 'SQL injection falls under the "Injection" category (A03) in the OWASP Top 10 2021.'
    },
    {
      id: 5,
      question: 'Which of the following is NOT a common HTTP request method?',
      type: 'multiple-choice',
      options: [
        'GET',
        'POST',
        'FETCH',
        'DELETE'
      ],
      correctAnswer: 2,
      explanation: 'FETCH is not an HTTP request method. Common methods include GET, POST, PUT, DELETE, PATCH, HEAD, and OPTIONS.'
    },
    {
      id: 6,
      question: 'What does XSS stand for?',
      type: 'text',
      correctAnswer: 'Cross-Site Scripting',
      explanation: 'XSS stands for Cross-Site Scripting, a vulnerability that allows attackers to inject malicious scripts into web pages.'
    },
    {
      id: 7,
      question: 'Authentication and Authorization are the same thing.',
      type: 'true-false',
      correctAnswer: false,
      explanation: 'Authentication verifies who you are, while Authorization determines what you can access. They are different concepts.'
    },
    {
      id: 8,
      question: 'Which of these is a characteristic of HTTPS?',
      type: 'multiple-choice',
      options: [
        'Uses port 80 by default',
        'Provides encryption in transit',
        'Is faster than HTTP',
        'Does not require certificates'
      ],
      correctAnswer: 1,
      explanation: 'HTTPS provides encryption in transit using SSL/TLS certificates, typically uses port 443, and requires valid certificates.'
    },
    {
      id: 9,
      question: 'Server-Side Request Forgery (SSRF) is which number in the OWASP Top 10 2021?',
      type: 'multiple-choice',
      options: [
        'A08',
        'A09',
        'A10',
        'A07'
      ],
      correctAnswer: 2,
      explanation: 'Server-Side Request Forgery (SSRF) is A10 in the OWASP Top 10 2021, being a new addition to the list.'
    },
    {
      id: 10,
      question: 'Which tool is commonly used for web application security testing?',
      type: 'multiple-choice',
      options: [
        'Photoshop',
        'Burp Suite',
        'Microsoft Word',
        'VLC Player'
      ],
      correctAnswer: 1,
      explanation: 'Burp Suite is a widely used web application security testing tool that helps identify vulnerabilities.'
    }
  ]
};

export const week2Quiz = {
  id: 'week2-quiz',
  title: 'Week 2: Common Vulnerabilities Deep Dive Quiz',
  description: 'Test your understanding of XSS, SQL Injection, and other common vulnerabilities.',
  totalQuestions: 8,
  passingScore: 70,
  questions: [
    {
      id: 1,
      question: 'Which type of XSS occurs when user input is immediately returned by the web application?',
      type: 'multiple-choice',
      options: [
        'Stored XSS',
        'Reflected XSS',
        'DOM-based XSS',
        'Blind XSS'
      ],
      correctAnswer: 1,
      explanation: 'Reflected XSS occurs when user input is immediately returned by the web application in the response without proper sanitization.'
    },
    {
      id: 2,
      question: 'What is the primary defense against SQL injection?',
      type: 'multiple-choice',
      options: [
        'Input validation only',
        'Parameterized queries/prepared statements',
        'Hiding database errors',
        'Using complex passwords'
      ],
      correctAnswer: 1,
      explanation: 'Parameterized queries (prepared statements) are the primary defense against SQL injection as they separate SQL code from data.'
    },
    {
      id: 3,
      question: 'CSRF attacks require the victim to be authenticated to the target application.',
      type: 'true-false',
      correctAnswer: true,
      explanation: 'CSRF attacks exploit the trust that a web application has in an authenticated user\'s browser, so the victim must be logged in.'
    },
    {
      id: 4,
      question: 'Which of the following is a common XSS payload?',
      type: 'multiple-choice',
      options: [
        '<script>alert("XSS")</script>',
        'SELECT * FROM users',
        '../../../etc/passwd',
        "admin' OR '1'='1"
      ],
      correctAnswer: 0,
      explanation: 'The <script>alert("XSS")</script> payload is a classic XSS test to see if JavaScript can be executed in the context of the web page.'
    },
    {
      id: 5,
      question: 'What does CSRF stand for?',
      type: 'text',
      correctAnswer: 'Cross-Site Request Forgery',
      explanation: 'CSRF stands for Cross-Site Request Forgery, an attack that forces users to execute unwanted actions on a web application where they are authenticated.'
    },
    {
      id: 6,
      question: 'Directory traversal attacks typically use which character sequence?',
      type: 'multiple-choice',
      options: [
        '<script>',
        '../',
        'SELECT',
        'eval()'
      ],
      correctAnswer: 1,
      explanation: 'Directory traversal attacks commonly use "../" sequences to navigate up directory levels and access files outside the intended directory.'
    },
    {
      id: 7,
      question: 'DOM-based XSS occurs entirely in the browser without server involvement.',
      type: 'true-false',
      correctAnswer: true,
      explanation: 'DOM-based XSS occurs when JavaScript code modifies the DOM based on user input without server-side processing, making it client-side only.'
    },
    {
      id: 8,
      question: 'Which HTTP header can help prevent XSS attacks?',
      type: 'multiple-choice',
      options: [
        'Content-Type',
        'Content-Security-Policy',
        'User-Agent',
        'Accept-Language'
      ],
      correctAnswer: 1,
      explanation: 'Content-Security-Policy (CSP) header helps prevent XSS by controlling which resources can be loaded and executed on a web page.'
    }
  ]
};

export const allQuizzes = {
  week1: week1Quiz,
  week2: week2Quiz
};
