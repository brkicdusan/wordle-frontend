<script lang="ts">
	import '../app.css';
	let { data, children } = $props();
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import Navbar from '../components/header/Header.svelte';
	let theme = $state(data.theme);
	let lang = $state(data.lang);
</script>

<svelte:head>
	<title>Wordle</title>
</svelte:head>

<div class={theme}>
	<Navbar bind:theme bind:lang />
	<main>
		{@render children()}
	</main>
	<SvelteToast />
</div>

<style>
	:root {
		--toastBackground: red;
		--toastColor: white;
		--toastBarHeight: 0;
	}

	div {
		display: contents;
	}

	.light {
		--background-color: white;
		--text-color: black;
		--text-contrast-color: white;
		--empty-border-color: gray;
		--correct-color: #73b851;
		--yellow-color: #f3c237;
		--wrong-color: gray;
		--button-color: #efefef;
	}

	.dark {
		--background-color: #121212;
		--text-color: #f6f5f4;
		--text-contrast-color: #f6f5f4;
		--empty-border-color: gray;
		--correct-color: #73b851;
		--yellow-color: #f3c237;
		--wrong-color: #3a3a3c;
		--button-color: #282828;
	}

	@media (prefers-color-scheme: light) {
		.system {
			--background-color: white;
			--text-color: black;
			--text-contrast-color: white;
			--empty-border-color: gray;
			--correct-color: #73b851;
			--yellow-color: #f3c237;
			--wrong-color: gray;
			--button-color: #efefef;
		}
	}

	@media (prefers-color-scheme: dark) {
		.system {
			--background-color: #121212;
			--text-color: #f6f5f4;
			--text-contrast-color: #f6f5f4;
			--empty-border-color: gray;
			--correct-color: #73b851;
			--yellow-color: #f3c237;
			--wrong-color: #3a3a3c;
			--button-color: #282828;
		}
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-grow: 1;
		background-color: var(--background-color);
		color: var(--text-color);
		overflow-y: auto;
	}

	:global {
		select {
			padding: 5px;
		}

		select:focus {
			outline: none;
			border-bottom: 1px solid var(--text-color);
		}
		option {
			background-color: var(--background-color);
			color: var(--text-color);
		}
	}
</style>
