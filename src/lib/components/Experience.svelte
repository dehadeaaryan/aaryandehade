<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';

	import appleLogo from '$lib/assets/apple-logo.jpg';
	import ipelintLogo from '$lib/assets/ipelint-logo.jpeg';
	import qualcommLogo from '$lib/assets/qualcomm-logo.jpg';

	let api = $state<CarouselAPI>();
	let current = $state(0);

	let canScrollPrev = $state(false);
	let canScrollNext = $state(true);

	$effect(() => {
		if (api) {
			current = api.selectedScrollSnap();
			canScrollPrev = api.canScrollPrev();
			canScrollNext = api.canScrollNext();

			api.on('select', () => {
				current = api!.selectedScrollSnap();
				canScrollPrev = api!.canScrollPrev();
				canScrollNext = api!.canScrollNext();
			});
		}
	});

	const experiences = [
		{
			company: 'Apple',
			title: 'Software Development Engineer in Test',
			dates: 'July 2025 - Present',
			description: [
				'Designed and automated functional, end-to-end UI, and API tests for the Apple Maps Data platform, adding 70+ targeted regression tests to strengthen coverage of critical Places data workflows.',
				'Enhanced an internal triage web portal using Python and JavaScript, adding multiple diagnostic tools and improving an existing scheduler system to make system health and test results 40% faster to access.',
				'Built AI agents and reusable skills to generate test cases from test plan links, reducing manual test authoring time by ~50%',
				'Collaborated with international and cross-functional teams to deliver automation and quality targets.'
			],
			logo: appleLogo
		},
		{
			company: 'iPELiNT',
			title: 'Senior Design Project',
			dates: 'Sept 2024 - May 2025',
			description: [
				'Created and enhanced machine learning models to detect and classify patents with 99% top-5 accuracy, improving the patent search experience for users.',
				'Contributed to the development of a web application using Vue, node.js and MongoDB, enabling users to easily search and analyze patent data with an intuitive and modern interface.',
				'Collaborated with a team of 4 to design and implement new features, fix bugs, and optimize performance, resulting in a more robust and user-friendly product.'
			],
			logo: ipelintLogo
		},
		{
			company: 'Qualcomm',
			title: 'SWE Intern (2024)',
			dates: 'May 2024 - Aug 2024',
			description: [
				'Collaborated on a testing team to deliver 4 critical features boosting user efficiency by 100%.',
				'Introduced new functionality and optimized performance for teams under modem technology.',
				'Captained a team of 5 interns in developing an AI-powered application to enhance meeting productivity.',
				'Represented 200+ interns on a six-member committee liaising with senior leadership.'
			],
			logo: qualcommLogo
		},
		{
			company: 'Qualcomm',
			title: 'SWE Intern (2023)',
			dates: 'May 2023 - Aug 2023',
			description: [
				'Improved development efficiency by 20% across 5+ teams by creating tools using React.',
				'Accelerated frontend delivery by 50% using Micro Frontends while managing 3 Agile projects.'
			],
			logo: qualcommLogo
		}
	];
</script>

