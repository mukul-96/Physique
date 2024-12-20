import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const cronRouter = express.Router();

const runDailyFeeDeduction = async () => {
    console.log('Running daily fee deduction task');

    const users = await prisma.user.findMany({
        where: { balance: { gt: 0 } }  
    });

    const currentDateTime = new Date();

    for (const user of users) {
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
    }
};
const setDailyData = async () => {
    await prisma.branches.updateMany({
      data: {
        dailySales: 0,
        dailyEntry: 0,
      },
    });
  };

cronRouter.get('/run', async (req, res) => {
    try {
        await runDailyFeeDeduction();
        await setDailyDate();
        res.status(200).send('Cron job executed successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error running cron job');
    }
});

export default cronRouter;
