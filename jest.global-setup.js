const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  try {
    // Check for local Prisma query engine binary
    const engineDir = path.join(__dirname, '../prisma-engines');
    let engineBinaryPath = '';
    if (fs.existsSync(engineDir)) {
      const engineBinary = fs.readdirSync(engineDir).find(file =>
        file.startsWith('query-engine') && file.endsWith('.node')
      );
      if (engineBinary) {
        engineBinaryPath = path.join(engineDir, engineBinary);
        process.env.PRISMA_QUERY_ENGINE_BINARY = engineBinaryPath;
        console.log(`Using bundled Prisma engine binary: ${engineBinaryPath}`);
      }
    }

    console.log('Running prisma generate...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('Running prisma migrate deploy...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
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