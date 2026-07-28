<script lang="ts">
	import Plus from '@lucide/svelte/icons/plus';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import Edit3 from '@lucide/svelte/icons/edit-3';
	import X from '@lucide/svelte/icons/x';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import Briefcase from '@lucide/svelte/icons/briefcase';
	import FolderGit2 from '@lucide/svelte/icons/folder-git-2';
	import GraduationCap from '@lucide/svelte/icons/graduation-cap';
	import Mail from '@lucide/svelte/icons/mail';
	import Check from '@lucide/svelte/icons/check';
	import AlertCircle from '@lucide/svelte/icons/alert-circle';
	import LogOut from '@lucide/svelte/icons/log-out';

	let { data, form } = $props();

	let activeTab = $state<'experience' | 'projects' | 'academics' | 'contact'>('experience');

	let user = $derived(data?.user);
	let experiences = $derived(data?.experiences || []);
	let projects = $derived(data?.projects || []);
	let academics = $derived(data?.academics || []);
	let contacts = $derived(data?.contacts || []);

	// Active Modal State
	let activeModal = $state<'experience' | 'project' | 'academic' | 'contact' | null>(null);

	// --- Experience Form State ---
	let expId = $state<number | null>(null);
	let expCompany = $state('');
	let expTitle = $state('');
	let expDates = $state('');
	let expLink = $state('https://');
	let expLogo = $state('/logos/apple-logo.jpg');
	let expSortOrder = $state(1);
	let expDescription = $state<string[]>(['']);

	function openAddExp() {
		expId = null;
		expCompany = '';
		expTitle = '';
		expDates = '';
		expLink = 'https://';
		expLogo = '/logos/apple-logo.jpg';
		expSortOrder = experiences.length + 1;
		expDescription = [''];
		activeModal = 'experience';
	}

	function openEditExp(item: any) {
		expId = item.id;
		expCompany = item.company;
		expTitle = item.title;
		expDates = item.dates;
		expLink = item.link;
		expLogo = item.logo;
		expSortOrder = item.sortOrder;
		expDescription = Array.isArray(item.description) ? [...item.description] : [String(item.description)];
		activeModal = 'experience';
	}

	// --- Project Form State ---
	let projId = $state<number | null>(null);
	let projTitle = $state('');
	let projDescription = $state('');
	let projLink = $state('https://');
	let projGroupCategory = $state('webAndFullStack');
	let projCategories = $state('Web, Database');
	let projSortOrder = $state(1);

	function openAddProj() {
		projId = null;
		projTitle = '';
		projDescription = '';
		projLink = 'https://';
		projGroupCategory = 'webAndFullStack';
		projCategories = 'Web, Database';
		projSortOrder = projects.length + 1;
		activeModal = 'project';
	}

	function openEditProj(item: any) {
		projId = item.id;
		projTitle = item.title;
		projDescription = item.description;
		projLink = item.link;
		projGroupCategory = item.groupCategory || 'webAndFullStack';
		projCategories = Array.isArray(item.categories) ? item.categories.join(', ') : item.categories;
		projSortOrder = item.sortOrder;
		activeModal = 'project';
	}

	// --- Academic Form State ---
	let acadId = $state<number | null>(null);
	let acadYear = $state('2025');
	let acadIcon = $state('graduationCap');
	let acadContent = $state('');
	let acadSortOrder = $state(1);

	function openAddAcad() {
		acadId = null;
		acadYear = '2025';
		acadIcon = 'graduationCap';
		acadContent = '';
		acadSortOrder = academics.length + 1;
		activeModal = 'academic';
	}

	function openEditAcad(item: any) {
		acadId = item.id;
		acadYear = item.year;
		acadIcon = item.icon;
		acadContent = item.content;
		acadSortOrder = item.sortOrder;
		activeModal = 'academic';
	}

	// --- Contact Form State ---
	let contId = $state<number | null>(null);
	let contName = $state('');
	let contValue = $state('');
	let contLink = $state('https://');
	let contIcon = $state('mail');
	let contSortOrder = $state(1);

	function openAddCont() {
		contId = null;
		contName = '';
		contValue = '';
		contLink = 'https://';
		contIcon = 'mail';
		contSortOrder = contacts.length + 1;
		activeModal = 'contact';
	}

	function openEditCont(item: any) {
		contId = item.id;
		contName = item.name;
		contValue = item.value;
		contLink = item.link;
		contIcon = item.icon;
		contSortOrder = item.sortOrder;
		activeModal = 'contact';
	}

	function closeModal() {
		activeModal = null;
	}
