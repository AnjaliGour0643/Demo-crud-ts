import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use(userRoutes);

// Home Route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from the home page');
});

// Connect to MongoDB and start server
mongoose.connect('mongodb://localhost:27017/myDatabase')
    .then(() => {
        app.listen(8000, () => {
            console.log('Server is running on port 8000');
        });
    })
    .catch((err) => console.log(err));