<section id="experience">
	<h2 id="experience-title" class="section-title">Experience</h2>

	<div
		id="experience-carousel"
		class="carousel-wrapper"
		role="region"
		aria-roledescription="carousel"
		aria-labelledby="experience-title"
	>
		<Carousel.Root setApi={(emblaApi) => (api = emblaApi)} class="carousel-root">
			<Carousel.Content>
				{#each experiences as experience}
					<Carousel.Item class="carousel-item">
						<div class="glass-card">
							<div class="card-header">
								<div class="logo-container">
									<img src={experience.logo} alt="{experience.company} logo" class="card-logo" />
								</div>
								<div class="header-text-container">
									<div class="title-row">
										<h3 class="card-title">{experience.title}</h3>
										<span class="date-pill">{experience.dates}</span>
									</div>
									<p class="card-company">{experience.company}</p>
								</div>
							</div>

							<div class="card-body">
								<ul class="card-description">
									{#each experience.description as point}
										<li>{point}</li>
									{/each}
								</ul>
							</div>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>

		<button
			class="custom-nav-button left-btn"
			class:opacity-30={!canScrollPrev}
			class:pointer-events-none={!canScrollPrev}
			onclick={() => api?.scrollPrev()}
			aria-label="Previous slide"
		>
			<ChevronLeft size={28} strokeWidth={2.5} />
		</button>

		<button
			class="custom-nav-button right-btn"
			class:opacity-30={!canScrollNext}
			class:pointer-events-none={!canScrollNext}
			onclick={() => api?.scrollNext()}
			aria-label="Next slide"
		>
			<ChevronRight size={28} strokeWidth={2.5} />
		</button>
	</div>

	<div class="tabs-wrapper">
		<div class="tabs-container" role="tablist" aria-label="Experience slides">
			{#each experiences as experience, i}
				<button
					class="glass-tab"
					role="tab"
					aria-selected={current === i}
					aria-controls="experience-carousel"
					class:active={current === i}
					onclick={() => api?.scrollTo(i)}
				>
					{experience.company}
				</button>
			{/each}
		</div>
	</div>
</section>

<style lang="postcss">
	@reference '../../routes/layout.css';

	section {
		@apply flex min-h-[100svh] flex-col items-center px-4 py-6 text-center md:py-20;
	}

	.section-title {
		@apply mt-8 mb-4 text-4xl font-black tracking-tight md:mt-0 md:mb-12 md:text-5xl lg:text-6xl;
	}

	.carousel-wrapper {
		@apply relative mb-4 flex w-full max-w-4xl flex-1 flex-col md:mb-8;
	}

	:global(.carousel-root) {
		@apply flex min-h-0 w-full flex-1 flex-col;
	}

	:global([data-slot='carousel-content']) {
		@apply flex min-h-0 w-full flex-1 flex-col overflow-hidden;
	}

	:global([data-embla-container]) {
		@apply flex h-full flex-1 items-stretch;
	}

	:global(.carousel-item) {
		@apply flex min-w-0 basis-full flex-col pl-4;
	}

	/* Base Card Structure */
	.glass-card {
		@apply mx-auto flex w-full flex-1 flex-col overflow-hidden text-left;
		@apply rounded-[2rem] border border-white/40 transition-all duration-300 dark:border-white/10;
		@apply bg-white/45 backdrop-blur-3xl backdrop-saturate-[1.8] dark:bg-black/40;
	}

	/* Premium Header Design */
	.card-header {
		@apply flex flex-col gap-5 border-b border-white/20 p-6 md:flex-row md:items-center md:p-8 dark:border-white/10;
	}

	.logo-container {
		/* Gives the logo a sleek iOS-app-icon aesthetic */
		@apply flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-lg md:size-20;
	}

	.card-logo {
		@apply h-full w-full rounded-xl object-contain;
	}

	.header-text-container {
		@apply flex w-full flex-col gap-1.5 md:gap-2;
	}

	.title-row {
		@apply flex flex-col items-start justify-between gap-2 md:flex-row md:items-center;
	}

	.card-title {
		@apply text-2xl font-bold tracking-tight text-foreground md:text-3xl;
	}

	.date-pill {
		@apply rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-bold whitespace-nowrap text-foreground/70 dark:border-white/10 dark:bg-white/10 dark:text-foreground/80;
	}

	.card-company {
		@apply text-lg font-black text-orange md:text-xl;
	}

	/* Content Body Design */
	.card-body {
		@apply flex-1 overflow-y-auto p-6 md:p-8;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.card-body::-webkit-scrollbar {
		display: none;
	}

	/* Custom Stylish Bullet Points */
	.card-description {
		@apply flex flex-col gap-4;
	}

	.card-description li {
		@apply relative pl-6 text-sm leading-relaxed text-foreground/90 md:text-base;
	}

	/* Creates a custom orange dot for the list items instead of standard boring bullets */
	.card-description li::before {
		content: '';
		@apply absolute top-[0.55rem] left-0 size-2 rounded-full bg-orange opacity-80;
	}

	/* Navigation */
	.custom-nav-button {
		@apply absolute top-[40%] hidden h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-foreground transition-all duration-300 md:flex;
		@apply border border-white/40 bg-white/30 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/40;
		@apply hover:scale-110 hover:bg-white/60 hover:text-orange dark:hover:bg-white/20;
	}

	.left-btn {
		@apply -left-6 xl:-left-16;
	}

	.right-btn {
		@apply -right-6 xl:-right-16;
	}

	.tabs-wrapper {
		@apply flex w-full justify-center px-2 pt-2 pb-4 md:px-4 md:pt-0;
	}

	.tabs-container {
		@apply flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/20 bg-white/20 p-1.5 backdrop-blur-md dark:border-white/10 dark:bg-black/30;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.tabs-container::-webkit-scrollbar {
		display: none;
	}

	.glass-tab {
		@apply cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold whitespace-nowrap text-foreground/60 transition-all duration-300 hover:text-foreground md:px-5 md:py-2 md:text-sm;
	}

	.glass-tab.active {
		@apply bg-white/60 text-orange shadow-sm dark:bg-white/10;
	}
</style>
