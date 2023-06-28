const { execSync } = require('child_process');

const versionBumpType = process.argv[2] || 'patch';

try {
  execSync(`npm version ${versionBumpType}`);
} catch (error) {
  console.error('Version bump failed:', error.message);
  process.exit(1);
}
