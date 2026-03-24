import { PrismaClient } from '@prisma/client';

// Se crea una única instancia del cliente de Prisma
const prisma = new PrismaClient();

// Se exporta como default para que coincida con tu importación
export default prisma;