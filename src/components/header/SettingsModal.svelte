<script>
	import Modal from '../ui/Modal.svelte';
	import ThemeSelect from './ThemeSelect.svelte';
	let { theme = $bindable() } = $props();
</script>

<Modal id="modal-settings" title="Settings">
	<ThemeSelect bind:theme />
</Modal>
