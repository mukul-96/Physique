import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();
const scannerRouter = Router();


scannerRouter.get('/list',async(req:Request,res:Response)=>{
const scanners=await prisma.authorizedScanners.findMany();
if (scanners)
{
    return res.status(200).json(scanners);
}
return res.status(500).json({"message":"something went wrong"})
})

scannerRouter.put('/scan/:id', async (req: Request, res: Response) => {
    console.log("Incoming request to scan endpoint");
    const branchId = req.params.id;
    console.log("Branch ID:", branchId);

    const qrDataString = req.body.qrData;  

    let qrData;
    try {
        qrData = JSON.parse(qrDataString);
    } catch (error) {
        return res.status(400).json({ message: 'Invalid QR data format' });
    }

    const { id: userId } = qrData;  

    try {
        const branch = await prisma.branches.findUnique({
            where: { id: parseInt(branchId) }
        });

        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        const dailyFee = branch.dailyFee;

        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const lastCheckIn = user.checkedIn ? new Date(user.checkedIn) : null;
        const currentDateTime = new Date(); 

        if (lastCheckIn && (currentDateTime.getTime() - lastCheckIn.getTime()) < 2 * 60 * 60 * 1000) {
            return res.status(400).json({ message: 'You cannot check in again within 2 hours' });
        }

        if (user.balance < dailyFee) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: {
                balance: user.balance - dailyFee,
                checkedIn: currentDateTime
            }
        });

        return res.status(200).json({
            message: 'Check-in successful, daily fee deducted',
            user: updatedUser
        });
    } catch (error) {
        console.error("Error processing scan:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default scannerRouter;
    