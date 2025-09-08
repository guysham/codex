const { execSync } = require('child_process');

module.exports = async () => {
  try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  } catch (err) {
    console.error('Prisma setup failed:', err);
  }
};
