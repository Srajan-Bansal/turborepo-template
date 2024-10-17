import { Router, Response, Request } from 'express';
import prisma from '../prisma';

const router = Router();

router.get('/availableTriggers', async (req: Request, res: Response) => {
	const availableTriggers = await prisma.availableTriggers.findMany({});

	res.json(200).json(availableTriggers);
});

export const triggerRouter = router;
