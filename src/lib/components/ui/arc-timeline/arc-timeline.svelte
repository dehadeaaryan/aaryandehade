<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import type {
		ArcTimelineItem,
		ArcTimelineProps,
		ArcTimelineRenderable,
		ArcTimelineStep
	} from './types';

	interface TimelineStepMeta {
		line: ArcTimelineItem;
		step: ArcTimelineStep;
		lineIndex: number;
		stepIndex: number;
		angle: number;
		isFirstStep: boolean;
		isLastStep: boolean;
	}

	// Extend the imported props to officially support two-way binding for activeStep
	type Props = ArcTimelineProps & {
		activeStep?: { time: string; stepIndex: number };
	};

	let {
		ref = $bindable(null),
		class: className,
		data,
		arcConfig = {},
		defaultActiveStep = {},
		activeStep = $bindable(), // The missing link! Allows external control.
		...restProps
	}: Props = $props();

	let circleWidth = $derived(arcConfig.circleWidth ?? 5000);
	let angleBetweenMinorSteps = $derived(arcConfig.angleBetweenMinorSteps ?? 0.35);
	let lineCountFillBetweenSteps = $derived(arcConfig.lineCountFillBetweenSteps ?? 10);
	let boundaryPlaceholderLinesCount = $derived(arcConfig.boundaryPlaceholderLinesCount ?? 50);

	function getInitialCircleRotation() {
		// Use activeStep if provided, otherwise fallback to the default
		const targetTime = activeStep?.time ?? defaultActiveStep.time ?? data[0]?.time;
		const targetStepIndex = activeStep?.stepIndex ?? defaultActiveStep.stepIndex ?? 0;

		let count = 0;

		for (const timelineItem of data) {
			if (timelineItem.time === targetTime) {
				count += targetStepIndex;
				break;
			}
			count += timelineItem.steps.length;
		}

		return (
			-count * angleBetweenMinorSteps * (lineCountFillBetweenSteps + 1) -
			angleBetweenMinorSteps * boundaryPlaceholderLinesCount
		);
	}

	let circleContainerRotateDeg = $state(getInitialCircleRotation());

	let timelineSteps = $derived.by((): TimelineStepMeta[] => {
		const steps: TimelineStepMeta[] = [];
		let stepsBeforeCurrentLine = 0;

		data.forEach((line, lineIndex) => {
			line.steps.forEach((step, stepIndex) => {
				const angle =
					angleBetweenMinorSteps *
						(lineCountFillBetweenSteps + 1) *
						(stepsBeforeCurrentLine + stepIndex) +
					angleBetweenMinorSteps * boundaryPlaceholderLinesCount;

				steps.push({
					line,
					step,
					lineIndex,
					stepIndex,
					angle,
					isFirstStep: lineIndex === 0 && stepIndex === 0,
					isLastStep: lineIndex === data.length - 1 && stepIndex === line.steps.length - 1
				});
			});

			stepsBeforeCurrentLine += line.steps.length;
		});

		return steps;
	});

	// Reactively rotate the timeline when the external buttons change the activeStep
	$effect(() => {
		// Capture activeStep in a local const to help with type narrowing inside the closure.
		const currentActiveStep = activeStep;
		if (currentActiveStep) {
			const step = timelineSteps.find(
				(s) => s.line.time === currentActiveStep.time && s.stepIndex === currentActiveStep.stepIndex
			);
			if (step) {
				circleContainerRotateDeg = -step.angle;
			}
		}
	});

	function getPlaceholderAngles(isFirstStep: boolean, isLastStep: boolean, angle: number) {
		const count =
			isLastStep || isFirstStep ? boundaryPlaceholderLinesCount : lineCountFillBetweenSteps;

		return Array.from({ length: count }, (_, index) =>
			isFirstStep ? index * angleBetweenMinorSteps : angle + (index + 1) * angleBetweenMinorSteps
		);
	}

	function getSnippet(value: ArcTimelineRenderable): Snippet | null {
		return typeof value === 'function' ? value : null;
	}

	function getPrimitiveContent(value: ArcTimelineRenderable): string | number | null {
		return typeof value === 'string' || typeof value === 'number' ? value : null;
	}

	function isActive(angle: number) {
		return Math.abs(angle + circleContainerRotateDeg) < 0.01;
	}

	// Tell the external buttons to update if the user manually clicks the timeline
	function setActiveStepByMeta(stepMeta: TimelineStepMeta) {
		circleContainerRotateDeg = -stepMeta.angle;
		activeStep = {
			time: String(stepMeta.line.time),
			stepIndex: stepMeta.stepIndex
		};
	}

	function handleStepKeydown(event: KeyboardEvent, stepMeta: TimelineStepMeta) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			setActiveStepByMeta(stepMeta);
		}
	}
</script>

