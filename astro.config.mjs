// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://christerkrane.dev',
	i18n: {
		locales: ['en', 'no'],
		defaultLocale: 'en',
		routing: {
			// Every page lives under /en/ or /no/. The root page picks one from the visitor's browser language.
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
	markdown: {
		shikiConfig: {
			themes: { light: 'github-light', dark: 'github-dark'},
			defaultColor: false,
		},
	},
});
