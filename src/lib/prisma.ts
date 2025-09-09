import { PrismaClient } from '@prisma/client';

// Declare a global variable to hold the Prisma client instance.
// This prevents multiple instances from being created during hot-reloading in development.
declare global {
  var prisma: PrismaClient | undefined;
}

// Check if a prisma instance already exists globally, otherwise create a new one.
export const prisma = global.prisma || new PrismaClient();

// In a non-production environment, assign the prisma instance to the global object
// to ensure it's reused across hot reloads.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}