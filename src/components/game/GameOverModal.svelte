<script lang="ts">
	import { goto } from '$app/navigation';
	import Modal from '../ui/Modal.svelte';

	let {
		gameResult,
		lang,
		correct
	}: { gameResult: string; lang: string; correct: string | string[] } = $props();
</script>

<Modal id="modal-gameover" title={gameResult}>
	<div>
		The answer was:
		{correct}
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
</Modal>

<style>
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

	button:hover {
		color: var(--background-color);
		background-color: var(--text-color);
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
