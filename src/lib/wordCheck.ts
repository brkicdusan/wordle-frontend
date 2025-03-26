import fileContent from './english_5_letters.txt?raw';

const lines = fileContent.split(/\r?\n/);

export const isValid = (word: string) => {
	return lines.includes(word.toLowerCase());
};
