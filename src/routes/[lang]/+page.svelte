<script lang="ts">
	let numberOfWords = $state(1);

	let url = $derived.by(() => {
		if (numberOfWords === 1) {
			return '/game';
		}
		return `/game/${numberOfWords}`;
	});
</script>

<div>
	Number of words:
	<select bind:value={numberOfWords}>
		{#each [1, 2, 4, 8, 16] as num (num)}
			<option value={num} selected={numberOfWords === num}>{num}</option>
		{/each}
	</select>

	<a href={url}>Play</a>
</div>

<style>
	div {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}

	a {
		padding: 0.5em 1em;
		border: 3px solid var(--text-color);
		color: var(--text-color);
		border-radius: 5px;
		font-size: 1rem;
		transition: background-color 0.2s ease;
		text-transform: uppercase;
		font-weight: bold;
	}

	a:hover,
	a:focus {
		color: var(--background-color);
		background-color: var(--text-color);
	}
</style>
