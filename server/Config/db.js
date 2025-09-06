const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
// This file sets up and exports a PrismaClient instance for database interactions.