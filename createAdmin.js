import { prisma } from './db/prisma.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    try {
        const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

        if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
            console.log('Please set ADMIN_USERNAME, and ADMIN_PASSWORD in .env');
            process.exit(1);
        }

        const existingAdmin = await prisma.user.findUnique({
            where: {
                username: ADMIN_USERNAME,
            },
        });

        if (existingAdmin) {
            console.log('Admin user already exists!');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

        await prisma.user.create({
            data: {
                username: ADMIN_USERNAME,
                password: hashedPassword,
            },
        });

        console.log('✅ Admin user created successfully!');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

main();