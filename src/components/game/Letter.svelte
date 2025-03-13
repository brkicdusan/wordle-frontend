<script lang="ts">
	import { error } from '@sveltejs/kit';

	interface Props {
		letter: string;
		state: string;
	}

	let { letter, state }: Props = $props();

	if (letter.length > 1) {
		error(500, {
			message: 'Wrong format'
		});
	}
</script>

<div class={state}>
	{letter}
</div>

<style>
	div {
		width: 50px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		font-weight: bold;
		font-size: 1.4rem;
	}

	.empty {
		border: 2px solid var(--empty-border-color);
		color: black;
	}

	.filled {
		border: 2px solid var(--text-color);
		color: var(--text-color);
	}

	.wrong {
		background-color: var(--wrong-color);
		color: var(--text-contrast-color);
	}

	.yellow {
		background-color: var(--yellow-color);
		color: var(--text-contrast-color);
	}

	.green {
		background-color: var(--correct-color);
		color: var(--text-contrast-color);
	}
</style>
