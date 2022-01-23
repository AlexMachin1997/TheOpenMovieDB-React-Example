import * as React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router-dom';

import socialMediaImage from '../../../assets/images/icon.png';

const Head = ({ title, description, keywords }) => {
	// Returns the page url e.g. / or /account
	const { pathname } = useLocation();

	// Stores the keywords (Can be an array or a string)
	let pageKeywords = keywords;

	// Stores the page title
	const pageTitle = title;

	// Stores the page description
	const pageDescription = description;

	// Stores the page url
	let pageUrl = window.location.hostname;

	// When the pathname isn't the home page include the pathname in the pageUrl
	if (pathname !== '/') {
		pageUrl = `${window.location.hostname}/${pathname}`;
	}

	/*

	Keywords check:

	Check to see if the keywords is an array or string

	When the keywords is an array join them

	*/

	if (Array.isArray(pageKeywords) === true) {
		pageKeywords = pageKeywords.join(', ');
	}

	return (
		<Helmet
			htmlAttributes={{
				lang: 'en'
			}}
		>
			<title>{pageTitle}</title>
			<meta name='title' content={pageTitle} />
			<meta name='description' content={pageDescription} />
			<meta name='keywords' keywords={pageKeywords} />
			<meta name='application-name' content='TheOpenMovieDB Clone' />

			{/*
          Allows Googles Search Engine Crawlers
           robot - All Search Engines
           googlebot - Google Search Engine
      */}
			<meta name='robot' content='index,follow' />
			<meta name='googlebot' content='index,follow' />

			{/*
      Open Graph / Facebook
      */}
			<meta property='og:title' content={pageTitle} />
			<meta property='og:type' content='website' />
			<meta property='og:description' content={pageDescription} />
			<meta property='og:image' content={socialMediaImage} />
			<meta property='og:locale' content='en_GB' />
			<meta property='og:url' content={pageUrl} />
			<link
				rel='canonical'
				href={process.env.NODE_ENV === 'production' ? pageUrl : window.location.hostname}
			/>

			{/*
        Twitter
      */}
			<meta property='twitter:card' content='summary_large_image' />
			<meta property='twitter:url' content={pageUrl} />
			<meta property='twitter:title' content={pageTitle} />
			<meta property='twitter:creator' content='@AlexMachin97' />
			<meta property='twitter:description' content={pageDescription} />
			<meta property='twitter:image' content={socialMediaImage} />
		</Helmet>
	);
};

Head.defaultProps = {
	title: 'TMBDb Clone',
	description:
		'The Movie Database (TMDb) is a popular, user editable database for movies and TV shows.',
	keywords:
		'Movies, TV Shows, Streaming, Reviews, API, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast'
};

Head.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	keywords: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};

export default Head;
