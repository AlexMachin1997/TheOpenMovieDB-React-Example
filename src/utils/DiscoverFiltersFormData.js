import { addDays, format, subDays } from 'date-fns';
import settings from '../settings';

const setupCheckboxFormData = ({ defaultValue = [], options = [] }) => {
	// If there are more than 1 options but it's not included in the
	if (
		(defaultValue?.length ?? 0) > 0 &&
		options
			.map((option) => option.value)
			.some((value) => defaultValue?.includes(value) ?? false) === false
	) {
		return ['all'];
	}

	// Check to see if the defaultValue has any other value (Excludes 'all')
	const hasOtherOptions = defaultValue?.filter((value) => value !== 'all')?.length > 0;

	// Check to see if the 'all' option is available
	const hasTheAllOption = defaultValue?.find((value) => value === 'all') !== undefined;

	// If there is the 'all' options and other options available then filter out the 'all' option, it return returns all the options which aren't all
	if (hasTheAllOption === true && hasOtherOptions === true) {
		return defaultValue?.filter((value) => value !== 'all');
	}

	// If there no 'all' option but there are other options return the defaultValue
	if (hasTheAllOption === false && hasOtherOptions === true) {
		return defaultValue;
	}

	return ['all'];
};

const setupDropdownFormData = ({ isMultiple = false, defaultValue, options = [] }) => {
	// If there are no options available then return an empty value for the dropdown
	if (options.length === 0) return isMultiple === true ? [] : '';

	// If the dropdown is multiple and some of the defaultValues are included in the options then get all the options which are included in the dropdown
	if (isMultiple === true) {
		if (
			options
				.map((option) => option.value)
				.some((value) => defaultValue?.includes(value) ?? false) === true
		) {
			// Return an array of option values e.g ['1', '8']
			const formattedOptions = options?.map((option) => option.value);

			// Only get the filter values which are actually included in the dropdown options.
			return defaultValue?.filter((value) => formattedOptions.includes(value) === true) ?? [];
		}

		// If none of values are included in the options array just return the default value
		return [];
	}

	// If it's a single select either return the found value or return an empty string
	return options.find((option) => option.value === defaultValue)?.value ?? '';
};

