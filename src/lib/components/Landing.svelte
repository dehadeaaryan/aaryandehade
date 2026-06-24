<script lang="ts">
	import { House, MapPin } from '@lucide/svelte';
</script>

<section id="home" class="relative z-0">
	<div class="absolute -top-40 -z-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>

	<h1 class="interactive-text">Aaryan Dehade</h1>
	<p class="interactive-text">Software Engineer</p>
	<span>
		<a
			href="https://www.google.com/maps/place/San+Francisco,+CA/@37.7577,-122.4376,12z/data=!3m1!4b1!4m6!3m5!1s0x80859a6d00690021:0x4a501367f076adff!8m2!3d37.7749295!4d-122.4194155!16zL20vMGQ2bHA?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D"
		>
			<MapPin size={16} strokeWidth={2} /> Bay Area, CA
		</a>
		<a href="https://www.google.com/maps/place/Vadodara">
			<House size={16} strokeWidth={2} /> Vadodara, India
		</a>
	</span>
</section>

<style lang="postcss">
	@reference '../../routes/layout.css';

	section {
		@apply box-border flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center text-foreground;
	}

	h1 {
		@apply text-7xl leading-none font-black tracking-tighter md:text-9xl;
	}

	p {
		@apply text-2xl font-medium text-secondary-foreground md:text-4xl;
	}

	span {
		@apply z-10 flex flex-row items-center gap-4;
	}

	span a {
		@apply flex cursor-pointer flex-row items-center justify-center gap-1 rounded-full px-4 py-2 text-xs transition-all duration-300 md:text-base;

		@apply border border-white/20 bg-white/10 text-neutral-800 shadow-md backdrop-blur-lg backdrop-saturate-150 hover:scale-105 hover:bg-white/20;

		@apply dark:border-white/10 dark:bg-black/10 dark:text-neutral-200 dark:hover:bg-black/20;
	}

	.interactive-text {
		@apply text-foreground;
	}
</style>
