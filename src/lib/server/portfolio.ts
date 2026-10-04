import snapshot from '$lib/portfolio.json';
import { db } from './db';
import { experience, project, academic, contact } from './db/schema';
import { asc } from 'drizzle-orm';
import { createPublicCache } from './public-cache';

const caches = {
	experiences: createPublicCache(
		() =>
			db
				.select({
					id: experience.id,
					company: experience.company,
					link: experience.link,
					title: experience.title,
					dates: experience.dates,
					description: experience.description,
					logo: experience.logo,
					sortOrder: experience.sortOrder
				})
				.from(experience)
				.orderBy(asc(experience.sortOrder), asc(experience.id)),
		snapshot.experiences
	),
	projects: createPublicCache(
		() =>
			db
				.select({
					id: project.id,
					title: project.title,
					description: project.description,
					link: project.link,
					categories: project.categories,
					groupCategory: project.groupCategory,
					sortOrder: project.sortOrder
				})
				.from(project)
				.orderBy(asc(project.sortOrder), asc(project.id)),
		snapshot.projects
	),
	academics: createPublicCache(
		() =>
			db
				.select({
					id: academic.id,
					year: academic.year,
					icon: academic.icon,
					content: academic.content,
					sortOrder: academic.sortOrder
				})
				.from(academic)
				.orderBy(asc(academic.sortOrder), asc(academic.id)),
		snapshot.academics
	),
	contacts: createPublicCache(
		() =>
			db
				.select({
					id: contact.id,
					name: contact.name,
					value: contact.value,
					link: contact.link,
					icon: contact.icon,
					sortOrder: contact.sortOrder
				})
				.from(contact)
				.orderBy(asc(contact.sortOrder), asc(contact.id)),
		snapshot.contacts
	)
};
export async function loadPortfolio() {
	const [experiences, projects, academics, contacts] = await Promise.all([
		caches.experiences.get(),
		caches.projects.get(),
		caches.academics.get(),
		caches.contacts.get()
	]);
	return { experiences, projects, academics, contacts };
}
export function invalidatePortfolio() {
	for (const cache of Object.values(caches)) cache.invalidate();
}
