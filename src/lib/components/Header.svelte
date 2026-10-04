<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu';
	import ModeToggle from '$lib/components/ModeToggle.svelte';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import {
		BriefcaseBusiness,
		FolderOpen,
		LayoutGrid,
		GraduationCap,
		Mail,
		ArrowUpRight,
		X
	} from '@lucide/svelte';
	let mobileMenu = $state('');

	const mainLinks = [
		{ name: 'Experience', href: '#experience', icon: BriefcaseBusiness },
		{ name: 'Projects', href: '#projects', icon: FolderOpen },
		{ name: 'Apps', href: 'https://apps.aaryandehade.com', icon: LayoutGrid },
		{ name: 'Academics', href: '#academics', icon: GraduationCap },
		{ name: 'Contact', href: '#contact', icon: Mail }
	];
</script>

<header>
	<div id="header-container">
		<a href="#home" id="home-link" aria-label="Aaryan home">
			<img src="/apple-touch-icon.png" alt="" width="40" height="40" />
			<span>Aaryan<span class="brand-period">.</span></span>
		</a>

		<div id="nav-container">
			<div id="desktop-nav">
				<NavigationMenu.Root aria-label="Main navigation">
					<NavigationMenu.List>
						{#each mainLinks as link (link.name)}
							<NavigationMenu.Item>
								<NavigationMenu.Link href={link.href}>
									{link.name}
								</NavigationMenu.Link>
							</NavigationMenu.Item>
						{/each}
					</NavigationMenu.List>
				</NavigationMenu.Root>
			</div>

			<div id="mobile-nav">
				<NavigationMenu.Root
					viewport={false}
					value={mobileMenu}
					onValueChange={(value) => (mobileMenu = value)}
					aria-label="Mobile navigation"
				>
					<NavigationMenu.List>
						<NavigationMenu.Item value="main" openOnHover={false}>
							<NavigationMenu.Trigger
								aria-label={mobileMenu ? 'Close navigation menu' : 'Open navigation menu'}
							>
								<span class="menu-icon"
									>{#if mobileMenu}<X size={20} />{:else}<MenuIcon size={20} />{/if}</span
								>
							</NavigationMenu.Trigger>
							<NavigationMenu.Content>
								<p class="menu-eyebrow">Explore</p>
								<ul class="mobile-menu-links">
									{#each mainLinks.filter((link) => link.name !== 'Apps') as link (link.name)}
										<li>
											<NavigationMenu.Link href={link.href} onSelect={() => (mobileMenu = '')}>
												<span class="link-icon"><link.icon size={20} strokeWidth={1.75} /></span>
												<span>{link.name}</span>
											</NavigationMenu.Link>
										</li>
									{/each}
									<li class="apps-menu-item">
										<NavigationMenu.Link
											href="https://apps.aaryandehade.com"
											onSelect={() => (mobileMenu = '')}
										>
											<span class="link-icon"><LayoutGrid size={20} strokeWidth={1.75} /></span>
											<span class="apps-menu-copy"
												><span>Explore my apps</span><span class="apps-menu-caption"
													>Things I've built, ready to try.</span
												></span
											>
											<ArrowUpRight size={18} class="apps-menu-arrow" />
										</NavigationMenu.Link>
									</li>
								</ul>
							</NavigationMenu.Content>
						</NavigationMenu.Item>
					</NavigationMenu.List>
				</NavigationMenu.Root>
			</div>

			<ModeToggle />
		</div>
	</div>
</header>

<style lang="postcss">
	@reference '../../routes/layout.css';

	header {
		position: sticky;
		top: 12px;
		z-index: 50;
		width: calc(100% - 24px);
		max-width: 80rem;
		margin: 12px auto 0;
	}
	#header-container {
		@apply border border-white/30 bg-white/45 text-foreground shadow-lg backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-black/35;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		min-height: 64px;
		padding: 8px 12px;
		border-radius: 999px;
	}
	#home-link {
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		gap: 8px;
		min-height: 44px;
		color: inherit;
		font-size: 20px;
		font-weight: 900;
		letter-spacing: -0.035em;
		text-decoration: none;
		transition: color 200ms;
	}
	#home-link:hover {
		@apply text-orange;
	}
	#home-link img {
		width: 36px;
		height: 36px;
		border: 1px solid rgb(255 255 255 / 20%);
		border-radius: 8px;
		box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
		transition: transform 200ms;
	}
	#home-link:hover img {
		transform: rotate(-3deg) scale(1.05);
	}
	.brand-period {
		@apply text-orange;
	}
	#nav-container {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: 4px;
	}
	#desktop-nav {
		display: none;
	}
	#desktop-nav :global(ul) {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	#desktop-nav :global(a) {
		@apply text-foreground/75 hover:bg-black/5 hover:text-orange dark:hover:bg-white/10;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		padding: 0 14px;
		border-radius: 999px;
		font-size: 13px;
		font-weight: 700;
		transition:
			background-color 200ms,
			color 200ms;
	}
	#nav-container :global(.mode-toggle-btn) {
		width: 44px;
		height: 44px;
	}

	#mobile-nav :global([data-slot='navigation-menu']),
	#mobile-nav :global([data-slot='navigation-menu-item']) {
		position: static;
	}
	#mobile-nav :global([data-slot='navigation-menu-trigger']) {
		@apply border border-black/10 bg-black/5 text-orange hover:bg-orange/10 hover:text-orange dark:border-white/10 dark:bg-white/5;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		padding: 0;
		border-radius: 999px;
	}
	.menu-icon {
		display: grid;
		place-items: center;
	}
	#mobile-nav :global([data-slot='navigation-menu-trigger'] > svg) {
		display: none;
	}
	#mobile-nav :global([data-slot='navigation-menu-content']) {
		@apply border border-black/10 bg-white/95 text-foreground shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-950/95;
		position: absolute;
		top: calc(100% + 10px);
		right: 0;
		left: 0;
		width: 100%;
		max-height: calc(100dvh - 110px);
		overflow-y: auto;
		margin: 0;
		padding: 16px;
		border-radius: 24px;
	}
	.menu-eyebrow {
		@apply text-foreground/45;
		margin: 0 0 12px 4px;
		font-size: 10px;
		font-weight: 800;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}
	.mobile-menu-links {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 8px;
		padding: 0;
		margin: 0;
		list-style: none;
	}
	#mobile-nav :global(.mobile-menu-links a) {
		@apply border border-black/5 bg-black/[0.025] text-foreground hover:border-orange/20 hover:bg-orange/10 dark:border-white/5 dark:bg-white/[0.035];
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
		min-height: 94px;
		padding: 14px;
		border-radius: 16px;
		font-size: 13px;
		font-weight: 700;
		text-decoration: none;
		transition:
			background-color 150ms,
			border-color 150ms;
	}
	.link-icon {
		@apply text-orange;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.apps-menu-item {
		grid-column: 1 / -1;
		margin-top: 4px;
	}
	#mobile-nav :global(.apps-menu-item a) {
		@apply border-orange/20 bg-orange/10 hover:bg-orange/15;
		flex-direction: row;
		align-items: center;
		gap: 12px;
		min-height: 76px;
	}
	.apps-menu-copy {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.apps-menu-caption {
		@apply text-foreground/55;
		font-size: 11px;
		font-weight: 500;
	}
	#mobile-nav :global(.apps-menu-arrow) {
		@apply text-orange;
		margin-left: auto;
		flex-shrink: 0;
	}
	@media (max-width: 899px) {
		#nav-container :global(.mode-toggle-btn) {
			@apply border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5;
		}
		#nav-container :global(.mode-toggle-btn svg) {
			width: 18px;
			height: 18px;
		}
	}
	@media (min-width: 640px) {
		#header-container {
			min-height: 72px;
			padding-left: 20px;
		}
		#home-link {
			gap: 10px;
			font-size: 22px;
		}
		#home-link img {
			width: 40px;
			height: 40px;
		}
		#nav-container {
			gap: 8px;
		}
	}
	@media (min-width: 900px) {
		#desktop-nav {
			display: block;
		}
		#mobile-nav {
			display: none;
		}
	}
</style>
