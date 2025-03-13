<script lang="ts">
	let { theme = $bindable() } = $props();

	const themeChange = async () => {
		const formData = new FormData();
		formData.set('theme', theme);
		await fetch('/?/setTheme', { method: 'POST', body: formData });
	};
</script>

<div>
	<h2>Theme</h2>
	<select bind:value={theme} onchange={themeChange}>
		<option value="system">System</option>
		<option value="dark">Dark</option>
		<option value="light">Light</option>
	</select>
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		color: var(--text-color);
		align-items: baseline;
	}

	h2 {
		font-weight: bold;
	}

	select {
		border-color: var(--text-color);
		padding: 3px;
	}

	select:focus {
		outline: none;
	}

	option {
		background-color: var(--background-color);
		color: var(--text-color);
	}
</style>
