export const languages = {
	en: 'English',
	no: 'Norsk',
} as const;

export type Lang = keyof typeof languages;
export const langs = Object.keys(languages) as Lang[];

export const ui = {
	en: {
		'meta.description': 'Software developer in Norway. Projects and a devlog of what I am building.',
		'nav.projects': 'Projects',
		'nav.devlog': 'Devlog',
		'nav.about': 'About',
		'nav.theme': 'Toggle light and dark theme',
		'nav.lang': 'Les på norsk',
		'hero.eyebrow': 'software developer · norway',
		'hero.title': "Hi, I'm Christer.",
		'hero.tagline': 'I build various projects and write about them as I go. Currently looking for my next role.',
		'hero.current': 'currently building:',
		'home.featured': 'featured projects',
		'home.latest': 'latest from the devlog',
		'home.allProjects': 'All projects →',
		'home.allPosts': 'All posts →',
		'projects.title': 'Projects',
		'projects.intro': 'Things I have built, and things I am still building.',
		'activity.label': 'GitHub contributions over the last 6 months',
		'activity.days': 'active days',
		'activity.period': 'last 6 months',
		'project.source': 'Source',
		'project.demo': 'Live demo',
		'project.devlog': 'devlog entries',
		'project.noPosts': 'No devlog entries yet.',
		'project.back': '← All projects',
		'status.wip': 'wip',
		'status.done': 'done',
		'devlog.title': 'Devlog',
		'devlog.intro': 'Notes and progress updates from ongoing projects.',
		'devlog.empty': 'No posts yet.',
		'post.back': '← All posts',
		'post.project': 'Project:',
		'footer.contact': 'Get in touch',
		'notFound.title': 'Page not found',
		'notFound.body': "This page doesn't exist.",
		'notFound.home': 'Go to the front page',
	},
	no: {
		'meta.description': 'Systemutvikler i Norge. Prosjekter og en devlogg om det jeg lager.',
		'nav.projects': 'Prosjekter',
		'nav.devlog': 'Devlogg',
		'nav.about': 'Om meg',
		'nav.theme': 'Bytt mellom lyst og mørkt tema',
		'nav.lang': 'Read in English',
		'hero.eyebrow': 'systemutvikler · norge',
		'hero.title': 'Hei, jeg er Christer.',
		'hero.tagline': 'Jeg lager diverse prosjekter og skriver om dem underveis. Ser etter min neste jobb.',
		'hero.current': 'jobber med nå:',
		'home.featured': 'utvalgte prosjekter',
		'home.latest': 'siste fra devloggen',
		'home.allProjects': 'Alle prosjekter →',
		'home.allPosts': 'Alle innlegg →',
		'projects.title': 'Prosjekter',
		'projects.intro': 'Ting jeg har laget, og ting jeg fortsatt jobber med.',
		'activity.label': 'GitHub-bidrag de siste 6 månedene',
		'activity.days': 'aktive dager',
		'activity.period': 'siste 6 måneder',
		'project.source': 'Kildekode',
		'project.demo': 'Live demo',
		'project.devlog': 'devlogg-innlegg',
		'project.noPosts': 'Ingen devlogg-innlegg ennå.',
		'project.back': '← Alle prosjekter',
		'status.wip': 'pågår',
		'status.done': 'ferdig',
		'devlog.title': 'Devlogg',
		'devlog.intro': 'Notater og oppdateringer fra pågående prosjekter.',
		'devlog.empty': 'Ingen innlegg ennå.',
		'post.back': '← Alle innlegg',
		'post.project': 'Prosjekt:',
		'footer.contact': 'Ta kontakt',
		'notFound.title': 'Fant ikke siden',
		'notFound.body': 'Denne siden finnes ikke.',
		'notFound.home': 'Gå til forsiden',
	},
} as const;

export type UiKey = keyof (typeof ui)['en'];

export function useTranslations(lang: Lang) {
	return (key: UiKey) => ui[lang][key];
}

/** Builds a path inside a language, e.g. localePath('no', 'projects') → /no/projects/ */
export function localePath(lang: Lang, path = '') {
	const clean = path.replace(/^\/+|\/+$/g, '');
	return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}

/** The same page in the other language: swaps the first path segment. */
export function switchLangPath(pathname: string, to: Lang) {
	return pathname.replace(/^\/(en|no)(?=\/|$)/, `/${to}`);
}

export const langStaticPaths = () => langs.map((lang) => ({ params: { lang } }));
