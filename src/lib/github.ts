import { GITHUB_TOKEN } from 'astro:env/server';

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const LEVELS = {
	NONE: 0,
	FIRST_QUARTILE: 1,
	SECOND_QUARTILE: 2,
	THIRD_QUARTILE: 3,
	FOURTH_QUARTILE: 4,
} as const;

const QUERY = `query ($login: String!) {
	user(login: $login) {
		contributionsCollection {
			contributionCalendar {
				weeks { contributionDays { date contributionCount contributionLevel } }
			}
		}
	}
}`;

type CalendarResponse = {
	data?: {
		user?: {
			contributionsCollection: {
				contributionCalendar: {
					weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: keyof typeof LEVELS }[] }[];
				};
			};
		};
	};
	errors?: { message: string }[];
};

// Every page that shows the graph shares one request per build.
const cache = new Map<string, Promise<ContributionDay[][] | null>>();

/**
 * The user's contribution calendar for the last year, as weeks of days (Sunday first), from GitHub's GraphQL API.
 * Returns null instead of throwing when there is no token or the request fails, so the build never breaks over it.
 */
export function getContributionWeeks(login: string) {
	if (!cache.has(login)) cache.set(login, fetchWeeks(login));
	return cache.get(login)!;
}

async function fetchWeeks(login: string): Promise<ContributionDay[][] | null> {
	if (!GITHUB_TOKEN) {
		console.warn('[github] GITHUB_TOKEN is not set; skipping the contribution graph.');
		return null;
	}
	try {
		const res = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: QUERY, variables: { login } }),
		});
		const json = (await res.json()) as CalendarResponse;
		const weeks = json.data?.user?.contributionsCollection.contributionCalendar.weeks;
		if (!res.ok || !weeks) throw new Error(json.errors?.[0]?.message ?? `HTTP ${res.status}`);
		return weeks.map((week) =>
			week.contributionDays.map((day) => ({
				date: day.date,
				count: day.contributionCount,
				level: LEVELS[day.contributionLevel] ?? 0,
			})),
		);
	} catch (error) {
		console.warn(`[github] Could not load contributions for ${login}; skipping the graph.`, error);
		return null;
	}
}
