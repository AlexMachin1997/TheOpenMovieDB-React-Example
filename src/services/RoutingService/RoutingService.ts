type MenuGroup = 'Movies' | 'Shows' | 'People' | 'More' | 'Home' | 'Account';

type BaseRoute = {
	url: string;
	enabled?: boolean;
	menuGroup: MenuGroup;
};

export interface MenuItemRoute extends BaseRoute {
	type: 'menu-item';
	profileMenuOrder: number;
	profileMenuSectionId: number;
	label: string;
}

interface NoneMenuItemRoute extends BaseRoute {
	type: 'none-menu-item';
}

type Route = NoneMenuItemRoute | MenuItemRoute;

const filterRoutesByTypeProperty = <T extends Route['type']>(type: T, routes: Route[]) =>
	routes.filter((el) => el.type === type) as Extract<Route, { type: T }>[];

class RoutingService {
	private routes: Route[];

	constructor() {
		this.routes = [
			{
				type: 'none-menu-item',
				url: '/',
				enabled: true,
				menuGroup: 'Home'
			},
			{
				type: 'menu-item',
				url: '/Movies/popular',
				enabled: true,
				menuGroup: 'Movies',
				label: 'Popular',
				profileMenuOrder: 0,
				profileMenuSectionId: 0
			},
			{
				type: 'menu-item',
				url: '/Movies/now-playing',
				enabled: true,
				menuGroup: 'Movies',
				label: 'Now Playing',
				profileMenuOrder: 0,
				profileMenuSectionId: 0
			},
			{
				type: 'menu-item',
				url: '/Movies/upcoming',
				enabled: true,
				menuGroup: 'Movies',
				label: 'Upcoming',
				profileMenuOrder: 0,
				profileMenuSectionId: 0
			},
			{
				type: 'menu-item',
				url: '/Movies/top-rated',
				enabled: true,
				menuGroup: 'Movies',
				label: 'Top Rated',
				profileMenuOrder: 0,
				profileMenuSectionId: 0
			},
			{
				type: 'none-menu-item',
				url: '/Movies/:id',
				enabled: true,
				menuGroup: 'Movies'
			},
			{
				type: 'menu-item',
				url: '/Shows/popular',
				enabled: true,
				menuGroup: 'Shows',
				label: 'Popular',
				profileMenuOrder: 0,
				profileMenuSectionId: 0
			},
			{
				type: 'menu-item',
				url: '/Shows/airing-today',
				enabled: true,
				menuGroup: 'Shows',
				label: 'Airing Today',
				profileMenuOrder: 0,
				profileMenuSectionId: 0
			},
			{
				type: 'menu-item',
				url: '/Shows/on-tv',
				enabled: true,
				menuGroup: 'Shows',
				label: 'On Tv',
				profileMenuOrder: 0,
				profileMenuSectionId: 0
			},
			{
				type: 'menu-item',
				url: '/Shows/top-rated',
				enabled: true,
				menuGroup: 'Shows',
				label: 'Top Rated',
				profileMenuOrder: 0,
				profileMenuSectionId: 0
			},
			{
				type: 'none-menu-item',
				url: '/Shows/:id',
				enabled: true,
				menuGroup: 'Shows'
			},
			{
				type: 'none-menu-item',
				url: '/People/:id',
				enabled: true,
				menuGroup: 'People'
			},
			{
				type: 'menu-item',
				url: '/People/popular',
				enabled: true,
				menuGroup: 'People',
				label: 'Popular People',
				profileMenuOrder: 0,
				profileMenuSectionId: 0
			},
			{
				type: 'menu-item',
				url: '/login',
				enabled: true,
				menuGroup: 'Account',
				label: 'Login',
				profileMenuOrder: 0,
				profileMenuSectionId: 0
			},
			{
				type: 'menu-item',
				url: '/register',
				enabled: true,
				menuGroup: 'Account',
				label: 'Join TMDB',
				profileMenuOrder: 0,
				profileMenuSectionId: 0
			},
			{
				type: 'none-menu-item',
				url: '/forgot',
				enabled: false,
				menuGroup: 'Account'
			},
			{
				type: 'none-menu-item',
				url: '/reset-password',
				enabled: false,
				menuGroup: 'Account'
			},
			{
				type: 'menu-item',
				url: '/profile/:id',
				enabled: true,
				menuGroup: 'Account',
				profileMenuOrder: 1,
				profileMenuSectionId: 1,
				label: 'View Profile'
			},
			{
				type: 'menu-item',
				url: '/profile/edit',
				enabled: true,
				menuGroup: 'Account',
				label: 'Edit profile',
				profileMenuSectionId: 2,
				profileMenuOrder: 1
			},
			{
				type: 'menu-item',
				url: '/profile/settings',
				enabled: true,
				menuGroup: 'Account',
				label: 'Settings',
				profileMenuSectionId: 2,
				profileMenuOrder: 2
			},
			{
				type: 'menu-item',
				url: '/profile/discussions',
				enabled: true,
				menuGroup: 'Account',
				label: 'Discussions',
				profileMenuOrder: 1,
				profileMenuSectionId: 1
			},
			{
				type: 'menu-item',
				url: '/profile/lists',
				enabled: true,
				menuGroup: 'Account',
				label: 'Lists',
				profileMenuOrder: 2,
				profileMenuSectionId: 1
			},
			{
				type: 'menu-item',
				url: '/profile/ratings',
				enabled: true,
				menuGroup: 'Account',
				label: 'Ratings',
				profileMenuOrder: 3,
				profileMenuSectionId: 1
			},
			{
				type: 'menu-item',
				url: '/profile/watchlist',
				enabled: true,
				menuGroup: 'Account',
				label: 'Watchlist',
				profileMenuOrder: 3,
				profileMenuSectionId: 1
			},
			{
				type: 'menu-item',
				url: 'profile/logout',
				enabled: true,
				menuGroup: 'Account',
				label: 'Logout',
				profileMenuSectionId: 3,
				profileMenuOrder: 2
			},
			{
				type: 'menu-item',
				url: '/discussions',
				enabled: true,
				menuGroup: 'More',
				label: 'Discussions',
				profileMenuSectionId: 0,
				profileMenuOrder: 0
			},
			{
				type: 'menu-item',
				url: '/leaderboard',
				enabled: true,
				menuGroup: 'More',
				label: 'Leaderboard',
				profileMenuSectionId: 0,
				profileMenuOrder: 0
			},
			{
				type: 'menu-item',
				url: '/talk',
				enabled: true,
				menuGroup: 'More',
				label: 'Support',
				profileMenuSectionId: 0,
				profileMenuOrder: 0
			},
			{
				type: 'menu-item',
				url: '/documentation/api',
				enabled: true,
				menuGroup: 'More',
				label: 'API documentation',
				profileMenuSectionId: 0,
				profileMenuOrder: 0
			}
		];
	}

