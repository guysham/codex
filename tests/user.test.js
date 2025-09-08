const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.user.deleteMany();
  await prisma.user.create({ data: { name: 'Alice' } });
});

afterAll(async () => {
  await prisma.$disconnect();
});

test('user count is one', async () => {
  const users = await prisma.user.findMany();
  expect(users.length).toBe(1);
});
