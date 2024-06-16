import { Router } from 'express';
import { getAttendance, createAttendance } from '../controllers/attendanceController';;

const router = Router();

router.get('/', getAttendance);
router.post('/', createAttendance);

export default router;