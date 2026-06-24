<script lang="ts">
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
</script>

<button
	type="button"
	onclick={toggleMode}
	aria-label="Toggle theme"
	class="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0 text-orange-500 transition-colors hover:bg-orange-500/60 hover:text-white focus:outline-none"
>
	<SunIcon class="absolute h-6 w-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
	<MoonIcon class="h-6 w-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
	<span class="sr-only">Toggle theme</span>
</button>
