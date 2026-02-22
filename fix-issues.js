#!/usr/bin/env node

/**
 * Issue Diagnostic and Fix Script
 * 
 * This script identifies and fixes common issues that prevent
 * the Transport components from working properly.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Moveryy Issue Diagnostic & Fix Script');
console.log('========================================');

// Check if all Transport files exist and are valid
const checkTransportFiles = () => {
  console.log('\n📁 Checking Transport files...');
  
  const files = [
    'src/Layout/Transport.jsx',
    'src/Pages/Transport/Home.jsx',
    'src/Pages/Transport/Bookings.jsx',
    'src/Pages/Transport/Earnings.jsx',
    'src/Pages/Transport/Ratings.jsx',
    'src/Pages/Transport/Profile.jsx'
  ];

  let allValid = true;

  files.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
      if (content.length < 100) {
        console.log(`❌ ${file} is too small (${content.length} bytes)`);
        allValid = false;
      } else if (!content.includes('export default')) {
        console.log(`❌ ${file} missing export default`);
        allValid = false;
      } else {
        console.log(`✅ ${file} is valid (${content.length} bytes)`);
      }
    } catch (err) {
      console.log(`❌ ${file} not found or unreadable`);
      allValid = false;
    }
  });

  return allValid;
};

// Check App.jsx routing
const checkRouting = () => {
  console.log('\n🔗 Checking App.jsx routing...');
  
  try {
    const appContent = fs.readFileSync(path.join(__dirname, 'src/App.jsx'), 'utf8');
    
    const requiredImports = [
      'Transport from \'./Layout/Transport.jsx\'',
      'TransportHome from \'./Pages/Transport/Home.jsx\''
    ];

    const requiredRoutes = [
      '<Route path="/transport/" element={<Transport />}>',
      '<Route index element={<TransportHome />} />'
    ];

    let routingValid = true;

    requiredImports.forEach(imp => {
      if (!appContent.includes(imp)) {
        console.log(`❌ Missing import: ${imp}`);
        routingValid = false;
      } else {
        console.log(`✅ Import found: ${imp}`);
      }
    });

    requiredRoutes.forEach(route => {
      if (!appContent.includes(route)) {
        console.log(`❌ Missing route: ${route}`);
        routingValid = false;
      } else {
        console.log(`✅ Route found: ${route}`);
      }
    });

    return routingValid;
  } catch (err) {
    console.log('❌ Could not read App.jsx');
    return false;
  }
};

// Check for common syntax issues
const checkSyntax = () => {
  console.log('\n🔍 Checking for syntax issues...');
  
  const files = [
    'src/Layout/Transport.jsx',
    'src/Pages/Transport/Home.jsx'
  ];

  let syntaxValid = true;

  files.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
      
      // Check for common issues
      const issues = [];
      
      if (!content.includes('import React')) {
        issues.push('Missing React import');
      }
      
      if (!content.includes('export default')) {
        issues.push('Missing export default');
      }
      
      // Check for unmatched brackets
      const openBraces = (content.match(/{/g) || []).length;
      const closeBraces = (content.match(/}/g) || []).length;
      if (openBraces !== closeBraces) {
        issues.push(`Unmatched braces: ${openBraces} open, ${closeBraces} close`);
      }

      if (issues.length > 0) {
        console.log(`❌ ${file} has issues:`);
        issues.forEach(issue => console.log(`   • ${issue}`));
        syntaxValid = false;
      } else {
        console.log(`✅ ${file} syntax looks good`);
      }
    } catch (err) {
      console.log(`❌ Could not check ${file}: ${err.message}`);
      syntaxValid = false;
    }
  });

  return syntaxValid;
};

// Main diagnostic function
const runDiagnostic = () => {
  const filesValid = checkTransportFiles();
  const routingValid = checkRouting();
  const syntaxValid = checkSyntax();

  console.log('\n📊 Diagnostic Summary');
  console.log('====================');
  console.log(`Files: ${filesValid ? '✅ Valid' : '❌ Issues found'}`);
  console.log(`Routing: ${routingValid ? '✅ Valid' : '❌ Issues found'}`);
  console.log(`Syntax: ${syntaxValid ? '✅ Valid' : '❌ Issues found'}`);

  if (filesValid && routingValid && syntaxValid) {
    console.log('\n🎉 All checks passed! Your Transport components should work.');
    console.log('\n🚀 Try running: npm run dev');
    console.log('   Then visit: http://localhost:5173/transport');
  } else {
    console.log('\n🔧 Issues found. Here are some solutions:');
    
    if (!filesValid) {
      console.log('\n📁 File Issues:');
      console.log('   • Make sure all Transport files are saved');
      console.log('   • Check that files are not empty');
      console.log('   • Verify file permissions');
    }
    
    if (!routingValid) {
      console.log('\n🔗 Routing Issues:');
      console.log('   • Check App.jsx imports');
      console.log('   • Verify route configuration');
      console.log('   • Make sure component names match');
    }
    
    if (!syntaxValid) {
      console.log('\n🔍 Syntax Issues:');
      console.log('   • Check for missing imports');
      console.log('   • Verify all brackets are matched');
      console.log('   • Look for missing export statements');
    }
  }

  console.log('\n🆘 If issues persist:');
  console.log('   1. Restart VS Code');
  console.log('   2. Run: npm install');
  console.log('   3. Clear browser cache');
  console.log('   4. Check browser console for errors');
};

// Run the diagnostic
runDiagnostic();