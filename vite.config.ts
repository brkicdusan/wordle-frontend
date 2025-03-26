import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	server: {
		https: {
			key: fs.readFileSync(`${__dirname}/localhost_cert/key.pem`),
			cert: fs.readFileSync(`${__dirname}/localhost_cert/cert.pem`)
		},
		proxy: {}
	},
	assetsInclude: ['**/*.txt']
});
