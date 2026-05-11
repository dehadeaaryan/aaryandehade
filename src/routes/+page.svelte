<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Academics from '$lib/components/Academics.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Landing from '$lib/components/Landing.svelte';
	import Projects from '$lib/components/Projects.svelte';
</script>

<Header />
<main class="relative">
	<Landing />
	<Experience />
	<Projects />
	<Academics />
	<Contact />
</main>

<style lang="postcss">
	@reference './layout.css';

	:global(html) {
		@apply overscroll-none scroll-smooth;
	}

	:global(body) {
		@apply overscroll-none;
	}
</style>
