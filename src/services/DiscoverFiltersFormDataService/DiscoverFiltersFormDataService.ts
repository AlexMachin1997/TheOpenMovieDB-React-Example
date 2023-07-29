import { addDays, format, subDays } from 'date-fns';
import settings from '../../settings';
import { SelectOption } from '../../types/DropdownElementTypes';
import { MediaType, ResourceType } from '../../types/RoutingTypes';

const setupCheckboxFormData = ({
	defaultValue = [],
	options = []
}: {
	defaultValue: string[];
	options: SelectOption[];
}) => {
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

const setupDropdownFormData = ({
	isMultiple = false,
	defaultValue = '',
	options = []
}: {
	isMultiple?: boolean;
	defaultValue: string | string[];
	options: SelectOption[];
}): SelectOption | SelectOption[] | null => {
	// If there are no options available then return an empty value for the dropdown
	if (options.length === 0) {
		return isMultiple === true ? [] : null;
	}

	// If the dropdown is multiple and some of the defaultValues are included in the options then get all the options which are included in the dropdown
	if (Array.isArray(defaultValue)) {
		if (
			options
				.map((option) => option.value)
				.some((value) => defaultValue?.includes(value) ?? false) === true
		) {
			return options?.filter((a) => defaultValue.includes(a.value)) ?? [];
		}

		// If none of values are included in the options array just return the default value
		return [];
	}

	// If it's a single select either return the found value or return an empty string
	return options.find((option) => option.value === defaultValue) ?? null;
};

type DefaultValues = {
	sort_by?: string;
	ott_region?: string;
	restrict_services?: boolean;
	with_ott_providers?: string[];
	show_me?: string;
	with_ott_monetization_types?: string[];
	with_genres?: string[];
	certifications?: string[];
	with_release_types?: string[];
	with_original_language?: string;
	region?: string;
	vote_average_lte?: string;
	vote_average_gte?: string;
	with_runtime_lte?: string;
	with_runtime_gte?: string;
	vote_count_lte?: string;
	vote_count_gte?: string;
	search_first_air_date?: boolean;
};

class DiscoverFiltersFormDataService {
	private readonly mediaType: MediaType;

	private readonly resourceType: ResourceType;

	private readonly isAuthenticated: boolean;

	private sort_by: SelectOption | null;

	private restrict_services: boolean;

	private ott_region: SelectOption | null;

	private with_ott_providers: SelectOption[];

	private show_me: string;

	private with_ott_monetization_types: string[];

	private with_genres: SelectOption[];

	private certifications: SelectOption[];

	private with_release_types: string[];

	private with_original_language: SelectOption | null;

	private vote_average_lte: number;

	private region: SelectOption | null;

	private vote_average_gte: number;

	private with_runtime_lte: number;

	private with_runtime_gte: number;

	private vote_count_gte: number;

	private release_date_gte: string;

	private release_date_lte: string;

	private air_date_gte: string;

	private air_date_lte: string;

	private search_first_air_date: boolean;

	constructor(
		mediaType: MediaType,
		resourceType: ResourceType,
		isAuthenticated: boolean,
		defaultValues: DefaultValues
	) {
		// Stores references to the current mediaType (movie), resourceType (popular) and isAuthenticated
		this.mediaType = mediaType;
		this.resourceType = resourceType;
		this.isAuthenticated = isAuthenticated;

		// Store "Sort By" formData properties
		let defaultSortBy: string =
			settings?.SORT_BY_OPTIONS?.find((option) => option.value === 'popularity.desc')?.value ?? '';

		// Decide if the default sort by, top-rated or the default should be used for the sort_by
		if ((defaultValues?.sort_by?.length ?? 0) > 0) {
			defaultSortBy = defaultValues?.sort_by ?? '';
		} else if (this.resourceType === 'top-rated') {
			const defaultTopRatedSortBy = settings?.SORT_BY_OPTIONS?.find(
				(option) => option.value === 'vote_average.desc'
			);

			if (typeof defaultTopRatedSortBy !== 'undefined') {
				defaultSortBy = defaultTopRatedSortBy.value;
			}
		}

		const generatedSortByValue = setupDropdownFormData({
			isMultiple: false,
			defaultValue: defaultSortBy,
			options: settings.SORT_BY_OPTIONS
		});

		this.sort_by = !Array.isArray(generatedSortByValue) ? generatedSortByValue : null;

		// Store the "Where to Watch" formData properties

		// Setup the restrict_services value (Only use the value if the value is a boolean)
		this.restrict_services = defaultValues?.restrict_services ?? false;

		// Setup the ott_region value

		const ottRegionValue = setupDropdownFormData({
			isMultiple: false,
			defaultValue: defaultValues?.ott_region ?? 'US',
			options: settings?.COUNTRY_OPTIONS ?? []
		});

		this.ott_region = !Array.isArray(ottRegionValue) ? ottRegionValue : null;

		// Setup the with_ott_providers value

		const ottProvidersValues = setupDropdownFormData({
			isMultiple: true,
			defaultValue: defaultValues?.with_ott_providers ?? [],
			options: settings?.OTT_PROVIDER_OPTIONS ?? []
		});

		this.with_ott_providers = Array.isArray(ottProvidersValues) ? ottProvidersValues : [];

		// Setup the show_me value
		if (
			this.isAuthenticated === false ||
			settings.SHOW_ME_RADIO_OPTIONS.map((option) => option.value).includes(
				defaultValues?.show_me ?? ''
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

		const withGenresValues = setupDropdownFormData({
			isMultiple: true,
			defaultValue: defaultValues?.with_genres ?? [],
			options: settings.GENRE_OPTIONS
		});

		this.with_genres = Array.isArray(withGenresValues) ? withGenresValues : [];

		// Setup the certification value

		const certificationValue = setupDropdownFormData({
			isMultiple: true,
			defaultValue: defaultValues?.certifications ?? [],
			options: settings.CERTIFICATION_OPTIONS
		});

		this.certifications = Array.isArray(certificationValue) ? certificationValue : [];

		// Setup the with_release_types value

		this.with_release_types = setupCheckboxFormData({
			defaultValue: defaultValues?.with_release_types ?? ['all'],
			options: settings.RELEASE_TYPE_OPTIONS
		});

		// Setup the with_original_language value

		const withOriginalLanguageValue = setupDropdownFormData({
			isMultiple: false,
			defaultValue: defaultValues?.with_original_language ?? 'none',
			options: settings.LANGUAGE_OPTIONS
		});

		this.with_original_language = !Array.isArray(withOriginalLanguageValue)
			? withOriginalLanguageValue
			: null;

		// Setup the region value

		const regionValue = setupDropdownFormData({
			isMultiple: false,
			defaultValue: defaultValues?.region ?? 'US', // TODO: Default to the users device locale instead of defaulting to US (Should default to US if the local isn't founded or provided)
			options: settings.COUNTRY_OPTIONS
		});

		this.region = !Array.isArray(regionValue) ? regionValue : null;

		// Setup the vote_average_lte (To) and vote_average_gte (From)
		const voteAverageLte = parseInt(defaultValues?.vote_average_lte ?? '10', 10);
		const voteAverageGte = parseInt(defaultValues?.vote_average_gte ?? '0', 10);

		if (voteAverageLte < 0) {
			this.vote_average_lte = 10;
		} else if (voteAverageLte > 10) {
			this.vote_average_lte = 10;
		} else if (voteAverageLte > voteAverageGte) {
			this.vote_average_lte = 10;
		} else {
			this.vote_average_lte = voteAverageLte;
		}

		if (voteAverageGte < 0) {
			this.vote_average_gte = 0;
		} else if (voteAverageGte > 10) {
			this.vote_average_gte = 0;
		} else if (voteAverageGte > voteAverageLte) {
			this.vote_average_gte = 0;
		} else {
			this.vote_average_gte = voteAverageGte;
		}

		// Setup the with_runtime_lte (To) and  with_runtime_gte (From)
		const withRuntimeLte = parseInt(defaultValues?.with_runtime_lte ?? '400', 10);
		const withRuntimeGte = parseInt(defaultValues?.with_runtime_gte ?? '0', 10);

		if (withRuntimeLte < 0) {
			this.with_runtime_lte = 400;
		} else if (withRuntimeLte > 400) {
			this.with_runtime_lte = 400;
		} else if (withRuntimeGte > withRuntimeLte) {
			this.with_runtime_lte = 400;
		} else {
			this.with_runtime_lte = withRuntimeLte;
		}

		if (withRuntimeGte < 0) {
			this.with_runtime_gte = 0;
		} else if (withRuntimeGte > 400) {
			this.with_runtime_gte = 0;
		} else if (withRuntimeGte > withRuntimeLte) {
			this.with_runtime_gte = 0;
		} else {
			this.with_runtime_gte = withRuntimeGte;
		}

		// Setup the vote_count_gte
		const voteCountGte = parseInt(defaultValues?.vote_count_gte ?? '0', 10);

		if (this.mediaType === 'movie' && this.resourceType === 'top-rated') {
			this.vote_count_gte = 300;
		} else if (this.mediaType === 'tv' && this.resourceType === 'top-rated') {
			this.vote_count_gte = 150;
		} else if (voteCountGte > 500) {
			this.vote_count_gte = 0;
		} else {
			this.vote_count_gte = voteCountGte;
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
			console.log(new Date());
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
			certifications: this.certifications,
			with_release_types: this.with_release_types,
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

export default DiscoverFiltersFormDataService;
