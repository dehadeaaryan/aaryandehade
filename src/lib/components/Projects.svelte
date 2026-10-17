<script lang="ts">
	import { onMount } from 'svelte';
	import Marquee from './ui/marquee/marquee.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import snapshot from '$lib/portfolio.json';
	interface ProjectItem {
		id?: number;
		title: string;
		description: string;
		link: string;
		categories: string[];
		groupCategory?: string;
	}
	let { projects = snapshot.projects }: { projects?: ProjectItem[] } = $props();
	let showAllProjects = $state(false);
	let isMobile = $state(false);
	const pageSize = $derived(isMobile ? 3 : 9);
	onMount(() => {
		const viewport = window.matchMedia('(max-width: 639px)');
		const updateViewport = () => {
			isMobile = viewport.matches;
			currentPage = 1;
		};
		updateViewport();
		viewport.addEventListener('change', updateViewport);
		return () => viewport.removeEventListener('change', updateViewport);
	});
	let currentPage = $state(1);
	const pageCount = $derived(Math.max(1, Math.ceil(projects.length / pageSize)));
	const activePage = $derived(Math.min(currentPage, pageCount));
	const projectPages = $derived(
		Array.from({ length: pageCount }, (_, i) => projects.slice(i * pageSize, (i + 1) * pageSize))
	);
	const webAndFullStack = $derived(projects.filter((p) => p.groupCategory === 'webAndFullStack'));
	const dataAndBackend = $derived(projects.filter((p) => p.groupCategory === 'dataAndBackend'));
	const systemsAndLogic = $derived(projects.filter((p) => p.groupCategory === 'systemsAndLogic'));
	const mobileAndTools = $derived(
		projects.filter((p) => !p.groupCategory || p.groupCategory === 'mobileAndTools')
	);
</script>

