<script lang="ts">
	import '../app.css';
	let { data, children } = $props();
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import Navbar from '../components/header/Header.svelte';
	let theme = $state(data.theme);
</script>

<div class={theme}>
	<Navbar bind:theme />
	{@render children()}
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
</style>
