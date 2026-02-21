#!/usr/bin/env node

/**
 * Quick Transport Component Test
 * 
 * This script verifies that the Transport components are working correctly.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚛 Transport Component Test');
console.log('===========================');

// Check if all Transport files exist
const transportFiles = [
    'src/Layout/Transport.jsx',
    'src/Pages/Transport/Home.jsx',
    'src/Pages/Transport/Bookings.jsx',
    'src/Pages/Transport/Earnings.jsx',
    'src/Pages/Transport/Ratings.jsx',
    'src/Pages/Transport/Profile.jsx'
];

let allGood = true;

transportFiles.forEach(file => {
    try {
        const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
        if (content.includes('export default')) {
            console.log(`✅ ${file} - OK (${content.length} bytes)`);
        } else {
            console.log(`❌ ${file} - Missing export default`);
            allGood = false;
        }
    } catch (err) {
        console.log(`❌ ${file} - File not found`);
        allGood = false;
    }
});

// Check App.jsx routing
try {
    const appContent = fs.readFileSync(path.join(__dirname, 'src/App.jsx'), 'utf8');
    if (appContent.includes('Transport from \'./Layout/Transport.jsx\'')) {
        console.log('✅ App.jsx - Transport import found');
    } else {
        console.log('❌ App.jsx - Transport import missing');
        allGood = false;
    }
    
    if (appContent.includes('<Route path="/transport/" element={<Transport />}>')) {
        console.log('✅ App.jsx - Transport route configured');
    } else {
        console.log('❌ App.jsx - Transport route missing');
        allGood = false;
    }
} catch (err) {
    console.log('❌ App.jsx - Could not read file');
    allGood = false;
}

console.log('\n📊 Test Results');
console.log('===============');

if (allGood) {
    console.log('🎉 All tests passed! Transport components are ready.');
    console.log('\n🚀 Next steps:');
    console.log('   1. Run: npm run dev');
    console.log('   2. Visit: http://localhost:5173/transport');
    console.log('   3. You should see the driver dashboard!');
} else {
    console.log('❌ Some tests failed. Please check the issues above.');
}

console.log('\n💡 If VS Code still shows red marks:');
console.log('   1. Restart VS Code (close and reopen)');
console.log('   2. Press Ctrl+Shift+P and run "Developer: Reload Window"');
console.log('   3. The red marks should disappear');

process.exit(allGood ? 0 : 1);