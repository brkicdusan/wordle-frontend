import { latinToCyrilic } from 'serbian-script-converter';
import fileContentEnglish from './english_5_letters.txt?raw';
import fileContentSerbian from './serbian_5_letters.txt?raw';

const linesEnglish = fileContentEnglish.split(/\r?\n/);
const words = linesEnglish.map((line) => line.toLowerCase());

const linesSerbian = fileContentSerbian.split(/\r?\n/);
const reci = linesSerbian.map((line) => {
	let word = line.toLowerCase();
	word = latinToCyrilic(word);
	return word;
});

export const isValidEnglish = (word: string) => {
	word = word.toLowerCase();
	return words.includes(word);
};

export const isValidSerbian = (word: string) => {
	word = word.toLowerCase();
	word = latinToCyrilic(word);
	return reci.includes(word);
};
