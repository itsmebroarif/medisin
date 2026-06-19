const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('==================================================');
console.log('🏥 CLINIC MANAGEMENT SYSTEM (MEDISIN) - SETUP SCRIPT');
console.log('==================================================\n');

function runCmd(command, cwd, failOnError = true) {
  console.log(`\nExecuting: "${command}" in ${cwd ? path.relative(__dirname, cwd) : 'root'}`);
  try {
    execSync(command, { cwd, stdio: 'inherit', shell: true });
    return true;
  } catch (error) {
    if (failOnError) {
      console.error(`❌ Error executing command: ${command}`);
      process.exit(1);
    } else {
      console.warn(`⚠️ Warning: Command failed but setup will continue: ${command}`);
      return false;
    }
  }
}

// 1. Dependency Checks
console.log('🔍 Checking prerequisites...');

// Check Node.js
try {
  const nodeVersion = execSync('node -v').toString().trim();
  console.log(`✅ Node.js: ${nodeVersion}`);
  const majorNode = parseInt(nodeVersion.replace('v', '').split('.')[0], 10);
  if (majorNode < 22) {
    console.log(`⚠️ Warning: Node.js 22 or higher is recommended (current: ${nodeVersion}).`);
  }
} catch (e) {
  console.error('❌ Node.js is not installed. Please install Node.js (version 22 is recommended).');
  process.exit(1);
}

// Check PHP
try {
  const phpVersionLine = execSync('php -v').toString().split('\n')[0];
  console.log(`✅ PHP: ${phpVersionLine}`);
  const match = phpVersionLine.match(/PHP (\d+\.\d+)/);
  if (match) {
    const version = parseFloat(match[1]);
    if (version < 8.3) {
      console.log(`⚠️ Warning: PHP 8.3 or higher is recommended (current: ${match[1]}).`);
    }
  }
} catch (e) {
  console.error('❌ PHP is not installed or not in PATH. Please install PHP (version 8.3 is recommended).');
  process.exit(1);
}

// Check Composer
try {
  const composerVersion = execSync('composer --version').toString().split('\n')[0];
  console.log(`✅ Composer: ${composerVersion}`);
} catch (e) {
  console.error('❌ Composer is not installed or not in PATH. Please install Composer.');
  process.exit(1);
}

// 2. Setup Backend
const backendDir = path.join(__dirname, 'backend');
console.log('\n--- Setting up Backend (Laravel) ---');

// Composer install
runCmd('composer install', backendDir);

// Copy .env
const envPath = path.join(backendDir, '.env');
const envExamplePath = path.join(backendDir, '.env.example');
let isSqlite = false;

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from .env.example...');
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✅ Created .env file.');
} else {
  console.log('ℹ️ .env file already exists.');
}

// Check database type and create sqlite if applicable
try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('DB_CONNECTION=sqlite')) {
    isSqlite = true;
    const dbPath = path.join(backendDir, 'database', 'database.sqlite');
    if (!fs.existsSync(dbPath)) {
      console.log('📝 Creating SQLite database file...');
      fs.writeFileSync(dbPath, '');
      console.log('✅ Created database/database.sqlite');
    } else {
      console.log('ℹ️ SQLite database file already exists.');
    }
  }
} catch (e) {
  console.warn('⚠️ Could not check/create SQLite database:', e.message);
}

// Generate key
runCmd('php artisan key:generate', backendDir);

// Run migrations (non-fatal if database is not configured yet)
console.log('\n🗄️ Running migrations...');
const migrationSuccess = runCmd('php artisan migrate --force', backendDir, false);
if (!migrationSuccess) {
  console.log('\n💡 Tip: If you are using MySQL or PostgreSQL, edit backend/.env first, then run:');
  console.log('   cd backend && php artisan migrate');
}

// Install backend npm deps (required for Vite asset compilation in Laravel if needed)
runCmd('npm install', backendDir);

// 3. Setup Frontend
const frontendDir = path.join(__dirname, 'frontend');
console.log('\n--- Setting up Frontend (Quasar) ---');

// Install frontend npm deps
runCmd('npm install', frontendDir);

console.log('\n==================================================');
console.log('🎉 Setup completed successfully!');
console.log('==================================================');
console.log('To run the application, use:');
console.log('👉 npm run serve');
console.log('==================================================');
