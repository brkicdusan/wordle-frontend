<script>
	import SettingsModal from './SettingsModal.svelte';
	import MicroModal from 'micromodal';
	import { Settings } from '@lucide/svelte';

	let { theme = $bindable() } = $props();
</script>

<SettingsModal bind:theme />
<nav>
	<h1>Wordle</h1>

	<button onclick={() => MicroModal.show('modal-settings')} tabindex="-1"><Settings /></button>
</nav>

<style>
	nav {
		height: 50px;
		border-bottom: var(--text-color) solid 1px;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 5%;
		padding-right: 5%;
		justify-content: space-between;
		background-color: var(--background-color);
		color: var(--text-color);
	}

	h1 {
		font-weight: bold;
		font-size: 1.4rem;
	}

	button {
		border-radius: 50%;
		padding: 5px;
	}

	button:hover {
		background-color: var(--text-color);
		color: var(--background-color);
	}
</style>
