<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

{@render children()}
<SvelteToast />

<style>
	:root {
		--toastBackground: red;
		--toastColor: white;
		--toastBarHeight: 0;
	}
</style>
