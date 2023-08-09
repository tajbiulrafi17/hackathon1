import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors';
import todoRouter from './routes/todo';
import authRouter from './routes/jwtAuth';


const app = express();
const prisma = new PrismaClient();


const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}`);
    next();
};


//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(logger);

// ROUTES //

//register and login 
app.use('/auth', authRouter);

// Use your todoRouter as middleware
app.use('/todos', todoRouter);


app.get('/hi', (req, res) => {
    res.send("HI");
})

app.listen(8000, () => {
    console.log("Server started at port 8000!");
});