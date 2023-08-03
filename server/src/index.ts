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

app.get('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await prisma.todo.findMany({
        where: {
            id: parseInt(id),
        }
    });
    res.json({ todo });

})

// update a todo

app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const todo = await prisma.todo.update({
        where: {
            id: parseInt(id),
        },
        data: {
            description: description,
        }
    });

    res.json({ todo });

})

//delete a todo

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await prisma.todo.delete({
        where: {
            id: parseInt(id),
        }
    })

    res.send("Item deleted");
})


app.get('/hi', (req, res) => {
    res.send("HI");
})

app.listen(8000, () => {
    console.log("Server started at port 8000!");
});