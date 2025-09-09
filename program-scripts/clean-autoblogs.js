const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanAutoblogs() {
  try {
    const { count } = await prisma.autoblog.deleteMany({});
    console.log(`Successfully deleted ${count} autoblogs.`);
  } catch (error) {
    console.error("Error cleaning autoblogs:", error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanAutoblogs();
