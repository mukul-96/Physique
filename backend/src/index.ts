import express from 'express';
import cors from 'cors';
import headRouter from './routes/head';
import managerRouter from './routes/manager';
import userRouter from './routes/user';
import dotenv from 'dotenv';
import scannerRouter from './routes/scanner';
import cronRouter from "./routes/cronRouter";
import  razorPayRouter from './routes/razorpay'; 
dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin:['https://physique-client.vercel.app' , `http://localhost:5173`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
};

app.use(cors(corsOptions));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/manager", managerRouter);
app.use("/api/v1/head", headRouter);
app.use("/api/v1/scanner", scannerRouter);
app.use("/api/v1/cron", cronRouter);
app.use("/api/razorpay", razorPayRouter);
app.get('/', (req, res) => {
    res.send('<h1>Server is running</h1><p>Your backend is successfully deployed on Vercel!</p>');
});
app.listen(process.env.PORT, () => {
    console.log('Server is running');
});
