import { error } from '@sveltejs/kit';
import { latinToCyrilic } from 'serbian-script-converter';

export const load = async ({ params }) => {
	const lang = params.lang;

	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const url = backendUrl + '/' + lang;
	const resp = await fetch(url);
	let word = await resp.json();

	if (typeof word !== 'string') {
		error(500, 'backend not found');
	}

	if (lang === 'sr') {
		word = latinToCyrilic(word);
	}

	return {
		correct: word
	};
};
