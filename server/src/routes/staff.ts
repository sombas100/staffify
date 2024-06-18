import { Router } from 'express';
import { getStaff, createStaff, updateStaff, deleteStaff } from '../controllers/staffController';
import { authMiddleware } from '../controllers/auth';

const router = Router();

router.get('/', authMiddleware, getStaff);
router.post('/', createStaff);
router.put('/:id', authMiddleware, updateStaff);
router.delete('/:id', authMiddleware, deleteStaff);

export default router;