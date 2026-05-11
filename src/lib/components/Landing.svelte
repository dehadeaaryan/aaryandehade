<script lang="ts">
	import { House, MapPin } from '@lucide/svelte';
</script>

<section id="home">
	<h1 class="interactive-text">Aaryan Dehade</h1>
	<p class="interactive-text">Software Engineer</p>
	<span>
		<a
			href="https://www.google.com/maps/place/San+Francisco,+CA/@37.7577,-122.4376,12z/data=!3m1!4b1!4m6!3m5!1s0x80859a6d00690021:0x4a501367f076adff!8m2!3d37.7749295!4d-122.4194155!16zL20vMGQ2bHA?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D"
			><MapPin size={16} strokeWidth={2} /> Bay Area, USA</a
		>
		<a href="https://www.google.com/maps/place/Vadodara"
			><House size={16} strokeWidth={2} /> Vadodara, India</a
		>
	</span>
</section>

<style lang="postcss">
	@reference '../../routes/layout.css';
	section {
		@apply box-border flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center text-foreground;
	}
	h1 {
		/* Tighter tracking and leading for a more condensed, impactful display font style */
		@apply text-7xl leading-none font-black tracking-tighter md:text-9xl;
	}
	p {
		@apply text-2xl font-medium text-secondary-foreground md:text-4xl;
	}
	span {
		@apply flex flex-row items-center gap-2;
	}
	span a {
		@apply flex cursor-pointer flex-row items-center justify-center gap-1 rounded-full border border-neutral-500 px-4 py-2 text-xs transition-colors duration-300 hover:bg-foreground hover:text-background md:text-base;
	}

	.interactive-text {
		@apply text-foreground;
	}
</style>
