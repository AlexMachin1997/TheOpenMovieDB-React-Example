import { SelectOption } from '~/types/DropdownElementTypes';
import { MEDIA_TYPE } from '~/types/RoutingTypes';
import {
	FiltersSection,
	SortBySection,
	WhereToWatchSection
} from '~/components/Forms/DiscoverPageFilters/Sections';

type DiscoverFilterSidebar = {
	isAuthenticated?: boolean;
	ottProviders?: SelectOption[];
	mediaType: MEDIA_TYPE;
};

const DiscoverFilterSidebar = ({
	isAuthenticated = false,
	ottProviders = [],
	mediaType = MEDIA_TYPE.MOVIE
}: DiscoverFilterSidebar) => (
	<div className='max-w-md space-y-2'>
		<SortBySection />
		<FiltersSection isAuthenticated={isAuthenticated} mediaType={mediaType} />
		<WhereToWatchSection isAuthenticated={isAuthenticated} ottProviders={ottProviders} />
	</div>
);

export default DiscoverFilterSidebar;
