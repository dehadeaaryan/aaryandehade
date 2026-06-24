<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: NavigationMenuPrimitive.ViewportProps = $props();
</script>

<div class={cn('absolute inset-s-0 top-full isolate z-50 flex justify-center')}>
	<NavigationMenuPrimitive.Viewport
		bind:ref
		data-slot="navigation-menu-viewport"
		class={cn(
			'origin-top-center relative mt-1.5 h-[calc(var(--bits-navigation-menu-viewport-height)+1rem)] w-full  rounded-2xl border border-white/20 bg-white/80 shadow-2xl ring-1 ring-foreground/5 backdrop-blur-3xl backdrop-saturate-[1.8] md:w-[calc(var(--bits-navigation-menu-viewport-width)+1rem)] dark:border-white/10 dark:bg-black/80 data-open:animate-in data-open:zoom-in-90 data-closed:animate-out data-closed:zoom-out-90',
			className
		)}
		{...restProps}
	/>
</div>
