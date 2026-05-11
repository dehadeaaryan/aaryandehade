<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Academics from '$lib/components/Academics.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Landing from '$lib/components/Landing.svelte';
	import Projects from '$lib/components/Projects.svelte';
</script>

<svelte:head>
	<title>Aaryan Dehade | Software Engineer</title>
	<meta name="description" content="Aaryan Dehade's Portfolio Website." />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aaryandehade.com/" />
	<meta property="og:title" content="Aaryan Dehade | Software Engineer" />
	<meta property="og:description" content="Aaryan Dehade's Portfolio Website." />
	<meta property="og:image" content="https://aaryandehade.com/apple-touch-icon.png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://aaryandehade.com/" />
	<meta name="twitter:title" content="Aaryan Dehade | Software Engineer" />
	<meta name="twitter:description" content="Aaryan Dehade's Portfolio Website." />
	<meta name="twitter:image" content="https://aaryandehade.com/apple-touch-icon.png" />
</svelte:head>

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
