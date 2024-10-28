import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

cron.schedule('0 0 * * *', async () => {
    console.log('Running daily fee deduction task');

    const users = await prisma.user.findMany({
        where: { balance: { gt: 0 } }  
    });

    const currentDateTime = new Date();

    users.forEach(async (user) => {
        const dailyFee = user.dailyFee; 
        const lastCheckIn = user.checkedIn ? new Date(user.checkedIn) : null;

        const hasCheckedInToday = lastCheckIn && (currentDateTime.toDateString() === lastCheckIn.toDateString());

        if (!hasCheckedInToday && user.balance > 0) {
            const newBalance = user.balance - dailyFee;

            await prisma.user.update({
                where: { id: user.id },
                data: {
                    balance: Math.max(newBalance, 0), 
                }
            });

            console.log(`Deducted ${dailyFee} from user ${user.id}, new balance: ${newBalance}`);
        }
    });
});
