<script lang="ts">
	import type { Snippet } from 'svelte';

	let { id, title, children }: { id: string; title: string; children: Snippet } = $props();
</script>

<div class="modal micromodal-slide" {id} aria-hidden="true" data-micromodal-close>
	<div class="modal__overlay" tabindex="-1">
		<div class="modal__container" role="dialog" aria-modal="true" aria-labelledby={`${id}-title`}>
			<header class="modal__header">
				<h2 class="modal__title" id={`${id}-title`}>{title}</h2>
				<button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
			</header>
			<main class="modal__content" id={`${id}-content`}>
				{@render children()}
			</main>
		</div>
	</div>
</div>

<style>
	.modal {
		display: none;
	}

	:global {
		.is-open {
			display: block !important;
		}
	}

	.modal__overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal__container {
		background-color: var(--background-color);
		color: var(--text-color);
		padding: 30px;
		max-width: 500px;
		max-height: 100vh;
		border-radius: 4px;
		overflow-y: auto;
		box-sizing: border-box;
		width: 100%;
		font-size: 1.2rem;
	}

	.modal__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.modal__title {
		margin-top: 0;
		margin-bottom: 0;
		font-weight: bold;
		font-size: 1.25rem;
		line-height: 1.25;
		color: var(--text-color);
		box-sizing: border-box;
	}

	.modal__close {
		background: transparent;
		border: 0;
		color: var(--text-color);
	}

	.modal__header .modal__close:before {
		content: '\2715';
	}

	.modal__content {
		margin-top: 2rem;
		margin-bottom: 2rem;
		line-height: 1.5;
	}
</style>
