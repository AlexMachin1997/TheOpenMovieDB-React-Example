import { SelectOption } from '../../../types/DropdownElementTypes';
import { FiltersSection, SortBySection, WhereToWatchSection } from './Sections';

type DiscoverFilterSidebar = {
	isAuthenticated?: boolean;
	ottProviders?: SelectOption[];
};

const DiscoverFilterSidebar = ({
	isAuthenticated = false,
	ottProviders = []
}: DiscoverFilterSidebar) => (
	<div className='max-w-sm space-y-2'>
		<SortBySection />
		<FiltersSection isAuthenticated={isAuthenticated} />
		<WhereToWatchSection isAuthenticated={isAuthenticated} ottProviders={ottProviders} />
	</div>
);

export default DiscoverFilterSidebar;
