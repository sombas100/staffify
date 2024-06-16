import { Router } from 'express';
import { getPayments, createPayments } from '../controllers/paymentsController';;

const router = Router();

router.get('/', getPayments);
router.post('/', createPayments);

export default router;