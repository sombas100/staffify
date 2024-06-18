import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload} from 'jsonwebtoken';
import User from '../models/User';

const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error('JWT_SECRET is not defined in the .env')
}

interface DecodedToken extends JwtPayload {
    userId: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload; // Adjust this to match your DecodedToken interface
        }
    }
}

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword});
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error:any) {
        res.status(400).json({ message: 'Failed to register user', error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h'});
        res.json({ token });
        } catch (error:any) {
            res.status(400).json({ message: 'Failed to login user', error: error.message });
    }
};

export const authMiddleware = (req: Request, res: Response, next: Function) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, secret) as DecodedToken;
        req.user = decoded; // Attach user information to request
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ message: 'Token is not valid' });
    }
};