<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu';
	import ModeToggle from '$lib/components/ModeToggle.svelte';
	import House from '@lucide/svelte/icons/house';
	import MenuIcon from '@lucide/svelte/icons/menu';

	const mainLinks = [
		{ name: 'Experience', href: '#experience' },
		{ name: 'Projects', href: '#projects' },
		{ name: 'Academics', href: '#academics' },
		{ name: 'Contact', href: '#contact' }
	];
</script>

<header>
	<div id="header-container">
		<a href="#home" id="home-link">
			<House size={28} strokeWidth={2} />
		</a>

		<div id="nav-container">
			<div id="desktop-nav">
				<NavigationMenu.Root>
					<NavigationMenu.List>
						{#each mainLinks as link (link.name)}
							<NavigationMenu.Item>
								<NavigationMenu.Link href={link.href}>{link.name}</NavigationMenu.Link>
							</NavigationMenu.Item>
						{/each}
					</NavigationMenu.List>
				</NavigationMenu.Root>
			</div>

			<div id="mobile-nav">
				<NavigationMenu.Root>
					<NavigationMenu.List>
						<NavigationMenu.Item openOnHover={false}>
							<NavigationMenu.Trigger>
								<MenuIcon size={28} strokeWidth={2} />
							</NavigationMenu.Trigger>
							<NavigationMenu.Content>
								<ul>
									{#each mainLinks as link (link.name)}
										<li>
											<NavigationMenu.Link href={link.href}>
												<div>{link.name}</div>
											</NavigationMenu.Link>
										</li>
									{/each}
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
	@reference '../routes/layout.css';

	header {
		@apply fixed top-0 z-50 w-full p-4 text-orange;
	}

	#header-container {
		@apply mx-auto flex max-w-6xl items-center justify-between rounded-full px-8 py-4;
		@apply bg-white/30 dark:bg-black/30;
		@apply backdrop-blur-md backdrop-saturate-[1.8];
		@apply border border-white/40 dark:border-white/10;
		@apply shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)];
	}

	#home-link {
		@apply inline-flex h-10 w-max items-center justify-center rounded-full px-4 py-2 text-lg font-black tracking-tighter transition-colors;
		@apply hover:bg-orange/20 hover:text-orange dark:hover:bg-orange/30;
		@apply focus:bg-orange/20 focus:text-orange focus:outline-none disabled:pointer-events-none disabled:opacity-50;
	}

	#nav-container {
		@apply flex items-center gap-4;
	}

	#desktop-nav {
		@apply hidden md:block;
	}

	#desktop-nav :global(ul) {
		@apply flex space-x-2;
	}

	#desktop-nav :global(a) {
		@apply inline-flex h-10 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-bold transition-colors;
		@apply hover:bg-orange/20 hover:text-orange dark:hover:bg-orange/30;
		@apply focus:bg-orange/20 focus:text-orange focus:outline-none disabled:pointer-events-none disabled:opacity-50;
	}

	#mobile-nav {
		@apply md:hidden;
	}

	/* Transform the mobile trigger into a perfect circle hover target to match the other icons */
	#mobile-nav :global([data-radix-navigation-menu-trigger]) {
		@apply inline-flex h-10 w-10 items-center justify-center rounded-full border-none bg-transparent p-0 shadow-none transition-colors;
		@apply hover:bg-orange/20 hover:text-orange dark:hover:bg-orange/30;
		@apply focus:bg-orange/20 focus:text-orange focus:outline-none;
	}

	/* Force hide the default chevron that shadcn appends to triggers */
	#mobile-nav :global([data-radix-navigation-menu-trigger] > svg:not(:first-child)) {
		display: none !important;
	}

	#mobile-nav :global([data-radix-navigation-menu-content]) {
		@apply mt-2 overflow-hidden rounded-xl p-1;
		@apply bg-white/30 dark:bg-black/30;
		@apply backdrop-blur-md backdrop-saturate-[1.8];
		@apply border border-white/40 dark:border-white/10;
		@apply shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)];
	}

	#mobile-nav :global(ul) {
		@apply grid gap-1;
	}

	#mobile-nav :global(ul li a div) {
		@apply text-sm leading-none font-medium;
	}

	#mobile-nav :global(ul li a) {
		@apply block rounded-md p-3 leading-none no-underline transition-colors outline-none select-none;
		@apply hover:bg-orange/20 hover:text-orange dark:hover:bg-orange/30;
		@apply focus:bg-orange/20 focus:text-orange;
	}
</style>
