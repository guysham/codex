const { execSync } = require('child_process');

module.exports = async () => {
  try {
    console.log('Running prisma generate...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('Running prisma migrate deploy...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    // Optional: run seed if script exists
    try {
      console.log('Running prisma db seed...');
      execSync('npx prisma db seed', { stdio: 'inherit' });
    } catch (err) {
      console.log('Seed script not found or failed, proceeding...');
    }
  } catch (err) {
    console.error('Error during global setup:', err);
    throw err;
  }
};