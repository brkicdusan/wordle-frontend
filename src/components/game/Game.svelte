<script lang="ts">
	import List from './List.svelte';
	import Keyboard from '../../../node_modules/svelte-keyboard';
	import { toast } from '@zerodevx/svelte-toast';
	import { isValidEnglish } from '$lib/wordCheck';

	let word = $state('');
	let {
		correct
	}: {
		correct: string;
	} = $props();

	let wordlist: string[] = $state([]);

	const onKeyboardEvent = ({ detail: key }: { detail: string }) => {
		if (key == 'Enter') {
			handleEnter();
		} else if (key == 'Backspace') {
			if (word.length > 0) {
				word = word.substring(0, word.length - 1);
			}
		} else if (isLetter(key)) {
			if (word.length < 5) {
				word = word + key.toUpperCase();
			}
		}
	};

	const onKeyDown = (event: KeyboardEventInit) => {
		let key = event.key || '';

		if (key == 'Enter' || key == 'Backspace' || isLetter(key)) {
			onKeyboardEvent({ detail: key });
		}
	};

	const isLetter = (str: string) => {
		return /[a-zA-Z]/.test(str) && str.length == 1;
	};

	const handleEnter = () => {
		if (!checkWord(word)) {
			return;
		}
		wordlist.push(word);
		word = '';
	};

	const checkWord = (word: string) => {
		let duration = 2000;
		if (word.length != 5) {
			toast.push('Not enough letters', {
				duration
			});
			return false;
		} else if (!isValidEnglish(word)) {
			toast.push('Not in the word list', { duration });
			return false;
		}
		return true;
	};
</script>

<svelte:head>
	<title>Wordle</title>
</svelte:head>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<div>
	<List {correct} size={6} {wordlist} current={word} />
	<Keyboard
		custom=""
		layout="wordle"
		on:keydown={onKeyboardEvent}
		--text-transform="uppercase"
		--background="var(--button-color)"
		--color="var(--text-color)"
		--border-radius="8px"
		--flex="0 auto"
	/>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		height: 100%;
	}
</style>
