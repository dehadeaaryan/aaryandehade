<script lang="ts">
	import Marquee from './ui/marquee/marquee.svelte';
	import ProjectCard from './ProjectCard.svelte';

	const allProjects = [
		{
			title: 'DropThatClass',
			description: 'Up-to-date class reviews for students',
			link: 'https://www.dropthatclass.com/',
			categories: ['Web', 'Database', 'AI/ML']
		},
		{
			title: 'iPELiNT',
			description: 'Created a patent classification model using TensorFlow and Keras',
			link: 'https://www.ipelint.com/',
			categories: ['Web', 'Database', 'AI/ML']
		},
		{
			title: 'SuperFrog Scheduler Backend',
			description: 'Java backend for SuperFrog Scheduler project with Spring',
			link: 'https://github.com/dehadeaaryan/superfrog-scheduler-backend',
			categories: ['Java', 'Web', 'Database', 'Utilities']
		},
		{
			title: 'SuperFrog Scheduler Frontend',
			description: 'Vue frontend for SuperFrog Scheduler project with Spring',
			link: 'https://github.com/dehadeaaryan/superfrog-scheduler-backend',
			categories: ['Web', 'Utilities']
		},
		{
			title: 'Marie Simulator',
			description: 'Simulator for MARIE (Machine Architecture that is Really Intuitive and Easy)',
			link: 'https://github.com/dehadeaaryan/marie-simulator',
			categories: ['Python', 'Utilities']
		},
		{
			title: 'JustDropIt',
			description: 'Review classes on iOS application',
			link: 'https://github.com/dehadeaaryan/just-drop-it',
			categories: ['iOS', 'Database', 'Utilities']
		},
		{
			title: 'Discord Bot Maker',
			description: 'Python library for creating Discord bots',
			link: 'https://github.com/dehadeaaryan/discord-bot-maker',
			categories: ['Python', 'Library']
		},
		{
			title: 'Music.www',
			description: 'Play any song with extra controls',
			link: 'https://github.com/dehadeaaryan/music-www',
			categories: ['Python', 'Database', 'Utilities']
		},
		{
			title: 'F1 Stats',
			description: 'Find live Formula 1 statistics',
			link: 'https://github.com/dehadeaaryan/openf1client',
			categories: ['Web', 'Utilities']
		},
		{
			title: 'Quacker Bot',
			description: 'My favorite Discord bot',
			link: 'https://github.com/dehadeaaryan/quacker-bot-master',
			categories: ['Python', 'Utilities']
		},
		{
			title: 'Turtler',
			description: 'Get started with Data Science',
			link: 'https://github.com/dehadeaaryan/turtler',
			categories: ['Python', 'Library']
		},
		{
			title: 'Book Manager MySQL',
			description: 'Python application to manage databases',
			link: 'https://github.com/dehadeaaryan/book-manager-mysql',
			categories: ['Python', 'Database']
		},
		{
			title: 'Book Manager Mongo',
			description: 'Python application to manage databases',
			link: 'https://github.com/dehadeaaryan/book-manager-mongo',
			categories: ['Python', 'Database']
		},
		{
			title: 'Chess',
			description: 'Chess game in Python',
			link: 'https://github.com/dehadeaaryan/chess',
			categories: ['Python', 'Game Development']
		},
		{
			title: 'Sudoku Solver',
			description: 'A Sudoku Solver implemented in Python',
			link: 'https://github.com/dehadeaaryan/sudoku-solver',
			categories: ['Java', 'Utilities']
		},
		{
			title: 'Maze Solver',
			description: 'Maze solver project for data structures',
			link: 'https://github.com/dehadeaaryan/maze-solver',
			categories: ['Java', 'Utilities']
		},
		{
			title: 'Line Text Editor',
			description: 'Text editor created in Java',
			link: 'https://github.com/dehadeaaryan/line-text-editor',
			categories: ['Java', 'Utilities']
		},
		{
			title: 'TCU Utils',
			description: 'Miscellaneous utilities for students',
			link: 'https://github.com/dehadeaaryan/tcu-utils',
			categories: ['Web', 'Utilities']
		},
		{
			title: 'Pygame Builder',
			description: 'Python library to create games',
			link: 'https://github.com/dehadeaaryan/pygame-builder',
			categories: ['Python', 'Library']
		},
		{
			title: 'ASL to English',
			description: 'Python project for converting American Sign Language to English text.',
			link: 'https://github.com/dehadeaaryan/asl-to-english',
			categories: ['Python', 'AI/ML']
		},
		{
			title: 'AI Making Shopping Smart',
			description: 'AI-based project for smarter shopping experiences',
			link: 'https://github.com/dehadeaaryan/ai-making-shopping-smart',
			categories: ['Python', 'AI/ML']
		},
		{
			title: 'AI Search and Games',
			description: 'AI algorithms for game theory and search problems',
			link: 'https://github.com/dehadeaaryan/ai-search-and-games',
			categories: ['Python', 'AI/ML']
		},
		{
			title: 'Tank War Game',
			description: '2D action game inspired by Battle City',
			link: 'https://github.com/dehadeaaryan/tank-war-game',
			categories: ['Java']
		},
		{
			title: 'Campus Concierge',
			description: 'Concierge platform for campus services',
			link: 'https://github.com/dehadeaaryan/campus-concierge',
			categories: ['Web', 'Utilities']
		},
		{
			title: 'F1 Client',
			description: 'API client for live Formula 1 data',
			link: 'http://github.com/dehadeaaryan/f1-client',
			categories: ['Web', 'Utilities']
		},
		{
			title: 'Twitter Client',
			description: 'iOS app written in Swift for Twitter',
			link: 'https://github.com/dehadeaaryan/ios-twitter',
			categories: ['iOS']
		},
		{
			title: 'Parstagram',
			description: 'Instagram clone iOS app written in Swift',
			link: 'https://github.com/dehadeaaryan/ios-parstagram',
			categories: ['iOS', 'Database']
		},
		{
			title: 'Calculator',
			description: 'iOS calculator app written in Swift',
			link: 'https://github.com/dehadeaaryan/ios-calculator',
			categories: ['iOS', 'Database']
		},
		{
			title: 'Parallel Computing',
			description: 'Assignment for Parallel Computing Class',
			link: 'https://github.com/dehadeaaryan/parallel-computing-5',
			categories: ['C']
		},
		{
			title: 'Rabbit Fox Island',
			description: 'C-based game project with MIT License',
			link: 'https://github.com/dehadeaaryan/rabbit-fox-island',
			categories: ['C', 'Parallel Computing']
		},
		{
			title: 'Hogwarts Artifacts Online',
			description: 'Java-based website with artifacts from Hogwarts',
			link: 'https://github.com/dehadeaaryan/hogwarts-artifacts-online',
			categories: ['Java', 'Web']
		},
		{
			title: 'AaryanDehade.me',
			description: 'My personal website',
			link: 'https://github.com/dehadeaaryan/aaryandehade-portfolio',
			categories: ['Web']
		},
		{
			title: 'ai.tcu.edu',
			description: 'Application for TCU AI',
			link: 'https://github.com/dehadeaaryan/tcu-ai',
			categories: ['Web']
		},
		{
			title: 'More Projects',
			description: 'Visit my GitHub for more projects',
			link: 'https://github.com/dehadeaaryan',
			categories: ['Miscellaneous']
		}
	];

	const webAndFullStack = [
		'DropThatClass',
		'iPELiNT',
		'SuperFrog Scheduler Frontend',
		'F1 Stats',
		'TCU Utils',
		'Campus Concierge',
		'F1 Client',
		'Hogwarts Artifacts Online',
		'AaryanDehade.me',
		'ai.tcu.edu'
	].map((title) => allProjects.find((p) => p.title === title)!);

	const aiDataBackend = [
		'SuperFrog Scheduler Backend',
		'ASL to English',
		'AI Making Shopping Smart',
		'AI Search and Games',
		'Book Manager MySQL',
		'Book Manager Mongo',
		'Turtler'
	].map((title) => allProjects.find((p) => p.title === title)!);

	const systemsAndLowLevel = [
		'Marie Simulator',
		'Sudoku Solver',
		'Maze Solver',
		'Line Text Editor',
		'Tank War Game',
		'Parallel Computing',
		'Rabbit Fox Island'
	].map((title) => allProjects.find((p) => p.title === title)!);

	const mobileLibsTools = [
		'JustDropIt',
		'Discord Bot Maker',
		'Music.www',
		'Quacker Bot',
		'Pygame Builder',
		'Chess',
		'Twitter Client',
		'Parstagram',
		'Calculator',
		'More Projects'
	].map((title) => allProjects.find((p) => p.title === title)!);
