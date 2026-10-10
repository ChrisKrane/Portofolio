// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	i18n: {
		locales: ['en', 'no'],
		defaultLocale: 'en',
		routing: {
			// Every page lives under /en/ or /no/. The root page picks one from the visitor's browser language.
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
});
