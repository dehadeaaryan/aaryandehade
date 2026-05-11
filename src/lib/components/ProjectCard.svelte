<script lang="ts">
	type Props = {
		title: string;
		description: string;
		link: string;
		categories: string[];
	};

	let { title, description, link, categories }: Props = $props();
</script>

<a href={link} target="_blank" rel="noopener noreferrer" class="glass-project-card group">
	<div class="flex h-full flex-col p-5 md:p-6">
		<h3 class="card-title group-hover:text-orange">{title}</h3>
		<p class="card-description">{description}</p>
		<div class="mt-4 flex flex-wrap gap-1.5">
			{#each categories as category}
				<span class="glass-tag">
					{category}
				</span>
			{/each}
		</div>
	</div>
</a>

<style lang="postcss">
	@reference '../../routes/layout.css';

	.glass-project-card {
		@apply block w-full rounded-[1.5rem] border border-white/40 text-left transition-all duration-300 dark:border-white/10;
		@apply bg-white/40 backdrop-blur-xl backdrop-saturate-[1.8] dark:bg-black/40;
		@apply shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)];
		@apply hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:shadow-lg dark:hover:border-white/20 dark:hover:bg-white/10;
	}

	.card-title {
		@apply text-lg leading-tight font-bold tracking-tight text-slate-900 transition-colors duration-300 dark:text-white;
	}

	.card-description {
		@apply mt-2 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300;
	}

	.glass-tag {
		@apply rounded-full border border-white/20 bg-white/30 px-2.5 py-1 text-xs font-bold whitespace-nowrap text-slate-800 backdrop-blur-md dark:border-white/10 dark:bg-black/50 dark:text-slate-200;
	}
</style>
