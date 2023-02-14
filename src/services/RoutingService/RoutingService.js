class RoutingService {
	constructor() {
		this.routes = [
			{
				url: '/',
				enabled: true,
				groupName: ''
			},
			{
				url: '/Movies/popular',
				enabled: true,
				groupName: 'Movies',
				label: 'Popular'
			},
			{
				url: '/Movies/now-playing',
				enabled: true,
				groupName: 'Movies',
				label: 'Now Playing'
			},
			{
				url: '/Movies/upcoming',
				enabled: true,
				groupName: 'Movies',
				label: 'Upcoming'
			},
			{
				url: '/Movies/top-rated',
				enabled: true,
				groupName: 'Movies',
				label: 'Top Rated'
			},
			{
				url: '/Movies/:id',
				enabled: true,
				groupName: 'Movies'
			},
			{
				url: '/Shows/popular',
				enabled: true,
				groupName: 'Shows',
				label: 'Popular'
			},
			{
				url: '/Shows/airing-today',
				enabled: true,
				groupName: 'Shows',
				label: 'Airing Today'
			},
			{
				url: '/Shows/on-tv',
				enabled: true,
				groupName: 'Shows',
				label: 'On Tv'
			},
			{
				url: '/Shows/top-rated',
				enabled: true,
				groupName: 'Shows',
				label: 'Top Rated'
			},
			{
				url: '/Shows/:id',
				enabled: true,
				groupName: 'Shows'
			},
			{
				url: '/People/:id',
				enabled: true,
				groupName: 'People'
			},
			{
				url: '/People/popular',
				enabled: true,
				groupName: 'People',
				label: 'Popular People'
			},
			{
				url: '/login',
				enabled: true,
				groupName: 'login',
				label: 'Login'
			},
			{
				url: '/register',
				enabled: true,
				groupName: 'login',
				label: 'Join TMDB'
			},
			{
				url: '/forgot',
				enabled: false,
				groupName: 'forgot'
			},
			{
				url: '/reset-password',
				enabled: false,
				groupName: 'forgot'
			},
			{
				url: '/profile/:id',
				enabled: true,
				groupName: 'Account',
				label: 'View profile'
			},
			{
				url: '/profile/edit',
				enabled: true,
				groupName: 'Account',
				label: 'Edit profile',
				profileMenuSectionId: 2,
				profileMenuOrder: 1
			},
			{
				url: '/profile/settings',
				enabled: true,
				groupName: 'Account',
				label: 'Settings',
				profileMenuSectionId: 2,
				profileMenuOrder: 2
			},
			{
				url: '/profile/discussions',
				enabled: true,
				groupName: 'Account',
				label: 'Discussions',
				profileMenuOrder: 1,
				profileMenuSectionId: 1
			},
			{
				url: '/profile/lists',
				enabled: true,
				groupName: 'Account',
				label: 'Lists',
				profileMenuOrder: 2,
				profileMenuSectionId: 1
			},
			{
				url: '/profile/ratings',
				enabled: true,
				groupName: 'Account',
				label: 'Ratings',
				profileMenuOrder: 3,
				profileMenuSectionId: 1
			},
			{
				url: '/profile/watchlist',
				enabled: true,
				groupName: 'Account',
				label: 'Watchlist',
				profileMenuOrder: 3,
				profileMenuSectionId: 1
			},
			{
				url: 'profile/logout',
				enabled: true,
				groupName: 'Account',
				label: 'Logout',
				profileMenuSectionId: 3,
				profileMenuOrder: 2
			},
			{
				url: '/discussions',
				enabled: true,
				groupName: 'More',
				label: 'Discussions'
			},
			{
				url: '/leaderboard',
				enabled: true,
				groupName: 'More',
				label: 'Leaderboard'
			},
			{
				url: '/talk',
				enabled: true,
				groupName: 'More',
				label: 'Support'
			},
			{
				url: '/documentation/api',
				enabled: true,
				groupName: 'More',
				label: 'API documentation'
			}
		];
	}

	getActiveUrls() {
		return this.routes.filter((el) => el.enabled === true);
	}

	getUrls({ groupName = '' }) {
		// Get all the urls which match the provided groupName
		const group = this.getActiveUrls().filter((el) => el.groupName === groupName);

		// When getting the url we only care about urls with a label, if it doesn't have a label we don't need to use that link
		const groupWithALabelAssigned = group.filter((el) => el.label !== undefined);

		// Return the found urls so that can be used somewhere within the application
		return groupWithALabelAssigned;
	}

	getMovieUrls() {
		return this.getUrls({ groupName: 'Movies' });
	}

	getShowUrls() {
		return this.getUrls({ groupName: 'Shows' });
	}

	getPeopleUrls() {
		return this.getUrls({ groupName: 'People' });
	}

	getAccountUrls() {
		return this.getUrls({ groupName: 'Account' });
	}

	getMoreUrls() {
		return this.getUrls({ groupName: 'More' });
	}

	generateMenuSections() {
		// Get al the account urls
		const AllAvailableAccountLinks = this.getAccountUrls();

		// If the link has a profileMenuSectionId and profileMenuOrder then it's classed as a menu item
		const sections = AllAvailableAccountLinks.filter(
			(link) => link.profileMenuSectionId !== undefined && link.profileMenuOrder !== undefined
		);

		// Get a distinct list of all the section id's e.g. [1, 2, 3, 4]
		const sectionIds = new Set(sections.map((link) => link.profileMenuSectionId));

		// This will store the generated menu sections, used to to generate the popout profile menu in the Menu component
		const generatedMenuSections = [];

		// Loop through all the available section ids and generate a menu section for them
		// Example: {groupName: '1', groupIndex: 1, children: [{urL: 'profile/logout', label: 'Label'}]}
		sectionIds.forEach((sectionId) => {
			// Get all of the groups which has a profileMenuSectionId === sectionId e.g. 1 === 1
			const group = AllAvailableAccountLinks.filter((el) => el.profileMenuSectionId === sectionId);

			// Sort the found links in ascending (highest to lowest)
			const sortedGroups = group.sort((a, b) => a.profileMenuOrder - b.profileMenuOrder);

			// Add the generated section to the generatedMenuSections array
			generatedMenuSections.push({
				order: sectionId,
				children: sortedGroups,
				groupName: `section-${sectionId}`
			});
		});

		// Return the generated sections
		return generatedMenuSections.sort((a, b) => a.order - b.order);
	}

	getMultipleUrlGroups({ groups = [] }) {
		return (
			groups?.map((groupName) => ({
				groupName,
				children: this.getUrls({ groupName })
			})) ?? []
		);
	}
}

export default new RoutingService();