</script>

<section id="projects">
	<div class="header-wrapper">
		<span class="theme-badge">Portfolio</span>
		<h2 class="section-title">Projects</h2>
		<p class="section-subtitle">
			A collection of my web applications, machine learning models, and software utilities.
		</p>
	</div>

	<div class="projects-showcase group/showcase">
		<div class="relative z-10 w-full">
			<div class="desktop-wrapper" style="perspective: 1000px; transform-style: preserve-3d;">
				<div
					class="flex flex-row items-center gap-4"
					style="transform:translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg); transform-style: preserve-3d;"
				>
					<Marquee pauseOnHover vertical class="w-72 [--duration:80s] [--gap:1rem]">
						{#each webAndFullStack as project}
							<ProjectCard {...project} />
						{/each}
					</Marquee>
					<Marquee pauseOnHover reverse vertical class="w-72 [--duration:60s] [--gap:1rem]">
						{#each aiDataBackend as project}
							<ProjectCard {...project} />
						{/each}
					</Marquee>
					<Marquee pauseOnHover vertical class="w-72 [--duration:60s] [--gap:1rem]">
						{#each systemsAndLowLevel as project}
							<ProjectCard {...project} />
						{/each}
					</Marquee>
					<Marquee pauseOnHover reverse vertical class="w-72 [--duration:80s] [--gap:1rem]">
						{#each mobileLibsTools as project}
							<ProjectCard {...project} />
						{/each}
					</Marquee>
				</div>
			</div>

			<div class="mobile-wrapper">
				<Marquee pauseOnHover class="w-full [--duration:50s] [--gap:1rem]">
					{#each webAndFullStack as project}
						<ProjectCard {...project} />
					{/each}
				</Marquee>
				<Marquee pauseOnHover reverse class="w-full [--duration:50s] [--gap:1rem]">
					{#each aiDataBackend as project}
						<ProjectCard {...project} />
					{/each}
				</Marquee>
				<Marquee pauseOnHover class="w-full [--duration:50s] [--gap:1rem]">
					{#each systemsAndLowLevel as project}
						<ProjectCard {...project} />
					{/each}
				</Marquee>
				<Marquee pauseOnHover reverse class="w-full [--duration:50s] [--gap:1rem]">
					{#each mobileLibsTools as project}
						<ProjectCard {...project} />
					{/each}
				</Marquee>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	@reference '../../routes/layout.css';

	section {
		@apply flex min-h-[100svh] w-full flex-col items-center overflow-hidden py-12 text-center md:py-24;
	}

	/* Header Styling */
	.header-wrapper {
		@apply mb-12 flex flex-col items-center justify-center gap-4 px-4;
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

	/* Showcase Container - Completely Transparent */
	.projects-showcase {
		@apply relative flex w-full flex-1 flex-col items-center justify-center bg-transparent py-4;
	}

	/* Marquee Wrappers - Extended mask fade from 15% to 25% for a much softer blend */
	.desktop-wrapper {
		@apply relative hidden h-[40rem] w-full flex-row items-center justify-center gap-4 overflow-hidden bg-transparent lg:flex;
		mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
		-webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
		isolation: isolate;
		transform: translateZ(0);
		will-change: transform;
	}

	.mobile-wrapper {
		@apply relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden bg-transparent py-4 lg:hidden;
		mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
		isolation: isolate;
		transform: translateZ(0);
		will-change: transform;
	}
</style>
