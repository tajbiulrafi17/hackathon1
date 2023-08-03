"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const logger = (req, res, next) => {
    console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}`);
    next();
};
//middleware
app.use(express_1.default.json()); //req.body
app.use(logger);
// ROUTES //
// create a todo
app.post("/todo/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desc = req.body.description;
    // const id = req.body.id;
    const todo = yield prisma.todo.create({
        data: {
            description: desc
        }
    });
    res.json({ todo });
}));
// get all tod
app.get('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield prisma.todo.findMany();
    res.json({ todo });
}));
// get a todo
// update a todo
//delete a todo
app.get('/hii', (req, res) => {
    res.send("HI");
});
app.listen(8000, () => {
    console.log("Server started at port 8000!");
});
