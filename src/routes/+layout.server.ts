import { redirect } from '@sveltejs/kit';

export function load({ cookies, url, request }) {
	const theme = cookies.get('theme') || 'system';

	const supportedLangs = ['en', 'sr'];

	const pathLang = url.pathname.split('/')[1];

	if (!pathLang || !supportedLangs.includes(pathLang)) {
		const cookieLang = cookies.get('lang') || '';

		const acceptLang = request.headers.get('accept-language');
		const browserLang = acceptLang?.split(',')[0]?.split('-')[0].toLowerCase() || '';

		const lang = supportedLangs.includes(cookieLang)
			? cookieLang
			: supportedLangs.includes(browserLang)
				? browserLang
				: 'en';

		const newPath = url.pathname === '/' ? `/${lang}` : `/${lang}${url.pathname}`;

		redirect(302, newPath);
	}

	return { lang: pathLang, theme };
}
