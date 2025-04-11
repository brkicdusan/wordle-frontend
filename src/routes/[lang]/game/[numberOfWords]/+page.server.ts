import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const lang = params.lang;
	const numberOfWords = params.numberOfWords;

	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const url = `${backendUrl}/${lang}/${numberOfWords}`;
	const resp = await fetch(url);
	let words = await resp.json();

	if (!isStringArray(words)) {
		error(500, 'backend not found');
	}

	words = words.map((word) => word.toUpperCase());

	return {
		correct: words
	};
};

const isStringArray = (value: unknown): value is string[] => {
	if (Array.isArray(value)) {
		for (let i = 0; i < value.length; i++) {
			if (typeof value[i] !== 'string') {
				return false;
			}
		}
	} else {
		return false;
	}
	return true;
};