class DiscoverFiltersFormData {
	constructor(mediaType = '', resourceType = '', isAuthenticated = false, defaultValues = {}) {
		// Stores references to the current mediaType (movie), resourceType (popular) and isAuthenticated
		this.mediaType = mediaType;
		this.resourceType = resourceType;
		this.isAuthenticated = isAuthenticated;

		// Store "Sort By" formData properties
		let defaultSortBy = '';

		// Decide if the default sort by, top-rated or the default should be used for the sort_by
		if (defaultValues?.sort_by?.length > 0) {
			defaultSortBy = defaultValues?.sort_by ?? [];
		} else if (this.resourceType === 'top-rated') {
			defaultSortBy = settings.SORT_BY_OPTIONS.find(
				(option) => option.value === 'vote_average.desc'
			).value;
		} else {
			defaultSortBy =
				settings.SORT_BY_OPTIONS.find((option) => option.value === 'popularity.desc')?.value ?? '';
		}

		this.sort_by = setupDropdownFormData({
			isMultiple: false,
			defaultValue: defaultSortBy,
			options: settings.SORT_BY_OPTIONS
		});

		// Store the "Where to Watch" formData properties

		// Setup the restrict_services value (Only use the value if the value is a boolean)
		if (typeof defaultValues.restrict_services === 'boolean') {
			this.restrict_services = defaultValues?.restrict_services ?? false;
		} else {
			this.restrict_services = false;
		}

		// Setup the ott_region value
		this.ott_region = setupDropdownFormData({
			isMultiple: false,
			defaultValue: defaultValues?.ott_region ?? 'US',
			options: settings?.COUNTRY_OPTIONS ?? []
		});

		// Setup the with_ott_providers value
		this.with_ott_providers = setupDropdownFormData({
			isMultiple: true,
			defaultValue: defaultValues?.with_ott_providers ?? [],
			options: settings?.OTT_PROVIDER_OPTIONS ?? []
		});

		// Setup the show_me value
		if (
			isAuthenticated === false ||
			settings.SHOW_ME_RADIO_OPTIONS.map((option) => option.value).includes(
				defaultValues.show_me
			) === false
		) {
			this.show_me = '0';
		} else {
			this.show_me = defaultValues?.show_me ?? '0';
		}

		// Setup the with_ott_monetization_types value
		this.with_ott_monetization_types = setupCheckboxFormData({
			defaultValue: defaultValues?.with_ott_monetization_types ?? [],
			options: settings.AVAILABILITY_OPTIONS
		});

		// Setup the with_genres value
		this.with_genres = setupDropdownFormData({
			isMultiple: true,
			defaultValue: defaultValues?.with_genres ?? [],
			options: settings.GENRE_OPTIONS
		});

		// Setup the certification value
		this.certification = setupDropdownFormData({
			isMultiple: true,
			defaultValue: defaultValues?.certification ?? [],
			options: settings.CERTIFICATION_OPTIONS
		});

		// Setup the with_release_type value
		this.with_release_type = setupCheckboxFormData({
			defaultValue: defaultValues?.with_release_type ?? ['all'],
			options: settings.RELEASE_TYPE_OPTIONS
		});

		// Setup the with_original_language value
		this.with_original_language = setupDropdownFormData({
			isMultiple: false,
			defaultValue: defaultValues?.with_original_language ?? 'none',
			options: settings.LANGUAGE_OPTIONS
		});

		// Setup the region value
		this.region = setupDropdownFormData({
			isMultiple: false,
			defaultValue: defaultValues?.region ?? 'US',
			options: settings.COUNTRY_OPTIONS
		});

		// Setup the vote_average_lte (To)
		if (Number.isInteger(defaultValues?.vote_average_lte) === true) {
			if (defaultValues?.vote_average_lte < 0) {
				this.vote_average_lte = 10;
			} else if (defaultValues.vote_average_lte > 10) {
				this.vote_average_lte = 10;
			} else if (defaultValues.vote_average_lte > defaultValues.vote_average_gte) {
				this.vote_average_lte = 10;
			} else {
				this.vote_average_lte = defaultValues?.vote_average_lte;
			}
		} else {
			this.vote_average_lte = 10;
		}

		// Setup the vote_average_gte (From)
		if (Number.isInteger(defaultValues?.vote_average_gte) === true) {
			if (defaultValues?.vote_average_gte < 0) {
				this.vote_average_gte = 0;
			} else if (defaultValues.vote_average_gte > 10) {
				this.vote_average_gte = 0;
			} else if (defaultValues.vote_average_gte > defaultValues.vote_average_lte) {
				this.vote_average_gte = 0;
			} else {
				this.vote_average_gte = defaultValues.vote_average_gte;
			}
		} else {
			this.vote_average_gte = 0;
		}

		// Setup the with_runtime_lte (To)
		if (Number.isInteger(defaultValues?.with_runtime_lte) === true) {
			if (defaultValues?.with_runtime_lte < 0) {
				this.with_runtime_lte = 400;
			} else if (defaultValues.with_runtime_lte > 400) {
				this.with_runtime_lte = 400;
			} else if (defaultValues.with_runtime_gte > defaultValues?.with_runtime_lte) {
				this.with_runtime_lte = 400;
			} else {
				this.with_runtime_lte = defaultValues.with_runtime_lte;
			}
		} else {
			this.with_runtime_lte = 400;
		}

		// Setup the with_runtime_gte (From)
		if (Number.isInteger(defaultValues?.with_runtime_gte) === true) {
			if (defaultValues.with_runtime_gte < 0) {
				this.with_runtime_gte = 0;
			} else if (defaultValues.with_runtime_gte > 400) {
				this.with_runtime_gte = 0;
			} else if (defaultValues.with_runtime_gte > defaultValues?.with_runtime_lte) {
				this.with_runtime_gte = 0;
			} else {
				this.with_runtime_gte = defaultValues.with_runtime_gte;
			}
		} else {
			this.with_runtime_gte = 0;
		}

		// Setup the vote_count_gte
		if (this.resourceType === 'top-rated') {
			this.vote_count_gte = this.mediaType === 'movie' ? 300 : 150;
		} else if (Number.isInteger(defaultValues?.vote_count_gte ?? undefined) === true) {
			if (defaultValues?.vote_count_gte > 500) {
				this.vote_count_gte = 0;
			} else {
				this.vote_count_gte = defaultValues?.vote_count_gte ?? 0;
			}
		} else {
			this.vote_count_gte = 0;
		}

		// Reserved "Filters" values, automatically set to get the correct values when using the Discover filtering
		this.release_date_gte = '';
		this.release_date_lte = '';
		this.air_date_gte = '';
		this.air_date_lte = '';
		this.search_first_air_date = defaultValues?.search_first_air_date ?? mediaType === 'tv';

		// Setup the reserved filter properties, defaultValues aren't supported this as
		this.setDateRangeFormData();
	}

