<script lang="ts">
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';
	import Background from '$lib/components/Background.svelte';

	let { children } = $props();
</script>

<ModeWatcher />
<Background />
{@render children()}
