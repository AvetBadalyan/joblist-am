-- Migration: 005_seed
-- Description: Seed data for demonstrating the platform end to end.
-- Prerequisites: Run 001-004 first, then create the 5 auth users below.
--
-- ============================================================================
-- STEP 1 - Create these users in Supabase Dashboard > Authentication > Users
--          (Add user > Create new user, "Auto Confirm User" ON):
--
--   EMPLOYERS
--     hr@picsart.com          / TestPassword123!
--     careers@teamviewer.am   / TestPassword123!
--     jobs@servicetitan.com   / TestPassword123!
--
--   CANDIDATES
--     armen@example.com       / TestPassword123!
--     anna@example.com        / TestPassword123!
--
-- STEP 2 - Run this script in the SQL Editor. It looks up each user's real
--          UUID from auth.users by email, so you never copy UUIDs by hand.
--          If a user is missing, the script stops with a clear error.
--
-- Re-runnable: profiles upsert by id; jobs are inserted only if a job with the
-- same employer + title does not already exist; applications/saved_jobs de-dupe
-- on their unique keys. Safe to run again.
-- ============================================================================

DO $$
DECLARE
  -- Employer auth user ids
  emp_picsart      UUID;
  emp_teamviewer   UUID;
  emp_servicetitan UUID;
  -- Candidate auth user ids
  cand_armen       UUID;
  cand_anna        UUID;
