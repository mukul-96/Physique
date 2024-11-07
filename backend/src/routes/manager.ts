import { Request, Response } from "express";
import { Router } from "express";
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import dotenv, { parse } from 'dotenv';
import managerAuth from "../middlewares/managerAuth";
import headAuth from "../middlewares/headAuth";
dotenv.config();
const secret = process.env.JWT_SECRET as string;
const prisma = new PrismaClient().$extends(withAccelerate());
const managerRouter = Router();

managerRouter.post("/signin", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        const exist = await prisma.managers.findFirst({
            where: {
                email: email,
                password: password
            }
        });

        if (!exist) {

            return res.status(403).json({
                message: "Wrong email or password"
            });
        }
        const id = exist.id;
        const token = jwt.sign({ id }, secret);
        return res.status(200).json({token: token,id:id });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error:error });
    }
});
managerRouter.get("/stafflist/:id",managerAuth, async (req: Request, res: Response) =>
{
    try {
        const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ mssg: "Invalid ID" });
    }
        

        const staff = await prisma.rooster.findMany({
            where: {
            branchId:id,
            }
        });

        if (!staff) {
            return res.status(404).json({ message: "Manager not found" });
        }

        return res.status(200).json(staff);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
})
managerRouter.get("/getdetails/:id", managerAuth, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ mssg: "Invalid ID" });
    }
        

        const manager = await prisma.managers.findFirst({
            where: {
                id:id,
            }
        });

        if (!manager) {
            return res.status(404).json({ message: "Manager not found" });
        }

        return res.status(200).json(manager);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
});

managerRouter.get("/memberslist/:id",managerAuth,async(req:Request,res:Response)=>{
    const id=parseInt(req.params.id);
    try {
        
        const members=await prisma.subscription.findMany({
            where: {
                branchId: id
              },
              include: {
                enrolled: {
                  include: {
                    user: true 
                  }
                }
              }
        })
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json(error)
    }
})

managerRouter.post("/addstaff",managerAuth,async (req: Request, res: Response)=>{
    const {name,designation,salary,description,branchId,email}=req.body;
   try{
    
    const exist=await prisma.rooster.findFirst({
        where:{
            email:email
        }
    })
    if(exist)
    {

        return res.status(409).json({ message: "Employee with Email alreay exist"})
    }
    
    const newStaff=await prisma.rooster.create({
        data:{
            name:name,
            designation:designation,
            salary:parseInt(salary),
            email:email,
            description:description,
            branchId:parseInt(branchId),
        }
    });
    return res.status(200).json({
        message:"staff added successfully",
        newStaff:newStaff
    })
   }
   catch(e)
   {
    return res.status(500).json({
        error:e
    })
   }
})
managerRouter.delete("/removestaff/:id",managerAuth,async (req: Request, res: Response)=>{
    const staffId=(req.params.id);
   try{
    const deleteStaff= await prisma.rooster.delete({
        where: {
          id:parseInt(staffId),
        },
      });
    return res.status(200).json({
        message:"staff deleted successfully",
        newStaff:deleteStaff
    })
   }
   catch(e)
   {
    return res.status(500).json({
        error:e
    })
   }
})

managerRouter.get("/expenselist", managerAuth, async (req: Request, res: Response) => {
    try {
      const { month, year, branchId } = req.query; 
      if (!month || !year || !branchId) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
      
      const data = await prisma.utilities.findMany({
        where: {
          month: parseInt(month as string), 
          year: parseInt(year as string), 
          branchId: parseInt(branchId as string) 
        }
      });
      if (data.length > 0) {
        return res.status(200).json(data);
      } else {
        return res.status(500).json({ message: "No data found" });
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  });

managerRouter.post("/addexpense",managerAuth,async (req: Request, res: Response)=>{
    const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const {title,cost,branchId}=req.body;
  try{
      const utility = await prisma.utilities.create({
        data: {
          title: title,
          cost: parseInt(cost),
          month:month,
          year:year,
          branchId: parseInt(branchId),
        },
      });
      return res.status(200).json({
        message:"expense added",
        utility:utility
      })
    }
  catch(e)
   {
    return res.status(500).json({
        error:e
    })
   }
})
managerRouter.get("/branchplan/:id",managerAuth,async(req:Request,res:Response)=>{
    const branchId=parseInt(req.params.id);
   try{
    const list=await prisma.subscription.findMany({
        where:{
            branchId:branchId
        }
        });
        return res.status(200).json(
            list)
   }
   catch(e){
    return res.status(500).json({
        error:e
    })
   }
})
managerRouter.put("/toggleplan",managerAuth,async (req: Request, res: Response)=>
{
    const {planId,branchId,status}=req.body;
    try{
        const newPlan=await prisma.subscription.updateMany({
            where:{
                planId:parseInt(planId),
                branchId:parseInt(branchId)
            },
            data:{
                 active: !status
            }
        });

        return res.status(200).json(newPlan)
       }
       catch(e)
       {
        return res.status(500).json({
            error:e
        })
       }
})
managerRouter.put("/editplan",managerAuth,async (req: Request, res: Response)=>{
    const {planId,branchId,price}=req.body;
   try{
    const newPlan=await prisma.subscription.updateMany({
        where:{
            planId:parseInt(planId),
            branchId:parseInt(branchId)
        },
        data:{
            price:parseInt(price)
        }
    });
    return res.status(200).json({
        message:"plan edited successfully",
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
managerRouter.get("/sales/:id", async (req: Request, res: Response) => {
    const branchId = parseInt(req.params.id);
    const month = parseInt(req.query.month as string); 
    const year = parseInt(req.query.year as string);   
  
    if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
        return res.status(400).json({ error: "Invalid month or year" });
    }
    
    try {
        const users = await prisma.history.findMany({
            where: {
                branchId: branchId,
                date: {
                    gte: new Date(`${year}-${month}-01`), 
                    lt: new Date(`${year}-${month + 1}-01`)
                }
            }
        });
        const sameMonthPrevYear = await prisma.history.findMany({
            where: {
                branchId: branchId,
                date: {
                    gte: new Date(`${year - 1}-${month}-01`), 
                    lt: new Date(`${year - 1}-${month + 1}-01`)
                }
            }
        });
        const curYearUsers = await prisma.history.findMany({
            where: {
                branchId: branchId,
                date: {
                    gte: new Date(`${year}-01-01`), 
                    lt: new Date(`${year + 1}-01-01`)
                }
            }
        });
        const prevYearUsers = await prisma.history.findMany({
            where: {
                branchId: branchId,
                date: {
                    gte: new Date(`${year - 1}-01-01`),
                    lt: new Date(`${year}-01-01`)
                }
            }
        });
  
        return res.status(200).json({
            users,
            sameMonthPrevYear,
            curYearUsers,
            prevYearUsers
        });
    } catch (error) {
        console.error("Error querying database:", error);
        return res.status(500).json({ error });
    }
});

  

export default managerRouter;
