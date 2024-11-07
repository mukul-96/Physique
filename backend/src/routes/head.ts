
    import { Request, Response } from "express";
    import { Router } from "express";
    import jwt from "jsonwebtoken";
    import { PrismaClient } from '@prisma/client/edge';
    import { withAccelerate } from '@prisma/extension-accelerate';
    import dotenv from 'dotenv';
    import headAuth from "../middlewares/headAuth";
    
    dotenv.config();
    const secret = process.env.JWT_SECRET as string;
    const prisma = new PrismaClient().$extends(withAccelerate());
    const headRouter = Router();
    headRouter.post("/signin", async (req: Request, res: Response) => {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
    
        try {
            const head = await prisma.head.findFirst({
                where: {
                    email: email,
                    password: password 
                }
            });
    
            if (!head) {
                return res.status(403).json({ message: "Wrong email or password" });
            }
    
            const id = head.id;
            const token = jwt.sign({ id }, secret); 
            return res.status(200).json({token: token });
    
        } catch (error) {
            console.error("Error during sign-in:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
        headRouter.get("/branchPlan",headAuth,async(req:Request,res:Response)=>{
            const {brachId}=req.body;
            const list=await prisma.subscription.findMany({
            where:{
                branchId:brachId
            }
            });
            return res.status(200).json({
                list:list
            })
        })
    const addSubscription=async(branchId:any)=>{
        const plans=await prisma.plans.findMany();
        const subscription=plans.map(plan=>({
            name:plan.name,
            description:plan.description,
            price:0,
            branchId:branchId,
            planId:plan.id,
            days:plan.days
        }));
        await prisma.subscription.createMany({data:subscription})

    }
    headRouter.post("/addbranch", headAuth, async (req: Request, res: Response) => {
        const { branchName, branchAddress, managerEmail, managerPassword, managerName, branchId } = req.body;
        
        let newManager;
        let newBranch;
    
        try {
            if (managerEmail && managerPassword && managerName) {
                const exist = await prisma.managers.findFirst({
                    where: { email: managerEmail }
                });
    
                if (exist) {
                    return res.status(403).json({
                        message: "Manager Email already exists"
                    });
                }
    
                newManager = await prisma.managers.create({
                    data: {
                        email: managerEmail,
                        password: managerPassword,
                        name: managerName,
                        branchId:  parseInt(branchId) 
                    }
                });
            }
    
            const newScanner = await prisma.authorizedScanners.create({
                data: {
                    scannerName: branchName,
                    branchId:branchId
                }
            });
    
            newBranch = await prisma.branches.create({
                data: {
                    name: branchName,
                    address: branchAddress,
                    managerId: newManager ? newManager.id : null,
                    scanner: { connect: { id: newScanner.id } }
                }
            });
    
            if (newManager) {
                await prisma.managers.update({
                    where: { id: newManager.id },
                    data: { branchId: newBranch.id }
                });
            }
    
            addSubscription(newBranch.id);
    
            return res.status(200).json({
                message: "Branch and manager created successfully",
                branch: newBranch,
                manager: newManager || null
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "An error occurred while creating the branch." });
        }
    });
    
        headRouter.post("/addplan",headAuth,async (req: Request, res: Response)=>{
            const {name,description,days}=req.body;
           try{
            const newPlan=await prisma.plans.create({
                data:{
                    name:name,
                    description:description,
                    days:days
                }
            });
            const branches = await prisma.branches.findMany();

            const subscriptions = branches.map(branch => ({
                name: newPlan.name,
                description: newPlan.description,
                price: 0, 
                branchId: branch.id,
                planId: newPlan.id,
                days:days
            }));
            await prisma.subscription.createMany({
                data: subscriptions,
            });
            return res.status(200).json({
                message:"plan added successfully",
                newPlan:newPlan
            })
           }
           catch(e)
           {
            return res.status(500).json({
                error:e
            })
           }
        })
        headRouter.delete("/removeplan",headAuth,async (req: Request, res: Response)=>{
            const {planId}=req.body;
           try{
                await prisma.plans
                .delete({
                where:{
                    id:planId,
                }
            });
            return res.status(200).json({
                message:"plan removed successfully"
            })
           }
           catch(e)
           {
            return res.status(500).json({
                error:e
            })
           }
        })
        headRouter.post("/addManager", headAuth, async (req: Request, res: Response) => {
            try {
                const { email, password, name, branchId } = req.body;
        
                const existingManager = await prisma.managers.findFirst({
                    where: {
                        email: email
                    }
                });
        
                if (existingManager) {
                    return res.status(403).json({
                        message: "Email already exists"
                    });
                }
        
                const existingBranch = await prisma.branches.findUnique({
                    where: {
                        id: branchId
                    }
                });
        
                if (!existingBranch) {
                    return res.status(404).json({
                        message: "Branch not found"
                    });
                }
        
                const newManager = await prisma.managers.create({
                    data: {
                        email: email,
                        password: password,                       
                        name: name,
                        branchId: branchId
                    }
                });
                await prisma.branches.update({
                    where: {
                        id: branchId,
                    },
                    data: {
                        managerId: newManager.id,
                    }
                });
        
                return res.status(200).json({
                    message: "Successfully Added Manager",
                    manager: newManager
                });
            } catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    error: error
                });
            }
        });
        headRouter.get("/branches",async(req:Request,res:Response)=>{
            try{
                const result=await prisma.branches.findMany();
                return res.status(200).json(result);
            }
            catch(error)
            {
                return res.status(400).json(error)
            }
        })
        headRouter.get("/branch/:id",async(req:Request,res:Response)=>{
           
                try{
                    const id=parseInt(req.params.id);
                    const result=await prisma.branches.findUnique({
                        where:{
                            id:id
                        },
                        include:{
                            staff:true,
                            expenditure:true,
                            plans:true,
                            reviews:true,
                            manager:true

                        }
                    })
                        return res.status(200).json(result);
                }
                catch(error)
                {
                    return res.status(400).json(error)
                }
        })
        
      
    export default headRouter;
    