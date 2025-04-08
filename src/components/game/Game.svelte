<script lang="ts">
	import List from './List.svelte';
	import Keyboard from '../../../node_modules/svelte-keyboard';
	import { toast } from '@zerodevx/svelte-toast';
	import { isLetterEnglish, isLetterSerbian, isValidEnglish, isValidSerbian } from '$lib/wordCheck';
	import { serbianCyrillicKeys } from '$lib/keyboard';

	let {
		correct,
		lang
	}: {
		correct: string;
		lang: string;
	} = $props();

	let word = $state('');
	let wordlist: string[] = $state([]);

	let keyClass = $derived.by(() => {
		let res: Record<string, string> = {};

		for (const word of wordlist) {
			for (const char of word) {
				res[char.toLowerCase()] = 'clicked';
			}
		}

		return res;
	});

	const onKeyboardEvent = ({ detail: key }: { detail: string }) => {
		if (key == 'Enter') {
			handleEnter();
		} else if (key == 'Backspace') {
			if (word.length > 0) {
				word = word.substring(0, word.length - 1);
			}
		} else if (letterCheck(key)) {
			if (word.length < 5) {
				word = word + key.toUpperCase();
			}
		}
	};

	const onKeyDown = (event: KeyboardEventInit) => {
		let key = event.key || '';

		if (key == 'Enter' || key == 'Backspace' || letterCheck(key)) {
			onKeyboardEvent({ detail: key });
		}
	};

	const handleEnter = () => {
		if (!checkWord(word)) {
			return;
		}
		wordlist.push(word);
		word = '';
	};

	const checkWord = (word: string) => {
		const duration = 2000;
		if (word.length != 5) {
			toast.push('Not enough letters', { duration });
			return false;
		} else if (!isValid(word)) {
			toast.push('Not in the word list', { duration });
			return false;
		}
		return true;
	};

	const letterCheck = (key: string): boolean => {
		return lang === 'en' ? isLetterEnglish(key) : isLetterSerbian(key);
	};

	const isValid = (word: string): boolean => {
		return lang === 'en' ? isValidEnglish(word) : isValidSerbian(word);
	};
</script>

<svelte:head>
	<title>Wordle</title>
</svelte:head>

<svelte:window on:keydown|preventDefault={onKeyDown} />

{correct}
<div>
	<List {correct} size={6} {wordlist} current={word} />
	<Keyboard
		{keyClass}
		custom={lang === 'sr' ? serbianCyrillicKeys : ''}
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

	:global(.key.clicked) {
		background-color: color-mix(in srgb, var(--button-color), black 40%);
		color: var(--text-contrast-color);
	}
</style>
