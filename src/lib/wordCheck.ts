import fileContent from './english_5_letters.txt?raw';

const lines = fileContent.split(/\r?\n/);

const words = lines.map((line) => line.toLowerCase());

export const isValid = (word: string) => {
	return words.includes(word.toLowerCase());
};