	setDateRangeFormData() {
		// gte - "From"
		// lte - "To"

		// Set the release_date values for the /movie/popular route
		if (this.resourceType === 'popular' && this.mediaType === 'movie') {
			this.release_date_gte = '';
			this.release_date_lte = format(addDays(new Date(), 181), 'yyyy-MM-dd'); // Add 181 days to the "To" label value
		}

		// Set the air_date values for the /tv/popular route
		if (this.resourceType === 'popular' && this.mediaType === 'tv') {
			// Get the "From" value (gte)
			const gte = '';

			// Get the "To" value (lte)
			const lte = format(addDays(new Date(), 180), 'yyyy-MM-dd');

			if (this.search_first_air_date === true) {
				this.air_date_gte = gte;
				this.air_date_lte = lte;
			} else {
				this.release_date_gte = gte;
				this.release_date_lte = lte;
			}
		}

		// Set the release_date values for the /tv/now-playing route
		if (this.resourceType === 'now-playing' && this.mediaType === 'movie') {
			this.release_date_gte = format(subDays(new Date(), 40), 'yyyy-MM-dd');
			this.release_date_lte = format(addDays(new Date(), 2), 'yyyy-MM-dd');
		}

		// Set the air_date values for the /tv/airing-today route
		if (this.resourceType === 'airing-today' && this.mediaType === 'tv') {
			// Get the "From" value (gte)
			const gte = format(new Date(), 'yyyy-MM-dd');

			// Get the "To" value (lte)
			const lte = format(new Date(), 'yyyy-MM-dd');

			// When using the first_air fate filter set the air_date values otherwise just set the release_date
			// NOTE: Add find out more about this filter's functionality
			if (this.search_first_air_date === true) {
				this.air_date_gte = gte;
				this.air_date_lte = lte;
			} else {
				this.release_date_gte = gte;
				this.release_date_lte = lte;
			}
		}

		// Set the release_date values for the /movie/upcoming route
		if (this.resourceType === 'upcoming' && this.mediaType === 'movie') {
			this.release_date_gte = format(addDays(new Date(), 3), 'yyyy-MM-dd');
			this.release_date_lte = format(addDays(new Date(), 24), 'yyyy-MM-dd');
		}

		// Set the air_date values for the /tv/on-the-air route
		if (this.resourceType === 'on-the-air' && this.mediaType === 'tv') {
			// Get the "From" value (gte)
			const gte = format(new Date(), 'yyyy-MM-dd');

			// Get the "To" value (lte)
			const lte = format(addDays(new Date(), 7), 'yyyy-MM-dd');

			// When using the first_air fate filter set the air_date values otherwise just set the release_date
			// NOTE: Add find out more about this filter's functionality
			if (this.search_first_air_date === true) {
				this.air_date_gte = gte;
				this.air_date_lte = lte;
			} else {
				this.release_date_gte = gte;
				this.release_date_lte = lte;
			} //
		}

		// Set the release_date values for the /movie/top-rated route
		if (this.resourceType === 'top-rated' && this.mediaType === 'movie') {
			this.release_date_gte = '';
			this.release_date_lte = format(addDays(new Date(), 181), 'yyyy-MM-dd');
		}

		// Set the release_date values for the /tv/top-rated route
		if (this.resourceType === 'top-rated' && this.mediaType === 'tv') {
			// Get the "From" value (gte)
			const gte = '';

			// Get the "To" value (lte)
			const lte = format(addDays(new Date(), 180), 'yyyy-MM-dd');

			// When using the first_air fate filter set the air_date values otherwise just set the release_date
			// NOTE: Add find out more about this filter's functionality
			if (this.search_first_air_date === true) {
				this.air_date_gte = gte;
				this.air_date_lte = lte;
			} else {
				this.release_date_gte = gte;
				this.release_date_lte = lte;
			}
		}
	}

	getFiltersFormData() {
		return {
			show_me: this.show_me,
			with_ott_monetization_types: this.with_ott_monetization_types,
			with_genres: this.with_genres,
			certification: this.certification,
			with_release_type: this.with_release_type,
			'release_date.lte': this.release_date_lte,
			'release_date.gte': this.release_date_gte,
			'air_date.lte': this.air_date_lte,
			'air_date.gte': this.air_date_gte,
			with_original_language: this.with_original_language,
			region: this.region,
			'vote_average.gte': this.vote_average_gte,
			'vote_average.lte': this.vote_average_lte,
			'vote_count.gte': this.vote_count_gte,
			'with_runtime.gte': this.with_runtime_gte,
			'with_runtime.lte': this.with_runtime_lte,
			search_first_air_date: this.mediaType === 'tv'
		};
	}

	getSortByFormData() {
		return {
			sort_by: this.sort_by
		};
	}

	getWhereToWatchFormData() {
		return {
			restrict_services: this.restrict_services,
			ott_region: this.ott_region,
			with_ott_providers: this.with_ott_providers
		};
	}

	getFormikFormData() {
		return {
			// "Filters" section formData
			...this.getFiltersFormData(),

			// "Sort By" section formData
			...this.getSortByFormData(),

			// "Where to Watch" section formDataa
			...this.getWhereToWatchFormData()
		};
	}
}

export default DiscoverFiltersFormData;
