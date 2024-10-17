import { Router, Response, Request } from 'express';
import prisma from '../prisma';

const router = Router();

router.get('/availableActions', async (req: Request, res: Response) => {
	const availableActions = await prisma.availableActions.findMany({});

	res.json(200).json(availableActions);
});

export const actionRouter = router;
