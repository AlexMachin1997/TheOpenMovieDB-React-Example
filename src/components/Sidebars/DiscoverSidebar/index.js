import React, { useState } from 'react';

import FilterAction from './Action';
import { Container } from './DiscoverSidebar';

const DiscoverSidebar = () => {
	const [sortByVisibility, setSortByVisibility] = useState(false);
	const [filtersVisibility, setFiltersVisibility] = useState(false);
	// const [hasSelectedAnOption, setHasSelectedAnOption] = useState(false);

	return (
		<Container>
			<FilterAction
				title='Sort'
				onClick={() => setSortByVisibility(!sortByVisibility)}
				content={<p>Sort</p>}
				isToggled={sortByVisibility}
			/>
			<FilterAction
				title='Filters'
				onClick={() => setFiltersVisibility(!filtersVisibility)}
				content={<p>Filtering</p>}
				isToggled={filtersVisibility}
			/>

			<div style={{ padding: '1rem' }}>
				<button
					style={{
						padding: '1rem',
						textAlign: 'center',
						width: '100%',
					}}
					type='button'
				>
					Search
				</button>
			</div>
		</Container>
	);
};

export default DiscoverSidebar;
