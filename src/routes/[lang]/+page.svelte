<div>
	<a href="/game">Play</a>
</div>

<style>
	div {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-direction: column;
	}

	a {
		padding: 0.5em 1em;
		border: 3px solid var(--text-color);
		color: var(--text-color);
		border-radius: 5px;
		font-size: 1rem;
		transition: background-color 0.2s ease;
		text-transform: uppercase;
		font-weight: bold;
	}

	a:hover,
	a:focus {
		color: var(--background-color);
		background-color: var(--text-color);
	}
</style>
