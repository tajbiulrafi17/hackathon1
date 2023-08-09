import { Router, Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import cors from 'cors';


const router = Router();
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const authorization = require('../middleware/authorization');

//registering

router.post("/signup", async (req: Request, res: Response) => {
    try {
        // 1. restructure the req.body
        const { name, email, password } = req.body;

        // 2. check if user exist
        const existingUser = await prisma.user.findUnique({ where: { email: email } });

        if (existingUser) {
            res.send("Email already exists");
        }

        // 3. bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPasssword = await bcrypt.hash(password, salt);

        // 4. enter user in database
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: bcryptPasssword
            }
        });

        // 5. generating jwt token
        const token = jwtGenerator(newUser.id);

        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.post("/login", async (req, res) => {
    try {
        // 1. destructure the req.body
        const { email, password } = req.body;

        // 2. check if exists or not
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            res.send("Not signed up");
        }
        // console.log(existUser?.password);

        // 3. check password
        const validPassword = await bcrypt.compare(password, user?.password);

        if (!validPassword) {
            res.send("Password Wrong");
        }

        // 4. jwt token
        const token = jwtGenerator(user?.id);
        res.json({ token });



    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error);
    }
})

export default router;