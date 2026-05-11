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
		@apply block w-full rounded-3xl border border-white/20 text-left transition-all duration-300 dark:border-white/5;
		@apply bg-white/20 backdrop-blur-xl backdrop-saturate-[1.8] dark:bg-black/20;
		@apply hover:-translate-y-1 hover:border-white/40 hover:bg-white/40 dark:hover:border-white/20 dark:hover:bg-white/10;
		/* Note: Removed heavy shadows for a cleaner, modern translucent feel */
	}

	.card-title {
		@apply text-lg leading-tight font-bold tracking-tight text-foreground transition-colors duration-300;
	}

	.card-description {
		@apply mt-2 flex-1 text-sm leading-relaxed text-foreground/70;
	}

	.glass-tag {
		/* Styled to match the sleek date pills from the Experience section */
		@apply rounded-full border border-black/5 bg-black/5 px-2.5 py-1 text-xs font-bold whitespace-nowrap text-foreground/70 dark:border-white/10 dark:bg-white/10 dark:text-foreground/80;
	}
</style>
