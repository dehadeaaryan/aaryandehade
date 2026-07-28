<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import { crossfade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	import appleLogo from '$lib/assets/apple-logo.jpg';
	import ipelintLogo from '$lib/assets/ipelint-logo.jpeg';
	import qualcommLogo from '$lib/assets/qualcomm-logo.jpg';

	// Set up the sliding animation for the tabs
	const [send, receive] = crossfade({
		duration: 400,
		easing: cubicInOut
	});

	let api = $state<CarouselAPI>();
	let current = $state(0);

	let canScrollPrev = $state(false);
	let canScrollNext = $state(true);

	$effect(() => {
		const emblaApi = api;
		if (!emblaApi) return;

		const onSelect = () => {
			current = emblaApi.selectedScrollSnap();
			canScrollPrev = emblaApi.canScrollPrev();
			canScrollNext = emblaApi.canScrollNext();
		};

		emblaApi.on('select', onSelect);
		onSelect(); // Initial sync

		return () => {
			emblaApi.off('select', onSelect);
		};
	});

	interface ExperienceItem {
		id?: number;
		company: string;
		link: string;
		title: string;
		dates: string;
		description: string[];
		logo: string;
	}

	let { experiences = [] }: { experiences?: ExperienceItem[] } = $props();

	const fallbackExperiences: ExperienceItem[] = [
		{
			company: 'Apple',
			link: 'https://www.apple.com',
			title: 'Software Development Engineer in Test',
			dates: 'June 2026 - Present',
			description: [
				'Designing and automating robust Maps UI test cases for Android using Espresso and Jetpack Compose, focusing on flake reduction and overall test reliability.',
				'Owning testing features and collaborating closely with cross-functional Android development teams to improve application testability, triage failures, and solve complex automation challenges.',
				'Building and maintaining modern, scalable automation frameworks across app, SDK, and API levels to establish comprehensive CI readiness.',
				'Developing stable automation patterns—such as reliable selectors and synchronization architectures—and contributing to internal documentation to ensure long-term maintainability.'
			],
			logo: appleLogo
		},
		{
			company: 'Apple',
			link: 'https://www.apple.com',
			title: 'Software Development Engineer in Test',
			dates: 'July 2025 - May 2026',
			description: [
				'Designed and automated functional, end-to-end UI, and API tests for the Apple Maps Data platform, adding 70+ targeted regression tests to strengthen coverage of critical Places data workflows.',
				'Enhanced an internal triage web portal using Python and JavaScript, adding multiple diagnostic tools and improving an existing scheduler system to make system health and test results 40% faster to access.',
				'Built AI agents and reusable skills to generate test cases from test plan links, reducing manual test authoring time by ~50%.',
				'Collaborated with international and cross-functional teams to deliver automation and quality targets.'
			],
			logo: appleLogo
		},
		{
			company: 'iPELiNT',
			link: 'https://www.ipelint.com',
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
			link: 'https://www.qualcomm.com',
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
			link: 'https://www.qualcomm.com',
			title: 'SWE Intern (2023)',
			dates: 'May 2023 - Aug 2023',
			description: [
				'Improved development efficiency by 20% across 5+ teams by creating tools using React.',
				'Accelerated frontend delivery by 50% using Micro Frontends while managing 3 Agile projects.'
			],
			logo: qualcommLogo
		}
	];

	const displayExperiences = $derived(
		experiences && experiences.length > 0 ? experiences : fallbackExperiences
	);
</script>

<section id="experience">
	<div class="header-wrapper">
		<span class="theme-badge">Career</span>
		<h2 id="experience-title" class="section-title">Experience</h2>
		<p class="section-subtitle">
			My professional journey, internships, and technical contributions.
		</p>
	</div>

	<div class="experience-showcase group">
		<div class="bg-grid"></div>
		<div class="hover-glow"></div>

		<div class="relative z-10 flex w-full flex-col items-center justify-center">
			<div
				id="experience-carousel"
				class="carousel-wrapper"
				role="region"
				aria-roledescription="carousel"
				aria-labelledby="experience-title"
			>
				<Carousel.Root setApi={(emblaApi) => (api = emblaApi)} class="carousel-root">
					<Carousel.Content>
						{#each displayExperiences as experience}
							<Carousel.Item class="carousel-item">
								<div class="card-spacing-wrapper">
									<div class="glass-card">
										<div class="card-header">
											<div class="logo-container">
												<img
													src={experience.logo}
													alt="{experience.company} logo"
													class="card-logo"
												/>
											</div>
											<div class="header-text-container">
												<div class="title-row">
													<h3 class="card-title">{experience.title}</h3>
													<span class="date-pill">{experience.dates}</span>
												</div>
												<a
													href={experience.link}
													target="_blank"
													rel="noopener noreferrer"
													class="card-company"
												>
													{experience.company}
												</a>
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
					{#each displayExperiences as experience, i}
						<button
							class="glass-tab group"
							role="tab"
							aria-selected={current === i}
							aria-controls="experience-carousel"
							onclick={() => api?.scrollTo(i)}
						>
							{#if current === i}
								<div
									class="active-pill"
									in:receive={{ key: 'active-tab' }}
									out:send={{ key: 'active-tab' }}
								></div>
							{/if}

							<span
								class="relative z-10 transition-colors duration-300"
								class:text-orange={current === i}
								class:group-hover:text-foreground={current !== i}
							>
								{experience.company}
							</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	@reference '../../routes/layout.css';

	section {
		@apply flex min-h-svh w-full flex-col items-center overflow-hidden py-12 text-center md:py-24;
	}

	/* Header Styling */
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

	/* Showcase Container */
	.experience-showcase {
		@apply relative flex w-full flex-1 flex-col items-center justify-center px-4 py-4 sm:px-8;
	}

	.bg-grid {
		@apply pointer-events-none absolute inset-0 z-0 opacity-30 dark:opacity-20;
		background-image:
			linear-gradient(to right, #8882 1px, transparent 1px),
			linear-gradient(to bottom, #8882 1px, transparent 1px);
		background-size: 32px 32px;
		mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
		-webkit-mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
	}

	.hover-glow {
		@apply pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100;
		background: radial-gradient(circle 800px at 50% 50%, rgba(255, 165, 0, 0.08), transparent 70%);
	}

	/* Carousel Structure */
	.carousel-wrapper {
		@apply relative mb-6 flex w-full max-w-5xl flex-1 flex-col md:mb-8;
	}

	:global(.carousel-root) {
		@apply flex min-h-0 w-full flex-1 flex-col;
	}

	:global([data-slot='carousel-content']) {
		@apply flex min-h-0 w-full flex-1 flex-col overflow-hidden;
	}

	:global(.carousel-item) {
		@apply flex min-w-0 basis-full flex-col pl-4;
	}

	.card-spacing-wrapper {
		@apply flex h-full w-full flex-col px-2 py-8 md:px-4;
	}

	/* Base Card Structure */
	.glass-card {
		@apply mx-auto flex w-full flex-1 flex-col overflow-hidden text-left;
		@apply rounded-[2rem] border border-white/40 transition-all duration-300 dark:border-white/10;
		@apply bg-white/45 backdrop-blur-3xl backdrop-saturate-[1.8] dark:bg-black/40;
		@apply hover:-translate-y-1 hover:border-white/60 dark:hover:border-white/20;
	}

	/* Premium Header Design */
	.card-header {
		@apply flex flex-col gap-5 border-b border-white/20 p-6 md:flex-row md:items-center md:p-8 dark:border-white/10;
	}

	.logo-container {
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
		@apply inline-block w-fit text-lg font-black text-orange transition-all duration-300 hover:underline hover:opacity-80 md:text-xl;
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

	.card-description {
		@apply flex flex-col gap-4;
	}

	.card-description li {
		@apply relative pl-6 text-sm leading-relaxed text-foreground/90 md:text-base;
	}

	.card-description li::before {
		content: '';
		@apply absolute top-[0.55rem] left-0 size-2 rounded-full bg-orange opacity-80;
	}

	/* Liquid Glass Navigation Buttons */
	.custom-nav-button {
		@apply absolute top-[50%] hidden h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-foreground transition-all duration-300 md:flex;
		@apply border border-white/30 bg-white/10 backdrop-blur-xl backdrop-saturate-[1.5];
		@apply dark:border-white/10 dark:bg-black/20;
		@apply shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_8px_30px_rgb(0,0,0,0.1)];
		@apply dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgb(0,0,0,0.3)];
		@apply hover:scale-110 hover:border-white/50 hover:bg-white/20 hover:text-orange;
		@apply dark:hover:border-white/30 dark:hover:bg-white/10;
		@apply hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.7),0_12px_40px_rgb(0,0,0,0.15)];
		@apply dark:hover:shadow-[inset_0_1px_4px_rgba(255,255,255,0.3),0_12px_40px_rgb(0,0,0,0.5)];
	}

	.left-btn {
		@apply -left-2 xl:-left-12;
	}

	.right-btn {
		@apply -right-2 xl:-right-12;
	}

	.tabs-wrapper {
		@apply relative z-10 flex w-full justify-center px-2 pt-2 pb-4 md:px-4 md:pt-0;
	}

	/* Liquid Glass Track Container */
	.tabs-container {
		@apply flex max-w-full gap-1 overflow-x-auto rounded-full p-1.5;
		@apply border border-white/20 bg-white/10 shadow-inner backdrop-blur-xl backdrop-saturate-[1.5];
		@apply dark:border-white/10 dark:bg-black/20;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.tabs-container::-webkit-scrollbar {
		display: none;
	}

	/* Base Tab: Added subtle glassy hover effect for inactive tabs */
	.glass-tab {
		@apply relative z-0 cursor-pointer rounded-full px-1 py-1.5 text-xs font-bold whitespace-nowrap text-foreground/60 transition-all duration-300 md:px-5 md:py-2 md:text-sm;
		@apply hover:bg-white/10 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)];
		@apply dark:hover:bg-white/5 dark:hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)];
		-webkit-tap-highlight-color: transparent;
	}

	/* The sliding physical glass piece (Active Tab) - Matched to Header Hover physics */
	.active-pill {
		@apply absolute inset-0 -z-10 rounded-full border border-white/30 bg-white/20;
		@apply shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_4px_12px_rgb(0,0,0,0.05)];
		@apply dark:border-white/10 dark:bg-white/10;
		@apply dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_12px_rgb(0,0,0,0.3)];
	}
</style>
