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
	if (
		isMultiple === true &&
		options
			.map((option) => option.value)
			.some((value) => defaultValue?.includes(value) ?? false) === true
	) {
		// Only get the filter values which are actually included in the dropdown.
		return defaultValue?.filter((value) => options.includes(value) === true);
	}

	// If it's a single select either return the found value or return an empty string
	return options.find((option) => option.value === defaultValue)?.value ?? '';
};

class FormData {
	constructor(mediaType = '', resourceType = '', isAuthenticated = false, defaultValues = {}) {
		// Stores references to the current mediaType (movie), resourceType (popular) and isAuthenticated
		this.mediaType = mediaType;
		this.resourceType = resourceType;
		this.isAuthenticated = isAuthenticated;

		// Store "Sort By" formData properties
		let defaultSortBy = '';

		if (defaultValues?.sort_by?.length > 0) {
			defaultSortBy = defaultValues?.sort_by ?? [];
		} else if (this.resourceType === 'top-rated') {
			defaultSortBy = settings?.find((option) => option.value === 'popularity.desc')?.value ?? '';
		} else {
			defaultSortBy = settings.find((option) => option.value === 'vote_average.desc')?.value ?? '';
		}

		this.sort_by = setupDropdownFormData({
			isMultiple: false,
			defaultValue: defaultSortBy,
			options: settings.SORT_BY_OPTIONS
		});

		// Store the "Where to Watch" formData properties

		if (typeof defaultValues.restrict_services === 'boolean') {
			this.restrict_services = defaultValues?.restrict_services ?? false;
		} else {
			this.restrict_services = false;
		}

		this.ott_region = setupDropdownFormData({
			isMultiple: false,
			defaultValue: defaultValues?.ott_region ?? 'US',
			options: settings?.COUNTRY_OPTIONS ?? []
		});

		this.with_ott_providers = setupDropdownFormData({
			isMultiple: true,
			defaultValue: defaultValues?.with_ott_providers ?? [],
			options: settings.OTT_PROVIDER_OPTIONS ?? []
		});

		// Store the "Filters" formData properties
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

		this.with_ott_monetization_types = setupCheckboxFormData({
			defaultValue: defaultValues?.with_ott_monetization_types ?? [],
			options: settings.AVAILABILITY_OPTIONS
		});

		this.with_genres = setupDropdownFormData({
			isMultiple: true,
			defaultValue: defaultValues?.with_genres ?? [],
			options: settings.GENRE_OPTIONS
		});

		this.certification = setupDropdownFormData({
			isMultiple: true,
			defaultValue: defaultValues?.certification ?? [],
			options: settings.CERTIFICATION_OPTIONS
		});

		this.with_release_type = setupCheckboxFormData({
			defaultValue: defaultValues?.with_release_type ?? ['all'],
			options: settings.RELEASE_TYPE_OPTIONS
		});

		this.with_original_language = setupDropdownFormData({
			isMultiple: false,
			defaultValue: defaultValues?.with_original_language ?? 'none',
			options: settings.LANGUAGE_OPTIONS
		});

		this.region = setupDropdownFormData({
			isMultiple: false,
			defaultValue: defaultValues?.region ?? 'US',
			options: settings.COUNTRY_OPTIONS
		});

		// From/Min
		if (Number.isInteger(defaultValues?.vote_average_gte) === true) {
			this.vote_average_gte = defaultValues?.vote_average_gte ?? 0;
		} else {
			this.vote_average_gte = 0;
		}

		// To/Max
		if (Number.isInteger(defaultValues?.vote_average_lte) === true) {
			if (this.vote_average_gte > defaultValues.vote_average_lte) {
				this.vote_average_lte = this.vote_average_gte;
			} else {
				this.vote_average_lte = defaultValues?.vote_average_lte ?? 10;
			}
		} else {
			this.vote_average_lte = 10;
		}

		// top-rated is a special case where it needs specific values, otherwise we just the defaultValues or as a last resort fallback to the score being 500
		if (this.resourceType === 'top-rated') {
			this.vote_count_gte = this.mediaType === 'movie' ? 300 : 150;
		} else if (Number.isInteger(defaultValues?.vote_count_gte ?? undefined) === true) {
			this.vote_count_gte = Math.min(defaultValues.vote_count_gte, 500);
		} else {
			this.vote_count_gte = 500;
		}

		// Reserved "Filters" values, automatically set to get the correct values when using the Discover filtering
		this.release_date_gte = '';
		this.release_date_lte = '';
		this.air_date_gte = '';
		this.air_date_lte = '';
		this.search_first_air_date = defaultValues?.search_first_air_date ?? mediaType === 'tv';

		// Perform initial setup when the class is setup
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
			// NOTE: Add find out more about this filter's functionalit
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
			this.release_date_gte = format(addDays(new Date(), 2), 'yyyy-MM-dd');
			this.release_date_lte = format(addDays(new Date(), 23), 'yyyy-MM-dd');
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
			}
		}

		// Set the release_date values for the /movie/top-rated route
		if (this.resourceType === 'top-rated' && this.mediaType === 'movie') {
			this.release_date_gte = '';
			this.release_date_lte = format(addDays(new Date(), 240), 'yyyy-MM-dd');
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

	getFormikFormData() {
		return {
			// "Filters" section formData
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
			search_first_air_date: this.mediaType === 'tv',

			// "Sort By" section formData
			sort_by: this.sort_by,

			// "Where to Watch" section formDataa
			restrict_services: this.restrict_services,
			ott_region: this.ott_region,
			with_ott_providers: this.with_ott_providers
		};
	}
}

export default FormData;
