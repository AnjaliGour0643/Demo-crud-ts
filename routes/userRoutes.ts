import express, { Request, Response } from 'express';
import User from '../models/userModel';
const router = express.Router();

// GET: Fetch all users
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err : any) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Add a new user
router.post('/users', async (req: Request, res: Response) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err : any) {
        res.status(400).json({ message: err.message });
    }
});

// PUT: Update a user by ID
router.put('/users/:id', async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err :  any) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Delete a user by ID
router.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted' });
    } catch (err :  any) {
        res.status(500).json({ message: err.message });
    }
});

export default router;




// // PATCH: Partially update a user by ID
// router.patch('/users/:id', async (req: Request, res: Response) => {
//     try {
//         const updatedUser1 = await User.findByIdAndUpdate(
//             req.params.id,
//             { $set: req.body },  // Only update the fields passed in the request body
//             { new: true }
//         );
//         if (!updatedUser1) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(updatedUser1);
//     } catch (err : any) {
//         res.status(400).json({ message: err.message });
//     }
// });