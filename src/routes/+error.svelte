<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import { isAdminHost, PUBLIC_ORIGIN } from '$lib/site-hosts';

	const notFound = $derived(page.status === 404);
	const title = $derived(notFound ? 'Page not found' : 'Something went wrong');
	const home = $derived(isAdminHost(page.url) ? PUBLIC_ORIGIN : resolve('/'));
</script>

<svelte:head>
	<title>{title} | Aaryan Dehade</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="relative flex min-h-svh items-center justify-center px-5 py-16 text-foreground">
	<section
		aria-labelledby="error-title"
		class="w-full max-w-lg rounded-[2.5rem] border border-white/40 bg-white/45 p-8 text-center shadow-2xl backdrop-blur-3xl sm:p-12 dark:border-white/10 dark:bg-black/40"
	>
		<a href={home} class="text-sm font-semibold tracking-wide">Aaryan Dehade</a>
		<p class="mt-10 text-8xl font-black tracking-tighter text-orange sm:text-9xl">
			{page.status}
		</p>
		<h1 id="error-title" class="mt-5 text-3xl font-bold tracking-tight">{title}</h1>
		<p class="mt-4 text-base leading-relaxed text-foreground/75">
			{notFound
				? 'This page may have moved, or the link might be incorrect. You can find my work back on the portfolio.'
				: 'This page could not be loaded. Please try again in a moment, or head back to the portfolio.'}
		</p>
		<a
			href={home}
			class="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 font-semibold text-black transition-colors hover:bg-orange/85"
		>
			<ArrowLeft size={18} aria-hidden="true" />
			Back to portfolio
		</a>
	</section>
</main>
