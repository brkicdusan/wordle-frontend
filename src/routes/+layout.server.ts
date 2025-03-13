export const load = async ({ cookies }) => {
	const theme = cookies.get('theme') || 'system';
	return { theme };
};
