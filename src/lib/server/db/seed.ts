import { db } from './index';
import { experience, project, academic, contact } from './schema';
import snapshot from '../../portfolio.json';
import { and, eq } from 'drizzle-orm';

// Insert missing content only. Existing admin edits and custom records survive reseeding.
async function seed() {
	await db.transaction(async (tx) => {
		for (const { id, ...row } of snapshot.experiences) {
			void id;
			const exists = await tx
				.select({ id: experience.id })
				.from(experience)
				.where(
					and(
						eq(experience.company, row.company),
						eq(experience.title, row.title),
						eq(experience.dates, row.dates)
					)
				)
				.limit(1);
			if (!exists.length) await tx.insert(experience).values(row);
		}
		for (const { id, ...row } of snapshot.projects) {
			void id;
			const exists = await tx
				.select({ id: project.id })
				.from(project)
				.where(eq(project.title, row.title))
				.limit(1);
			if (!exists.length) await tx.insert(project).values(row);
		}
		for (const { id, ...row } of snapshot.academics) {
			void id;
			const exists = await tx
				.select({ id: academic.id })
				.from(academic)
				.where(and(eq(academic.year, row.year), eq(academic.content, row.content)))
				.limit(1);
			if (!exists.length) await tx.insert(academic).values(row);
		}
		for (const { id, ...row } of snapshot.contacts) {
			void id;
			const exists = await tx
				.select({ id: contact.id })
				.from(contact)
				.where(eq(contact.name, row.name))
				.limit(1);
			if (!exists.length) await tx.insert(contact).values(row);
		}
	});
	console.log('Inserted missing portfolio content; preserved existing records.');
}
seed()
	.then(() => process.exit(0))
	.catch(() => {
		console.error('Seeding failed; transaction rolled back.');
		process.exit(1);
	});
