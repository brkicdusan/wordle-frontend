<script lang="ts">
	import Letter from './Letter.svelte';

	let {
		word,
		correct,
		entered
	}: {
		word: string;
		correct: string;
		entered: boolean;
	} = $props();

	const getLetter = (index: number) => {
		if (index < word.length) {
			return word[index];
		}
		return '';
	};

	const getState = (index: number) => {
		if (index >= word.length) {
			return 'empty';
		}
		if (!entered) {
			return 'filled';
		}
		if (word[index] == correct[index]) {
			return 'green';
		}

		// count of possible yellows in correct, and number of times this letter has already appeard while not being green
		let count = 0;
		let countBefore = 0;
		for (let i = 0; i < word.length; i++) {
			if (word[i] == word[index] && word[i] != correct[i] && i < index) {
				countBefore++;
			}

			if (correct[i] == word[index] && correct[i] != word[i]) {
				count++;
			}
		}

		if (count > countBefore) {
			return 'yellow';
		}

		return 'wrong';
	};
</script>

<div>
	{#each { length: correct.length }, i}
		<Letter letter={getLetter(i)} state={getState(i)}></Letter>
	{/each}
</div>

<style>
	div {
		display: flex;
		gap: 4px;
		padding: 2px;
	}
</style>