	getActiveUrls() {
		return this.routes.filter((el) => el.enabled === true);
	}

	getUrls({ menuGroup }: { menuGroup: MenuGroup }) {
		// Get all the urls which match the provided menuGroup
		const group = filterRoutesByTypeProperty(
			'menu-item',
			this.getActiveUrls().filter((el) => el.menuGroup === menuGroup)
		);

		// Return the found urls so that can be used somewhere within the application
		return group;
	}

	getMovieUrls() {
		return this.getUrls({ menuGroup: 'Movies' });
	}

	getShowUrls() {
		return this.getUrls({ menuGroup: 'Shows' });
	}

	getPeopleUrls() {
		return this.getUrls({ menuGroup: 'People' });
	}

	getMoreUrls() {
		return this.getUrls({ menuGroup: 'More' });
	}

	getHomeUrl() {
		return this.getUrls({ menuGroup: 'Home' });
	}

	getAccountUrls() {
		return this.getUrls({ menuGroup: 'Account' });
	}

	generateUserProfileLinks() {
		// Get al the account urls (Exclude the Login and Register links as we don't need then here)
		const AllAvailableAccountLinks = filterRoutesByTypeProperty(
			'menu-item',
			this.getUrls({ menuGroup: 'Account' })
		).filter((el) => el.label !== 'Login' && el.label !== 'Join TMDB');

		// Get a distinct list of all the section id's e.g. [1, 2, 3, 4]
		const sectionIds = new Set(
			filterRoutesByTypeProperty('menu-item', AllAvailableAccountLinks).map(
				(link) => link.profileMenuSectionId
			)
		);

		// This will store the generated menu sections, used to to generate the popout profile menu in the Menu component
		const generatedMenuSections: { order: number; children: MenuItemRoute[]; menuGroup: string }[] =
			[];

		// Loop through all the available section ids and generate a menu section for them
		// Example: {menuGroup: '1', groupIndex: 1, children: [{urL: 'profile/logout', label: 'Label'}]}
		sectionIds.forEach((sectionId) => {
			// Get all of the groups which has a profileMenuSectionId === sectionId e.g. 1 === 1
			const group = AllAvailableAccountLinks.filter((el) => el.profileMenuSectionId === sectionId);

			// Sort the found links in ascending (highest to lowest)
			const sortedGroups = group.sort((a, b) => a.profileMenuOrder - b.profileMenuOrder);

			// Add the generated section to the generatedMenuSections array
			generatedMenuSections.push({
				order: sectionId,
				children: sortedGroups,
				menuGroup: `section-${sectionId}`
			});
		});

		// Return the generated sections
		return generatedMenuSections.sort((a, b) => a.order - b.order);
	}

	getMultipleUrlGroups({ groups = [] }: { groups: MenuGroup[] }) {
		return (
			groups?.map((menuGroup) => ({
				menuGroup,
				children: this.getUrls({ menuGroup })
			})) ?? []
		);
	}
}

export default new RoutingService();