<div bind:this={ref} class={cn('relative h-95 w-full overflow-hidden', className)} {...restProps}>
	<div
		class="absolute top-28 left-1/2 aspect-square origin-center rounded-full transition-all duration-500 ease-in-out"
		style:transform={`translateX(-50%) rotate(${circleContainerRotateDeg}deg)`}
		style:width={`${circleWidth}px`}
	>
		{#each timelineSteps as timelineStep (`${timelineStep.lineIndex}-${timelineStep.stepIndex}`)}
			{@const active = isActive(timelineStep.angle)}
			{@const iconSnippet = getSnippet(timelineStep.step.icon)}
			{@const iconText = getPrimitiveContent(timelineStep.step.icon)}
			{@const contentSnippet = getSnippet(timelineStep.step.content)}
			{@const contentText = getPrimitiveContent(timelineStep.step.content)}
			{@const timeSnippet = getSnippet(timelineStep.line.time)}
			{@const timeText = getPrimitiveContent(timelineStep.line.time)}

			{#if timelineStep.isFirstStep}
				{@const beforePlaceholderAngles = getPlaceholderAngles(true, false, timelineStep.angle)}

				{#each beforePlaceholderAngles as fillAngle, fillIndex (`before-${fillIndex}`)}
					<div
						class="absolute top-0 left-1/2 h-8.5 w-px -translate-x-1/2"
						style:transform-origin={`50% ${circleWidth / 2}px`}
						style:transform={`rotate(${fillAngle}deg)`}
					>
						<div
							class="h-full w-full bg-(--placeholder-line-color,#a1a1a1) dark:bg-(--placeholder-line-color,#737373)"
							style:transform-origin="center top"
							style:transform={`rotate(${-fillAngle - circleContainerRotateDeg}deg)`}
						></div>
					</div>
				{/each}
			{/if}

			<div
				class={cn(
					'absolute top-0 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-200',
					active ? 'h-30 w-0.5' : 'h-16 w-[1.5px]'
				)}
				role="button"
				tabindex="0"
				style:transform-origin={`50% ${circleWidth / 2}px`}
				style:transform={`rotate(${timelineStep.angle}deg)`}
				onclick={() => setActiveStepByMeta(timelineStep)}
				onkeydown={(event) => handleStepKeydown(event, timelineStep)}
			>
				<div
					class={cn(
						'h-full w-full transition-colors duration-200',
						active
							? 'bg-(--step-line-active-color,#888888) dark:bg-(--step-line-active-color,#9780ff)'
							: 'bg-(--step-line-inactive-color,#b1b1b1) dark:bg-(--step-line-inactive-color,#737373)'
					)}
					style:transform-origin="center top"
					style:transform={`rotate(${-timelineStep.angle - circleContainerRotateDeg}deg)`}
				>
					<div
						class={cn(
							'absolute bottom-0 left-1/2 aspect-square -translate-x-1/2',
							active
								? 'translate-y-[calc(100%+14px)] scale-[1.2] text-(--icon-active-color,#555555) dark:text-(--icon-active-color,#d4d4d4)'
								: 'translate-y-[calc(100%+4px)] scale-100 text-(--icon-inactive-color,#a3a3a3) dark:text-(--icon-inactive-color,#a3a3a3)'
						)}
					>
						{#if iconSnippet}
							{@render iconSnippet()}
						{:else if iconText !== null}
							{iconText}
						{/if}
					</div>

					<p
						class={cn(
							'absolute bottom-0 left-1/2 line-clamp-3 flex w-60 -translate-x-1/2 translate-y-[calc(100%+42px)] items-center justify-center text-center text-sm transition-opacity duration-300 ease-in',
							'text-(--description-color,#555555) dark:text-(--description-color,#d4d4d4)',
							active ? 'opacity-100' : 'opacity-0'
						)}
					>
						{#if contentSnippet}
							{@render contentSnippet()}
						{:else if contentText !== null}
							{contentText}
						{/if}
					</p>
				</div>

				{#if timelineStep.stepIndex === 0}
					<div
						class={cn(
							'absolute top-0 left-1/2 z-10 -translate-x-1/2 translate-y-[calc(-100%-24px)] whitespace-nowrap',
							active
								? 'text-(--time-active-color,#555555) dark:text-(--time-active-color,#d4d4d4)'
								: 'text-(--time-inactive-color,#a3a3a3) dark:text-(--time-inactive-color,#a3a3a3)'
						)}
					>
						{#if timeSnippet}
							{@render timeSnippet()}
						{:else if timeText !== null}
							{timeText}
						{/if}
					</div>
				{/if}
			</div>

			{@const afterPlaceholderAngles = getPlaceholderAngles(
				false,
				timelineStep.isLastStep,
				timelineStep.angle
			)}

			{#each afterPlaceholderAngles as fillAngle, fillIndex (`after-${fillIndex}`)}
				<div
					class="absolute top-0 left-1/2 h-8.5 w-px -translate-x-1/2"
					style:transform-origin={`50% ${circleWidth / 2}px`}
					style:transform={`rotate(${fillAngle}deg)`}
				>
					<div
						class="h-full w-full bg-(--placeholder-line-color,#a1a1a1) dark:bg-(--placeholder-line-color,#737373)"
						style:transform-origin="center top"
						style:transform={`rotate(${-fillAngle - circleContainerRotateDeg}deg)`}
					></div>
				</div>
			{/each}
		{/each}
	</div>
</div>
