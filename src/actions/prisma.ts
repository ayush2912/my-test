import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

prisma
    .$connect()
    .then(() => console.info('Connected to Prisma Client!'))
    .catch((error: any) => {
        console.error('Error connecting to Prisma Client:', error);
        process.exit(1);
    });

export default prisma;
