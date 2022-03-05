import * as React from 'react';
import PropTypes from 'prop-types';

// TODO: Replace with tailwind utilities
import Row from '../../Blocks/Flexbox/Row';
import Column from '../../Blocks/Flexbox/Column';

// TODO: Remove once this has been renamed with a native heading tag
import Typography from '../../Core/Typography';

import { Image } from '../../Core';

import Section from './Section';

import { Container } from './PersonSidebar';
import SocialLinks from '../SocialLinks';

const DesktopPersonSidebar = ({
	actorName,
	actorImage,
	knownFor,
	knownCredits,
	gender,
	birthday,
	placeOfBirth,
	knownAs,
	facebookLink,
	twitterLink,
	instagramLink,
	homepageLink
}) => (
	<Container>
		<Row>
			<Column autoWidth>
				<div style={{ marginBottom: '1rem' }}>
					<Image
						src={actorImage}
						width='308px'
						height='462px'
						borderRadius='1rem'
						alt={actorName}
						label={`A picture of ${actorName}`}
					/>
				</div>
				<SocialLinks
					facebookLink={facebookLink}
					twitterLink={twitterLink}
					instagramLink={instagramLink}
					homepageLink={homepageLink}
					name={actorName}
				/>
				<Typography type='h1' size='1.3rem' text='Personal Info' weight='bold' />
				<Section title='Known For' content={knownFor} display={knownFor.length !== 0} />
				<Section title='Known Credits' content={knownCredits} display={knownCredits !== 0} />
				<Section title='Gender' content={gender} display={gender.length !== 0} />
				<Section title='Birthday' content={birthday} display={birthday.length !== 0} />
				<Section
					title='Place of Birth'
					content={placeOfBirth}
					display={placeOfBirth.length !== 0}
				/>
				<Section title='Known as' content={knownAs} display={knownAs.length !== 0} />
			</Column>
		</Row>
	</Container>
);

DesktopPersonSidebar.defaultProps = {
	actorName: '',
	actorImage: 'https://via.placeholder.com/308x462?text=Default+Image',
	knownFor: '',
	knownCredits: 0,
	gender: '',
	birthday: '',
	placeOfBirth: '',
	knownAs: '',
	facebookLink: '',
	twitterLink: '',
	instagramLink: '',
	homepageLink: ''
};

DesktopPersonSidebar.propTypes = {
	actorName: PropTypes.string,
	actorImage: PropTypes.string,
	knownFor: PropTypes.string,
	knownCredits: PropTypes.number,
	gender: PropTypes.string,
	birthday: PropTypes.string,
	placeOfBirth: PropTypes.string,
	knownAs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	facebookLink: PropTypes.string,
	twitterLink: PropTypes.string,
	instagramLink: PropTypes.string,
	homepageLink: PropTypes.string
};

export default DesktopPersonSidebar;
