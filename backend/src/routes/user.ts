import { Request, Response } from "express";
import { Router } from "express";
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import dotenv, { parse } from 'dotenv';
import userAuth from "../middlewares/userAuth";

dotenv.config();
const secret = process.env.JWT_SECRET as string;
const prisma = new PrismaClient().$extends(withAccelerate());
const userRouter = Router();


userRouter.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ mssg: "Invalid ID" });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if (user) {
            return res.status(200).json({
                user
            });
        } else {
            return res.status(404).json({ mssg: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ mssg: "Internal server error" });
    }
});

userRouter.post("/signin", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password
            }
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const id = user.id;
        const token = jwt.sign({ id }, secret); 
        return res.status(200).json({ token:token, id:id });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
});
userRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        const existingUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (existingUser) {
            return res.status(403).json({
                message: "Email already exists"
            });
        }

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: password,
                name: name
            }
        });

        const id = newUser.id;
        const token = jwt.sign({ id }, secret, { expiresIn: '1h' });
        return res.status(200).json({token});
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error:error });
    }
});
userRouter.post("/purchaseplan",userAuth,async(req:Request,res:Response)=>{
   try{
    const {userId,branchId,planId}=req.body;
    const subscription=await prisma.subscription.findFirst({
        where:{
            planId:parseInt(planId),
            branchId:parseInt(branchId)
        }
    });
    if (!subscription) {
        return res.status(404).json({
            message: "Subscription not found or is inactive for the specified branch."
        });
    }

    const branch = await prisma.branches.findUnique({
        where: {
            id: parseInt(branchId)
        }
    });

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(userId)
        }
    });

    if (!branch) {
        return res.status(404).json({
            message: "Branch not found."
        });
    }

    if (!user) {
        return res.status(404).json({
            message: "User not found."
        });
    }
    if(branch.dailyFee){
    const totalAmount = (branch.dailyFee) * subscription.days;
    const newBalance = user.balance + totalAmount;
    await prisma.user.update({
        where: {
            id: parseInt(userId)
        },
        data: {
            balance: newBalance
        }
    });

    await prisma.history.create({
        data: {
            userId: parseInt(userId),
            subscription: subscription.name,
            branchId: parseInt(branchId),
            date: new Date(),
            price:subscription.price
        }
    });
    await prisma.enrollment.create({
        data:{
            userId:userId,
            subscriptionId:subscription.id
        }
    })

    return res.status(200).json({
        message: "Plan purchased successfully. Balance updated.",
        newBalance: newBalance
    });
}
    }
   catch (error) {
    console.error("Error processing plan purchase:", error);
    return res.status(500).json({
        message: "Internal server error",
        error: error
    });
}
})

export default userRouter;
