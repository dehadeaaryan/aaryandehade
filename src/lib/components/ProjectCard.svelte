<script lang="ts">
	type Props = {
		title: string;
		description: string;
		link: string;
		categories: string[];
		compact?: boolean;
	};

	let { title, description, link, categories, compact = false }: Props = $props();
</script>

<a
	href={link}
	target="_blank"
	rel="external noopener noreferrer"
	class="glass-project-card group/card"
	class:compact
>
	<div class="card-content flex h-full flex-col p-6 md:p-8">
		<h3 class="card-title group-hover/card:text-orange">{title}</h3>
		<p class="card-description">{description}</p>
		<div class="card-tags mt-auto flex flex-wrap gap-2 pt-6">
			{#each categories as category, index (index)}
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
		@apply block w-full rounded-[2rem] text-left transition-[border-color,box-shadow] duration-500;

		/* The Liquid Glass Core */
		@apply border border-white/40 bg-white/45 backdrop-blur-3xl backdrop-saturate-[1.8];
		@apply dark:border-white/10 dark:bg-black/40;

		/* Base inner lighting to create thick glass volume */
		@apply shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)];

		/* Keep the hit area stationary while highlighting the glass edges. */
		@apply hover:border-white/70 dark:hover:border-white/30;

		/* Intensify the inner rim light on hover */
		@apply hover:shadow-[inset_0_2px_8px_rgba(255,255,255,0.7)] dark:hover:shadow-[inset_0_1px_4px_rgba(255,255,255,0.3)];
	}

	.compact {
		border-radius: 1.25rem;
	}

	.compact .card-content {
		padding: 1rem;
	}

	.compact .card-tags {
		padding-top: 1rem;
	}

	.card-title {
		@apply text-xl leading-tight font-bold tracking-tight text-foreground transition-colors duration-300;
	}

	.card-description {
		@apply mt-3 flex-1 text-sm leading-relaxed text-foreground/70;
	}

	.glass-tag {
		@apply rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-bold whitespace-nowrap text-foreground/70 transition-colors duration-300;
		@apply dark:border-white/10 dark:bg-white/10 dark:text-foreground/80;

		/* Linked specifically to group/card so they only glow when THIS card is hovered */
		@apply group-hover/card:border-orange/30 group-hover/card:bg-orange/10 group-hover/card:text-orange;
		@apply dark:group-hover/card:border-orange/20 dark:group-hover/card:bg-orange/5 dark:group-hover/card:text-orange;
	}
</style>
