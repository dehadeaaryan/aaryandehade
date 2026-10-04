import { db } from '../src/lib/server/db/index';
import { project } from '../src/lib/server/db/schema';
import snapshot from '../src/lib/portfolio.json';
import { eq, inArray } from 'drizzle-orm';
const names = [
	'DropThatClass',
	'Shalendar',
	'Pollish',
	'Cooldown Room',
	'SuperFrog Scheduler Frontend'
];
async function updateProjects() {
	await db.transaction(async (tx) => {
		for (const name of names) {
			const source = snapshot.projects.find((row) => row.title === name)!;
			const aliases = name === 'Cooldown Room' ? [name, 'CooldownRoom'] : [name];
			const existing = await tx
				.select({ id: project.id })
				.from(project)
				.where(inArray(project.title, aliases));
			const { id, ...row } = source;
			void id;
			if (existing.length) {
				for (const match of existing) {
					const changes = name === 'SuperFrog Scheduler Frontend' ? { link: row.link } : row;
					await tx
						.update(project)
						.set({ ...changes, updatedAt: new Date() })
						.where(eq(project.id, match.id));
				}
			} else await tx.insert(project).values(row);
		}
	});
	console.log(
		JSON.stringify(
			await db
				.select({ id: project.id, title: project.title, link: project.link })
				.from(project)
				.where(inArray(project.title, names)),
			null,
			2
		)
	);
}
updateProjects()
	.then(() => process.exit(0))
	.catch(() => {
		console.error('Project update failed; transaction rolled back.');
		process.exit(1);
	});
