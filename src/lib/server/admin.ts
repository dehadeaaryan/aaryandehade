import { env } from '$env/dynamic/private';

export function isAdmin(user?: { email: string; emailVerified: boolean } | null): boolean {
	const allowedEmail = env.ADMIN_EMAIL?.trim().toLowerCase();
	return (
		!!allowedEmail && user?.emailVerified === true && user.email.toLowerCase() === allowedEmail
	);
}
