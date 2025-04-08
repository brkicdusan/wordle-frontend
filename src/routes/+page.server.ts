export const actions = {
	setTheme: async ({ cookies, request }) => {
		const formData = await request.formData();
		const theme = formData.get('theme') || 'system';

		cookies.set('theme', theme.toString(), { path: '/', maxAge: 60 * 60 * 24 * 365 });
	},

	setLang: async ({ cookies, request }) => {
		const formData = await request.formData();
		const lang = formData.get('lang') || 'en';

		cookies.set('lang', lang.toString(), { path: '/', maxAge: 60 * 60 * 24 * 365 });
	}
};
