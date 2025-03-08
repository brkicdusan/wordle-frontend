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
		border: 2px solid gray;
		color: black;
	}

	.filled {
		border: 2px solid black;
		color: black;
	}

	.wrong {
		background-color: gray;
		color: white;
	}

	.yellow {
		background-color: #ba8e23;
		background-color: #ffdb58;
		color: white;
	}

	.green {
		background-color: green;
		color: white;
	}
</style>
