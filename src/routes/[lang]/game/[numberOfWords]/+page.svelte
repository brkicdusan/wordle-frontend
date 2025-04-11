<script lang="ts">
	import Game from '../../../../components/game/Game.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Wordle</title>
</svelte:head>

{#key (data.lang, data.correct)}
	<Game lang={data.lang} correct={data.correct} />
{/key}