</script>

<svelte:head>
	<title>Admin Dashboard | Aaryan Dehade</title>
</svelte:head>

<div class="min-h-screen bg-background text-foreground transition-colors duration-300">
	<!-- Background Glow -->
	<div class="pointer-events-none fixed inset-0 z-0 opacity-30 dark:opacity-20">
		<div class="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange/20 blur-[120px]"></div>
	</div>

	<!-- Navigation Header -->
	<header class="sticky top-0 z-40 border-b border-white/20 bg-white/40 backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
			<div class="flex items-center gap-3">
				<a
					href="/"
					class="flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/20 px-3 py-1.5 text-xs font-semibold text-foreground/80 transition hover:bg-white/40 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
				>
					<ArrowLeft size={16} />
					<span>Back to Site</span>
				</a>
				<span class="h-4 w-px bg-foreground/20"></span>
				<h1 class="text-lg font-bold tracking-tight">Portfolio Admin</h1>
			</div>

			<div class="flex items-center gap-3">
				{#if user}
					<span class="hidden text-xs font-semibold text-foreground/60 sm:inline">
						{user.email}
					</span>
				{/if}

				<form method="POST" action="?/signOut">
					<button
						type="submit"
						class="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-white/20 px-3.5 py-2 text-xs font-bold text-foreground/80 transition hover:bg-red-500/10 hover:text-red-500 dark:border-white/10 dark:bg-white/10"
					>
						<LogOut size={16} />
						<span class="hidden sm:inline">Sign Out</span>
					</button>
				</form>
			</div>
		</div>
	</header>

	<!-- Main Body Container -->
	<main class="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6">
		<!-- Alerts -->
		{#if form?.error}
			<div class="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-medium text-red-500 backdrop-blur-md">
				<AlertCircle size={20} class="shrink-0" />
				<span>{form.error}</span>
			</div>
		{/if}

		{#if form?.success}
			<div class="mb-6 flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm font-medium text-green-500 backdrop-blur-md">
				<Check size={20} class="shrink-0" />
				<span>{form.message}</span>
			</div>
		{/if}

		<!-- Admin Section Tabs -->
		<div class="mb-8 flex overflow-x-auto rounded-full border border-white/20 bg-white/20 p-1.5 backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
			<button
				onclick={() => (activeTab = 'experience')}
				class="flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition duration-300 {activeTab === 'experience' ? 'bg-orange text-white shadow-lg' : 'text-foreground/70 hover:text-foreground hover:bg-white/10'}"
			>
				<Briefcase size={16} />
				<span>Experience ({experiences.length})</span>
			</button>

			<button
				onclick={() => (activeTab = 'projects')}
				class="flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition duration-300 {activeTab === 'projects' ? 'bg-orange text-white shadow-lg' : 'text-foreground/70 hover:text-foreground hover:bg-white/10'}"
			>
				<FolderGit2 size={16} />
				<span>Projects ({projects.length})</span>
			</button>

			<button
				onclick={() => (activeTab = 'academics')}
				class="flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition duration-300 {activeTab === 'academics' ? 'bg-orange text-white shadow-lg' : 'text-foreground/70 hover:text-foreground hover:bg-white/10'}"
			>
				<GraduationCap size={16} />
				<span>Academics ({academics.length})</span>
			</button>

			<button
				onclick={() => (activeTab = 'contact')}
				class="flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition duration-300 {activeTab === 'contact' ? 'bg-orange text-white shadow-lg' : 'text-foreground/70 hover:text-foreground hover:bg-white/10'}"
			>
				<Mail size={16} />
				<span>Contact ({contacts.length})</span>
			</button>
		</div>

		<!-- ============================================ -->
		<!-- TAB 1: EXPERIENCE MANAGEMENT -->
		<!-- ============================================ -->
		{#if activeTab === 'experience'}
			<div class="mb-6 flex items-center justify-between">
				<div>
					<h2 class="text-2xl font-black tracking-tight">Experience</h2>
					<p class="text-xs text-foreground/60">Career positions, dates, bullet points & company details.</p>
				</div>
				<button
					onclick={openAddExp}
					class="flex cursor-pointer items-center gap-2 rounded-full bg-orange px-4 py-2 text-xs font-bold text-white shadow-md transition hover:scale-105 hover:bg-orange/90 active:scale-95"
				>
					<Plus size={16} />
					<span>Add Experience</span>
				</button>
			</div>

			<div class="grid gap-6 md:grid-cols-2">
				{#each experiences as item (item.id)}
					<div class="flex flex-col justify-between rounded-3xl border border-white/30 bg-white/40 p-6 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-black/30">
						<div>
							<div class="mb-4 flex items-start justify-between gap-4">
								<div class="flex items-center gap-3">
									<img src={item.logo} alt={item.company} class="size-12 rounded-xl object-contain bg-white p-1 shadow-sm" />
									<div>
										<h3 class="text-lg font-bold">{item.title}</h3>
										<a href={item.link} target="_blank" class="cursor-pointer text-xs font-bold text-orange hover:underline">{item.company}</a>
									</div>
								</div>
								<span class="rounded-full bg-orange/10 px-2.5 py-0.5 text-[10px] font-bold text-orange">{item.dates}</span>
							</div>
							<ul class="mb-4 flex flex-col gap-1.5 pl-2">
								{#each item.description as pt}
									<li class="relative pl-3 text-xs text-foreground/80"><span class="absolute left-0 top-1.5 size-1.5 rounded-full bg-orange"></span>{pt}</li>
								{/each}
							</ul>
						</div>
						<div class="flex justify-end gap-2 border-t border-white/20 pt-3 dark:border-white/10">
							<button onclick={() => openEditExp(item)} class="flex cursor-pointer items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold transition hover:bg-white/40"><Edit3 size={14} /> Edit</button>
							<form method="POST" action="?/deleteExperience">
								<input type="hidden" name="id" value={item.id} />
								<button type="submit" onclick={(e) => !confirm('Delete item?') && e.preventDefault()} class="flex cursor-pointer items-center gap-1 rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-500 transition hover:bg-red-500/20"><Trash2 size={14} /> Delete</button>
							</form>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- ============================================ -->
		<!-- TAB 2: PROJECTS MANAGEMENT -->
		<!-- ============================================ -->
		{#if activeTab === 'projects'}
			<div class="mb-6 flex items-center justify-between">
				<div>
					<h2 class="text-2xl font-black tracking-tight">Projects</h2>
					<p class="text-xs text-foreground/60">Portfolio web apps, repositories, and category groupings.</p>
				</div>
				<button
					onclick={openAddProj}
					class="flex cursor-pointer items-center gap-2 rounded-full bg-orange px-4 py-2 text-xs font-bold text-white shadow-md transition hover:scale-105 hover:bg-orange/90 active:scale-95"
				>
					<Plus size={16} />
					<span>Add Project</span>
				</button>
			</div>

			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each projects as item (item.id)}
					<div class="flex flex-col justify-between rounded-3xl border border-white/30 bg-white/40 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
						<div>
							<div class="mb-2 flex items-start justify-between">
								<h3 class="text-base font-bold">{item.title}</h3>
								<span class="rounded-full border border-orange/30 bg-orange/10 px-2 py-0.5 text-[10px] font-bold text-orange">{item.groupCategory}</span>
							</div>
							<p class="mb-3 text-xs leading-relaxed text-foreground/70">{item.description}</p>
							<div class="mb-4 flex flex-wrap gap-1">
								{#each item.categories as cat}
									<span class="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-semibold text-foreground/60 dark:bg-white/10">{cat}</span>
								{/each}
							</div>
						</div>
						<div class="flex items-center justify-between border-t border-white/20 pt-3 dark:border-white/10">
							<a href={item.link} target="_blank" class="inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-orange hover:underline">
								<span>Link</span>
								<ExternalLink size={12} />
							</a>
							<div class="flex gap-2">
								<button onclick={() => openEditProj(item)} class="flex cursor-pointer items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold hover:bg-white/40"><Edit3 size={14} /> Edit</button>
								<form method="POST" action="?/deleteProject">
									<input type="hidden" name="id" value={item.id} />
									<button type="submit" onclick={(e) => !confirm('Delete project?') && e.preventDefault()} class="flex cursor-pointer items-center gap-1 rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-500/20"><Trash2 size={14} /> Delete</button>
								</form>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- ============================================ -->
		<!-- TAB 3: ACADEMICS MANAGEMENT -->
		<!-- ============================================ -->
		{#if activeTab === 'academics'}
			<div class="mb-6 flex items-center justify-between">
				<div>
					<h2 class="text-2xl font-black tracking-tight">Academics & Milestones</h2>
					<p class="text-xs text-foreground/60">Educational milestones, awards, degrees & TA roles.</p>
				</div>
				<button
					onclick={openAddAcad}
					class="flex cursor-pointer items-center gap-2 rounded-full bg-orange px-4 py-2 text-xs font-bold text-white shadow-md transition hover:scale-105 hover:bg-orange/90 active:scale-95"
				>
					<Plus size={16} />
					<span>Add Milestone</span>
				</button>
			</div>

			<div class="grid gap-4 md:grid-cols-2">
				{#each academics as item (item.id)}
					<div class="flex items-center justify-between rounded-3xl border border-white/30 bg-white/40 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
						<div class="flex items-center gap-4">
							<span class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-orange/10 text-sm font-black text-orange">{item.year}</span>
							<div>
								<span class="text-[10px] font-extrabold uppercase text-orange">Icon: {item.icon}</span>
								<p class="text-xs font-medium text-foreground">{item.content}</p>
							</div>
						</div>
						<div class="flex gap-2">
							<button onclick={() => openEditAcad(item)} class="flex cursor-pointer items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold hover:bg-white/40"><Edit3 size={14} /> Edit</button>
							<form method="POST" action="?/deleteAcademic">
								<input type="hidden" name="id" value={item.id} />
								<button type="submit" onclick={(e) => !confirm('Delete milestone?') && e.preventDefault()} class="flex cursor-pointer items-center gap-1 rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-500/20"><Trash2 size={14} /> Delete</button>
							</form>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- ============================================ -->
		<!-- TAB 4: CONTACT MANAGEMENT -->
		<!-- ============================================ -->
		{#if activeTab === 'contact'}
			<div class="mb-6 flex items-center justify-between">
				<div>
					<h2 class="text-2xl font-black tracking-tight">Contact Information</h2>
					<p class="text-xs text-foreground/60">Email, GitHub, LinkedIn and social links.</p>
				</div>
				<button
					onclick={openAddCont}
					class="flex cursor-pointer items-center gap-2 rounded-full bg-orange px-4 py-2 text-xs font-bold text-white shadow-md transition hover:scale-105 hover:bg-orange/90 active:scale-95"
				>
					<Plus size={16} />
					<span>Add Contact</span>
				</button>
			</div>

			<div class="grid gap-4 sm:grid-cols-3">
				{#each contacts as item (item.id)}
					<div class="flex flex-col justify-between rounded-3xl border border-white/30 bg-white/40 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
						<div>
							<span class="text-[10px] font-extrabold uppercase text-orange">Icon: {item.icon}</span>
							<h3 class="text-base font-bold">{item.name}</h3>
							<p class="mb-3 text-xs font-medium text-foreground/70">{item.value}</p>
						</div>
						<div class="flex items-center justify-between border-t border-white/20 pt-3 dark:border-white/10">
							<a href={item.link} target="_blank" class="cursor-pointer text-xs font-bold text-orange hover:underline">Visit Link</a>
							<div class="flex gap-2">
								<button onclick={() => openEditCont(item)} class="flex cursor-pointer items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold hover:bg-white/40"><Edit3 size={14} /> Edit</button>
								<form method="POST" action="?/deleteContact">
									<input type="hidden" name="id" value={item.id} />
									<button type="submit" onclick={(e) => !confirm('Delete contact?') && e.preventDefault()} class="flex cursor-pointer items-center gap-1 rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-500/20"><Trash2 size={14} /> Delete</button>
								</form>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</main>

	<!-- ============================================ -->
	<!-- MODALS SECTION -->
	<!-- ============================================ -->

	<!-- EXPERIENCE MODAL -->
	{#if activeModal === 'experience'}
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
			<div class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/30 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl dark:border-white/10 dark:bg-zinc-900">
				<div class="mb-4 flex items-center justify-between border-b pb-3 dark:border-white/10">
					<h3 class="text-lg font-bold">{expId ? 'Edit Experience' : 'Add Experience'}</h3>
					<button onclick={closeModal} class="cursor-pointer text-foreground/70 hover:text-foreground"><X size={18} /></button>
				</div>
				<form method="POST" action={expId ? '?/updateExperience' : '?/createExperience'} class="flex flex-col gap-4">
					{#if expId}<input type="hidden" name="id" value={expId} />{/if}
					<div class="grid gap-3 sm:grid-cols-2">
						<input name="company" type="text" required bind:value={expCompany} placeholder="Company" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
						<input name="title" type="text" required bind:value={expTitle} placeholder="Title" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
					</div>
					<div class="grid gap-3 sm:grid-cols-2">
						<input name="dates" type="text" required bind:value={expDates} placeholder="Dates (e.g. June 2026 - Present)" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
						<input name="sortOrder" type="number" required bind:value={expSortOrder} placeholder="Sort Order" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
					</div>
					<div class="grid gap-3 sm:grid-cols-2">
						<input name="link" type="url" required bind:value={expLink} placeholder="Link" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
						<input name="logo" type="text" required bind:value={expLogo} placeholder="Logo URL (/logos/apple-logo.jpg)" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
					</div>
					<div class="flex flex-col gap-2">
						<label id="exp-bullet-points-label" for="exp-bullet-point-0" class="text-xs font-bold">Bullet Points</label>
						{#each expDescription as _, idx}
							<input id="exp-bullet-point-{idx}" name="description[]" type="text" required bind:value={expDescription[idx]} placeholder="Bullet point text..." class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
						{/each}
						<button type="button" onclick={() => (expDescription = [...expDescription, ''])} class="cursor-pointer text-xs font-bold text-orange hover:underline">+ Add Bullet Point</button>
					</div>
					<div class="mt-4 flex justify-end gap-3">
						<button type="button" onclick={closeModal} class="cursor-pointer rounded-full bg-black/5 px-4 py-2 text-xs font-bold hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20">Cancel</button>
						<button type="submit" class="cursor-pointer rounded-full bg-orange px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-orange/90">Save</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<!-- PROJECT MODAL -->
	{#if activeModal === 'project'}
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
			<div class="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/30 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl dark:border-white/10 dark:bg-zinc-900">
				<div class="mb-4 flex items-center justify-between border-b pb-3 dark:border-white/10">
					<h3 class="text-lg font-bold">{projId ? 'Edit Project' : 'Add Project'}</h3>
					<button onclick={closeModal} class="cursor-pointer text-foreground/70 hover:text-foreground"><X size={18} /></button>
				</div>
				<form method="POST" action={projId ? '?/updateProject' : '?/createProject'} class="flex flex-col gap-4">
					{#if projId}<input type="hidden" name="id" value={projId} />{/if}
					<input name="title" type="text" required bind:value={projTitle} placeholder="Project Title" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
					<textarea name="description" required bind:value={projDescription} placeholder="Description" class="h-20 rounded-xl border p-2.5 text-sm dark:bg-black/50"></textarea>
					<div class="grid gap-3 sm:grid-cols-2">
						<input name="link" type="url" required bind:value={projLink} placeholder="Repository / Site Link" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
						<select name="groupCategory" bind:value={projGroupCategory} class="cursor-pointer rounded-xl border p-2.5 text-sm dark:bg-black/50">
							<option value="webAndFullStack">Web & Full Stack</option>
							<option value="dataAndBackend">Data & Backend</option>
							<option value="systemsAndLogic">Systems & Logic</option>
							<option value="mobileAndTools">Mobile & Tools</option>
						</select>
					</div>
					<div class="grid gap-3 sm:grid-cols-2">
						<input name="categories" type="text" required bind:value={projCategories} placeholder="Categories (comma separated: Web, Database)" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
						<input name="sortOrder" type="number" required bind:value={projSortOrder} placeholder="Sort Order" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
					</div>
					<div class="mt-4 flex justify-end gap-3">
						<button type="button" onclick={closeModal} class="cursor-pointer rounded-full bg-black/5 px-4 py-2 text-xs font-bold hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20">Cancel</button>
						<button type="submit" class="cursor-pointer rounded-full bg-orange px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-orange/90">Save</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<!-- ACADEMIC MODAL -->
	{#if activeModal === 'academic'}
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
			<div class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/30 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl dark:border-white/10 dark:bg-zinc-900">
				<div class="mb-4 flex items-center justify-between border-b pb-3 dark:border-white/10">
					<h3 class="text-lg font-bold">{acadId ? 'Edit Academic Milestone' : 'Add Milestone'}</h3>
					<button onclick={closeModal} class="cursor-pointer text-foreground/70 hover:text-foreground"><X size={18} /></button>
				</div>
				<form method="POST" action={acadId ? '?/updateAcademic' : '?/createAcademic'} class="flex flex-col gap-4">
					{#if acadId}<input type="hidden" name="id" value={acadId} />{/if}
					<div class="grid gap-3 sm:grid-cols-2">
						<input name="year" type="text" required bind:value={acadYear} placeholder="Year (e.g. 2025)" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
						<select name="icon" bind:value={acadIcon} class="cursor-pointer rounded-xl border p-2.5 text-sm dark:bg-black/50">
							<option value="graduationCap">Graduation Cap</option>
							<option value="school">School</option>
							<option value="briefcase">Briefcase</option>
							<option value="award">Award</option>
							<option value="mic">Mic</option>
							<option value="badgeCheck">Badge Check</option>
							<option value="users">Users</option>
							<option value="star">Star</option>
						</select>
					</div>
					<textarea name="content" required bind:value={acadContent} placeholder="Milestone description..." class="h-20 rounded-xl border p-2.5 text-sm dark:bg-black/50"></textarea>
					<input name="sortOrder" type="number" required bind:value={acadSortOrder} placeholder="Sort Order" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
					<div class="mt-4 flex justify-end gap-3">
						<button type="button" onclick={closeModal} class="cursor-pointer rounded-full bg-black/5 px-4 py-2 text-xs font-bold hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20">Cancel</button>
						<button type="submit" class="cursor-pointer rounded-full bg-orange px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-orange/90">Save</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<!-- CONTACT MODAL -->
	{#if activeModal === 'contact'}
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
			<div class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/30 bg-white/95 p-6 shadow-2xl backdrop-blur-3xl dark:border-white/10 dark:bg-zinc-900">
				<div class="mb-4 flex items-center justify-between border-b pb-3 dark:border-white/10">
					<h3 class="text-lg font-bold">{contId ? 'Edit Contact' : 'Add Contact'}</h3>
					<button onclick={closeModal} class="cursor-pointer text-foreground/70 hover:text-foreground"><X size={18} /></button>
				</div>
				<form method="POST" action={contId ? '?/updateContact' : '?/createContact'} class="flex flex-col gap-4">
					{#if contId}<input type="hidden" name="id" value={contId} />{/if}
					<div class="grid gap-3 sm:grid-cols-2">
						<input name="name" type="text" required bind:value={contName} placeholder="Name (e.g. GitHub)" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
						<select name="icon" bind:value={contIcon} class="cursor-pointer rounded-xl border p-2.5 text-sm dark:bg-black/50">
							<option value="mail">Mail</option>
							<option value="github">GitHub</option>
							<option value="linkedin">LinkedIn</option>
						</select>
					</div>
					<input name="value" type="text" required bind:value={contValue} placeholder="Value (e.g. @dehadeaaryan)" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
					<input name="link" type="url" required bind:value={contLink} placeholder="Link URL" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
					<input name="sortOrder" type="number" required bind:value={contSortOrder} placeholder="Sort Order" class="rounded-xl border p-2.5 text-sm dark:bg-black/50" />
					<div class="mt-4 flex justify-end gap-3">
						<button type="button" onclick={closeModal} class="cursor-pointer rounded-full bg-black/5 px-4 py-2 text-xs font-bold hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20">Cancel</button>
						<button type="submit" class="cursor-pointer rounded-full bg-orange px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-orange/90">Save</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</div>
