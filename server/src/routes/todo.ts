import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const router = Router();
const prisma = new PrismaClient();

const authorization = require('../middleware/authorization');

// get all todo


router.get('/', authorization, async (req: Request, res: Response) => {
    const user_id = req.params;
    // console.log(user_id);
    const todo = await prisma.todo.findMany({
        where: {
            userId: user_id,
        }
    });
    const user = await prisma.user.findMany({
        where: {
            id: user_id,
        }
    });

    res.json({ todo, user });
})

// create a todo

router.post("/", authorization, async (req: Request, res: Response) => {
    const user_id = req.body.user;
    const desc = req.body.description;
    // const id = req.body.id;

    const todo = await prisma.todo.create({
        data: {
            description: desc,
            userId: user_id
        }
    });

    res.json(todo);

})


// get a todo

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await prisma.todo.findMany({
        where: {
            id: parseInt(id),
        }
    });
    res.json(todo);

})

// update a todo

router.put('/:id', async (req, res) => {
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

    res.json(todo);

})

//delete a todo

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await prisma.todo.delete({
        where: {
            id: parseInt(id),
        }
    })

    res.send("Item deleted");
})


export default router;

