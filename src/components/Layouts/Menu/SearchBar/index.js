import * as React from 'react';
import PropTypes from 'prop-types';

import { Container, ContentContainer } from './SearchBar';
import Icon from '../../../Core/Icon';

const SearchBar = ({ display }) => (
	<Container display={display}>
		<ContentContainer>
			<Icon icon='SearchCircle' size={30} colour='black' />
			<input
				type='text'
				placeholder='Search for a movie, tv show, person...'
				style={{ width: '100%', border: 'none' }}
			/>
			<Icon icon='Close' size={30} colour='black' />
		</ContentContainer>
	</Container>
);

SearchBar.defaultProps = {
	display: false
};

SearchBar.propTypes = {
	display: PropTypes.bool
};

export default SearchBar;
