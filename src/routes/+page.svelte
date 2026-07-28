<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Academics from '$lib/components/Academics.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Landing from '$lib/components/Landing.svelte';
	import Projects from '$lib/components/Projects.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Aaryan Dehade | Software Engineer</title>
	<meta name="description" content="Aaryan Dehade's Portfolio Website." />
</svelte:head>

<Header />
<main class="relative">
	<Landing />
	<Experience experiences={data?.experiences} />
	<Projects projects={data?.projects} />
	<Academics academics={data?.academics} />
	<Contact contacts={data?.contacts} />
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