<section id="projects" aria-labelledby="projects-title">
	<div class="header-wrapper">
		<h2 id="projects-title" class="section-title">Projects</h2>
		<p class="section-subtitle">
			A collection of my web applications, machine learning models, and software utilities.
		</p>
		<div class="project-actions">
			<a class="apps-link" href="https://apps.aaryandehade.com">Live apps ↗</a>
			<button
				type="button"
				class="apps-link"
				aria-expanded={showAllProjects}
				aria-controls="all-projects"
				onclick={() => (showAllProjects = !showAllProjects)}
			>
				{showAllProjects ? 'Showcase' : 'All projects'}
			</button>
			<a
				class="apps-link"
				href="https://github.com/dehadeaaryan"
				target="_blank"
				rel="noopener noreferrer">GitHub ↗</a
			>
		</div>
	</div>

	<div id="all-projects" class="all-projects" hidden={!showAllProjects}>
		<p class="mb-4 text-sm text-foreground/60" role="status">
			{projects.length === 0 ? 0 : (activePage - 1) * pageSize + 1}–{Math.min(
				activePage * pageSize,
				projects.length
			)} of {projects.length} projects
		</p>
		<div class="project-pages">
			{#each projectPages as pageProjects, index (index)}
				<div
					class="projects-grid"
					class:inactive={activePage !== index + 1}
					aria-hidden={activePage !== index + 1}
					inert={activePage !== index + 1}
				>
					{#each pageProjects as project (project.title)}
						<ProjectCard {...project} compact />
					{/each}
				</div>
			{/each}
		</div>
		{#if pageCount > 1}
			<nav class="pagination" aria-label="Project pages">
				<button
					type="button"
					class="page-button"
					disabled={activePage === 1}
					onclick={() => (currentPage = activePage - 1)}>Previous</button
				>
				{#each Array.from({ length: pageCount }, (_, i) => i + 1) as page (page)}
					<button
						type="button"
						class="page-button page-number"
						aria-label={`Page ${page}`}
						aria-current={activePage === page ? 'page' : undefined}
						onclick={() => (currentPage = page)}>{page}</button
					>
				{/each}
				<span class="mobile-page-status">{activePage} / {pageCount}</span>
				<button
					type="button"
					class="page-button"
					disabled={activePage === pageCount}
					onclick={() => (currentPage = activePage + 1)}>Next</button
				>
			</nav>
		{/if}
	</div>

	{#if !showAllProjects}
		<div class="projects-showcase group/showcase">
			<div class="relative z-10 w-full">
				<div class="desktop-wrapper" style="perspective: 1000px;">
					<div
						class="flex flex-row items-center gap-4"
						style="transform:translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg);"
					>
						<Marquee pauseOnHover vertical class="w-72 [--duration:80s] [--gap:1rem]">
							{#each webAndFullStack as project (project.title)}
								<ProjectCard {...project} />
							{/each}
						</Marquee>
						<Marquee pauseOnHover reverse vertical class="w-72 [--duration:60s] [--gap:1rem]">
							{#each dataAndBackend as project (project.title)}
								<ProjectCard {...project} />
							{/each}
						</Marquee>
						<Marquee pauseOnHover vertical class="w-72 [--duration:60s] [--gap:1rem]">
							{#each systemsAndLogic as project (project.title)}
								<ProjectCard {...project} />
							{/each}
						</Marquee>
						<Marquee pauseOnHover reverse vertical class="w-72 [--duration:80s] [--gap:1rem]">
							{#each mobileAndTools as project (project.title)}
								<ProjectCard {...project} />
							{/each}
						</Marquee>
					</div>
				</div>

				<div class="mobile-wrapper">
					<Marquee pauseOnHover class="w-full [--duration:50s] [--gap:1rem]">
						{#each webAndFullStack as project (project.title)}
							<ProjectCard {...project} />
						{/each}
					</Marquee>
					<Marquee pauseOnHover reverse class="w-full [--duration:50s] [--gap:1rem]">
						{#each dataAndBackend as project (project.title)}
							<ProjectCard {...project} />
						{/each}
					</Marquee>
					<Marquee pauseOnHover class="w-full [--duration:50s] [--gap:1rem]">
						{#each systemsAndLogic as project (project.title)}
							<ProjectCard {...project} />
						{/each}
					</Marquee>
					<Marquee pauseOnHover reverse class="w-full [--duration:50s] [--gap:1rem]">
						{#each mobileAndTools as project (project.title)}
							<ProjectCard {...project} />
						{/each}
					</Marquee>
				</div>
			</div>
		</div>
	{/if}
</section>

<style lang="postcss">
	@reference '../../routes/layout.css';

	section {
		@apply flex min-h-svh w-full flex-col items-center overflow-hidden py-12 text-center md:py-24;
	}

	.header-wrapper {
		@apply mb-12 flex flex-col items-center justify-center gap-4 px-4;
	}

	.section-title {
		@apply m-0 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl;
	}

	.section-subtitle {
		@apply max-w-lg text-sm leading-relaxed font-medium text-balance text-foreground/60 md:text-base;
	}

	.project-actions {
		@apply flex flex-wrap items-center justify-center gap-3;
	}

	/* Overlapping pages share the tallest page's natural height at every breakpoint. */
	.project-pages {
		display: grid;
	}

	.projects-grid.inactive {
		visibility: hidden;
	}

	.projects-grid {
		@apply grid w-full max-w-7xl grid-cols-1 gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3;
		grid-area: 1 / 1;
		grid-auto-rows: 1fr;
	}

	.all-projects[hidden] {
		display: none;
	}

	.all-projects {
		@apply w-full max-w-7xl;
	}

	.pagination {
		@apply mt-6 flex flex-wrap items-center justify-center gap-2 px-4;
	}

	.page-button {
		@apply min-h-11 min-w-11 cursor-pointer rounded-xl border border-orange/30 px-3 py-2 text-sm font-bold text-orange hover:bg-orange/10 disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent;
	}

	.page-button[aria-current='page'] {
		@apply bg-orange text-white;
	}

	.mobile-page-status {
		display: none;
	}

	@media (max-width: 639px) {
		.header-wrapper {
			margin-bottom: 1.5rem;
			width: 100%;
		}

		.project-actions {
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			width: 100%;
			gap: 0.5rem;
		}

		.project-actions .apps-link {
			padding: 0.75rem 0.5rem;
			font-size: 0.8125rem;
		}

		.project-actions .apps-link:first-child {
			grid-column: 1 / -1;
		}

		.pagination {
			flex-wrap: nowrap;
			justify-content: space-between;
		}

		.page-number {
			display: none;
		}

		.mobile-page-status {
			display: block;
			font-size: 0.875rem;
		}

		.mobile-wrapper :global(.glass-project-card) {
			width: min(80vw, 20rem);
			flex-shrink: 0;
		}
	}

	.apps-link {
		@apply cursor-pointer rounded-full border border-orange/30 px-5 py-3 font-bold text-orange hover:bg-orange/10;
	}

	.projects-showcase {
		@apply relative flex w-full flex-1 flex-col items-center justify-center bg-transparent py-4;
	}

	.desktop-wrapper {
		@apply relative hidden h-160 w-full flex-row items-center justify-center gap-4 overflow-hidden bg-transparent lg:flex;
		mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
		-webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
		isolation: isolate;
		transform: translateZ(0);
		will-change: transform;
	}

	.mobile-wrapper {
		@apply relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden bg-transparent py-4 lg:hidden;
		mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
		isolation: isolate;
		transform: translateZ(0);
		will-change: transform;
	}
</style>
