
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
        const { branchName, branchAddress, managerEmail, managerPassword, managerName } = req.body;
        
        let newManager;
        let newBranch;
      
        try {
            newBranch = await prisma.branches.create({
                data: {
                    name: branchName,
                    address: branchAddress,
                }
            });
    
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
                        branchId: newBranch.id
            }});
            }    
            const newScanner = await prisma.authorizedScanners.create({
                data: {
                    scannerName: branchName,
                    branchId: newBranch.id 
                }
            });
    
            await prisma.branches.update({
                where: { id: newBranch.id },
                data: {
                    scanner: { connect: { id: newScanner.id } }
                }
            });
    
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
        headRouter.get('/branch-sales', async (req: Request, res: Response) => {
            const { year, month } = req.query;
          
            const parsedYear = parseInt(year as string, 10);
            const parsedMonth = parseInt(month as string, 10);
          
            if (isNaN(parsedYear) || isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
              return res.status(400).json({ error: 'Year and month must be valid numbers, and month should be between 1 and 12' });
            }
          
            try {
              const gte = new Date(parsedYear, parsedMonth - 1, 1);
              const lt = new Date(parsedYear, parsedMonth, 1);
          

              const historyData = await prisma.history.findMany({
  where: {
    date: {
      gte: new Date(parsedYear, parsedMonth - 1, 1),
      lt: new Date(parsedYear, parsedMonth, 1),
    },
  },
  include: {
    branch: true, // Ensure this joins branch data directly
  },
});

              const salesData = await prisma.history.groupBy({
                by: ['branchId'],
                where: { date: { gte, lt } },
                _sum: { price: true },
              });
          
          
              const branchIds = salesData.map((data) => data.branchId);
          
              const branches = await prisma.branches.findMany({
                where: { id: { in: branchIds } },
                select: { id: true, name: true },
              });
          
          
              const responseData = salesData.map((data) => {
                const branch = branches.find((b) => b.id === data.branchId);
                return {
                  branchName: branch ? branch.name : 'Unknown',
                  sales: data._sum.price,
                };
              });
          
          
              res.json(responseData);
            } catch (err) {
               console.error('Error fetching sales data:', err);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          });
          headRouter.get('/branch-history', async (req: Request, res: Response) => {
            const { year, month } = req.query;
          
            const parsedYear = parseInt(year as string, 10);
            const parsedMonth = parseInt(month as string, 10);
          
            if (isNaN(parsedYear) || isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
              return res.status(400).json({ error: 'Year and month must be valid numbers, and month should be between 1 and 12' });
            }
          
            try {
              const gte = new Date(parsedYear, parsedMonth - 1, 1);
              const lt = new Date(parsedYear, parsedMonth, 1);
          
          const historyData = await prisma.history.findMany({
  where: {
    date: {
      gte: new Date(parsedYear, parsedMonth - 1, 1),
      lt: new Date(parsedYear, parsedMonth, 1),
    },
  },
  include: {
    branch: true, // Ensure this joins branch data directly
  },
});
// console.log('History Data with Branches:', historyData);

//               const salesData = await prisma.history.groupBy({
//                 by: ['branchId'],
//                 where: { date: { gte, lt } },
//                 _sum: { price: true },
//               });
          
//               console.log('Sales Data:', salesData);
          
//               const branchIds = salesData.map((data) => data.branchId);
//               console.log('Branch IDs:', branchIds);
          
//               const branches = await prisma.branches.findMany({
//                 where: { id: { in: branchIds } },
//                 select: { id: true, name: true },
//               });
          
//               console.log('Branches:', branches);
          
//               const responseData = salesData.map((data) => {
//                 const branch = branches.find((b) => b.id === data.branchId);
//                 return {
//                   branchName: branch ? branch.name : 'Unknown',
//                   sales: data._sum.price,
//                 };
//               });
          
//               console.log('Response Data:', responseData);
          
              res.json(historyData);
            } catch (err) {
              console.error('Error fetching sales data:', err);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          });
           headRouter.get('/branch-sales', async (req: Request, res: Response) => {
            const { year, month } = req.query;
          
            const parsedYear = parseInt(year as string, 10);
            const parsedMonth = parseInt(month as string, 10);
          
            if (isNaN(parsedYear) || isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
              return res.status(400).json({ error: 'Year and month must be valid numbers, and month should be between 1 and 12' });
            }
          
            try {
              const gte = new Date(parsedYear, parsedMonth - 1, 1);
              const lt = new Date(parsedYear, parsedMonth, 1);
          
          const historyData = await prisma.history.findMany({
  where: {
    date: {
      gte: new Date(parsedYear, parsedMonth - 1, 1),
      lt: new Date(parsedYear, parsedMonth, 1),
    },
  },
  include: {
    branch: true, // Ensure this joins branch data directly
  },
});

              const salesData = await prisma.history.groupBy({
                by: ['branchId'],
                where: { date: { gte, lt } },
                _sum: { price: true },
              });
          
          
              const branchIds = salesData.map((data) => data.branchId);
          
              const branches = await prisma.branches.findMany({
                where: { id: { in: branchIds } },
                select: { id: true, name: true },
              });
          
          
              const responseData = salesData.map((data) => {
                const branch = branches.find((b) => b.id === data.branchId);
                return {
                  branchName: branch ? branch.name : 'Unknown',
                  sales: data._sum.price,
                };
              });
          
          
              res.json(responseData);
            } catch (err) {
              console.error('Error fetching sales data:', err);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          });
          headRouter.get('/branch-sales-yearly', async (req: Request, res: Response) => {
            const { year } = req.query;
          
            const parsedYear = parseInt(year as string, 10);
          
            if (isNaN(parsedYear)) {
              return res
                .status(400)
                .json({ error: 'Year must be a valid number.' });
            }
          
            try {
              const gte = new Date(parsedYear, 0, 1); // Start of the year (Jan 1st)
              const lt = new Date(parsedYear + 1, 0, 1); // Start of the next year (Jan 1st)
          
              // Fetch sales grouped by branch
              const salesData = await prisma.history.groupBy({
                by: ['branchId'],
                where: { date: { gte, lt } },
                _sum: { price: true },
              });
          
              const branchIds = salesData.map((data) => data.branchId);
          
              // Fetch branch names for IDs
              const branches = await prisma.branches.findMany({
                where: { id: { in: branchIds } },
                select: { id: true, name: true },
              });
          
              // Combine sales data with branch names
              const responseData = salesData.map((data) => {
                const branch = branches.find((b) => b.id === data.branchId);
                return {
                  branchName: branch ? branch.name : 'Unknown',
                  sales: data._sum.price,
                };
              });
          
              res.json(responseData);
            } catch (err) {
              console.error('Error fetching yearly sales data:', err);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          });
          
          headRouter.get('/branch-history-yearly', async (req: Request, res: Response) => {
            const { year } = req.query;
          
            const parsedYear = parseInt(year as string, 10);
          
            if (isNaN(parsedYear)) {
              return res
                .status(400)
                .json({ error: 'Year must be a valid number.' });
            }
          
            try {
              let gte = new Date(parsedYear, 0, 1); // Start of the year (Jan 1st)
              let lt = new Date(parsedYear + 1, 0, 1); // Start of the next year (Jan 1st)
          
              const currentHistoryData = await prisma.history.findMany({
                where: { date: { gte, lt } },
                include: {
                  branch: true, // Ensure to join branch data directly
                },
              });
               gte = new Date(parsedYear-1, 0, 1); // Start of the year (Jan 1st)
               lt = new Date(parsedYear , 0, 1);
               const previousHistoryData = await prisma.history.findMany({
                where: { date: { gte, lt } },
                include: {
                  branch: true, // Ensure to join branch data directly
                },
              });
              res.json({
                currentYear: { year: parsedYear, data: currentHistoryData },
                previousYear: { year: parsedYear - 1, data: previousHistoryData },
              });
                          } catch (err) {
              console.error('Error fetching yearly history data:', err);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          });
        //   headRouter.get('/branch-history-yearly-numbers', async (req: Request, res: Response) => {
        //     const { year } = req.query;
          
        //     const parsedYear = parseInt(year as string, 10);
          
        //     if (isNaN(parsedYear)) {
        //       return res
        //         .status(400)
        //         .json({ error: 'Year must be a valid number.' });
        //     }
          
        //     try {
        //       let gte = new Date(parsedYear, 0, 1); // Start of the year (Jan 1st)
        //       let lt = new Date(parsedYear + 1, 0, 1); // Start of the next year (Jan 1st)
          
        //       const currenthistoryData = await prisma.history.findMany({
        //         where: { date: { gte, lt } },
        //         include: {
        //           branch: true, // Ensure to join branch data directly
        //         },
        //       });
        //        gte = new Date(parsedYear-1, 0, 1); // Start of the year (Jan 1st)
        //        lt = new Date(parsedYear, 0, 1); 
        //       const previoushistoryData = await prisma.history.findMany({
        //         where: { date: { gte, lt } },
        //         include: {
        //           branch: true, // Ensure to join branch data directly
        //         },
        //       });
          
        //       res.json(currenthistoryData);
        //     } catch (err) {
        //       console.error('Error fetching yearly history data:', err);
        //       res.status(500).json({ error: 'Internal Server Error' });
        //     }
        //   });
          
        headRouter.get('/mainInfo',async(req: Request, res: Response)=>{
            try {
              const { year } = req.query;
              const parsedYear = parseInt(year as string, 10);
              let gte = new Date(parsedYear, 0, 1); 
              let lt = new Date(parsedYear + 1, 0, 1);
              const branches=await prisma.branches.findMany();
            const totalBranches=branches.length;
            const employees=await prisma.rooster.findMany();
            const sales=await prisma.history.findMany({
                where: { date: { gte, lt } }
            })
            const totalEmployees=employees.length;
            const totalSales=sales.length
            console.log(totalBranches,totalEmployees)
            return res.status(200).json({totalBranches,totalEmployees,totalSales});
            } catch (error) {
              console.error('Error fetching yearly history data:', error);
              res.status(500).json({ error: 'Internal Server Error' });
            }


        })
          
          
          
          
          
        
      
    export default headRouter;
    