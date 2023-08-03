import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'

const app = express();
const prisma = new PrismaClient();


const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}`);
    next();
};


//middleware
app.use(express.json()); //req.body

app.use(logger);

// ROUTES //

// create a todo

app.post("/todo/add", async (req: Request, res: Response) => {

    const desc = req.body.description;
    // const id = req.body.id;

    const todo = await prisma.todo.create({
        data: {
            description: desc
        }
    });

    res.json({ todo });

})

// get all tod

app.get('/todos', async (req: Request, res: Response) => {
    const todo = await prisma.todo.findMany();

    res.json({ todo });
})

// get a todo

// update a todo

//delete a todo


app.get('/hi', (req, res) => {
    res.send("HI");
})

app.listen(8000, () => {
    console.log("Server started at port 8000!");
});