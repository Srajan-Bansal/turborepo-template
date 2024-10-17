import prisma from '@repo/db';
import { createClient } from 'redis';

const redisClient = createClient();

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const Event_Type = 'task_run_outbox';

async function main() {
	try {
		// eslint-disable-next-line no-constant-condition
		while (1) {
			const pendingRows = await prisma.taskRunOutbox.findMany({
				where: {
					status: 'PENDING',
				},
				take: 10,
			});

			if (pendingRows.length === 0) {
				console.log('No pending rows');
				await sleep(3000);
				continue;
			}

			for (const row of pendingRows) {
				try {
					await redisClient.xAdd(Event_Type, '*', {
						taskRunId: row.taskRunId,
					});

					console.log(`Added taskRunId: ${row.taskRunId} to Redis`);

					await prisma.taskRunOutbox.update({
						where: {
							id: row.id,
						},
						data: {
							status: 'SUCCESS',
						},
					});
				} catch (err) {
					console.error(
						`Error processing taskRunId: ${row.taskRunId}`,
						err
					);

					await prisma.taskRunOutbox.update({
						where: {
							id: row.id,
						},
						data: {
							status: 'FAILED',
						},
					});
				}

				await sleep(3000);
			}
		}
	} catch (err) {
		console.error('Error in main loop: ', err);
	}
}

redisClient
	.connect()
	.then(() => {
		console.log('Connected to Redis');
		main();
	})
	.catch((err) => {
		console.log('Error connecting to Redis', err);
	});
