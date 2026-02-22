#!/usr/bin/env node

/**
 * Deployment Readiness Checker for Moveryy Web Application
 * 
 * This script verifies that all necessary files and configurations
 * are in place for successful deployment.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Helper functions
const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const success = (message) => log(`✅ ${message}`, 'green');
const error = (message) => log(`❌ ${message}`, 'red');
const warning = (message) => log(`⚠️  ${message}`, 'yellow');
const info = (message) => log(`ℹ️  ${message}`, 'blue');

// Check if file exists
const fileExists = (filePath) => {
  try {
    return fs.existsSync(path.join(__dirname, filePath));
  } catch (err) {
    return false;
  }
};

// Check if directory exists
const dirExists = (dirPath) => {
  try {
    return fs.existsSync(path.join(__dirname, dirPath)) && 
           fs.lstatSync(path.join(__dirname, dirPath)).isDirectory();
  } catch (err) {
    return false;
  }
};

// Read and parse JSON file
const readJsonFile = (filePath) => {
  try {
    const content = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
    return JSON.parse(content);
  } catch (err) {
    return null;
  }
};

// Main deployment check function
const checkDeploymentReadiness = () => {
  log('\n🚚 Moveryy Deployment Readiness Check', 'cyan');
  log('=====================================', 'cyan');

  let issues = 0;
  let warnings = 0;

  // 1. Check essential files
  info('\n📁 Checking essential files...');
  
  const essentialFiles = [
    'package.json',
    'vite.config.js',
    'index.html',
    'src/main.jsx',
    'src/App.jsx',
    '.gitignore'
  ];

  essentialFiles.forEach(file => {
    if (fileExists(file)) {
      success(`${file} exists`);
    } else {
      error(`${file} is missing`);
      issues++;
    }
  });

  // 2. Check deployment configuration files
  info('\n🚀 Checking deployment configuration...');
  
  const deploymentFiles = [
    { file: 'vercel.json', platform: 'Vercel' },
    { file: 'netlify.toml', platform: 'Netlify' },
    { file: 'Dockerfile', platform: 'Docker' },
    { file: 'docker-compose.yml', platform: 'Docker Compose' },
    { file: 'nginx.conf', platform: 'Nginx' }
  ];

  deploymentFiles.forEach(({ file, platform }) => {
    if (fileExists(file)) {
      success(`${file} configured for ${platform}`);
    } else {
      warning(`${file} missing - ${platform} deployment not configured`);
      warnings++;
    }
  });

  // 3. Check deployment scripts
  info('\n📜 Checking deployment scripts...');
  
  const deploymentScripts = [
    { file: 'deploy.sh', platform: 'Unix/Linux/Mac' },
    { file: 'deploy.bat', platform: 'Windows' }
  ];

  deploymentScripts.forEach(({ file, platform }) => {
    if (fileExists(file)) {
      success(`${file} available for ${platform}`);
    } else {
      error(`${file} missing for ${platform}`);
      issues++;
    }
  });

  // 4. Check package.json configuration
  info('\n📦 Checking package.json configuration...');
  
  const packageJson = readJsonFile('package.json');
  if (packageJson) {
    success('package.json is valid JSON');
    
    // Check required scripts
    const requiredScripts = ['dev', 'build', 'preview', 'lint'];
    requiredScripts.forEach(script => {
      if (packageJson.scripts && packageJson.scripts[script]) {
        success(`Script "${script}" is defined`);
      } else {
        error(`Script "${script}" is missing`);
        issues++;
      }
    });

    // Check dependencies
    const requiredDeps = ['react', 'react-dom', 'react-router-dom'];
    requiredDeps.forEach(dep => {
      if (packageJson.dependencies && packageJson.dependencies[dep]) {
        success(`Dependency "${dep}" is installed`);
      } else {
        error(`Dependency "${dep}" is missing`);
        issues++;
      }
    });

    // Check engines
    if (packageJson.engines && packageJson.engines.node) {
      success(`Node.js version requirement: ${packageJson.engines.node}`);
    } else {
      warning('Node.js version not specified in engines');
      warnings++;
    }
  } else {
    error('package.json is invalid or missing');
    issues++;
  }

  // 5. Check source code structure
  info('\n🏗️  Checking source code structure...');
  
  const requiredDirs = [
    'src',
    'src/Layout',
    'src/Pages',
    'src/Pages/User',
    'src/Pages/Admin',
    'src/Pages/Transport'
  ];

  requiredDirs.forEach(dir => {
    if (dirExists(dir)) {
      success(`Directory "${dir}" exists`);
    } else {
      error(`Directory "${dir}" is missing`);
      issues++;
    }
  });

  // 6. Check Transport components
  info('\n🚛 Checking Transport dashboard components...');
  
  const transportFiles = [
    'src/Layout/Transport.jsx',
    'src/Pages/Transport/Home.jsx',
    'src/Pages/Transport/Bookings.jsx',
    'src/Pages/Transport/Earnings.jsx',
    'src/Pages/Transport/Ratings.jsx',
    'src/Pages/Transport/Profile.jsx'
  ];

  transportFiles.forEach(file => {
    if (fileExists(file)) {
      success(`${file} exists`);
    } else {
      error(`${file} is missing`);
      issues++;
    }
  });

  // 7. Check environment configuration
  info('\n🔧 Checking environment configuration...');
  
  if (fileExists('.env.example')) {
    success('.env.example template exists');
  } else {
    warning('.env.example template missing');
    warnings++;
  }

  if (fileExists('.env')) {
    warning('.env file exists (should not be committed to git)');
  } else {
    info('.env file not present (will need to be created for deployment)');
  }

  // 8. Check CI/CD configuration
  info('\n🔄 Checking CI/CD configuration...');
  
  if (fileExists('.github/workflows/deploy.yml')) {
    success('GitHub Actions workflow configured');
  } else {
    warning('GitHub Actions workflow not configured');
    warnings++;
  }

  // 9. Check documentation
  info('\n📚 Checking documentation...');
  
  const docFiles = [
    { file: 'README.md', desc: 'Project documentation' },
    { file: 'DEPLOYMENT.md', desc: 'Deployment guide' },
    { file: 'LICENSE', desc: 'License file' }
  ];

  docFiles.forEach(({ file, desc }) => {
    if (fileExists(file)) {
      success(`${file} - ${desc}`);
    } else {
      warning(`${file} missing - ${desc}`);
      warnings++;
    }
  });

  // Final summary
  log('\n📊 Deployment Readiness Summary', 'cyan');
  log('================================', 'cyan');

  if (issues === 0 && warnings === 0) {
    success('🎉 Perfect! Your application is ready for deployment!');
    log('\n🚀 You can now deploy using:', 'green');
    log('   • ./deploy.sh (Unix/Linux/Mac)', 'green');
    log('   • ./deploy.bat (Windows)', 'green');
    log('   • npm run deploy', 'green');
  } else if (issues === 0) {
    success(`✅ Your application is ready for deployment!`);
    warning(`⚠️  ${warnings} optional configuration(s) missing`);
    log('\n🚀 You can deploy, but consider addressing the warnings for better experience.', 'yellow');
  } else {
    error(`❌ ${issues} critical issue(s) found that must be fixed before deployment`);
    if (warnings > 0) {
      warning(`⚠️  ${warnings} warning(s) that should be addressed`);
    }
    log('\n🔧 Please fix the issues above before deploying.', 'red');
  }

  log('\n📖 For detailed deployment instructions, see DEPLOYMENT.md', 'blue');
  
  return issues === 0;
};

// Run the check
const isReady = checkDeploymentReadiness();
process.exit(isReady ? 0 : 1);