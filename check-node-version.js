#!/usr/bin/env node

const { execSync } = require('child_process');
const semver = require('semver');

const REQUIRED_VERSION = '20.11.0';
const currentVersion = process.version;

console.log('\n🔍 Checking Node.js version compatibility...\n');
console.log(`Current Node.js version: ${currentVersion}`);
console.log(`Required Node.js version: >= ${REQUIRED_VERSION}`);

if (semver.gte(currentVersion, REQUIRED_VERSION)) {
  console.log('✅ Node.js version is compatible!');
  console.log('\n🚀 You can now run:');
  console.log('   npm run dev    # Start development server');
  console.log('   npm run build  # Build for production');
  console.log('   npm run start  # Start production server');
} else {
  console.log('❌ Node.js version is incompatible!');
  console.log('\n📖 This project uses import.meta.dirname which requires Node.js 20.11+');
  console.log('\n🔧 To fix this issue:');
  console.log('   1. Install Node.js 20+ from: https://nodejs.org/');
  console.log('   2. Or use nvm: nvm install 20 && nvm use 20');
  console.log('   3. Restart your terminal');
  console.log('   4. Run: npm install');
  console.log('   5. Try npm run dev again');
  
  console.log('\n❓ Error details:');
  console.log('   TypeError: The "paths[0]" argument must be of type string. Received undefined');
  console.log('   This happens because import.meta.dirname is undefined in Node.js < 20.11');
  
  process.exit(1);
}