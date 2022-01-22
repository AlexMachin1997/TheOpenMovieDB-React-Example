import React from 'react';
import PropTypes from 'prop-types';

import { Dot } from 'styled-icons/octicons';
import { Container, Year, Separator, Role } from './TableRow';
import Typography from '../../../Core/Typography';

const TableRow = ({ year, mediaType, title, episodeCount, character }) => (
	<Container tabIndex='0'>
		<Year>{year}</Year>
		<Separator>
			<Dot size={30} />
		</Separator>
		<Role>
			<Typography type='p' text={title} size='1rem' weight={600} colour='black' />{' '}
			{mediaType === 'tv' && (
				<Typography
					weight='lighter'
					type='p'
					text={`(${episodeCount} ${episodeCount > 1 ? 'episodes' : 'episode'}) `}
					colour='rgba(0, 0, 0, 0.5)'
				/>
			)}
			<Typography text='as' weight={600} colour='rgba(0, 0, 0, 0.5)' type='p' />{' '}
			<Typography text={character} colour='black' weight='lighter' type='p' />
		</Role>
	</Container>
);

TableRow.propTypes = {
	year: PropTypes.string,
	mediaType: PropTypes.string,
	title: PropTypes.string,
	episodeCount: PropTypes.string,
	character: PropTypes.string
};

TableRow.defaultProps = {
	year: '2020',
	mediaType: 'movie',
	title: 'Black Widow',
	episodeCount: '10',
	character: 'Natasha Romanoff / Black Widow'
};

export default TableRow;
