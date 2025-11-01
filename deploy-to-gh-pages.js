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
    
    // Check if dist folder exists (user should run npm run build first)
    if (!fs.existsSync('./dist')) {
      throw new Error('❌ Dist folder not found! Please run "npm run build" first, then try again.');
    }
    
    // Store dist files info before switching branches
    console.log('📁 Storing dist files info...');
    const distPath = path.join(__dirname, 'dist');
    const distFiles = fs.readdirSync(distPath);
    
    // Switch to gh-pages branch
    console.log('📄 Switching to gh-pages branch...');
    runCommand('git checkout gh-pages');
    
    // Clean gh-pages branch (remove all files except .git)
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
    
    // Copy dist contents to root
    console.log('📂 Copying build files to gh-pages...');
    for (const file of distFiles) {
      // Skip system files like .DS_Store, Thumbs.db, etc.
      if (file.startsWith('.DS_Store') || file.startsWith('Thumbs.db') || file.startsWith('desktop.ini')) {
        console.log(`⏭️  Skipping system file: ${file}`);
        continue;
      }
      
      const srcPath = path.join(__dirname, 'dist', file);
      const destPath = path.join('./', file);
      
      try {
        if (fs.statSync(srcPath).isDirectory()) {
          fs.cpSync(srcPath, destPath, { recursive: true });
          console.log(`📁 Copied directory: ${file}`);
        } else {
          fs.copyFileSync(srcPath, destPath);
          console.log(`📄 Copied file: ${file}`);
        }
      } catch (error) {
        console.log(`⚠️  Skipped ${file}: ${error.message}`);
      }
    }
    
    // Add .nojekyll file to prevent Jekyll processing
    const nojekyllPath = './.nojekyll';
    if (!fs.existsSync(nojekyllPath)) {
      fs.writeFileSync(nojekyllPath, '');
      console.log('📄 Created .nojekyll file');
    }
    
    // Commit and push
    console.log('📤 Committing and pushing to GitHub...');
    runCommand('git add .');
    runCommand('git commit -m "🚀 Auto-deploy: Update gh-pages with latest build"');
    runCommand('git push origin gh-pages');
    
    // Switch back to main
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