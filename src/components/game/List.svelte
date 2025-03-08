<script lang="ts">
	import Word from './Word.svelte';

	interface Props {
		wordlist: string[];
		correct: string;
		size: number;
		current: string;
	}
	let { wordlist, correct, size, current }: Props = $props();

	let last: number = $derived.by(() => {
		for (let i = 0; i < wordlist.length; i++) {
			if (wordlist[i] == correct) {
				return i;
			}
		}

		return wordlist.length;
	});
</script>

<div>
	{#each { length: size }, i}
		{#if i <= last}
			<Word
				{correct}
				word={i < wordlist.length ? wordlist[i] : i == wordlist.length ? current : ''}
				entered={i < wordlist.length}
			/>
		{:else}
			<Word {correct} word="" entered={false} />
		{/if}
	{/each}
</div>
