import { error } from '@sveltejs/kit';

export const actions = {
	setTheme: async ({ cookies, request }) => {
		const formData = await request.formData();
		const theme = formData.get('theme') || 'system';

		cookies.set('theme', theme.toString(), { path: '/', maxAge: 60 * 60 * 24 * 365 });
	}
};

export const load = async () => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const resp = await fetch(backendUrl);
	const word = await resp.json();

	if (typeof word !== 'string') {
		error(400, 'backend not found');
	}

	return {
		correct: word
	};
};
