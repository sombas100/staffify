import { Router } from 'express';
import { getAttendance, createAttendance, updateAttendance, deleteAttendance } from '../controllers/attendanceController';;

const router = Router();

router.get('/', getAttendance);
router.post('/', createAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

export default router;