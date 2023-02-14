import settings from '../settings';
import DiscoverFormDataService from './DiscoverFormDataService';

describe('DiscoverFormDataService', () => {
	// Before all the unit tests when using the newDate() set it to 07/11/2022
	beforeAll(() => {
		jest.useFakeTimers('modern');
		jest.setSystemTime(new Date(2022, 10, 7));
	});

	// After all the unit tests reset the system time to the real time
	afterAll(() => {
		jest.useRealTimers();
	});

	describe('sort_by', () => {
		it.each`
			resourceType     | expectedSortBy
			${'top-rated'}   | ${'vote_average.desc'}
			${'now-playing'} | ${'popularity.desc'}
		`(
			'When the resourceType is $resourceType the sort_by should be $expectedSortBy',
			({ resourceType, expectedSortBy }) => {
				const formData = new DiscoverFormDataService('movie', resourceType, false, {});
				expect(formData.sort_by).toBe(expectedSortBy);
			}
		);
	});

	describe('restrict_services', () => {
		it('When no default value is provided for the restrict_services it should default to false', () => {
			const formData = new DiscoverFormDataService('tv', 'top-rated', false, {});
			expect(formData.restrict_services).toBe(false);
		});

		it('When a default value is provided for the restrict_services it should default to the provided value', () => {
			const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
				restrict_services: true
			});
			expect(formData.restrict_services).toBe(true);
		});

		it('When the default value for the restrict services is not a boolean it should default to false', () => {
			const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
				restrict_services: null
			});
			expect(formData.restrict_services).toBe(false);
		});
	});

	describe('show_me', () => {
		it("When you aren't authenticated the show_me should default to '0'", () => {
			const formData = new DiscoverFormDataService('tv', 'top-rated', false, {});
			expect(formData.show_me).toBe('0');
		});

		it("When you aren't authenticated but you provide a default value the show me should default to '0'", () => {
			const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
				show_me: '2'
			});
			expect(formData.show_me).toBe('0');
		});

		it("When you are authenticated but you provide an invalid value it should default to '0'", () => {
			const formData = new DiscoverFormDataService('tv', 'top-rated', true, {
				show_me: '10'
			});
			expect(formData.show_me).toBe('0');
		});

		it('When you are authenticated and you provide a valid default value it should default to the provided value', () => {
			const formData = new DiscoverFormDataService('tv', 'top-rated', true, {
				show_me: '1'
			});
			expect(formData.show_me).toBe('1');
		});
	});

	describe('with_ott_monetization_types', () => {
		it('When an invalid value is provided it should default to all', () => {
			const formData = new DiscoverFormDataService('tv', 'top-rated', true, {
				with_ott_monetization_types: ['some-random-option']
			});

			expect(formData.with_ott_monetization_types).toStrictEqual(['all']);
		});

		it("When there is no 'all' options but there are other valid values it should set it to the provided values", () => {
			const availabilityOptionsFormData = [
				settings.AVAILABILITY_OPTIONS[1].value,
				settings.AVAILABILITY_OPTIONS[2].value,
				settings.AVAILABILITY_OPTIONS[3].value,
				settings.AVAILABILITY_OPTIONS[4].value
			];

			const formData = new DiscoverFormDataService('tv', 'top-rated', true, {
				with_ott_monetization_types: [...availabilityOptionsFormData]
			});

			expect(formData.with_ott_monetization_types).toStrictEqual([...availabilityOptionsFormData]);
		});

		it("When there is an 'all' option and other options it should filter out the 'all' option", () => {
			const availabilityOptionsFormData = [
				settings.AVAILABILITY_OPTIONS[0].value,
				settings.AVAILABILITY_OPTIONS[1].value,
				settings.AVAILABILITY_OPTIONS[2].value,
				settings.AVAILABILITY_OPTIONS[3].value,
				settings.AVAILABILITY_OPTIONS[4].value
			];

			const formData = new DiscoverFormDataService('tv', 'top-rated', true, {
				with_ott_monetization_types: [...availabilityOptionsFormData]
			});

			// Remove (destructure) the first element ('all') and then get the rest via the spread operator
			const [all, ...rest] = availabilityOptionsFormData;

			expect(formData.with_ott_monetization_types).toStrictEqual([...rest]);
		});
	});

	describe('with_genres', () => {
		it('By default the with_genres should be an empty array', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {});
			expect(formData.with_genres).toStrictEqual([]);
		});

		it('When an invalid with_genres value is provided it should be set to an empty array', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {
				with_genres: ['INVALID-VALUE']
			});
			expect(formData.with_genres).toStrictEqual([]);
		});

		it('When a valid with_genres value is provided it should be set to the provided value', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {
				with_genres: [settings.GENRE_OPTIONS[0].value]
			});
			expect(formData.with_genres).toStrictEqual(['28']);
		});
	});

	describe('certification', () => {
		it('By default the certification should be an empty array', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {});
			expect(formData.certification).toStrictEqual([]);
		});

		it('When an invalid certification value is provided it should be set to an empty array', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {
				certification: ['INVALID-VALUE']
			});
			expect(formData.certification).toStrictEqual([]);
		});

		it('When a valid certification value is provided it should be set to the provided value', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {
				certification: [settings.CERTIFICATION_OPTIONS[0].value]
			});
			expect(formData.certification).toStrictEqual(['NR']);
		});
	});

	describe('with_release_type', () => {
		it('When an invalid value is provided it should default to all', () => {
			const formData = new DiscoverFormDataService('tv', 'top-rated', true, {
				with_release_type: ['some-random-option']
			});

			expect(formData.with_ott_monetization_types).toStrictEqual(['all']);
		});

		it("When there is no 'all' options but there are other valid values it should set it to the provided values", () => {
			const availabilityOptionsFormData = [
				settings.RELEASE_TYPE_OPTIONS[1].value,
				settings.RELEASE_TYPE_OPTIONS[2].value,
				settings.RELEASE_TYPE_OPTIONS[3].value,
				settings.RELEASE_TYPE_OPTIONS[4].value
			];

			const formData = new DiscoverFormDataService('tv', 'top-rated', true, {
				with_release_type: [...availabilityOptionsFormData]
			});

			expect(formData.with_release_type).toStrictEqual([...availabilityOptionsFormData]);
		});

		it("When there is an 'all' option and other options it should filter out the 'all' option", () => {
			const availabilityOptionsFormData = [
				settings.RELEASE_TYPE_OPTIONS[0].value,
				settings.RELEASE_TYPE_OPTIONS[1].value,
				settings.RELEASE_TYPE_OPTIONS[2].value,
				settings.RELEASE_TYPE_OPTIONS[3].value,
				settings.RELEASE_TYPE_OPTIONS[4].value
			];

			const formData = new DiscoverFormDataService('tv', 'top-rated', true, {
				with_release_type: [...availabilityOptionsFormData]
			});

			// Remove (destructure) the first element ('all') and then get the rest via the spread operator
			const [all, ...rest] = availabilityOptionsFormData;

			expect(formData.with_release_type).toStrictEqual([...rest]);
		});
	});

	describe('with_original_language', () => {
		it('By default the with_original_language should be an empty array', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {});
			expect(formData.with_original_language).toBe('none');
		});

		it('When an invalid with_original_language value is provided it should be set to an empty array', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {
				with_original_language: 'INVALID-VALUE'
			});
			expect(formData.with_original_language).toBe('');
		});

		it('When a valid with_original_language value is provided it should be set to the provided value', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {
				with_original_language: settings.LANGUAGE_OPTIONS[1].value
			});

			expect(formData.with_original_language).toBe('ab');
		});
	});

	describe('region', () => {
		it('By default the region should be an empty array', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {});
			expect(formData.region).toBe('US');
		});

		it('When an invalid region value is provided it should be set to an empty array', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {
				region: 'INVALID-VALUE'
			});
			expect(formData.region).toBe('');
		});

		it('When a valid region value is provided it should be set to the provided value', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {
				region: settings.COUNTRY_OPTIONS[0].value
			});

			expect(formData.region).toBe('AD');
		});
	});

	describe('ott_region', () => {
		it("By default the ott_region should be 'US'", () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {});
			expect(formData.ott_region).toBe('US');
		});

		it('When a custom ottProvider is provided it should set the ott_region to the provided value', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {
				ott_region: 'GB'
			});

			expect(formData.ott_region).toBe('GB');
		});
	});

	describe('with_ott_providers', () => {
		it('By default the with_ott_providers should be an empty array', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {});
			expect(formData.with_ott_providers).toStrictEqual([]);
		});

		it('When an invalid value for with_ott_providers is provided it should be set to an empty array', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {
				with_ott_providers: ['INVALID-VALUE']
			});
			expect(formData.with_ott_providers).toStrictEqual([]);
		});

		it('When a valid with_ott_providers value is provided it should be set to the provided value', () => {
			const formData = new DiscoverFormDataService('movie', 'top-rated', false, {
				with_ott_providers: [settings.OTT_PROVIDER_OPTIONS[0].value]
			});
			expect(formData.with_ott_providers).toStrictEqual(['8']);
		});
	});

	describe('release_dates and air_dates', () => {
		// mediaType 'movie' release_date value setting
		it.each`
			field                 | expectedDate    | mediaType  | resourceType
			${'release_date_gte'} | ${''}           | ${'movie'} | ${'popular'}
			${'release_date_lte'} | ${'2023-05-07'} | ${'movie'} | ${'popular'}
			${'release_date_gte'} | ${'2022-09-28'} | ${'movie'} | ${'now-playing'}
			${'release_date_lte'} | ${'2022-11-09'} | ${'movie'} | ${'now-playing'}
			${'release_date_gte'} | ${'2022-11-10'} | ${'movie'} | ${'upcoming'}
			${'release_date_lte'} | ${'2022-12-01'} | ${'movie'} | ${'upcoming'}
			${'release_date_gte'} | ${''}           | ${'movie'} | ${'top-rated'}
			${'release_date_lte'} | ${'2023-05-07'} | ${'movie'} | ${'top-rated'}
		`(
			'When the resourceType is $resourceType and the mediaType is $mediaType the $field should be $expectedDate',
			({ field, expectedDate, mediaType, resourceType }) => {
				const formData = new DiscoverFormDataService(mediaType, resourceType, false, {});
				expect(formData[field]).toBe(expectedDate);
			}
		);

		// mediaType 'tv' air_date value setting
		it.each`
			field                 | expectedDate    | mediaType | resourceType      | searchByFirstAirDate
			${'air_date_gte'}     | ${''}           | ${'tv'}   | ${'popular'}      | ${true}
			${'air_date_lte'}     | ${'2023-05-06'} | ${'tv'}   | ${'popular'}      | ${true}
			${'air_date_gte'}     | ${'2022-11-07'} | ${'tv'}   | ${'airing-today'} | ${true}
			${'air_date_lte'}     | ${'2022-11-07'} | ${'tv'}   | ${'airing-today'} | ${true}
			${'air_date_gte'}     | ${'2022-11-07'} | ${'tv'}   | ${'on-the-air'}   | ${true}
			${'air_date_lte'}     | ${'2022-11-14'} | ${'tv'}   | ${'on-the-air'}   | ${true}
			${'air_date_gte'}     | ${''}           | ${'tv'}   | ${'top-rated'}    | ${true}
			${'air_date_lte'}     | ${'2023-05-06'} | ${'tv'}   | ${'top-rated'}    | ${true}
			${'release_date_gte'} | ${''}           | ${'tv'}   | ${'popular'}      | ${true}
			${'release_date_lte'} | ${'2023-05-06'} | ${'tv'}   | ${'popular'}      | ${false}
			${'release_date_gte'} | ${'2022-11-07'} | ${'tv'}   | ${'airing-today'} | ${false}
			${'release_date_lte'} | ${'2022-11-07'} | ${'tv'}   | ${'airing-today'} | ${false}
			${'release_date_gte'} | ${'2022-11-07'} | ${'tv'}   | ${'on-the-air'}   | ${false}
			${'release_date_lte'} | ${'2022-11-14'} | ${'tv'}   | ${'on-the-air'}   | ${false}
			${'release_date_gte'} | ${''}           | ${'tv'}   | ${'top-rated'}    | ${false}
			${'release_date_lte'} | ${'2023-05-06'} | ${'tv'}   | ${'top-rated'}    | ${false}
		`(
			'When the resourceType is $resourceType and the mediaType is $mediaType the $field should be $expectedDate',
			({ field, expectedDate, mediaType, resourceType, searchByFirstAirDate }) => {
				const formData = new DiscoverFormDataService(mediaType, resourceType, false, {
					search_first_air_date: searchByFirstAirDate
				});
				expect(formData[field]).toBe(expectedDate);
			}
		);
	});

	describe('vote_average', () => {
		describe('vote_average_lte (To)', () => {
			it('When the vote_average_lte (To) is less than 0 it should be capped at 10', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					vote_average_lte: -100
				});
				expect(formData.vote_average_lte).toBe(10);
			});

			it('When the vote_average_lte (To) is more than 400 it should be capped at 10', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					vote_average_lte: 405
				});
				expect(formData.vote_average_lte).toBe(10);
			});

			it('When the vote_average_gte (From) is more than the vote_average_lte (To) it should be capped at 10', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					vote_average_lte: 10,
					vote_average_gte: 15
				});
				expect(formData.vote_average_lte).toBe(10);
			});

			it('When the vote_average_gte (From) is valid it should be set to whatever was provided', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					vote_average_lte: 8
				});
				expect(formData.vote_average_lte).toBe(8);
			});

			it('When the vote_average_gte (From) it not a number it should default to 400', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					vote_average_lte: null
				});
				expect(formData.vote_average_lte).toBe(10);
			});
		});

		describe('vote_average_gte (From)', () => {
			it('When the vote_average_gte (To) is less than 0 it should be capped at 0', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					vote_average_gte: -100
				});
				expect(formData.vote_average_gte).toBe(0);
			});

			it('When the vote_average_gte (To) is more than 400 it should be capped at 0', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					vote_average_gte: 15
				});
				expect(formData.vote_average_gte).toBe(0);
			});

			it('When the vote_average_lte (To) is more than the vote_average_gte (From) it should be capped at 10', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					vote_average_lte: 15,
					vote_average_gte: 10
				});
				expect(formData.vote_average_gte).toBe(10);
			});

			it('When the  vote_average_gte (To) is valid it should be set to whatever was provided', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					vote_average_lte: 8
				});
				expect(formData.vote_average_lte).toBe(8);
			});

			it('When the vote_average_gte (To) it not a number it should default to 400', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					vote_average_lte: null
				});
				expect(formData.vote_average_lte).toBe(10);
			});
		});
	});

	describe('runtime', () => {
		describe('with_runtime_lte (To)', () => {
			it('When the with_runtime_lte (To) is less than 0 it should be capped at 400', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					with_runtime_lte: -100
				});
				expect(formData.with_runtime_lte).toBe(400);
			});

			it('When the with_runtime_lte (To) is more than 400 it should be capped at 400', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					with_runtime_lte: 405
				});
				expect(formData.with_runtime_lte).toBe(400);
			});

			it('When the with_runtime_gte (From) is more than the with_runtime_lte (To) it should be capped at 400', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					with_runtime_gte: 400,
					with_runtime_lte: 405
				});
				expect(formData.with_runtime_lte).toBe(400);
			});

			it('When the with_runtime_lte (To) is valid it should be set to whatever was provided', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					with_runtime_lte: 250
				});
				expect(formData.with_runtime_lte).toBe(250);
			});

			it('When the with_runtime_lte (To) it not a number it should default to 400', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					with_runtime_lte: null
				});
				expect(formData.with_runtime_lte).toBe(400);
			});
		});

		describe('with_runtime_gte (From)', () => {
			it('When the with_runtime_gte (From) is less than 0 it should be capped at 0', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					with_runtime_gte: -100
				});
				expect(formData.with_runtime_gte).toBe(0);
			});

			it('When the with_runtime_gte (From) is more than 400 it should be capped at 0', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					with_runtime_gte: 405
				});
				expect(formData.with_runtime_gte).toBe(0);
			});

			it('When the with_runtime_gte (From) is more than the with_runtime_lte (To) it should be capped at 400', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					with_runtime_gte: 405,
					with_runtime_lte: 400
				});
				expect(formData.with_runtime_gte).toBe(0);
			});

			it('When the with_runtime_gte (From) is valid it should be set to whatever was provided', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					with_runtime_gte: 250
				});
				expect(formData.with_runtime_gte).toBe(250);
			});

			it('When the with_runtime_gte (From) it not a number it should default to 0', () => {
				const formData = new DiscoverFormDataService('tv', 'top-rated', false, {
					with_runtime_gte: null
				});
				expect(formData.with_runtime_gte).toBe(0);
			});
		});
	});

	describe('vote_count_gte', () => {
		it.each`
			mediaType  | vote_count_gte | defaultValue | resourceType
			${'movie'} | ${300}         | ${undefined} | ${'top-rated'}
			${'tv'}    | ${150}         | ${undefined} | ${'top-rated'}
			${'movie'} | ${300}         | ${300}       | ${'now-playing'}
			${'tv'}    | ${300}         | ${300}       | ${'airing-today'}
			${'tv'}    | ${0}           | ${501}       | ${'airing-today'}
		`(
			'When the resourceType is $resourceType the vote_count_gte should be $vote_count_gte',
			({ mediaType, vote_count_gte, resourceType, defaultValue }) => {
				const formData = new DiscoverFormDataService(mediaType, resourceType, false, {
					vote_count_gte: defaultValue
				});
				expect(formData.vote_count_gte).toBe(vote_count_gte);
			}
		);
	});

	describe('getFormikFormData', () => {
		it("When the resourceType is 'popular' and the mediaType is 'movie'", () => {
			const formData = new DiscoverFormDataService('movie', 'popular', true, {});

			const expectedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certification: [],
				with_release_type: ['all'],
				'release_date.lte': '2023-05-07',
				'release_date.gte': '',
				'air_date.lte': '',
				'air_date.gte': '',
				with_original_language: 'none',
				region: 'US',
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 0,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: false,
				sort_by: 'popularity.desc',
				restrict_services: false,
				ott_region: 'US',
				with_ott_providers: []
			};

			expect(formData.getFormikFormData()).toStrictEqual(expectedFormData);
		});

		it("When the resourceType is 'now-playing' and the mediaType is 'movie'", () => {
			const formData = new DiscoverFormDataService('movie', 'now-playing', false, {});

			const expectedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certification: [],
				with_release_type: ['all'],
				'release_date.lte': '2022-11-09',
				'release_date.gte': '2022-09-28',
				'air_date.lte': '',
				'air_date.gte': '',
				with_original_language: 'none',
				region: 'US',
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 0,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: false,
				sort_by: 'popularity.desc',
				restrict_services: false,
				ott_region: 'US',
				with_ott_providers: []
			};

			expect(formData.getFormikFormData()).toStrictEqual(expectedFormData);
		});

		it("When the resourceType is 'upcoming' and the mediaType is 'movie'", () => {
			const formData = new DiscoverFormDataService('movie', 'upcoming', false, {});

			const expectedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certification: [],
				with_release_type: ['all'],
				'release_date.gte': '2022-11-10',
				'release_date.lte': '2022-12-01',
				'air_date.lte': '',
				'air_date.gte': '',
				with_original_language: 'none',
				region: 'US',
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 0,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: false,
				sort_by: 'popularity.desc',
				restrict_services: false,
				ott_region: 'US',
				with_ott_providers: []
			};

			expect(formData.getFormikFormData()).toStrictEqual(expectedFormData);
		});

		it("When the resourceType is 'top-rated' and the mediaType is 'movie'", () => {
			const formData = new DiscoverFormDataService('movie', 'upcoming', false, {});

			const expectedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certification: [],
				with_release_type: ['all'],
				'release_date.lte': '2022-12-01',
				'release_date.gte': '2022-11-10',
				'air_date.lte': '',
				'air_date.gte': '',
				with_original_language: 'none',
				region: 'US',
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 0,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: false,
				sort_by: 'popularity.desc',
				restrict_services: false,
				ott_region: 'US',
				with_ott_providers: []
			};

			expect(formData.getFormikFormData()).toStrictEqual(expectedFormData);
		});

		it("When the resourceType is 'popular' and the mediaType is 'tv'", () => {
			const formData = new DiscoverFormDataService('tv', 'popular', false, {});

			const expectedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certification: [],
				with_release_type: ['all'],
				'release_date.lte': '',
				'release_date.gte': '',
				'air_date.lte': '2023-05-06',
				'air_date.gte': '',
				with_original_language: 'none',
				region: 'US',
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 0,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: true,
				sort_by: 'popularity.desc',
				restrict_services: false,
				ott_region: 'US',
				with_ott_providers: []
			};

			expect(formData.getFormikFormData()).toStrictEqual(expectedFormData);
		});

		it("When the resourceType is 'airing-today' and the mediaType is 'tv'", () => {
			const formData = new DiscoverFormDataService('tv', 'airing-today', false, {});

			const expectedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certification: [],
				with_release_type: ['all'],
				'release_date.lte': '',
				'release_date.gte': '',
				'air_date.lte': '2022-11-07',
				'air_date.gte': '2022-11-07',
				with_original_language: 'none',
				region: 'US',
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 0,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: true,
				sort_by: 'popularity.desc',
				restrict_services: false,
				ott_region: 'US',
				with_ott_providers: []
			};

			expect(formData.getFormikFormData()).toStrictEqual(expectedFormData);
		});

		it("When the resourceType is 'on-the-air' and the mediaType is 'tv'", () => {
			const formData = new DiscoverFormDataService('tv', 'airing-today', false, {});

			const expectedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certification: [],
				with_release_type: ['all'],
				'release_date.lte': '',
				'release_date.gte': '',
				'air_date.lte': '2022-11-07',
				'air_date.gte': '2022-11-07',
				with_original_language: 'none',
				region: 'US',
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 0,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: true,
				sort_by: 'popularity.desc',
				restrict_services: false,
				ott_region: 'US',
				with_ott_providers: []
			};

			expect(formData.getFormikFormData()).toStrictEqual(expectedFormData);
		});

		it("When the resourceType is 'top-rated' and the mediaType is 'tv'", () => {
			const formData = new DiscoverFormDataService('tv', 'top-rated', false, {});

			const expectedFormData = {
				show_me: '0',
				with_ott_monetization_types: ['all'],
				with_genres: [],
				certification: [],
				with_release_type: ['all'],
				'release_date.lte': '',
				'release_date.gte': '',
				'air_date.lte': '2023-05-06',
				'air_date.gte': '',
				with_original_language: 'none',
				region: 'US',
				'vote_average.gte': 0,
				'vote_average.lte': 10,
				'vote_count.gte': 150,
				'with_runtime.gte': 0,
				'with_runtime.lte': 400,
				search_first_air_date: true,
				sort_by: 'vote_average.desc',
				restrict_services: false,
				ott_region: 'US',
				with_ott_providers: []
			};

			expect(formData.getFormikFormData()).toStrictEqual(expectedFormData);
		});
	});
});
