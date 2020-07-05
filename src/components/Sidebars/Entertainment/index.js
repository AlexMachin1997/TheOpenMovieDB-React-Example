import React from 'react';
import PropTypes from 'prop-types';

import Column from '../../Layouts/Column';
import Row from '../../Layouts/Row';
import Paragraph from '../../Paragraph';
import Image from '../../Image';
import Section from './Section';
import Keyword from './Keywords';
import SocialLinks from '../../SocialLinks';

const Entertainment = ({
	facebookLink,
	twitterLink,
	instagramLink,
	homePageLink,
	status,
	type,
	keywords,
	originalLanguage,
	budget,
	revenue,
	networkImage,
	entertainmentType,
	entertainmentName,
}) => (
	<Row>
		<Column>
			<SocialLinks
				facebookLink={facebookLink}
				twitterLink={twitterLink}
				instagramLink={instagramLink}
				homePageLink={homePageLink}
				name={entertainmentName}
			/>

			<Section content={null} title='Facts' display={entertainmentType === 'tv'} />

			<Section
				content={<Paragraph text={status} weight='lighter' size='1rem' />}
				title='Status'
				display
			/>

			<Section
				content={
					entertainmentType === 'tv' ? (
						<Image
							src={networkImage}
							width='50px'
							height='30px'
							borderRadius='0'
							alt='Network logo'
							label={`The network logo for ${entertainmentName}`}
						/>
					) : (
						<Paragraph text={originalLanguage} weight='lighter' size='1rem' />
					)
				}
				title={entertainmentType === 'tv' ? 'Network' : 'Original Language'}
				display
			/>

			<Section
				content={
					<Paragraph
						text={entertainmentType === 'tv' ? type : budget}
						weight='lighter'
						size='1rem'
					/>
				}
				title={entertainmentType === 'tv' ? 'type' : 'Budget'}
			/>

			<Section
				content={
					<Paragraph
						text={entertainmentType === 'tv' ? originalLanguage : revenue}
						weight='lighter'
						size='1rem'
					/>
				}
				title={entertainmentType === 'tv' ? 'Original Language' : 'Revenue'}
			/>

			<Section
				content={<Keyword keywords={keywords} />}
				title='Keywords'
				display={keywords.length !== 0}
			/>
		</Column>
	</Row>
);

Entertainment.propTypes = {
	facebookLink: PropTypes.string,
	twitterLink: PropTypes.string,
	instagramLink: PropTypes.string,
	homePageLink: PropTypes.string,
	status: PropTypes.string,
	type: PropTypes.string,
	keywords: PropTypes.arrayOf(PropTypes.string),
	originalLanguage: PropTypes.string,
	budget: PropTypes.string,
	revenue: PropTypes.string,
	networkImage: PropTypes.string,
	entertainmentType: PropTypes.string,
	entertainmentName: PropTypes.string,
};

Entertainment.defaultProps = {
	facebookLink: 'https://www.facebook.com',
	twitterLink: 'https://www.twitter.com',
	instagramLink: 'https://instagram.com',
	homePageLink: '',
	status: 'Released',
	type: 'Scripted',
	keywords: ['Thriller'],
	originalLanguage: 'English',
	budget: '£100,000',
	revenue: '£100,000,000',
	entertainmentType: 'tv',
	networkImage: 'https://via.placeholder.com/200x200?text=Default+Image',
	entertainmentName: '',
};

export default Entertainment;
