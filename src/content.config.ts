import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each collection has one folder per language: src/content/<collection>/<en|no>/<slug>.md
// Use the same file name in both languages so the language switch can link between them.

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()).default([]),
		status: z.enum(['wip', 'done']).default('done'),
		featured: z.boolean().default(false),
		// Lower numbers are listed first.
		order: z.number().default(100),
		repo: z.string().optional(),
		demo: z.string().optional(),
	}),
});

const devlog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/devlog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		// Slug (file name) of the project this post belongs to.
		project: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

const timelineEntry = z.object({
	title: z.string(),
	org: z.string().optional(),
	place: z.string().optional(),
	period: z.string(),
	description: z.string().optional(),
	link: z.object({ label: z.string(), href: z.string() }).optional(),
});

const pages = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
	schema: z.object({
		title: z.string(),
		// Optional structured sections, rendered after the Markdown body (used by the about page).
		timelines: z.array(z.object({ heading: z.string(), entries: z.array(timelineEntry) })).default([]),
		skills: z
			.object({
				heading: z.string(),
				groups: z.array(z.object({ label: z.string(), items: z.array(z.string()) })),
			})
			.optional(),
		languages: z.object({ heading: z.string(), text: z.string() }).optional(),
	}),
});

export const collections = { projects, devlog, pages };
