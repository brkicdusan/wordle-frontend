<script lang="ts">
	import List from './List.svelte';
	interface Props {
		wordlist: string[];
		correct: string | string[];
		size: number;
		current: string;
	}
	let { wordlist, correct, size, current }: Props = $props();
</script>

{#if typeof correct === 'string'}
	<List {correct} {size} {wordlist} {current} />
{:else}
	<div class="games">
		{#each correct as correctWord, i (correctWord)}
			<div class="word">
				<h1>
					Word #{i + 1}
				</h1>
				<List correct={correctWord} {size} {wordlist} {current} />
			</div>
		{/each}
	</div>
{/if}

<style>
	.games {
		flex-grow: 1;
		overflow-y: auto;
		min-height: 0;

		padding: 10px;
		margin: 10px;

		display: flex;
		flex-direction: column;
		align-content: center;
		align-items: center;
		width: 60%;
		min-width: 300px;
	}

	.word {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	h1 {
		font-weight: bold;
	}
</style>
