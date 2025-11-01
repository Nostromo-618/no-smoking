#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runCommand(command, cwd = __dirname) {
  console.log(`Running: ${command}`);
  try {
    const result = execSync(command, { 
      cwd, 
      encoding: 'utf8',
      stdio: 'inherit'
    });
    return result;
  } catch (error) {
    console.error(`Command failed: ${command}`);
    throw error;
  }
}

function cleanDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    for (const file of fs.readdirSync(dirPath)) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Recursively remove directories
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        // Remove files
        fs.unlinkSync(filePath);
      }
    }
  }
}

async function deployToGitHubPages() {
  try {
    console.log('🚀 Starting deployment to GitHub Pages...');
    
    // Check if we're on main branch
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    if (currentBranch !== 'main') {
      console.log('Switching to main branch...');
      runCommand('git checkout main');
    }
    
    // Commit any pending changes before deploying
    console.log('💾 Committing any pending changes...');
    try {
      runCommand('git add .');
      runCommand('git commit -m "📝 Auto-commit before deployment" || true'); // Don't fail if no changes
    } catch (error) {
      // Ignore commit errors (no changes to commit)
      console.log('No changes to commit, continuing with deployment...');
    }
    
    // Step 1: Build the project
    console.log('📦 Building project...');
    runCommand('npm run build');
    
    // Step 2: Check if dist folder exists
    if (!fs.existsSync('./dist')) {
      throw new Error('Dist folder not found after build!');
    }
    
    // Step 3: Get current branch and switch to gh-pages
    console.log('📄 Switching to gh-pages branch...');
    runCommand('git checkout gh-pages');
    
    // Step 4: Clean gh-pages branch (remove all files except .git)
    console.log('🧹 Cleaning gh-pages branch...');
    for (const file of fs.readdirSync('.')) {
      if (file !== '.git' && file !== 'node_modules' && !fs.statSync(file).isDirectory() || (fs.statSync(file).isDirectory() && file !== '.git')) {
        const itemPath = path.join('.', file);
        if (fs.statSync(itemPath).isDirectory()) {
          fs.rmSync(itemPath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(itemPath);
        }
      }
    }
    
    // Step 5: Copy dist contents to root
    console.log('📂 Copying build files to gh-pages...');
    const distFiles = fs.readdirSync('./dist');
    for (const file of distFiles) {
      const srcPath = path.join('./dist', file);
      const destPath = path.join('./', file);
      
      if (fs.statSync(srcPath).isDirectory()) {
        fs.cpSync(srcPath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
    
    // Step 6: Add .nojekyll file to prevent Jekyll processing
    fs.writeFileSync('./.nojekyll', '');
    
    // Step 7: Commit and push
    console.log('📤 Committing and pushing to GitHub...');
    runCommand('git add .');
    runCommand('git commit -m "🚀 Auto-deploy: Update gh-pages with latest build"');
    runCommand('git push origin gh-pages');
    
    // Step 8: Switch back to main
    console.log('🔄 Switching back to main branch...');
    runCommand('git checkout main');
    
    console.log('✅ Deployment completed successfully!');
    console.log('🌐 Your site is now available at: https://nostromo-618.github.io/no-smoking/');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    
    // Try to switch back to main branch on failure
    try {
      runCommand('git checkout main');
    } catch (switchError) {
      console.error('Failed to switch back to main branch:', switchError.message);
    }
    
    process.exit(1);
  }
}

// Run the deployment
deployToGitHubPages();