// @ts-check
import { defineConfig, envField } from 'astro/config';

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
	env: {
		schema: {
			// Read at build time for the GitHub contribution graph. Locally from .env, on Cloudflare from a build secret.
			GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
		},
	},
	markdown: {
		shikiConfig: {
			themes: { light: 'github-light', dark: 'github-dark'},
			defaultColor: false,
		},
	},
});
