<script lang="ts">
	import { ArcTimeline } from '$lib/components/ui/arc-timeline';
	import type { ArcTimelineItem } from '$lib/components/ui/arc-timeline';
	import {
		Award,
		BadgeCheck,
		Briefcase,
		GraduationCap,
		Mic,
		School,
		Star,
		Users,
		ChevronLeft,
		ChevronRight
	} from '@lucide/svelte/icons';

	const ACADEMIC_TIMELINE: ArcTimelineItem[] = [
		{
			time: '2021',
			steps: [
				{
					icon: graduationCapIcon,
					content: 'Graduated from Navrachana Higher Secondary School.'
				},
				{
					icon: schoolIcon,
					content: 'Started attending classes at Texas Christian University (TCU).'
				}
			]
		},
		{
			time: '2022',
			steps: [
				{
					icon: briefcaseIcon,
					content: 'Started working as a TA for Computer Science and a grader for Math Calculus 1.'
				},
				{
					icon: awardIcon,
					content: 'Received the TCU Scholar award for academic excellence.'
				}
			]
		},
		{
			time: '2023',
			steps: [
				{
					icon: micIcon,
					content: 'Nominated by TCU Math faculty to represent the university on a Math podcast.'
				},
				{
					icon: briefcaseIcon,
					content: 'Began role as a Resident Assistant (RA) for over 30 residents in TCU housing.'
				},
				{
					icon: badgeCheckIcon,
					content: 'Earned the MongoDB Associate Developer certification.'
				},
				{
					icon: awardIcon,
					content:
						'Received Dean`s List award for outstanding academic performance in both Fall and Spring semesters.'
				}
			]
		},
		{
			time: '2024',
			steps: [
				{
					icon: usersIcon,
					content:
						'Promoted to Community Manager by TCU Housing, managing a community of 200+ students.'
				},
				{
					icon: starIcon,
					content: 'Received Dean`s List award for outstanding academic performance.'
				}
			]
		},
		{
			time: '2025',
			steps: [
				{
					icon: graduationCapIcon,
					content:
						'Graduated from TCU Magna Cum Laude with a 3.83 GPA and received the TCU Scholar award again.'
				}
			]
		}
	];

	// Create a flattened array of all steps to make navigation math easy
	const allSteps: { time: string; stepIndex: number }[] = ACADEMIC_TIMELINE.flatMap((year) =>
		year.steps.map((_, sIndex) => ({
			time: String(year.time), // Ensure time is a string
			stepIndex: sIndex
		}))
	);

	// Track the active step (Start at the final 2025 step)
	let activeStep = $state({ time: '2025', stepIndex: 0 });

	// Derive the current index to control the disabled state of the buttons
	let currentIndex = $derived(
		allSteps.findIndex((s) => s.time === activeStep.time && s.stepIndex === activeStep.stepIndex)
	);

	let canScrollPrev = $derived(currentIndex > 0);
	let canScrollNext = $derived(currentIndex < allSteps.length - 1 && currentIndex !== -1);

	function goPrev() {
		if (canScrollPrev) {
			activeStep = allSteps[currentIndex - 1];
		}
	}

	function goNext() {
		if (canScrollNext) {
			activeStep = allSteps[currentIndex + 1];
		}
	}
</script>

<section id="academics">
	<div class="header-wrapper">
		<span class="theme-badge">Milestones</span>
		<h2 class="section-title">Academics</h2>
		<p class="section-subtitle">My educational journey, leadership roles, and certifications.</p>
	</div>

	<div class="glass-container group">
		<div class="bg-grid"></div>
		<div class="hover-glow"></div>

		<div class="relative z-10 flex min-h-120 w-full flex-1 flex-col justify-center pt-6 md:pt-8">
			<ArcTimeline
				bind:activeStep
				class="text-foreground [--description-color:var(--foreground)] [--icon-active-color:var(--orange)] [--icon-inactive-color:var(--muted-foreground)] [--placeholder-line-color:var(--border)] [--step-line-active-color:var(--orange)] [--step-line-inactive-color:var(--border)] [--time-active-color:var(--foreground)] [--time-inactive-color:var(--muted-foreground)]"
				data={ACADEMIC_TIMELINE}
			/>
		</div>

		<div class="relative z-10 flex w-full items-center justify-center gap-4 pt-4 pb-8">
			<button
				class="nav-button"
				disabled={!canScrollPrev}
				onclick={goPrev}
				aria-label="Previous milestone"
			>
				<ChevronLeft size={24} strokeWidth={2.5} />
			</button>

			<button
				class="nav-button"
				disabled={!canScrollNext}
				onclick={goNext}
				aria-label="Next milestone"
			>
				<ChevronRight size={24} strokeWidth={2.5} />
			</button>
		</div>
	</div>
</section>

{#snippet graduationCapIcon()}
	<GraduationCap class="size-5" />
{/snippet}
{#snippet schoolIcon()}
	<School class="size-5" />
{/snippet}
{#snippet briefcaseIcon()}
	<Briefcase class="size-5" />
{/snippet}
{#snippet awardIcon()}
	<Award class="size-5" />
{/snippet}
{#snippet micIcon()}
	<Mic class="size-5" />
{/snippet}
{#snippet badgeCheckIcon()}
	<BadgeCheck class="size-5" />
{/snippet}
{#snippet usersIcon()}
	<Users class="size-5" />
{/snippet}
{#snippet starIcon()}
	<Star class="size-5" />
{/snippet}

<style lang="postcss">
	@reference '../../routes/layout.css';

	section {
		@apply flex min-h-svh flex-col items-center justify-center px-4 py-12 text-center md:py-24;
	}

	.header-wrapper {
		@apply mb-10 flex flex-col items-center justify-center gap-4;
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

	.glass-container {
		@apply relative flex min-h-140 w-full max-w-6xl flex-col overflow-hidden px-4 sm:px-8;
		@apply rounded-[2.5rem] border border-white/40 transition-all duration-500 dark:border-white/10;
		@apply bg-white/40 backdrop-blur-3xl backdrop-saturate-[2] dark:bg-black/40;
		@apply shadow-[0_8px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgb(0,0,0,0.3)];
		@apply hover:border-white/60 hover:shadow-[0_16px_60px_rgb(0,0,0,0.1)] dark:hover:border-white/20 dark:hover:shadow-[0_16px_60px_rgb(0,0,0,0.5)];
	}

	.bg-grid {
		@apply pointer-events-none absolute inset-0 z-0 opacity-30 dark:opacity-20;
		background-image:
			linear-gradient(to right, #8882 1px, transparent 1px),
			linear-gradient(to bottom, #8882 1px, transparent 1px);
		background-size: 32px 32px;
		mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 20%, transparent 100%);
		-webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 20%, transparent 100%);
	}

	.hover-glow {
		@apply pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100;
		background: radial-gradient(circle 800px at 50% -20%, rgba(255, 165, 0, 0.12), transparent 70%);
	}

	/* Interactive Navigation Buttons */
	.nav-button {
		@apply flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-foreground transition-all duration-300;
		@apply border border-white/40 bg-white/30 shadow-md backdrop-blur-xl dark:border-white/10 dark:bg-black/40;
		@apply hover:scale-110 hover:border-white/60 hover:bg-white/60 hover:text-orange dark:hover:border-white/20 dark:hover:bg-white/20;
		@apply disabled:pointer-events-none disabled:opacity-30;
	}
</style>
