import { describe, beforeAll, vi, afterAll, expect, it } from 'vitest';
import settings from '../../settings';
import DiscoverFiltersFormDataService from './DiscoverFiltersFormDataService';
import { SelectOption } from '../../types/DropdownElementTypes';
import { ResourceType, MediaType } from '../../types/RoutingTypes';

describe('DiscoverFiltersFormDataService', () => {
	beforeAll(() => {
		vi.setSystemTime(new Date(2022, 10, 7));
	});

	afterAll(() => {
		// restoring date after each test run
		vi.useRealTimers();
	});

	describe('sort_by', () => {
		it.each<{ resourceType: ResourceType; expectedSortBy: string; defaultSortBy: string }>([
			{ resourceType: 'top-rated', expectedSortBy: 'vote_average.desc', defaultSortBy: '' },
			{ resourceType: 'now-playing', expectedSortBy: 'popularity.desc', defaultSortBy: '' },
			{
				resourceType: 'now-playing',
				expectedSortBy: settings.SORT_BY_OPTIONS[3].value,
				defaultSortBy: settings.SORT_BY_OPTIONS[3].value
			}
		])(
			'When the resourceType is $resourceType and the default sortBy is $defaultSortBy the sort_by should be $expectedSortBy',
			({ resourceType, expectedSortBy, defaultSortBy }) => {
				const formData = new DiscoverFiltersFormDataService('movie', resourceType, false, {
					sort_by: defaultSortBy
				});

				expect(formData.getSortByFormData().sort_by?.value).toBe(expectedSortBy);
			}
		);
	});

	describe('restrict_services', () => {
		it('When no default value is provided for the restrict_services it should default to false', () => {
			const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {});
			expect(formData.getWhereToWatchFormData().restrict_services).toBe(false);
		});

		it('When a default value is provided for the restrict_services it should default to the provided value', () => {
			const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
				restrict_services: true
			});
			expect(formData.getWhereToWatchFormData().restrict_services).toBe(true);
		});
	});

	describe('show_me', () => {
		it("When you aren't authenticated the show_me should default to '0'", () => {
			const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {});
			expect(formData.getFiltersFormData().show_me).toBe('0');
		});

		it("When you aren't authenticated but you provide a default value the show me should default to '0'", () => {
			const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
				show_me: '2'
			});
			expect(formData.getFiltersFormData().show_me).toBe('0');
		});

		it("When you are authenticated but you provide an invalid value it should default to '0'", () => {
			const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', true, {
				show_me: '10'
			});
			expect(formData.getFiltersFormData().show_me).toBe('0');
		});

		it('When you are authenticated and you provide a valid default value it should default to the provided value', () => {
			const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', true, {
				show_me: '1'
			});
			expect(formData.getFiltersFormData().show_me).toBe('1');
		});
	});

	describe('with_ott_monetization_types', () => {
		it('When an invalid value is provided it should default to all', () => {
			const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', true, {
				with_ott_monetization_types: ['some-random-option']
			});

			expect(formData.getFiltersFormData().with_ott_monetization_types).toStrictEqual(['all']);
		});

		it("When there is no 'all' options but there are other valid values it should set it to the provided values", () => {
			const availabilityOptionsFormData = [
				settings.AVAILABILITY_OPTIONS[1].value,
				settings.AVAILABILITY_OPTIONS[2].value,
				settings.AVAILABILITY_OPTIONS[3].value,
				settings.AVAILABILITY_OPTIONS[4].value
			];

			const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', true, {
				with_ott_monetization_types: [...availabilityOptionsFormData]
			});

			expect(formData.getFiltersFormData().with_ott_monetization_types).toStrictEqual([
				...availabilityOptionsFormData
			]);
		});

		it("When there is an 'all' option and other options it should filter out the 'all' option", () => {
			const availabilityOptionsFormData = [
				settings.AVAILABILITY_OPTIONS[0].value,
				settings.AVAILABILITY_OPTIONS[1].value,
				settings.AVAILABILITY_OPTIONS[2].value,
				settings.AVAILABILITY_OPTIONS[3].value,
				settings.AVAILABILITY_OPTIONS[4].value
			];

			const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', true, {
				with_ott_monetization_types: [...availabilityOptionsFormData]
			});

			// Remove (destructure) the first element ('all') and then get the rest via the spread operator
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const [_, ...rest] = availabilityOptionsFormData;

			expect(formData.getFiltersFormData().with_ott_monetization_types).toStrictEqual([...rest]);
		});
	});

	describe('with_genres', () => {
		it('By default the with_genres should be an empty array', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {});
			expect(formData.getFiltersFormData().with_genres).toStrictEqual([]);
		});

		it('When an invalid with_genres value is provided it should be set to an empty array', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {
				with_genres: ['INVALID-VALUE']
			});
			expect(formData.getFiltersFormData().with_genres).toStrictEqual([]);
		});

		it('When a valid with_genres value is provided it should be set to the provided value', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {
				with_genres: [settings.GENRE_OPTIONS[0].value]
			});
			expect(formData.getFiltersFormData().with_genres).toStrictEqual([
				settings.GENRE_OPTIONS.find((el) => el.value === '28')
			]);
		});
	});

	describe('certifications', () => {
		it('By default the certification should be an empty array', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {});
			expect(formData.getFiltersFormData().certifications).toStrictEqual([]);
		});

		it('When an invalid certification value is provided it should be set to an empty array', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {
				certifications: ['INVALID-VALUE']
			});
			expect(formData.getFiltersFormData().certifications).toStrictEqual([]);
		});

		it('When a valid certification value is provided it should be set to the provided value', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {
				certifications: [settings.CERTIFICATION_OPTIONS[0].value]
			});
			expect(formData.getFiltersFormData().certifications).toStrictEqual([
				settings.CERTIFICATION_OPTIONS[0]
			]);
		});
	});

	describe('with_release_types', () => {
		it('When an invalid value is provided it should default to all', () => {
			const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', true, {
				with_release_types: ['some-random-option']
			});

			expect(formData.getFiltersFormData().with_release_types).toStrictEqual(['all']);
		});

		it("When there is no 'all' options but there are other valid values it should set it to the provided values", () => {
			const availabilityOptionsFormData = [
				settings.RELEASE_TYPE_OPTIONS[1].value,
				settings.RELEASE_TYPE_OPTIONS[2].value,
				settings.RELEASE_TYPE_OPTIONS[3].value,
				settings.RELEASE_TYPE_OPTIONS[4].value
			];

			const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', true, {
				with_release_types: [...availabilityOptionsFormData]
			});

			expect(formData.getFiltersFormData().with_release_types).toStrictEqual([
				...availabilityOptionsFormData
			]);
		});

		it("When there is an 'all' option and other options it should filter out the 'all' option", () => {
			const availabilityOptionsFormData = [
				settings.RELEASE_TYPE_OPTIONS[0].value,
				settings.RELEASE_TYPE_OPTIONS[1].value,
				settings.RELEASE_TYPE_OPTIONS[2].value,
				settings.RELEASE_TYPE_OPTIONS[3].value,
				settings.RELEASE_TYPE_OPTIONS[4].value
			];

			const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', true, {
				with_release_types: [...availabilityOptionsFormData]
			});

			// Remove (destructure) the first element ('all') and then get the rest via the spread operator
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const [_, ...rest] = availabilityOptionsFormData;

			expect(formData.getFiltersFormData().with_release_types).toStrictEqual([...rest]);
		});
	});

	describe('with_original_language', () => {
		it('By default the with_original_language should be an empty array', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {});
			expect(formData.getFiltersFormData().with_original_language?.value).toBe('none');
		});

		it('When an invalid with_original_language value is provided it should be set to an empty array', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {
				with_original_language: 'INVALID-VALUE'
			});

			console.log(formData.getFiltersFormData().with_original_language);

			expect(formData.getFiltersFormData().with_original_language).toBeNull();
		});

		it('When a valid with_original_language value is provided it should be set to the provided value', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {
				with_original_language: settings.LANGUAGE_OPTIONS[1].value
			});

			expect(formData.getFiltersFormData().with_original_language).toBe(
				settings.LANGUAGE_OPTIONS[1]
			);
		});
	});

	describe('region', () => {
		it('By default the region should be an empty array', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {});
			expect(formData.getFiltersFormData().region).toBe(
				settings.COUNTRY_OPTIONS.find((el) => el.value === 'US')
			);
		});

		it('When an invalid region value is provided it should be set to an empty array', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {
				region: 'INVALID-VALUE'
			});
			expect(formData.getFiltersFormData().region).toBeNull();
		});

		it('When a valid region value is provided it should be set to the provided value', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {
				region: settings.COUNTRY_OPTIONS[0].value
			});

			expect(formData.getFiltersFormData().region).toBe(settings.COUNTRY_OPTIONS[0]);
		});
	});

	describe('ott_region', () => {
		it("By default the ott_region should be 'US'", () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {});
			expect(formData.getWhereToWatchFormData().ott_region).toBe(
				settings.COUNTRY_OPTIONS.find((el) => el.value === 'US')
			);
		});

		it('When an invalid ott_region value is provided it should be set to an empty array', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {
				ott_region: 'INVALID-VALUE'
			});
			expect(formData.getWhereToWatchFormData().ott_region).toBeNull();
		});

		it('When a custom ott_region is provided it should set the ott_region to the provided value', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {
				ott_region: settings.COUNTRY_OPTIONS.find((el) => el.value === 'GB')?.value
			});

			expect(formData.getWhereToWatchFormData().ott_region).toBe(
				settings.COUNTRY_OPTIONS.find((el) => el.value === 'GB')
			);
		});
	});

	describe('with_ott_providers', () => {
		it('By default the with_ott_providers should be an empty array', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {});
			expect(formData.getWhereToWatchFormData().with_ott_providers).toStrictEqual([]);
		});

		it('When an invalid value for with_ott_providers is provided it should be set to an empty array', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {
				with_ott_providers: ['INVALID-VALUE']
			});
			expect(formData.getWhereToWatchFormData().with_ott_providers).toStrictEqual([]);
		});

		it('When a valid with_ott_providers value is provided it should be set to the provided value', () => {
			const formData = new DiscoverFiltersFormDataService('movie', 'top-rated', false, {
				with_ott_providers: [settings.OTT_PROVIDER_OPTIONS[0].value]
			});
			expect(formData.getWhereToWatchFormData().with_ott_providers).toStrictEqual([
				settings.OTT_PROVIDER_OPTIONS[0]
			]);
		});
	});

	describe('release_dates and air_dates', () => {
		it.each<{
			field: 'release_date_gte' | 'release_date_lte';
			expectedDate: string;
			mediaType: MediaType;
			resourceType: ResourceType;
		}>([
			{
				field: 'release_date_gte',
				expectedDate: '',
				mediaType: 'movie',
				resourceType: 'popular'
			},
			{
				field: 'release_date_lte',
				expectedDate: '2023-05-07',
				mediaType: 'movie',
				resourceType: 'popular'
			},
			{
				field: 'release_date_gte',
				expectedDate: '2022-09-28',
				mediaType: 'movie',
				resourceType: 'now-playing'
			},
			{
				field: 'release_date_lte',
				expectedDate: '2022-11-09',
				mediaType: 'movie',
				resourceType: 'now-playing'
			},
			{
				field: 'release_date_gte',
				expectedDate: '2022-11-10',
				mediaType: 'movie',
				resourceType: 'upcoming'
			},
			{
				field: 'release_date_lte',
				expectedDate: '2022-12-01',
				mediaType: 'movie',
				resourceType: 'upcoming'
			},
			{
				field: 'release_date_gte',
				expectedDate: '',
				mediaType: 'movie',
				resourceType: 'top-rated'
			},
			{
				field: 'release_date_lte',
				expectedDate: '2023-05-07',
				mediaType: 'movie',
				resourceType: 'top-rated'
			}
		])(
			'When the resourceType is $resourceType the vote_count_gte should be $vote_count_gte',
			({ field, expectedDate, mediaType, resourceType }) => {
				const formData = new DiscoverFiltersFormDataService(mediaType, resourceType, false, {});
				expect(formData[field]).toBe(expectedDate);
			}
		);

		it.each<{
			field: 'air_date.lte' | 'air_date.gte' | 'release_date.gte' | 'release_date.lte';
			expectedDate: string;
			mediaType: MediaType;
			resourceType: ResourceType;
			searchByFirstAirDate: boolean;
		}>([
			{
				field: 'air_date.gte',
				expectedDate: '',
				mediaType: 'tv',
				resourceType: 'popular',
				searchByFirstAirDate: true
			},
			{
				field: 'air_date.lte',
				expectedDate: '2023-05-06',
				mediaType: 'tv',
				resourceType: 'popular',
				searchByFirstAirDate: true
			},
			{
				field: 'air_date.gte',
				expectedDate: '2022-11-07',
				mediaType: 'tv',
				resourceType: 'airing-today',
				searchByFirstAirDate: true
			},
			{
				field: 'air_date.lte',
				expectedDate: '2022-11-07',
				mediaType: 'tv',
				resourceType: 'airing-today',
				searchByFirstAirDate: true
			},
			{
				field: 'air_date.gte',
				expectedDate: '',
				mediaType: 'tv',
				resourceType: 'top-rated',
				searchByFirstAirDate: true
			},
			{
				field: 'release_date.lte',
				expectedDate: '2023-05-06',
				mediaType: 'tv',
				resourceType: 'popular',
				searchByFirstAirDate: false
			},
			{
				field: 'release_date.gte',
				expectedDate: '2022-11-07',
				mediaType: 'tv',
				resourceType: 'airing-today',
				searchByFirstAirDate: false
			},
			{
				field: 'release_date.lte',
				expectedDate: '2022-11-07',
				mediaType: 'tv',
				resourceType: 'airing-today',
				searchByFirstAirDate: false
			},
			{
				field: 'release_date.gte',
				expectedDate: '2022-11-07',
				mediaType: 'tv',
				resourceType: 'on-the-air',
				searchByFirstAirDate: false
			},
			{
				field: 'release_date.lte',
				expectedDate: '2022-11-14',
				mediaType: 'tv',
				resourceType: 'on-the-air',
				searchByFirstAirDate: false
			},
			{
				field: 'release_date.gte',
				expectedDate: '',
				mediaType: 'tv',
				resourceType: 'top-rated',
				searchByFirstAirDate: false
			},
			{
				field: 'release_date.lte',
				expectedDate: '2023-05-06',
				mediaType: 'tv',
				resourceType: 'top-rated',
				searchByFirstAirDate: false
			}
		])(
			'When the resourceType is $resourceType, the mediaType is $mediaType and searchByFirstAirDate is $searchByFirstAirDate the $field should be $expectedDate',
			({ field, expectedDate, mediaType, resourceType, searchByFirstAirDate }) => {
				const formData = new DiscoverFiltersFormDataService(mediaType, resourceType, false, {
					search_first_air_date: searchByFirstAirDate
				}).getFiltersFormData();

				expect(formData[field]).toBe(expectedDate);
			}
		);
	});

	describe('vote_average', () => {
		describe('vote_average_lte (To)', () => {
			it('When the vote_average_lte (To) is less than 0 it should be capped at 10', () => {
				const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
					vote_average_lte: '-100'
				});
				expect(formData.getFiltersFormData()['vote_average.lte']).toBe(10);
			});

			it('When the vote_average_lte (To) is more than 400 it should be capped at 10', () => {
				const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
					vote_average_lte: '405'
				});
				expect(formData.getFiltersFormData()['vote_average.lte']).toBe(10);
			});

			it('When the vote_average_gte (From) is more than the vote_average_lte (To) it should be capped at 10', () => {
				const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
					vote_average_lte: '10',
					vote_average_gte: '15'
				});
				expect(formData.getFiltersFormData()['vote_average.lte']).toBe(10);
			});
		});

		describe('vote_average_gte (From)', () => {
			it('When the vote_average_gte (To) is less than 0 it should be capped at 0', () => {
				const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
					vote_average_gte: '-100'
				});
				expect(formData.getFiltersFormData()['vote_average.gte']).toBe(0);
			});

			it('When the vote_average_gte (To) is more than 400 it should be capped at 0', () => {
				const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
					vote_average_gte: '15'
				});
				expect(formData.getFiltersFormData()['vote_average.gte']).toBe(0);
			});

			it('When the vote_average_lte (To) is more than the vote_average_gte (From) it should be capped at 10', () => {
				const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
					vote_average_lte: '15',
					vote_average_gte: '10'
				});
				expect(formData.getFiltersFormData()['vote_average.gte']).toBe(10);
			});
		});
	});

	describe('runtime', () => {
		describe('with_runtime_lte (To)', () => {
			it('When the with_runtime_lte (To) is less than 0 it should be capped at 400', () => {
				const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
					with_runtime_lte: '-100'
				});
				expect(formData.getFiltersFormData()['with_runtime.lte']).toBe(400);
			});

			it('When the with_runtime_lte (To) is more than 400 it should be capped at 400', () => {
				const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
					with_runtime_lte: '405'
				});
				expect(formData.getFiltersFormData()['with_runtime.lte']).toBe(400);
			});

			it('When the with_runtime_gte (From) is more than the with_runtime_lte (To) it should be capped at 400', () => {
				const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
					with_runtime_gte: '400',
					with_runtime_lte: '405'
				});
				expect(formData.getFiltersFormData()['with_runtime.lte']).toBe(400);
			});

			it('When the with_runtime_lte (To) is valid it should be set to whatever was provided', () => {
				const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
					with_runtime_lte: '250'
				});
				expect(formData.getFiltersFormData()['with_runtime.lte']).toBe(250);
			});
		});

		describe('with_runtime_gte (From)', () => {
			it('When the with_runtime_gte (From) is less than 0 it should be capped at 0', () => {
				const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
					with_runtime_gte: '-100'
				});
				expect(formData.getFiltersFormData()['with_runtime.gte']).toBe(0);
			});

			it('When the with_runtime_gte (From) is more than 400 it should be capped at 0', () => {
				const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
					with_runtime_gte: '405'
				});
				expect(formData.getFiltersFormData()['with_runtime.gte']).toBe(0);
			});

			it('When the with_runtime_gte (From) is more than the with_runtime_lte (To) it should be capped at 400', () => {
				const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
					with_runtime_gte: '405',
					with_runtime_lte: '400'
				});
				expect(formData.getFiltersFormData()['with_runtime.gte']).toBe(0);
			});

			it('When the with_runtime_gte (From) is valid it should be set to whatever was provided', () => {
				const formData = new DiscoverFiltersFormDataService('tv', 'top-rated', false, {
					with_runtime_gte: '250'
				});
				expect(formData.getFiltersFormData()['with_runtime.gte']).toBe(250);
			});
		});
	});

	describe('vote_count_gte', () => {
		it.each<{
			mediaType: MediaType;
			voteCountGte: number;
			defaultValue?: string;
			resourceType: ResourceType;
		}>([
			{
				mediaType: 'movie',
				voteCountGte: 300,
				defaultValue: undefined,
				resourceType: 'top-rated'
			},
			{
				mediaType: 'tv',
				voteCountGte: 150,
				defaultValue: undefined,
				resourceType: 'top-rated'
			},
			{
				mediaType: 'movie',
				voteCountGte: 300,
				defaultValue: '300',
				resourceType: 'now-playing'
			},
			{
				mediaType: 'tv',
				voteCountGte: 300,
				defaultValue: '300',
				resourceType: 'airing-today'
			},
			{
				mediaType: 'tv',
				voteCountGte: 0,
				defaultValue: '501',
				resourceType: 'airing-today'
			}
		])(
			'When the resourceType is $resourceType the vote_count_gte should be $voteCountGte',
			({ mediaType, voteCountGte, defaultValue, resourceType }) => {
				const formData = new DiscoverFiltersFormDataService(mediaType, resourceType, false, {
					vote_count_gte: defaultValue
				});
				expect(formData.getFiltersFormData()['vote_count.gte']).toBe(voteCountGte);
			}
		);
	});

	describe('getFormikFormData', () => {
		const WITH_ORIGINAL_LANGUAGE_NONE: SelectOption | null =
			settings.LANGUAGE_OPTIONS.find((option) => option.value === 'none') ?? null;

		const REGION_US: SelectOption | null =
			settings.COUNTRY_OPTIONS.find((option) => option.value === 'US') ?? null;

		const SORT_BY_POPULARITY_DESC: SelectOption | null =
			settings.SORT_BY_OPTIONS.find((option) => option.value === 'popularity.desc') ?? null;

		it("When the resourceType is 'popular' and the mediaType is 'movie'", () => {
			const generatedFormData = new DiscoverFiltersFormDataService(
				'movie',
				'popular',
				true,
				{}
			).getFormikFormData();

			const expectedFormData: typeof generatedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certifications: [],
				with_release_types: ['all'],
				'release_date.lte': '2023-05-07',
				'release_date.gte': '',
				'air_date.lte': '',
				'air_date.gte': '',
				with_original_language: WITH_ORIGINAL_LANGUAGE_NONE,
				region: REGION_US,
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 0,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: false,
				sort_by: SORT_BY_POPULARITY_DESC,
				restrict_services: false,
				ott_region: REGION_US,
				with_ott_providers: []
			};

			expect(generatedFormData).toStrictEqual(expectedFormData);
		});

		it("When the resourceType is 'now-playing' and the mediaType is 'movie'", () => {
			const generatedFormData = new DiscoverFiltersFormDataService(
				'movie',
				'now-playing',
				false,
				{}
			).getFormikFormData();

			const expectedFormData: typeof generatedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certifications: [],
				with_release_types: ['all'],
				'release_date.lte': '2022-11-09',
				'release_date.gte': '2022-09-28',
				'air_date.lte': '',
				'air_date.gte': '',
				with_original_language: WITH_ORIGINAL_LANGUAGE_NONE,
				region: REGION_US,
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 0,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: false,
				sort_by: SORT_BY_POPULARITY_DESC,
				restrict_services: false,
				ott_region: REGION_US,
				with_ott_providers: []
			};
			expect(generatedFormData).toStrictEqual(expectedFormData);
		});

		it("When the resourceType is 'upcoming' and the mediaType is 'movie'", () => {
			const generatedFormData = new DiscoverFiltersFormDataService(
				'movie',
				'upcoming',
				false,
				{}
			).getFormikFormData();

			const expectedFormData: typeof generatedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certifications: [],
				with_release_types: ['all'],
				'release_date.gte': '2022-11-10',
				'release_date.lte': '2022-12-01',
				'air_date.lte': '',
				'air_date.gte': '',
				with_original_language: WITH_ORIGINAL_LANGUAGE_NONE,
				region: REGION_US,
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 0,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: false,
				sort_by: SORT_BY_POPULARITY_DESC,
				restrict_services: false,
				ott_region: REGION_US,
				with_ott_providers: []
			};
			expect(generatedFormData).toStrictEqual(expectedFormData);
		});

		it("When the resourceType is 'top-rated' and the mediaType is 'movie'", () => {
			const generatedFormData = new DiscoverFiltersFormDataService(
				'movie',
				'upcoming',
				false,
				{}
			).getFormikFormData();

			const expectedFormData: typeof generatedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certifications: [],
				with_release_types: ['all'],
				'release_date.lte': '2022-12-01',
				'release_date.gte': '2022-11-10',
				'air_date.lte': '',
				'air_date.gte': '',
				with_original_language: WITH_ORIGINAL_LANGUAGE_NONE,
				region: REGION_US,
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 0,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: false,
				sort_by: SORT_BY_POPULARITY_DESC,
				restrict_services: false,
				ott_region: REGION_US,
				with_ott_providers: []
			};
			expect(generatedFormData).toStrictEqual(expectedFormData);
		});

		it("When the resourceType is 'popular' and the mediaType is 'tv'", () => {
			const generatedFormData = new DiscoverFiltersFormDataService(
				'tv',
				'popular',
				false,
				{}
			).getFormikFormData();

			const expectedFormData: typeof generatedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certifications: [],
				with_release_types: ['all'],
				'release_date.lte': '',
				'release_date.gte': '',
				'air_date.lte': '2023-05-06',
				'air_date.gte': '',
				with_original_language: WITH_ORIGINAL_LANGUAGE_NONE,
				region: REGION_US,
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 0,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: true,
				sort_by: SORT_BY_POPULARITY_DESC,
				restrict_services: false,
				ott_region: REGION_US,
				with_ott_providers: []
			};

			expect(generatedFormData).toStrictEqual(expectedFormData);
		});

		it("When the resourceType is 'airing-today' and the mediaType is 'tv'", () => {
			const generatedFormData = new DiscoverFiltersFormDataService(
				'tv',
				'airing-today',
				false,
				{}
			).getFormikFormData();

			const expectedFormData: typeof generatedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certifications: [],
				with_release_types: ['all'],
				'release_date.lte': '',
				'release_date.gte': '',
				'air_date.lte': '2022-11-07',
				'air_date.gte': '2022-11-07',
				with_original_language: WITH_ORIGINAL_LANGUAGE_NONE,
				region: REGION_US,
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 0,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: true,
				sort_by: SORT_BY_POPULARITY_DESC,
				restrict_services: false,
				ott_region: REGION_US,
				with_ott_providers: []
			};

			expect(generatedFormData).toStrictEqual(expectedFormData);
		});

		it("When the resourceType is 'on-the-air' and the mediaType is 'tv'", () => {
			const generatedFormData = new DiscoverFiltersFormDataService(
				'tv',
				'airing-today',
				false,
				{}
			).getFormikFormData();

			const expectedFormData: typeof generatedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certifications: [],
				with_release_types: ['all'],
				'release_date.lte': '',
				'release_date.gte': '',
				'air_date.lte': '2022-11-07',
				'air_date.gte': '2022-11-07',
				with_original_language: WITH_ORIGINAL_LANGUAGE_NONE,
				region: REGION_US,
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 0,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: true,
				sort_by: SORT_BY_POPULARITY_DESC,
				restrict_services: false,
				ott_region: REGION_US,
				with_ott_providers: []
			};

			expect(expectedFormData).toStrictEqual(expectedFormData);
		});

		it("When the resourceType is 'top-rated' and the mediaType is 'tv'", () => {
			const generatedFormData = new DiscoverFiltersFormDataService(
				'tv',
				'top-rated',
				false,
				{}
			).getFormikFormData();

			const expectedFormData: typeof generatedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certifications: [],
				with_release_types: ['all'],
				'release_date.lte': '',
				'release_date.gte': '',
				'air_date.lte': '2023-05-06',
				'air_date.gte': '',
				with_original_language: WITH_ORIGINAL_LANGUAGE_NONE,
				region: REGION_US,
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 150,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: true,
				sort_by: settings.SORT_BY_OPTIONS.find((el) => el.value === 'vote_average.desc') ?? null,
				restrict_services: false,
				ott_region: REGION_US,
				with_ott_providers: []
			};

			expect(generatedFormData).toStrictEqual(expectedFormData);
		});
	});
});
