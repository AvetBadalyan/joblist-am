-- Migration: 005_seed
-- Description: Seed data for demonstrating the platform functionality
-- Requirements: 20.1, 20.2, 20.3, 20.4, 20.5 - Seed data for employers, jobs, candidates, applications, and saved jobs
-- 
-- Run this migration in Supabase SQL Editor: https://app.supabase.com/project/_/sql
-- Prerequisites: Run all schema migrations (001-004) first
--
-- ============================================================================
-- IMPORTANT: HOW TO USE THIS SEED DATA
-- ============================================================================
-- 
-- Since profiles reference auth.users via foreign key, you have TWO options:
--
-- OPTION 1: Create Auth Users First (Recommended for Development)
-- ---------------------------------------------------------------
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Create each user manually with the emails listed below
-- 3. Copy the generated UUIDs from Supabase
-- 4. Replace the UUIDs in this script with the actual UUIDs from auth.users
-- 5. Run this script
--
-- OPTION 2: Use Supabase Auth Admin API (For Automation)
-- ------------------------------------------------------
-- 1. Use supabase.auth.admin.createUser() to create users programmatically
-- 2. Use the returned UUIDs to insert profiles
-- 3. This approach is better for CI/CD or automated seeding
--
-- OPTION 3: Disable Foreign Key Temporarily (Not Recommended for Production)
-- --------------------------------------------------------------------------
-- 1. Temporarily disable the foreign key constraint
-- 2. Insert profiles with static UUIDs
-- 3. Re-enable the constraint
-- 4. Note: This leaves orphan profiles without auth.users entries
--
-- The script below uses static UUIDs as placeholders. Replace them with
-- actual UUIDs from auth.users after creating the users.
--
-- ============================================================================
-- SEED USER ACCOUNTS TO CREATE IN SUPABASE AUTH
-- ============================================================================
--
-- EMPLOYERS:
-- 1. hr@picsart.com (password: TestPassword123!)
-- 2. careers@teamviewer.am (password: TestPassword123!)
-- 3. jobs@servicetitan.com (password: TestPassword123!)
--
-- CANDIDATES:
-- 1. armen@example.com (password: TestPassword123!)
-- 2. anna@example.com (password: TestPassword123!)
--
-- ============================================================================

-- Clear existing seed data (run this if re-seeding)
-- WARNING: This will delete ALL data in these tables
-- DELETE FROM saved_jobs;
-- DELETE FROM applications;
-- DELETE FROM jobs;
-- DELETE FROM profiles WHERE email IN ('hr@picsart.com', 'careers@teamviewer.am', 'jobs@servicetitan.com', 'armen@example.com', 'anna@example.com');

-- ============================================================================
-- EMPLOYER PROFILES (3 Armenian Tech Companies)
-- ============================================================================
-- Replace these UUIDs with actual auth.users UUIDs after creating users

