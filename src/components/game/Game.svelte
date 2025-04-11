<script lang="ts">
	import Keyboard from '../../../node_modules/svelte-keyboard';
	import { toast } from '@zerodevx/svelte-toast';
	import { isLetterEnglish, isLetterSerbian, isValidEnglish, isValidSerbian } from '$lib/wordCheck';
	import { serbianCyrillicKeys } from '$lib/keyboard';
	import { goto } from '$app/navigation';
	import Display from './Display.svelte';

	let {
		correct,
		lang
	}: {
		correct: string | string[];
		lang: string;
	} = $props();

	let word = $state('');
	let wordlist: string[] = $state([]);
	let gameState = $state(0); // 0 - playing, 1 - won, 2 - lost
	let size = $derived.by(() => {
		if (typeof correct === 'string') {
			return 6;
		}
		return correct.length + 5;
	});

	let keyClass = $derived.by(() => {
		let res: Record<string, string> = {};

		for (const word of wordlist) {
			for (const char of word) {
				const key = lang === 'sr' ? char.toUpperCase() : char.toLowerCase();
				res[key] = 'clicked';
			}
		}

		return res;
	});

	const onKeyboardEvent = ({ detail: key }: { detail: string }) => {
		if (gameState) return;

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
		checkGameover();
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

	const checkGameover = () => {
		if (typeof correct === 'string') checkGameoverSingle();
		else checkGameoverMultiple();
	};
	const checkGameoverSingle = () => {
		if (typeof correct !== 'string') return;

		for (let word of wordlist) {
			if (word.toLowerCase() === correct.toLowerCase()) {
				gameState = 1;
				return;
			}
		}

		if (wordlist.length >= size) {
			gameState = 2;
		}
	};

	const checkGameoverMultiple = () => {
		if (typeof correct === 'string') return;

		let correctCount = 0;
		for (let correctWord of correct) {
			for (let word of wordlist) {
				if (word.toLowerCase() === correctWord.toLowerCase()) {
					correctCount++;
					break;
				}
			}
		}

		if (correctCount === correct.length) {
			gameState = 1;
		}

		if (wordlist.length >= size) {
			gameState = 2;
		}
	};
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<div class="gameover" class:hidden-div={gameState === 0}>
	<h1>{gameState === 1 ? 'You Won!' : `You lost. Correct word was ${correct}`}</h1>
	<button
		onclick={() => {
			let url = `/${lang}/game`;
			if (typeof correct !== 'string') {
				url = `/${lang}/game/${correct.length}`;
			}

			goto(url, {
				invalidateAll: true
			});
		}}>Play again</button
	>
</div>
<div class="game">
	<Display {correct} {size} {wordlist} current={word} />
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
		--min-width="var(--responsive-key-size)"
	/>
</div>

<style>
	div {
		--responsive-key-size: 2rem;
	}

	@media (max-width: 768px) {
		div {
			--responsive-key-size: 1.8rem;
		}
	}

	@media (max-width: 768px) {
		div {
			--responsive-key-size: 1.6rem;
		}
	}

	.gameover {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		margin: 10px;
	}

	.gameover h1 {
		font-weight: bold;
		font-size: 1.2rem;
	}

	button {
		padding: 0.5em 1em;
		border: 3px solid var(--text-color);
		color: var(--text-color);
		border-radius: 5px;
		font-size: 1rem;
		transition: background-color 0.2s ease;
		text-transform: uppercase;
		font-weight: bold;
		cursor: pointer;
	}

	button:hover,
	button:focus {
		color: var(--background-color);
		background-color: var(--text-color);
	}

	.hidden-div {
		visibility: hidden;
	}

	.game {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		overflow-y: auto;
		height: 100%;
	}

	:global(.key.clicked) {
		background-color: color-mix(in srgb, var(--button-color), black 40%);
		color: var(--text-contrast-color);
	}
</style>