BEGIN
  -- ----- Resolve auth user ids by email -----
  SELECT id INTO emp_picsart      FROM auth.users WHERE email = 'hr@picsart.com';
  SELECT id INTO emp_teamviewer   FROM auth.users WHERE email = 'careers@teamviewer.am';
  SELECT id INTO emp_servicetitan FROM auth.users WHERE email = 'jobs@servicetitan.com';
  SELECT id INTO cand_armen       FROM auth.users WHERE email = 'armen@example.com';
  SELECT id INTO cand_anna        FROM auth.users WHERE email = 'anna@example.com';

  IF emp_picsart IS NULL OR emp_teamviewer IS NULL OR emp_servicetitan IS NULL
     OR cand_armen IS NULL OR cand_anna IS NULL THEN
    RAISE EXCEPTION 'Missing auth users. Create all 5 users (see STEP 1) before running this seed.';
  END IF;

  -- ========================================================================
  -- PROFILES
  -- ========================================================================
  INSERT INTO profiles (id, email, name, role, company_name, company_description, company_logo_url, location) VALUES
    (emp_picsart, 'hr@picsart.com', 'Picsart HR Team', 'employer', 'Picsart',
     'Picsart is a creative platform and social editing app with a community of over 150 million monthly active users. Based in Yerevan, Armenia, with offices around the world.',
     'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Picsart_logo.svg/512px-Picsart_logo.svg.png', 'Yerevan'),
    (emp_teamviewer, 'careers@teamviewer.am', 'TeamViewer Armenia Careers', 'employer', 'TeamViewer Armenia',
     'TeamViewer provides a connectivity platform to remotely access, control, manage, monitor, and repair devices of any kind. TeamViewer Armenia is a key development hub.',
     'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/TeamViewer_logo.svg/512px-TeamViewer_logo.svg.png', 'Yerevan'),
    (emp_servicetitan, 'jobs@servicetitan.com', 'ServiceTitan Talent Team', 'employer', 'ServiceTitan',
     'ServiceTitan is a software platform built to power trades businesses. Founded by Armenian-Americans, with a major presence in Yerevan.',
     'https://www.servicetitan.com/hubfs/ServiceTitan-Logo.svg', 'Yerevan')
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    company_name = EXCLUDED.company_name,
    company_description = EXCLUDED.company_description,
    company_logo_url = EXCLUDED.company_logo_url,
    location = EXCLUDED.location;

  INSERT INTO profiles (id, email, name, role, location, skills, resume_url) VALUES
    (cand_armen, 'armen@example.com', 'Armen Petrosyan', 'candidate', 'Yerevan',
     'React, TypeScript, JavaScript, Node.js, Redux, GraphQL, CSS-in-JS, Git',
     'https://drive.google.com/file/d/example-armen-resume'),
    (cand_anna, 'anna@example.com', 'Anna Hovhannisyan', 'candidate', 'Gyumri',
     'Python, Django, PostgreSQL, Redis, AWS, Docker, Kubernetes, Data Engineering',
     'https://drive.google.com/file/d/example-anna-resume')
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    location = EXCLUDED.location,
    skills = EXCLUDED.skills,
    resume_url = EXCLUDED.resume_url;

  -- ========================================================================
  -- JOBS (salaries in AMD/month)
  -- The jobs table has no unique key on (employer_id, title), so we insert
  -- from a VALUES list and skip any row that already exists. This keeps the
  -- seed re-runnable without adding a product-level uniqueness rule.
  -- ========================================================================
  INSERT INTO jobs (employer_id, title, company_name, location, job_type, salary_min, salary_max, description, requirements, status)
  SELECT v.employer_id, v.title, v.company_name, v.location, v.job_type, v.salary_min, v.salary_max, v.description, v.requirements, v.status
  FROM (VALUES
    (emp_picsart, 'Senior React Developer', 'Picsart', 'Yerevan', 'full-time', 1500000, 2500000,
     'Join our frontend team to build creative editing tools used by millions of users worldwide. You will work on our web-based photo and video editing platform, implementing new features and improving performance.',
     '4+ years with React and TypeScript; strong state management (Redux/MobX); CSS-in-JS; testing (Jest, RTL); performance optimization; excellent English.', 'open'),
    (emp_picsart, 'Backend Engineer', 'Picsart', 'Yerevan', 'full-time', 1400000, 2200000,
     'Work on scalable backend services for our creative platform serving over 150 million users. Design, build, and maintain APIs and microservices powering our web and mobile apps.',
     '3+ years backend; Node.js or Python; PostgreSQL and Redis; AWS (EC2, S3, Lambda); microservices; Docker.', 'open'),
    (emp_picsart, 'Product Designer', 'Picsart', 'Remote', 'remote', 1200000, 1800000,
     'Design intuitive user experiences for our mobile and web apps. Work closely with product managers and engineers to create beautiful, functional interfaces.',
     '3+ years UX/UI; strong portfolio; expert Figma; design systems; mobile patterns; strong visual design.', 'open'),
    (emp_picsart, 'QA Engineer', 'Picsart', 'Yerevan', 'full-time', 800000, 1200000,
     'Ensure quality across our product suite by designing and executing test strategies. Work with development teams to identify bugs and improve the user experience.',
     '2+ years QA; manual and automated testing; testing methodologies; Jira; basic test automation; attention to detail.', 'open'),
    (emp_picsart, 'DevOps Intern', 'Picsart', 'Yerevan', 'internship', 300000, 500000,
     'Learn and grow with our infrastructure team. A great opportunity for students or recent graduates to gain hands-on experience with cloud and DevOps practices.',
     'Enrolled in CS/IT or recent grad; basic Linux; interest in cloud/DevOps; Git; eagerness to learn; basic Bash/Python a plus.', 'open'),

    (emp_teamviewer, 'Full Stack Developer', 'TeamViewer Armenia', 'Yerevan', 'full-time', 1300000, 2000000,
     'Build features for our remote access products used by millions worldwide. Work on both frontend and backend components of core TeamViewer products.',
     '3+ years full-stack; React or Angular; .NET or Java; SQL; REST APIs; Git.', 'open'),
    (emp_teamviewer, 'Security Engineer', 'TeamViewer Armenia', 'Yerevan', 'full-time', 1600000, 2400000,
     'Protect our platform and users from security threats. Identify vulnerabilities, implement security measures, and ensure products meet the highest standards.',
     '4+ years security engineering; OWASP Top 10; security tooling; CISSP/CEH preferred; network security; secure coding.', 'open'),
    (emp_teamviewer, 'Technical Writer', 'TeamViewer Armenia', 'Remote', 'part-time', 400000, 700000,
     'Create documentation for our developer APIs and internal tools. A part-time role for someone with strong writing skills and a technical background who wants flexible hours.',
     '2+ years technical writing; excellent English; explains technical concepts; Markdown/Confluence; basic REST APIs; detail-oriented.', 'open'),
    (emp_teamviewer, 'Mobile Developer', 'TeamViewer Armenia', 'Yerevan', 'full-time', 1200000, 1900000,
     'Work on our iOS and Android applications used for remote device access. Develop new features and improve existing functionality for our mobile remote control solutions.',
     '2+ years mobile; Swift (iOS) or Kotlin (Android); mobile architecture patterns; performance optimization; mobile security; published apps.', 'open'),
    (emp_teamviewer, 'Support Engineer', 'TeamViewer Armenia', 'Yerevan', 'full-time', 600000, 900000,
     'Help customers resolve technical issues with our remote connectivity products. This position has been filled.',
     '1+ years technical support; strong communication; problem-solving; basic networking; ticketing systems; fluent English.', 'closed'),

    (emp_servicetitan, 'Software Engineer', 'ServiceTitan', 'Yerevan', 'full-time', 1400000, 2100000,
     'Build features for our field service management platform used by thousands of contractors. Work on our core platform helping home service businesses grow.',
     '3+ years software development; C# and .NET; Angular or React; SQL; design patterns; agile.', 'open'),
    (emp_servicetitan, 'Data Engineer', 'ServiceTitan', 'Yerevan', 'full-time', 1500000, 2300000,
     'Build data pipelines and analytics infrastructure. Design and implement data solutions that enable customers and internal teams to make data-driven decisions.',
     '3+ years data engineering; strong Python; Apache Spark or similar; AWS data services; SQL; data modeling.', 'open'),
    (emp_servicetitan, 'Product Manager', 'ServiceTitan', 'Yerevan', 'full-time', 1800000, 2800000,
     'Define product strategy and roadmap for our field service management features. Work with customers, designers, and engineers to solve real problems for home service businesses.',
     '3+ years product management; strong analytics; excellent communication; technical background preferred; B2B SaaS; agile.', 'open'),
    (emp_servicetitan, 'UI/UX Designer', 'ServiceTitan', 'Remote', 'remote', 1000000, 1600000,
     'Design beautiful and functional interfaces for our platform. Create user-centered designs that make complex business workflows simple and intuitive.',
     '2+ years UI/UX; strong portfolio; Figma; user research; accessibility standards; design systems.', 'open'),
    (emp_servicetitan, 'Marketing Intern', 'ServiceTitan', 'Yerevan', 'internship', 250000, 400000,
     'Support marketing campaigns and content creation. A great opportunity for students interested in tech marketing to gain hands-on experience at a growing company.',
     'Enrolled in Marketing/Communications; interest in SaaS; strong writing; social media; basic design (Canva) a plus; eager to learn.', 'open')
  ) AS v(employer_id, title, company_name, location, job_type, salary_min, salary_max, description, requirements, status)
  WHERE NOT EXISTS (
    SELECT 1 FROM jobs j WHERE j.employer_id = v.employer_id AND j.title = v.title
  );

  -- ========================================================================
  -- APPLICATIONS (job_id resolved by employer + title)
  -- ========================================================================
  INSERT INTO applications (job_id, candidate_id, cover_letter, resume_url, status, applied_at)
  SELECT j.id, v.candidate_id, v.cover_letter, v.resume_url, v.status, v.applied_at
  FROM (VALUES
    (emp_picsart,      'Senior React Developer', cand_armen,
      'I am excited to apply for the Senior React Developer position at Picsart. With 5+ years building React applications, I can contribute to your engineering team and help empower millions of creators.',
      'https://drive.google.com/file/d/example-armen-resume', 'reviewing', NOW() - INTERVAL '5 days'),
    (emp_teamviewer,   'Full Stack Developer', cand_armen,
      'I am writing to express my interest in the Full Stack Developer position at TeamViewer Armenia. My background spans React and Node.js, plus SQL and REST APIs, and I love building real-time, low-latency products.',
      'https://drive.google.com/file/d/example-armen-resume', 'interview', NOW() - INTERVAL '10 days'),
    (emp_picsart,      'Backend Engineer', cand_armen,
      'I am applying for the Backend Engineer position. While my primary experience is frontend, I have been expanding my Node.js skills and have built several API services I would love to grow further at Picsart.',
      'https://drive.google.com/file/d/example-armen-resume', 'applied', NOW() - INTERVAL '1 day'),
    (emp_teamviewer,   'Mobile Developer', cand_armen,
      'I am interested in the Mobile Developer position. My primary experience is web development, but I have been learning React Native and published a simple app on the Play Store.',
      NULL, 'rejected', NOW() - INTERVAL '20 days'),
    (emp_servicetitan, 'Software Engineer', cand_anna,
      'I am excited to apply for the Software Engineer position at ServiceTitan. As a Python developer broadening into full-stack, I am drawn to your stack and mission, and I ramp up quickly on new languages.',
      'https://drive.google.com/file/d/example-anna-resume', 'applied', NOW() - INTERVAL '2 days'),
    (emp_servicetitan, 'Data Engineer', cand_anna,
      'I am thrilled to apply for the Data Engineer position. With 3 years building ETL pipelines processing millions of records daily in Python, Spark, and AWS, I can make an immediate impact.',
      'https://drive.google.com/file/d/example-anna-resume', 'offer', NOW() - INTERVAL '15 days'),
    (emp_picsart,      'Backend Engineer', cand_anna,
      'I am applying for the Backend Engineer position at Picsart. My background in Python, Django, PostgreSQL, and AWS aligns well, and I am fascinated by the scale at which Picsart operates.',
      'https://drive.google.com/file/d/example-anna-resume', 'reviewing', NOW() - INTERVAL '7 days')
  ) AS v(employer_id, job_title, candidate_id, cover_letter, resume_url, status, applied_at)
  JOIN jobs j ON j.employer_id = v.employer_id AND j.title = v.job_title
  ON CONFLICT (job_id, candidate_id) DO UPDATE SET
    cover_letter = EXCLUDED.cover_letter,
    status = EXCLUDED.status,
    applied_at = EXCLUDED.applied_at;

  -- ========================================================================
  -- SAVED JOBS (job_id resolved by employer + title)
  -- ========================================================================
  INSERT INTO saved_jobs (job_id, candidate_id, saved_at)
  SELECT j.id, v.candidate_id, v.saved_at
  FROM (VALUES
    (emp_picsart,      'Product Designer', cand_armen, NOW() - INTERVAL '3 days'),
    (emp_servicetitan, 'Product Manager',  cand_armen, NOW() - INTERVAL '6 days'),
    (emp_teamviewer,   'Security Engineer', cand_armen, NOW() - INTERVAL '8 days'),
    (emp_servicetitan, 'UI/UX Designer',   cand_anna,  NOW() - INTERVAL '4 days'),
    (emp_servicetitan, 'Product Manager',  cand_anna,  NOW() - INTERVAL '5 days')
  ) AS v(employer_id, job_title, candidate_id, saved_at)
  JOIN jobs j ON j.employer_id = v.employer_id AND j.title = v.job_title
  ON CONFLICT (job_id, candidate_id) DO NOTHING;

  RAISE NOTICE 'Seed complete: 5 profiles, 15 jobs, 7 applications, 5 saved jobs.';
END $$;

-- ============================================================================
-- VERIFICATION (run separately after seeding)
-- ============================================================================
-- SELECT role, count(*) FROM profiles GROUP BY role;
-- SELECT status, count(*) FROM jobs GROUP BY status;
-- SELECT company_name, count(*) FROM jobs GROUP BY company_name ORDER BY company_name;
-- SELECT status, count(*) FROM applications GROUP BY status;
-- SELECT count(*) FROM saved_jobs;
