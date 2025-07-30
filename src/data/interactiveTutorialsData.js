
import React from 'react';

export const reflectedXssTutorial = {
  id: 'reflected-xss-1',
  title: 'Introduction to Reflected XSS',
  description: 'Learn how to find and exploit a basic Reflected Cross-Site Scripting (XSS) vulnerability.',
  steps: [
    {
      id: 1,
      title: 'The Scenario',
      content: (
        <div>
          <p>You are testing a simple web application with a search feature. The search term is reflected on the page.</p>
          <p>Your goal is to see if you can inject a script that will be executed by the browser.</p>
        </div>
      ),
      code: `
// Vulnerable search page component
function SearchPage({ searchTerm }) {
  return (
    <div>
      <h1>Search Results</h1>
      <p>You searched for: {searchTerm}</p>
    </div>
  );
}
      `,
    },
    {
      id: 2,
      title: 'Testing for a Reflection',
      content: (
        <div>
          <p>First, let's see if the search term is reflected without any sanitization. We can try a simple, non-malicious HTML tag.</p>
          <p>If the word "test" appears in bold, it means the application is rendering raw HTML.</p>
        </div>
      ),
      task: 'Enter a simple HTML tag to test for reflection.',
      expectedInput: '<b>test</b>',
      successMessage: 'Great! The tag was rendered, which means the input is not being sanitized. This is a strong indicator of an XSS vulnerability.',
      failureMessage: 'Not quite. Try injecting a simple HTML tag like \`<b>test</b>\` to see if it gets rendered as bold text.',
    },
    {
      id: 3,
      title: 'Injecting a Simple Script',
      content: (
        <p>Now that we know the application is vulnerable to HTML injection, let's try to inject a simple script. The classic alert() function is a great way to confirm an XSS vulnerability.</p>
      ),
      task: 'Inject a script that will pop up an alert box.',
      expectedInput: '<script>alert("XSS")</script>',
      successMessage: 'Excellent! You\'ve successfully executed a script. This is a confirmed Reflected XSS vulnerability.',
      failureMessage: 'That\'s not the right payload. Try a standard XSS payload like \`<script>alert("XSS")</script>\`.',
    },
    {
      id: 4,
      title: 'Understanding the Impact',
      content: (
        <div>
          <p>What's the big deal? An attacker could use this vulnerability to:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Steal cookies and session tokens.</li>
            <li>Redirect users to malicious websites.</li>
            <li>Capture keystrokes.</li>
            <li>Display fake login forms.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Next Steps',
      content: (
        <p>Congratulations on finding your first (simulated) Reflected XSS vulnerability! Now you understand the basics of how they work and how to test for them.</p>
      ),
    },
  ],
};

