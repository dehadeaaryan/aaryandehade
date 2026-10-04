<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface MarqueeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		children: Snippet;
		class?: string;
		reverse?: boolean;
		pauseOnHover?: boolean;
		vertical?: boolean;
		repeat?: number;
	}

	let {
		children,
		class: className = '',
		reverse = false,
		pauseOnHover = false,
		vertical = false,
		repeat = 4,
		...rest
	}: MarqueeProps = $props();
</script>

<div
	{...rest}
	class={cn(
		'group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]',
		{
			'flex-row': !vertical,
			'flex-col': vertical
		},
		className
	)}
>
	{#each Array(repeat).keys() as i (i)}
		<div
			class={cn('flex shrink-0 justify-around gap-(--gap)', {
				'animate-marquee flex-row': !vertical,
				'animate-marquee-vertical flex-col': vertical,
				'group-focus-within:paused group-hover:paused': pauseOnHover,
				'direction-[reverse]': reverse
			})}
		>
			{@render children?.()}
		</div>
	{/each}
</div>
