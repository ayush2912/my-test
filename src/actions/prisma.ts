import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

prisma
    .$connect()
    .then(() => console.info('Connected to Prisma Client!'))
    .catch((error: any) => {
        console.error('Error connecting to Prisma Client:', error);
    });

export default prisma;
