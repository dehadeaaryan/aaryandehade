<script lang="ts" module>
	import { cn } from '$lib/utils.js';
	import { tv } from 'tailwind-variants';

	export const navigationMenuTriggerStyle = tv({
		base: 'rounded-2xl px-4.5 py-2.5 text-sm font-medium focus-visible:ring-[3px] focus-visible:outline-1 disabled:opacity-50 group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center outline-none disabled:pointer-events-none'
	});
</script>

<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: NavigationMenuPrimitive.TriggerProps = $props();
</script>

<NavigationMenuPrimitive.Trigger
	bind:ref
	data-slot="navigation-menu-trigger"
	class={cn(navigationMenuTriggerStyle(), 'group', className)}
	{...restProps}
>
	{@render children?.()}
	<HugeiconsIcon
		icon={ArrowDown01Icon}
		strokeWidth={2}
		class="transitiongroup-data-popup-open/navigation-menu-trigger:rotate-180 relative top-px ml-1 size-3 group-data-open/navigation-menu-trigger:rotate-180"
		aria-hidden="true"
	/>
</NavigationMenuPrimitive.Trigger>
