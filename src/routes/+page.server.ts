import { db } from '$lib/server/db';
import { experience, project, academic, contact } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const experiences = await db.query.experience.findMany({
			orderBy: [asc(experience.sortOrder), asc(experience.id)]
		});

		const projects = await db.query.project.findMany({
			orderBy: [asc(project.sortOrder), asc(project.id)]
		});

		const academics = await db.query.academic.findMany({
			orderBy: [asc(academic.sortOrder), asc(academic.id)]
		});

		const contacts = await db.query.contact.findMany({
			orderBy: [asc(contact.sortOrder), asc(contact.id)]
		});

		return {
			experiences,
			projects,
			academics,
			contacts
		};
	} catch (error) {
		console.error('Failed to load portfolio data from DB:', error);
		return {
			experiences: [],
			projects: [],
			academics: [],
			contacts: []
		};
	}
};
