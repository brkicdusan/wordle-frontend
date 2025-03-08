<script lang="ts">
	import Game from '../components/game/Game.svelte';
</script>

<svelte:head>
	<title>Wordle</title>
</svelte:head>

<main>
	<Game />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 100px;
	}
</style>
