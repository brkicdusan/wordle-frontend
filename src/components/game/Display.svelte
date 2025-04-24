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
	<div class="scrollable">
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
	</div>
{/if}

<style>
	.scrollable {
		flex-grow: 1;
		overflow-y: auto;
		min-height: 0;
		width: 80%;
		min-width: 300px;

		padding: 10px;
		margin: 10px;
	}

	.games {
		/* min-width: 300px; */

		align-content: center;
		align-items: center;

		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	}

	@media (min-width: 800px) {
		.games {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1400px) {
		.games {
			grid-template-columns: repeat(4, 1fr);
		}
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
