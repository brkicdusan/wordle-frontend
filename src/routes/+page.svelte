<script lang="ts">
	import Game from '../components/game/Game.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Wordle</title>
</svelte:head>

<main>
	<Game correct={data.correct.toUpperCase()} />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-grow: 1;
		background-color: var(--background-color);
	}
</style>
