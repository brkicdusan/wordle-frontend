<script lang="ts">
	import { goto } from '$app/navigation';

	let { lang = $bindable() } = $props();

	const langChange = async () => {
		const formData = new FormData();
		formData.set('lang', lang);
		await fetch('/?/setLang', { method: 'POST', body: formData });

		goto('/');
	};
</script>

{#if lang}
	<select bind:value={lang} onchange={langChange}>
		<option value="en" selected={lang === 'en'}>English</option>
		<option value="sr" selected={lang === 'sr'}>Srpski</option>
	</select>
{/if}
