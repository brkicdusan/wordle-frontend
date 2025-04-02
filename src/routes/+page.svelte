<script lang="ts">
	import Game from '../components/game/Game.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Wordle</title>
</svelte:head>

<Game correct={data.correct.toUpperCase()} />
