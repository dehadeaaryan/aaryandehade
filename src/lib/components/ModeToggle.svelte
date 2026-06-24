<script lang="ts">
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
</script>

<button type="button" onclick={toggleMode} aria-label="Toggle theme" class="mode-toggle-btn">
	<SunIcon
		class="absolute h-6 w-6 scale-0 rotate-90 transition-all duration-500 ease-out dark:scale-100 dark:rotate-0"
	/>
	<MoonIcon
		class="h-6 w-6 scale-100 rotate-0 transition-all duration-500 ease-out dark:scale-0 dark:-rotate-90"
	/>
	<span class="sr-only">Toggle theme</span>
</button>

<style lang="postcss">
	@reference '../../routes/layout.css';

	.mode-toggle-btn {
		@apply inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0 text-orange transition-all duration-300;

		/* Liquid Glass Hover: Matches the exact physics of the header links */
		@apply hover:scale-105 hover:bg-white/20 hover:text-orange hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_4px_12px_rgb(0,0,0,0.05)];
		@apply dark:hover:bg-white/10 dark:hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_12px_rgb(0,0,0,0.3)];
	}
</style>