INSERT INTO profiles (id, email, name, role, company_name, company_description, company_logo_url, location) VALUES
  -- Picsart - Creative platform, one of Armenia's largest tech companies
  (
    'e1000000-0000-0000-0000-000000000001',
    'hr@picsart.com',
    'Picsart HR Team',
    'employer',
    'Picsart',
    'Picsart is a creative platform and social editing app with a community of over 150 million monthly active users and one of the top 20 most downloaded apps in the world. Based in Yerevan, Armenia, Picsart has offices around the world and is backed by leading investors.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Picsart_logo.svg/512px-Picsart_logo.svg.png',
    'Yerevan'
  ),
  
  -- TeamViewer Armenia - Remote connectivity solutions
  (
    'e2000000-0000-0000-0000-000000000002',
    'careers@teamviewer.am',
    'TeamViewer Armenia Careers',
    'employer',
    'TeamViewer Armenia',
    'TeamViewer is a leading global technology company that provides a connectivity platform to remotely access, control, manage, monitor, and repair devices of any kind. TeamViewer Armenia is a key development hub for the company.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/TeamViewer_logo.svg/512px-TeamViewer_logo.svg.png',
    'Yerevan'
  ),
  
  -- ServiceTitan - Software for home service businesses (unicorn startup)
  (
    'e3000000-0000-0000-0000-000000000003',
    'jobs@servicetitan.com',
    'ServiceTitan Talent Team',
    'employer',
    'ServiceTitan',
    'ServiceTitan is a software platform built to power trades businesses. From marketing and sales to service execution and customer experience, our platform helps contractors grow their business and achieve their goals. Founded by Armenian-Americans, with a major presence in Yerevan.',
    'https://www.servicetitan.com/hubfs/ServiceTitan-Logo.svg',
    'Yerevan'
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  company_description = EXCLUDED.company_description,
  company_logo_url = EXCLUDED.company_logo_url;

-- ============================================================================
-- CANDIDATE PROFILES (2 Job Seekers)
-- ============================================================================
-- Replace these UUIDs with actual auth.users UUIDs after creating users

INSERT INTO profiles (id, email, name, role, location, skills, resume_url) VALUES
  -- Armen - Experienced frontend developer
  (
    'c1000000-0000-0000-0000-000000000001',
    'armen@example.com',
    'Armen Petrosyan',
    'candidate',
    'Yerevan',
    'React, TypeScript, JavaScript, Node.js, Redux, GraphQL, CSS-in-JS, Git',
    'https://drive.google.com/file/d/example-armen-resume'
  ),
  
  -- Anna - Backend/Data engineer
  (
    'c2000000-0000-0000-0000-000000000002',
    'anna@example.com',
    'Anna Hovhannisyan',
    'candidate',
    'Gyumri',
    'Python, Django, PostgreSQL, Redis, AWS, Docker, Kubernetes, Data Engineering',
    'https://drive.google.com/file/d/example-anna-resume'
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  skills = EXCLUDED.skills;

-- ============================================================================
-- JOB LISTINGS (15 Jobs across various types)
-- ============================================================================
-- Salaries are in AMD (Armenian Dram)
-- Reference: 1 USD ≈ 400 AMD
-- Entry level: 300,000 - 600,000 AMD/month
-- Mid level: 600,000 - 1,200,000 AMD/month
-- Senior level: 1,200,000 - 2,500,000 AMD/month
-- Lead/Manager: 2,000,000 - 3,500,000 AMD/month

-- Picsart Jobs (5 listings)
INSERT INTO jobs (id, employer_id, title, company_name, location, job_type, salary_min, salary_max, description, requirements, status) VALUES
  -- Senior React Developer (Full-time)
  (
    'j1000000-0000-0000-0000-000000000001',
    'e1000000-0000-0000-0000-000000000001',
    'Senior React Developer',
    'Picsart',
    'Yerevan',
    'full-time',
    1500000,
    2500000,
    'Join our frontend team to build creative editing tools used by millions of users worldwide. You will be working on our web-based photo and video editing platform, implementing new features and improving performance.

Key Responsibilities:
• Develop and maintain React-based web applications
• Collaborate with designers and product managers to implement new features
• Write clean, maintainable, and well-tested code
• Participate in code reviews and technical discussions
• Mentor junior developers',
    '• 4+ years of experience with React and modern JavaScript/TypeScript
• Strong understanding of state management (Redux, MobX, or similar)
• Experience with CSS-in-JS solutions (styled-components, Emotion)
• Familiarity with testing frameworks (Jest, React Testing Library)
• Experience with performance optimization techniques
• Excellent communication skills in English',
    'open'
  ),
  
  -- Backend Engineer (Full-time)
  (
    'j2000000-0000-0000-0000-000000000002',
    'e1000000-0000-0000-0000-000000000001',
    'Backend Engineer',
    'Picsart',
    'Yerevan',
    'full-time',
    1400000,
    2200000,
    'Work on scalable backend services for our creative platform serving over 150 million users. You will design, build, and maintain APIs and microservices that power our web and mobile applications.

Key Responsibilities:
• Design and implement scalable backend services
• Build and maintain RESTful APIs and GraphQL endpoints
• Optimize database queries and system performance
• Work with cloud infrastructure (AWS)
• Participate in on-call rotations',
    '• 3+ years of backend development experience
• Strong proficiency in Node.js or Python
• Experience with PostgreSQL and Redis
• Knowledge of AWS services (EC2, S3, Lambda, etc.)
• Understanding of microservices architecture
• Experience with Docker and container orchestration',
    'open'
  ),
  
  -- Product Designer (Remote)
  (
    'j3000000-0000-0000-0000-000000000003',
    'e1000000-0000-0000-0000-000000000001',
    'Product Designer',
    'Picsart',
    'Remote',
    'remote',
    1200000,
    1800000,
    'Design intuitive user experiences for our mobile and web apps. As a Product Designer, you will work closely with product managers and engineers to create beautiful, functional interfaces that delight our users.

Key Responsibilities:
• Create wireframes, prototypes, and high-fidelity designs
• Conduct user research and usability testing
• Collaborate with cross-functional teams
• Maintain and evolve our design system
• Present design solutions to stakeholders',
    '• 3+ years of UX/UI design experience
• Strong portfolio demonstrating user-centered design
• Expert-level proficiency in Figma
• Experience with design systems
• Understanding of mobile app design patterns
• Excellent visual design skills',
    'open'
  ),
  
  -- QA Engineer (Full-time)
  (
    'j4000000-0000-0000-0000-000000000004',
    'e1000000-0000-0000-0000-000000000001',
    'QA Engineer',
    'Picsart',
    'Yerevan',
    'full-time',
    800000,
    1200000,
    'Ensure quality across our product suite by designing and executing test strategies. You will work with development teams to identify bugs and improve the overall user experience.

Key Responsibilities:
• Design and execute test plans and test cases
• Perform manual and automated testing
• Report and track defects
• Collaborate with developers to resolve issues
• Improve testing processes and tools',
    '• 2+ years of QA experience
• Experience with both manual and automated testing
• Knowledge of testing methodologies and best practices
• Familiarity with bug tracking tools (Jira)
• Basic programming skills for test automation
• Attention to detail',
    'open'
  ),
  
  -- DevOps Intern (Internship)
  (
    'j5000000-0000-0000-0000-000000000005',
    'e1000000-0000-0000-0000-000000000001',
    'DevOps Intern',
    'Picsart',
    'Yerevan',
    'internship',
    300000,
    500000,
    'Learn and grow with our infrastructure team. This is an excellent opportunity for students or recent graduates to gain hands-on experience with cloud technologies and DevOps practices.

Key Responsibilities:
• Assist with infrastructure automation tasks
• Learn and apply CI/CD best practices
• Help monitor and maintain systems
• Document processes and procedures
• Participate in team meetings and learning sessions',
    '• Currently enrolled in CS/IT program or recent graduate
• Basic knowledge of Linux
• Interest in cloud computing and DevOps
• Familiarity with Git
• Eagerness to learn
• Basic scripting skills (Bash or Python) is a plus',
    'open'
  ),

-- TeamViewer Armenia Jobs (5 listings)
  -- Full Stack Developer (Full-time)
  (
    'j6000000-0000-0000-0000-000000000006',
    'e2000000-0000-0000-0000-000000000002',
    'Full Stack Developer',
    'TeamViewer Armenia',
    'Yerevan',
    'full-time',
    1300000,
    2000000,
    'Build features for our remote access products used by millions worldwide. You will work on both frontend and backend components, contributing to the core functionality of TeamViewer products.

Key Responsibilities:
• Develop full-stack features using React and .NET/Java
• Work with SQL databases and design data models
• Implement secure and scalable solutions
• Participate in agile development processes
• Write technical documentation',
    '• 3+ years of full-stack development experience
• Strong knowledge of React or Angular
• Backend experience with .NET or Java
• SQL database experience
• Understanding of REST APIs
• Version control with Git',
    'open'
  ),
  
  -- Security Engineer (Full-time)
  (
    'j7000000-0000-0000-0000-000000000007',
    'e2000000-0000-0000-0000-000000000002',
    'Security Engineer',
    'TeamViewer Armenia',
    'Yerevan',
    'full-time',
    1600000,
    2400000,
    'Protect our platform and users from security threats. You will be responsible for identifying vulnerabilities, implementing security measures, and ensuring our products meet the highest security standards.

Key Responsibilities:
• Conduct security assessments and penetration testing
• Implement security controls and monitoring
• Respond to security incidents
• Review code for security vulnerabilities
• Stay current with security trends and threats',
    '• 4+ years of security engineering experience
• Knowledge of common vulnerabilities (OWASP Top 10)
• Experience with security tools and frameworks
• Security certifications (CISSP, CEH) preferred
• Strong understanding of network security
• Experience with secure coding practices',
    'open'
  ),
  
  -- Technical Writer (Part-time)
  (
    'j8000000-0000-0000-0000-000000000008',
    'e2000000-0000-0000-0000-000000000002',
    'Technical Writer',
    'TeamViewer Armenia',
    'Remote',
    'part-time',
    400000,
    700000,
    'Create documentation for our developer APIs and internal tools. This part-time position is perfect for someone with strong writing skills and technical background who wants flexible hours.

Key Responsibilities:
• Write and maintain API documentation
• Create user guides and tutorials
• Document internal processes and tools
• Review and edit technical content
• Collaborate with development teams',
    '• 2+ years of technical writing experience
• Excellent English writing skills
• Ability to understand and explain technical concepts
• Experience with documentation tools (Markdown, Confluence)
• Basic understanding of REST APIs
• Self-motivated and detail-oriented',
    'open'
  ),
  
  -- Mobile Developer (Full-time)
  (
    'j9000000-0000-0000-0000-000000000009',
    'e2000000-0000-0000-0000-000000000002',
    'Mobile Developer',
    'TeamViewer Armenia',
    'Yerevan',
    'full-time',
    1200000,
    1900000,
    'Work on our iOS and Android applications used for remote device access. You will develop new features and improve existing functionality for our mobile remote control solutions.

Key Responsibilities:
• Develop native mobile applications for iOS and/or Android
• Implement new features based on product requirements
• Optimize app performance and battery usage
• Work with backend APIs
• Write unit and integration tests',
    '• 2+ years of mobile development experience
• Proficiency in Swift (iOS) or Kotlin (Android)
• Understanding of mobile app architecture patterns
• Experience with app performance optimization
• Knowledge of mobile security best practices
• Published apps on App Store or Google Play',
    'open'
  ),
  
  -- Support Engineer (Full-time) - CLOSED
  (
    'j1000000-0000-0000-0000-000000000010',
    'e2000000-0000-0000-0000-000000000002',
    'Support Engineer',
    'TeamViewer Armenia',
    'Yerevan',
    'full-time',
    600000,
    900000,
    'Help customers resolve technical issues with our remote connectivity products. This position has been filled.

Key Responsibilities:
• Provide technical support to customers
• Troubleshoot connectivity and software issues
• Document common problems and solutions
• Escalate complex issues to engineering teams
• Maintain high customer satisfaction',
    '• 1+ years of technical support experience
• Strong communication skills
• Problem-solving abilities
• Basic networking knowledge
• Experience with ticketing systems
• Fluent in English',
    'closed'
  ),

-- ServiceTitan Jobs (5 listings)
  -- Software Engineer (Full-time)
  (
    'j1100000-0000-0000-0000-000000000011',
    'e3000000-0000-0000-0000-000000000003',
    'Software Engineer',
    'ServiceTitan',
    'Yerevan',
    'full-time',
    1400000,
    2100000,
    'Build features for our field service management platform used by thousands of contractors. You will work on our core platform, developing features that help home service businesses grow and succeed.

Key Responsibilities:
• Develop new features using C# and .NET
• Build responsive frontend interfaces with Angular or React
• Write clean, testable, and maintainable code
• Collaborate with product and design teams
• Participate in code reviews',
    '• 3+ years of software development experience
• Strong proficiency in C# and .NET
• Frontend experience with Angular or React
• SQL database experience
• Understanding of software design patterns
• Agile development experience',
    'open'
  ),
  
  -- Data Engineer (Full-time)
  (
    'j1200000-0000-0000-0000-000000000012',
    'e3000000-0000-0000-0000-000000000003',
    'Data Engineer',
    'ServiceTitan',
    'Yerevan',
    'full-time',
    1500000,
    2300000,
    'Build data pipelines and analytics infrastructure. You will design and implement data solutions that enable our customers and internal teams to make data-driven decisions.

Key Responsibilities:
• Design and build data pipelines
• Implement ETL processes
• Optimize data warehouse performance
• Work with business intelligence tools
• Ensure data quality and reliability',
    '• 3+ years of data engineering experience
• Strong Python skills
• Experience with Apache Spark or similar
• Knowledge of AWS data services
• SQL expertise
• Experience with data modeling',
    'open'
  ),
  
  -- Product Manager (Full-time)
  (
    'j1300000-0000-0000-0000-000000000013',
    'e3000000-0000-0000-0000-000000000003',
    'Product Manager',
    'ServiceTitan',
    'Yerevan',
    'full-time',
    1800000,
    2800000,
    'Define product strategy and roadmap for our field service management features. You will work with customers, designers, and engineers to build products that solve real problems for home service businesses.

Key Responsibilities:
• Define product vision and strategy
• Gather and prioritize requirements
• Work with engineering to deliver features
• Analyze metrics and user feedback
• Present to stakeholders',
    '• 3+ years of product management experience
• Strong analytical skills
• Excellent communication abilities
• Technical background preferred
• Experience with B2B SaaS products
• Understanding of agile methodologies',
    'open'
  ),
  
  -- UI/UX Designer (Remote)
  (
    'j1400000-0000-0000-0000-000000000014',
    'e3000000-0000-0000-0000-000000000003',
    'UI/UX Designer',
    'ServiceTitan',
    'Remote',
    'remote',
    1000000,
    1600000,
    'Design beautiful and functional interfaces for our platform. You will create user-centered designs that make complex business workflows simple and intuitive.

Key Responsibilities:
• Create UI/UX designs for web and mobile
• Conduct user research and testing
• Develop and maintain design systems
• Collaborate with product and engineering
• Present design decisions to stakeholders',
    '• 2+ years of UI/UX design experience
• Strong portfolio demonstrating design process
• Proficiency in Figma
• User research experience
• Understanding of accessibility standards
• Experience with design systems',
    'open'
  ),
  
  -- Marketing Intern (Internship)
  (
    'j1500000-0000-0000-0000-000000000015',
    'e3000000-0000-0000-0000-000000000003',
    'Marketing Intern',
    'ServiceTitan',
    'Yerevan',
    'internship',
    250000,
    400000,
    'Support marketing campaigns and content creation. This is a great opportunity for students interested in tech marketing to gain hands-on experience at a growing unicorn company.

Key Responsibilities:
• Assist with social media management
• Create marketing content and materials
• Support event planning and execution
• Conduct market research
• Help with email marketing campaigns',
    '• Currently enrolled in Marketing, Communications, or related program
• Interest in technology and SaaS
• Strong writing skills
• Familiarity with social media platforms
• Basic design skills (Canva) is a plus
• Self-motivated and eager to learn',
    'open'
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  requirements = EXCLUDED.requirements,
  salary_min = EXCLUDED.salary_min,
  salary_max = EXCLUDED.salary_max,
  status = EXCLUDED.status;

-- ============================================================================
-- APPLICATIONS (Sample applications with various statuses)
-- ============================================================================
-- Demonstrates the hiring pipeline: applied → reviewing → interview → offer/rejected

INSERT INTO applications (id, job_id, candidate_id, cover_letter, resume_url, status, applied_at) VALUES
  -- Armen's applications (4 applications)
  
  -- Application 1: Senior React Developer at Picsart - Reviewing
  (
    'a1000000-0000-0000-0000-000000000001',
    'j1000000-0000-0000-0000-000000000001', -- Senior React Developer at Picsart
    'c1000000-0000-0000-0000-000000000001', -- Armen
    'Dear Picsart Hiring Team,

I am excited to apply for the Senior React Developer position at Picsart. With over 5 years of experience building React applications, I am confident that I can contribute to your world-class engineering team.

In my current role, I have led the development of a complex dashboard application serving thousands of users, implementing features like real-time data visualization and collaborative editing. I am particularly drawn to Picsart''s mission to democratize creativity and would love to work on tools that empower millions of users worldwide.

I am proficient in React, TypeScript, Redux, and have extensive experience with performance optimization techniques. I also have experience mentoring junior developers and leading technical discussions.

Thank you for considering my application. I look forward to discussing how I can contribute to Picsart''s continued success.

Best regards,
Armen Petrosyan',
    'https://drive.google.com/file/d/example-armen-resume',
    'reviewing',
    NOW() - INTERVAL '5 days'
  ),
  
  -- Application 2: Full Stack Developer at TeamViewer - Interview
  (
    'a2000000-0000-0000-0000-000000000002',
    'j6000000-0000-0000-0000-000000000006', -- Full Stack Developer at TeamViewer
    'c1000000-0000-0000-0000-000000000001', -- Armen
    'Dear TeamViewer Armenia Hiring Team,

I am writing to express my strong interest in the Full Stack Developer position at TeamViewer Armenia. Your remote connectivity solutions have revolutionized how people work remotely, and I would be honored to contribute to these impactful products.

My background includes both frontend and backend development, with strong proficiency in React and Node.js. I have also worked with SQL databases and REST APIs extensively. I am passionate about building products that solve real problems for users.

I am particularly excited about the technical challenges involved in building real-time, low-latency applications for remote access. I believe my skills and enthusiasm make me a great fit for your team.

Thank you for your consideration.

Sincerely,
Armen Petrosyan',
    'https://drive.google.com/file/d/example-armen-resume',
    'interview',
    NOW() - INTERVAL '10 days'
  ),
  
  -- Application 3: Backend Engineer at Picsart - Applied (recent)
  (
    'a3000000-0000-0000-0000-000000000003',
    'j2000000-0000-0000-0000-000000000002', -- Backend Engineer at Picsart
    'c1000000-0000-0000-0000-000000000001', -- Armen
    'Dear Picsart Team,

I am applying for the Backend Engineer position. While my primary experience is in frontend development, I have been expanding my backend skills with Node.js and have built several API services.

I am eager to transition more into backend development and believe Picsart would be an excellent place to grow these skills while contributing to your platform.

Best,
Armen',
    'https://drive.google.com/file/d/example-armen-resume',
    'applied',
    NOW() - INTERVAL '1 day'
  ),
  
  -- Application 4: Mobile Developer at TeamViewer - Rejected
  (
    'a4000000-0000-0000-0000-000000000004',
    'j9000000-0000-0000-0000-000000000009', -- Mobile Developer at TeamViewer
    'c1000000-0000-0000-0000-000000000001', -- Armen
    'Dear TeamViewer Team,

I am interested in the Mobile Developer position. While my primary experience is in web development, I have been learning React Native and have published a simple app on the Play Store.

I would love the opportunity to transition into mobile development at TeamViewer.

Regards,
Armen',
    NULL, -- No resume URL for this one
    'rejected',
    NOW() - INTERVAL '20 days'
  ),
  
  -- Anna's applications (3 applications)
  
  -- Application 5: Software Engineer at ServiceTitan - Applied
  (
    'a5000000-0000-0000-0000-000000000005',
    'j1100000-0000-0000-0000-000000000011', -- Software Engineer at ServiceTitan
    'c2000000-0000-0000-0000-000000000002', -- Anna
    'Dear ServiceTitan Talent Team,

I am excited to apply for the Software Engineer position at ServiceTitan. As a Python developer looking to broaden my full-stack skills, I am drawn to ServiceTitan''s tech stack and mission.

My experience includes building backend services with Django and working extensively with PostgreSQL. I am eager to learn C# and .NET, and I believe my strong programming fundamentals will help me ramp up quickly.

ServiceTitan''s impact on the home service industry is inspiring, and I would love to contribute to tools that help contractors succeed.

Thank you for your consideration.

Anna Hovhannisyan',
    'https://drive.google.com/file/d/example-anna-resume',
    'applied',
    NOW() - INTERVAL '2 days'
  ),
  
  -- Application 6: Data Engineer at ServiceTitan - Offer
  (
    'a6000000-0000-0000-0000-000000000006',
    'j1200000-0000-0000-0000-000000000012', -- Data Engineer at ServiceTitan
    'c2000000-0000-0000-0000-000000000002', -- Anna
    'Dear ServiceTitan Data Team,

I am thrilled to apply for the Data Engineer position. With 3 years of experience building data pipelines and working with large datasets, I am confident I can make an immediate impact on your team.

In my current role, I have designed and implemented ETL pipelines processing millions of records daily. I am proficient in Python, Apache Spark, and have extensive experience with AWS data services including Redshift, S3, and Glue.

I am particularly excited about the opportunity to work on analytics infrastructure that helps businesses make data-driven decisions.

Best regards,
Anna Hovhannisyan',
    'https://drive.google.com/file/d/example-anna-resume',
    'offer',
    NOW() - INTERVAL '15 days'
  ),
  
  -- Application 7: Backend Engineer at Picsart - Reviewing
  (
    'a7000000-0000-0000-0000-000000000007',
    'j2000000-0000-0000-0000-000000000002', -- Backend Engineer at Picsart
    'c2000000-0000-0000-0000-000000000002', -- Anna
    'Dear Picsart Hiring Team,

I am applying for the Backend Engineer position at Picsart. My background in Python and Django, combined with my experience with PostgreSQL and AWS, aligns well with this role.

I am fascinated by the scale at which Picsart operates and would love to work on backend services that power a platform used by millions.

Thank you,
Anna',
    'https://drive.google.com/file/d/example-anna-resume',
    'reviewing',
    NOW() - INTERVAL '7 days'
  )
ON CONFLICT (id) DO UPDATE SET
  cover_letter = EXCLUDED.cover_letter,
  status = EXCLUDED.status;

-- ============================================================================
-- SAVED JOBS (Bookmarked jobs for candidates)
-- ============================================================================

INSERT INTO saved_jobs (id, job_id, candidate_id, saved_at) VALUES
  -- Armen's saved jobs (3 jobs)
  (
    's1000000-0000-0000-0000-000000000001',
    'j3000000-0000-0000-0000-000000000003', -- Product Designer at Picsart
    'c1000000-0000-0000-0000-000000000001', -- Armen
    NOW() - INTERVAL '3 days'
  ),
  (
    's2000000-0000-0000-0000-000000000002',
    'j1300000-0000-0000-0000-000000000013', -- Product Manager at ServiceTitan
    'c1000000-0000-0000-0000-000000000001', -- Armen
    NOW() - INTERVAL '6 days'
  ),
  (
    's3000000-0000-0000-0000-000000000003',
    'j7000000-0000-0000-0000-000000000007', -- Security Engineer at TeamViewer
    'c1000000-0000-0000-0000-000000000001', -- Armen
    NOW() - INTERVAL '8 days'
  ),
  
  -- Anna's saved jobs (2 jobs)
  (
    's4000000-0000-0000-0000-000000000004',
    'j1400000-0000-0000-0000-000000000014', -- UI/UX Designer at ServiceTitan
    'c2000000-0000-0000-0000-000000000002', -- Anna
    NOW() - INTERVAL '4 days'
  ),
  (
    's5000000-0000-0000-0000-000000000005',
    'j1300000-0000-0000-0000-000000000013', -- Product Manager at ServiceTitan
    'c2000000-0000-0000-0000-000000000002', -- Anna
    NOW() - INTERVAL '5 days'
  )
ON CONFLICT (job_id, candidate_id) DO NOTHING;

-- ============================================================================
-- VERIFICATION QUERIES (Run after seeding to verify data)
-- ============================================================================

-- Verify employer profiles
-- SELECT id, email, name, role, company_name FROM profiles WHERE role = 'employer';

-- Verify candidate profiles
-- SELECT id, email, name, role, location, skills FROM profiles WHERE role = 'candidate';

-- Verify jobs count by company
-- SELECT company_name, COUNT(*) as job_count, 
--        SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END) as open_jobs
-- FROM jobs GROUP BY company_name;

-- Verify applications count by status
-- SELECT status, COUNT(*) as count FROM applications GROUP BY status;

-- Verify saved jobs count by candidate
-- SELECT p.name, COUNT(s.id) as saved_count 
-- FROM profiles p 
-- LEFT JOIN saved_jobs s ON p.id = s.candidate_id 
-- WHERE p.role = 'candidate' 
-- GROUP BY p.name;

-- ============================================================================
-- CLEANUP SCRIPT (Uncomment and run to remove all seed data)
-- ============================================================================
-- WARNING: This will delete ALL seed data. Use with caution.
--
-- DELETE FROM saved_jobs WHERE candidate_id IN ('c1000000-0000-0000-0000-000000000001', 'c2000000-0000-0000-0000-000000000002');
-- DELETE FROM applications WHERE candidate_id IN ('c1000000-0000-0000-0000-000000000001', 'c2000000-0000-0000-0000-000000000002');
-- DELETE FROM jobs WHERE employer_id IN ('e1000000-0000-0000-0000-000000000001', 'e2000000-0000-0000-0000-000000000002', 'e3000000-0000-0000-0000-000000000003');
-- DELETE FROM profiles WHERE id IN ('e1000000-0000-0000-0000-000000000001', 'e2000000-0000-0000-0000-000000000002', 'e3000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'c2000000-0000-0000-0000-000000000002');
