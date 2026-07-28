import { db } from '$lib/server/db';
import { experience, project, academic, contact } from '$lib/server/db/schema';
import { auth } from '$lib/server/auth';
import { asc, eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { PageServerLoad, Actions } from './$types';

const ALLOWED_ADMIN_EMAIL = env.ADMIN_EMAIL || 'dehadeaaryan@gmail.com';

function isAuthorized(email?: string | null): boolean {
	if (!email) return false;
	return email.toLowerCase() === ALLOWED_ADMIN_EMAIL.toLowerCase();
}

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		throw redirect(302, '/admin/login');
	}

	if (!isAuthorized(event.locals.user.email)) {
		await auth.api.signOut({ headers: event.request.headers });
		throw redirect(302, '/admin/login?error=unauthorized');
	}

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
		user: event.locals.user,
		experiences,
		projects,
		academics,
		contacts
	};
};

export const actions: Actions = {
	signOut: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});
		throw redirect(302, '/admin/login');
	},

	// --- EXPERIENCE ACTIONS ---
	createExperience: async (event) => {
		if (!event.locals.user || !isAuthorized(event.locals.user.email)) return fail(401, { error: 'Unauthorized' });
		const formData = await event.request.formData();
		const company = formData.get('company')?.toString().trim();
		const title = formData.get('title')?.toString().trim();
		const dates = formData.get('dates')?.toString().trim();
		const link = formData.get('link')?.toString().trim() || '#';
		const logo = formData.get('logo')?.toString().trim() || '/logos/apple-logo.jpg';
		const sortOrderRaw = formData.get('sortOrder')?.toString();
		const descriptionRaw = formData.getAll('description[]').map((d) => d.toString().trim()).filter(Boolean);

		if (!company || !title || !dates) return fail(400, { error: 'Company, Title, and Dates are required.' });

		try {
			await db.insert(experience).values({
				company,
				title,
				dates,
				link,
				logo,
				description: descriptionRaw.length > 0 ? descriptionRaw : ['New experience bullet.'],
				sortOrder: sortOrderRaw ? parseInt(sortOrderRaw, 10) : 0
			});
			return { success: true, message: 'Experience added successfully!' };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Database error adding experience.' });
		}
	},

	updateExperience: async (event) => {
		if (!event.locals.user || !isAuthorized(event.locals.user.email)) return fail(401, { error: 'Unauthorized' });
		const formData = await event.request.formData();
		const id = parseInt(formData.get('id')?.toString() || '0', 10);
		if (!id) return fail(400, { error: 'ID is required.' });

		const company = formData.get('company')?.toString().trim();
		const title = formData.get('title')?.toString().trim();
		const dates = formData.get('dates')?.toString().trim();
		const link = formData.get('link')?.toString().trim() || '#';
		const logo = formData.get('logo')?.toString().trim() || '/logos/apple-logo.jpg';
		const sortOrderRaw = formData.get('sortOrder')?.toString();
		const descriptionRaw = formData.getAll('description[]').map((d) => d.toString().trim()).filter(Boolean);

		if (!company || !title || !dates) return fail(400, { error: 'Company, Title, and Dates are required.' });

		try {
			await db
				.update(experience)
				.set({
					company,
					title,
					dates,
					link,
					logo,
					description: descriptionRaw.length > 0 ? descriptionRaw : ['Experience bullet.'],
					sortOrder: sortOrderRaw ? parseInt(sortOrderRaw, 10) : 0,
					updatedAt: new Date()
				})
				.where(eq(experience.id, id));
			return { success: true, message: 'Experience updated successfully!' };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Database error updating experience.' });
		}
	},

	deleteExperience: async (event) => {
		if (!event.locals.user || !isAuthorized(event.locals.user.email)) return fail(401, { error: 'Unauthorized' });
		const formData = await event.request.formData();
		const id = parseInt(formData.get('id')?.toString() || '0', 10);
		if (!id) return fail(400, { error: 'ID is required.' });

		try {
			await db.delete(experience).where(eq(experience.id, id));
			return { success: true, message: 'Experience deleted successfully!' };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Database error deleting experience.' });
		}
	},

	// --- PROJECT ACTIONS ---
	createProject: async (event) => {
		if (!event.locals.user || !isAuthorized(event.locals.user.email)) return fail(401, { error: 'Unauthorized' });
		const formData = await event.request.formData();
		const title = formData.get('title')?.toString().trim();
		const description = formData.get('description')?.toString().trim();
		const link = formData.get('link')?.toString().trim() || '#';
		const groupCategory = formData.get('groupCategory')?.toString().trim() || 'webAndFullStack';
		const categoriesRaw = formData.get('categories')?.toString().split(',').map((c) => c.trim()).filter(Boolean) || ['Web'];
		const sortOrderRaw = formData.get('sortOrder')?.toString();

		if (!title || !description) return fail(400, { error: 'Project Title and Description are required.' });

		try {
			await db.insert(project).values({
				title,
				description,
				link,
				categories: categoriesRaw,
				groupCategory,
				sortOrder: sortOrderRaw ? parseInt(sortOrderRaw, 10) : 0
			});
			return { success: true, message: 'Project added successfully!' };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Database error adding project.' });
		}
	},

	updateProject: async (event) => {
		if (!event.locals.user || !isAuthorized(event.locals.user.email)) return fail(401, { error: 'Unauthorized' });
		const formData = await event.request.formData();
		const id = parseInt(formData.get('id')?.toString() || '0', 10);
		if (!id) return fail(400, { error: 'ID is required.' });

		const title = formData.get('title')?.toString().trim();
		const description = formData.get('description')?.toString().trim();
		const link = formData.get('link')?.toString().trim() || '#';
		const groupCategory = formData.get('groupCategory')?.toString().trim() || 'webAndFullStack';
		const categoriesRaw = formData.get('categories')?.toString().split(',').map((c) => c.trim()).filter(Boolean) || ['Web'];
		const sortOrderRaw = formData.get('sortOrder')?.toString();

		if (!title || !description) return fail(400, { error: 'Project Title and Description are required.' });

		try {
			await db
				.update(project)
				.set({
					title,
					description,
					link,
					categories: categoriesRaw,
					groupCategory,
					sortOrder: sortOrderRaw ? parseInt(sortOrderRaw, 10) : 0,
					updatedAt: new Date()
				})
				.where(eq(project.id, id));
			return { success: true, message: 'Project updated successfully!' };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Database error updating project.' });
		}
	},

	deleteProject: async (event) => {
		if (!event.locals.user || !isAuthorized(event.locals.user.email)) return fail(401, { error: 'Unauthorized' });
		const formData = await event.request.formData();
		const id = parseInt(formData.get('id')?.toString() || '0', 10);
		if (!id) return fail(400, { error: 'ID is required.' });

		try {
			await db.delete(project).where(eq(project.id, id));
			return { success: true, message: 'Project deleted successfully!' };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Database error deleting project.' });
		}
	},

	// --- ACADEMIC ACTIONS ---
	createAcademic: async (event) => {
		if (!event.locals.user || !isAuthorized(event.locals.user.email)) return fail(401, { error: 'Unauthorized' });
		const formData = await event.request.formData();
		const year = formData.get('year')?.toString().trim();
		const icon = formData.get('icon')?.toString().trim() || 'graduationCap';
		const content = formData.get('content')?.toString().trim();
		const sortOrderRaw = formData.get('sortOrder')?.toString();

		if (!year || !content) return fail(400, { error: 'Academic Year and Content are required.' });

		try {
			await db.insert(academic).values({
				year,
				icon,
				content,
				sortOrder: sortOrderRaw ? parseInt(sortOrderRaw, 10) : 0
			});
			return { success: true, message: 'Academic milestone added successfully!' };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Database error adding academic milestone.' });
		}
	},

	updateAcademic: async (event) => {
		if (!event.locals.user || !isAuthorized(event.locals.user.email)) return fail(401, { error: 'Unauthorized' });
		const formData = await event.request.formData();
		const id = parseInt(formData.get('id')?.toString() || '0', 10);
		if (!id) return fail(400, { error: 'ID is required.' });

		const year = formData.get('year')?.toString().trim();
		const icon = formData.get('icon')?.toString().trim() || 'graduationCap';
		const content = formData.get('content')?.toString().trim();
		const sortOrderRaw = formData.get('sortOrder')?.toString();

		if (!year || !content) return fail(400, { error: 'Academic Year and Content are required.' });

		try {
			await db
				.update(academic)
				.set({
					year,
					icon,
					content,
					sortOrder: sortOrderRaw ? parseInt(sortOrderRaw, 10) : 0,
					updatedAt: new Date()
				})
				.where(eq(academic.id, id));
			return { success: true, message: 'Academic milestone updated successfully!' };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Database error updating academic milestone.' });
		}
	},

	deleteAcademic: async (event) => {
		if (!event.locals.user || !isAuthorized(event.locals.user.email)) return fail(401, { error: 'Unauthorized' });
		const formData = await event.request.formData();
		const id = parseInt(formData.get('id')?.toString() || '0', 10);
		if (!id) return fail(400, { error: 'ID is required.' });

		try {
			await db.delete(academic).where(eq(academic.id, id));
			return { success: true, message: 'Academic milestone deleted successfully!' };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Database error deleting academic milestone.' });
		}
	},

	// --- CONTACT ACTIONS ---
	createContact: async (event) => {
		if (!event.locals.user || !isAuthorized(event.locals.user.email)) return fail(401, { error: 'Unauthorized' });
		const formData = await event.request.formData();
		const name = formData.get('name')?.toString().trim();
		const value = formData.get('value')?.toString().trim();
		const link = formData.get('link')?.toString().trim();
		const icon = formData.get('icon')?.toString().trim() || 'mail';
		const sortOrderRaw = formData.get('sortOrder')?.toString();

		if (!name || !value || !link) return fail(400, { error: 'Contact Name, Value, and Link are required.' });

		try {
			await db.insert(contact).values({
				name,
				value,
				link,
				icon,
				sortOrder: sortOrderRaw ? parseInt(sortOrderRaw, 10) : 0
			});
			return { success: true, message: 'Contact entry added successfully!' };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Database error adding contact.' });
		}
	},

	updateContact: async (event) => {
		if (!event.locals.user || !isAuthorized(event.locals.user.email)) return fail(401, { error: 'Unauthorized' });
		const formData = await event.request.formData();
		const id = parseInt(formData.get('id')?.toString() || '0', 10);
		if (!id) return fail(400, { error: 'ID is required.' });

		const name = formData.get('name')?.toString().trim();
		const value = formData.get('value')?.toString().trim();
		const link = formData.get('link')?.toString().trim();
		const icon = formData.get('icon')?.toString().trim() || 'mail';
		const sortOrderRaw = formData.get('sortOrder')?.toString();

		if (!name || !value || !link) return fail(400, { error: 'Contact Name, Value, and Link are required.' });

		try {
			await db
				.update(contact)
				.set({
					name,
					value,
					link,
					icon,
					sortOrder: sortOrderRaw ? parseInt(sortOrderRaw, 10) : 0,
					updatedAt: new Date()
				})
				.where(eq(contact.id, id));
			return { success: true, message: 'Contact entry updated successfully!' };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Database error updating contact.' });
		}
	},

	deleteContact: async (event) => {
		if (!event.locals.user || !isAuthorized(event.locals.user.email)) return fail(401, { error: 'Unauthorized' });
		const formData = await event.request.formData();
		const id = parseInt(formData.get('id')?.toString() || '0', 10);
		if (!id) return fail(400, { error: 'ID is required.' });

		try {
			await db.delete(contact).where(eq(contact.id, id));
			return { success: true, message: 'Contact entry deleted successfully!' };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Database error deleting contact.' });
		}
	}
};
