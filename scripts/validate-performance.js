#!/usr/bin/env node

/**
 * Performance Optimization Validation Script
 * Checks all optimizations are in place before deployment
 */

const fs = require('fs');
const path = require('path');

const checks = [];
let passedCount = 0;
let failedCount = 0;

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  checks.push({
    name: description,
    status: exists ? '✅' : '❌',
    passed: exists
  });
  if (exists) passedCount++;
  else failedCount++;
  return exists;
}

function checkFileContent(filePath, searchString, description) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const exists = content.includes(searchString);
    checks.push({
      name: description,
      status: exists ? '✅' : '❌',
      passed: exists
    });
    if (exists) passedCount++;
    else failedCount++;
    return exists;
  } catch (error) {
    checks.push({
      name: description,
      status: '❌',
      passed: false,
      error: error.message
    });
    failedCount++;
    return false;
  }
}

function checkFileContentAbsent(filePath, searchString, description) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const absent = !content.includes(searchString);
    checks.push({
      name: description,
      status: absent ? '✅' : '❌',
      passed: absent
    });
    if (absent) passedCount++;
    else failedCount++;
    return absent;
  } catch (error) {
    checks.push({
      name: description,
      status: '❌',
      passed: false,
      error: error.message
    });
    failedCount++;
    return false;
  }
}

function checkJSONValid(filePath, description) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    JSON.parse(content);
    checks.push({
      name: description,
      status: '✅',
      passed: true
    });
    passedCount++;
    return true;
  } catch (error) {
    checks.push({
      name: description,
      status: '❌',
      passed: false,
      error: error.message
    });
    failedCount++;
    return false;
  }
}

console.log('🔍 Validating Performance Optimizations...\n');

// Check optimized logo files exist
checkFile('src/assets/images/logo-100.webp', 'Logo 100w exists');
checkFile('src/assets/images/logo-200.webp', 'Logo 200w exists');
checkFile('src/assets/images/logo-500.webp', 'Logo 500w exists');

// Check Logo component uses srcset
checkFileContent(
  'src/components/Logo/Logo.jsx',
  'srcSet',
  'Logo component uses srcSet'
);
checkFileContent(
  'src/components/Logo/Logo.jsx',
  'decoding="async"',
  'Logo uses async decoding'
);

// Check index.html optimizations
checkFileContentAbsent(
  'public/index.html',
  'https://lhyygqlwwttmqghdrvlh.supabase.co',
  'Unused Supabase preconnect removed'
);
checkFileContent(
  'public/index.html',
  'fonts.googleapis.com',
  'Google Fonts preconnect added'
);
checkFileContent(
  'public/index.html',
  'dns-prefetch',
  'DNS prefetch hints added'
);

// Check llms.txt has proper markdown links and valid job listings URL
checkFileContent(
  'public/llms.txt',
  'https://joblist-am.vercel.app/jobs',
  'llms.txt links to the live jobs route'
);

// Check ai-catalog.json is valid
checkJSONValid('public/ai-catalog.json', 'ai-catalog.json is valid JSON');

// Check build script includes optimization
checkFileContent(
  'package.json',
  'optimize:images',
  'Build pipeline includes image optimization'
);
checkFileContent(
  'package.json',
  'inline-build-css.js',
  'Production build inlines the generated stylesheet'
);
checkFile(
  'scripts/inline-build-css.js',
  'Production CSS inlining script exists'
);
checkFileContent(
  '.env.production',
  'GENERATE_SOURCEMAP=false',
  'Production build omits inaccessible source maps'
);

// Check optimization script exists
checkFile('scripts/optimize-images.js', 'Image optimization script exists');

// Print results
console.log('━'.repeat(60));
console.log('Validation Results:\n');
checks.forEach(check => {
  console.log(`${check.status} ${check.name}`);
  if (check.error) {
    console.log(`   Error: ${check.error}`);
  }
});

console.log('\n' + '━'.repeat(60));
console.log(`\n📊 Summary: ${passedCount} passed, ${failedCount} failed\n`);

if (failedCount > 0) {
  console.log('❌ Some optimizations are missing. Please review and fix.\n');
  process.exit(1);
} else {
  console.log('✅ All optimizations validated successfully!\n');
  console.log('These checks verify source configuration only; run Lighthouse after deployment to measure performance.\n');
  process.exit(0);
}
