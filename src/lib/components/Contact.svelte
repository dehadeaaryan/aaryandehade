<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { MailIcon, GithubIcon, Linkedin01Icon } from '@hugeicons/core-free-icons';

	const contacts = [
		{
			name: 'Email',
			value: 'aaryanadehade@gmail.com',
			link: 'mailto:aaryanadehade@gmail.com',
			icon: MailIcon
		},
		{
			name: 'GitHub',
			value: '@dehadeaaryan',
			link: 'https://github.com/dehadeaaryan',
			icon: GithubIcon
		},
		{
			name: 'LinkedIn',
			value: 'Aaryan Dehade',
			link: 'https://linkedin.com/in/aaryandehade',
			icon: Linkedin01Icon
		}
	];
</script>

<section id="contact">
	<div class="header-wrapper">
		<span class="theme-badge">Connect</span>
		<h2 class="section-title">Let's Talk</h2>
		<p class="section-subtitle">
			I'm always open to discussing new opportunities, collaborations, or just having a chat about
			tech.
		</p>
	</div>

	<div class="contact-grid">
		{#each contacts as contact}
			<a
				href={contact.link}
				target="_blank"
				rel="noopener noreferrer"
				class="glass-contact-card group"
			>
				<div class="icon-wrapper">
					<HugeiconsIcon icon={contact.icon} size={24} color="currentColor" />
				</div>

				<div class="text-wrapper">
					<h3 class="contact-name">{contact.name}</h3>
					<p class="contact-value group-hover:text-foreground">{contact.value}</p>
				</div>
			</a>
		{/each}
	</div>
</section>

<style lang="postcss">
	@reference '../../routes/layout.css';

	section {
		@apply flex min-h-[80svh] flex-col items-center justify-center px-4 py-12 text-center md:py-24;
	}

	.header-wrapper {
		@apply mb-12 flex flex-col items-center justify-center gap-4;
	}

	.theme-badge {
		@apply rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-xs font-black tracking-[0.2em] text-orange uppercase shadow-sm backdrop-blur-md;
	}

	.section-title {
		@apply m-0 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl;
	}

	.section-subtitle {
		@apply max-w-lg text-sm leading-relaxed font-medium text-balance text-foreground/60 md:text-base;
	}

	.contact-grid {
		@apply grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3;
	}

	.glass-contact-card {
		@apply flex flex-col items-center justify-center gap-4 p-8 text-center;
		@apply rounded-[2rem] border border-white/40 transition-all duration-300 dark:border-white/10;
		@apply bg-white/40 backdrop-blur-3xl backdrop-saturate-[1.8] dark:bg-black/40;
		@apply shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)];
		@apply hover:-translate-y-2 hover:border-white/60 hover:bg-white/60 hover:shadow-xl dark:hover:border-white/20 dark:hover:bg-white/10;

		/* Magic fix: Centers the 3rd card on 2-column layouts (between sm and lg breakpoints) */
		@apply sm:max-lg:last:col-span-2 sm:max-lg:last:w-[calc(50%-0.5rem)] sm:max-lg:last:justify-self-center;
	}

	.icon-wrapper {
		@apply flex size-14 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/50 shadow-sm transition-all duration-300 dark:border-white/10 dark:bg-black/50;
		@apply group-hover:scale-110 group-hover:border-orange/30 group-hover:bg-orange/10;
	}

	.text-wrapper {
		@apply flex flex-col gap-1;
	}

	.contact-name {
		@apply text-lg font-bold tracking-tight text-foreground transition-colors duration-300;
	}

	.contact-value {
		@apply text-sm font-medium text-foreground/60 transition-colors duration-300;
	}
</style>
