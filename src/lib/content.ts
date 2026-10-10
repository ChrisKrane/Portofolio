import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

// Entry ids look like "en/project-one": the language folder, then the slug.
export const entryLang = (entry: { id: string }) => entry.id.split('/')[0] as Lang;
export const entrySlug = (entry: { id: string }) => entry.id.split('/').slice(1).join('/');

export async function getProjects(lang: Lang) {
	const projects = await getCollection('projects', (entry) => entryLang(entry) === lang);
	return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getPosts(lang: Lang) {
	const posts = await getCollection(
		'devlog',
		(entry) => entryLang(entry) === lang && (import.meta.env.DEV || !entry.data.draft),
	);
	return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const formatDate = (date: Date) => date.toISOString().slice(0, 10);

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'devlog'>;
