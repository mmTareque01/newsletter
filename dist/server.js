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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const PORT = 5000;
// Middleware to parse JSON
app.use(express_1.default.json());
// CORS setup (for allowing cross-origin requests)
app.use((0, cors_1.default)());
// Health check endpoint
app.get('/api', (req, res) => {
    res.json({ message: `Server is running on port ${PORT}` });
});
// Create user
app.post('/users', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error('Email and Password are required');
        }
        const user = yield prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                password,
            },
        });
        res.status(201).json(user);
    }
    catch (error) {
        next(error); // Pass error to the error-handling middleware
    }
}));
// Get all users
app.get('/users', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        next(error); // Pass error to the error-handling middleware
    }
}));
// Get a single user by ID
// app.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
//   const { id } = req.params;
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id },
//     });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     next(error); // Pass error to the error-handling middleware
//   }
// });
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: err.message || 'Something went wrong!' });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
