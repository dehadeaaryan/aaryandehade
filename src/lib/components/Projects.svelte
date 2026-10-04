<script lang="ts">
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
	const webAndFullStack = $derived(projects.filter((p) => p.groupCategory === 'webAndFullStack'));
	const dataAndBackend = $derived(projects.filter((p) => p.groupCategory === 'dataAndBackend'));
	const systemsAndLogic = $derived(projects.filter((p) => p.groupCategory === 'systemsAndLogic'));
	const mobileAndTools = $derived(
		projects.filter((p) => !p.groupCategory || p.groupCategory === 'mobileAndTools')
	);
</script>

<section id="projects" aria-labelledby="projects-title">
	<div class="header-wrapper">
		<span class="theme-badge">Portfolio</span>
		<h2 id="projects-title" class="section-title">Projects</h2>
		<p class="section-subtitle">
			A collection of my web applications, machine learning models, and software utilities.
		</p>
		<a class="apps-link" href="https://apps.aaryandehade.com">Explore my live apps ↗</a>
	</div>

	<div class="projects-showcase group/showcase">
		<div class="relative z-10 w-full">
			<div class="desktop-wrapper" style="perspective: 1000px; transform-style: preserve-3d;">
				<div
					class="flex flex-row items-center gap-4"
					style="transform:translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg); transform-style: preserve-3d;"
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
</section>

<style lang="postcss">
	@reference '../../routes/layout.css';

	section {
		@apply flex min-h-svh w-full flex-col items-center overflow-hidden py-12 text-center md:py-24;
	}

	.header-wrapper {
		@apply mb-12 flex flex-col items-center justify-center gap-4 px-4;
	}

	.theme-badge {
		@apply rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-xs font-black tracking-[0.2em] text-orange uppercase shadow-sm backdrop-blur-md;
	}

	.section-title {
		@apply m-0 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl;
	}

	.section-subtitle {
		@apply max-w-lg text-sm leading-relaxed font-medium text-balance text-foreground/60 md:text-base;
	}

	.apps-link {
		@apply rounded-full border border-orange/30 px-5 py-3 font-bold text-orange hover:bg-orange/10;
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
