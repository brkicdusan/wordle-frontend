export const actions = {
	setTheme: async ({ cookies, request }) => {
		const formData = await request.formData();
		const theme = formData.get('theme') || 'system';

		cookies.set('theme', theme.toString(), { path: '/', maxAge: 60 * 60 * 24 * 365 });
	}
};

export const load = () => {
	const options = ['learn', 'words', 'light'];
	const correct = options[Math.floor(Math.random() * options.length)];

	return {
		correct
	};
};
