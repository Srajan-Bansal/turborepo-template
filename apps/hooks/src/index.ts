import express from 'express';
import prisma from '@repo/db';

const app = express();

app.use(express.json());

app.post('/hooks/catch/:userId/:taskId', async (req, res) => {
	try {
		const { taskId } = req.params;
		const body = req.body;

		console.log('Received webhook', taskId, body);

		await prisma.$transaction(async (tx) => {
			const run = await tx.taskRun.create({
				data: {
					taskId: taskId,
					metadata: body,
				},
			});

			await tx.taskRunOutbox.create({
				data: {
					taskRunId: run.id,
				},
			});
		});

		res.status(200).json({
			message: 'webhook received',
		});
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		} else {
			res.status(500).json({
				message: 'An unknown error occurred',
				error,
			});
		}
	}
});

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});
