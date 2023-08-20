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
	<div className='max-w-md space-y-2'>
		<SortBySection />
		<WhereToWatchSection isAuthenticated={isAuthenticated} ottProviders={ottProviders} />
		<FiltersSection isAuthenticated={isAuthenticated} />
	</div>
);

export default DiscoverFilterSidebar;
