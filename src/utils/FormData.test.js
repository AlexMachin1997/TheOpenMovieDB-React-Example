import settings from '../settings';
import FormData from './FormData';

describe('FormData', () => {
	// Before all the unit tests when using the newDate() set it to 07/11/2022
	beforeAll(() => {
		jest.useFakeTimers('modern');
		jest.setSystemTime(new Date(2022, 10, 7));
	});

	// After all the unit tests reset the system time to the real time
	afterAll(() => {
		jest.useRealTimers();
	});

	describe('restrict_services', () => {
		it('When no default value is provided for the restrict_services it should default to false', () => {
			const formData = new FormData('tv', 'top-rated', false, {});
			expect(formData.restrict_services).toBe(false);
		});

		it('When a default value is provided for the restrict_services it should default to the provided value', () => {
			const formData = new FormData('tv', 'top-rated', false, {
				restrict_services: true
			});
			expect(formData.restrict_services).toBe(true);
		});

		it('When the default value for the restrict services is not a boolean it should default to false', () => {
			const formData = new FormData('tv', 'top-rated', false, {
				restrict_services: null
			});
			expect(formData.restrict_services).toBe(false);
		});
	});

	describe('show_me', () => {
		it("When you aren't authenticated the show_me should default to '0'", () => {
			const formData = new FormData('tv', 'top-rated', false, {});
			expect(formData.show_me).toBe('0');
		});

		it("When you aren't authenticated but you provide a default value the show me should default to '0'", () => {
			const formData = new FormData('tv', 'top-rated', false, {
				show_me: '2'
			});
			expect(formData.show_me).toBe('0');
		});

		it("When you are authenticated but you provide an invalid value it should default to '0'", () => {
			const formData = new FormData('tv', 'top-rated', true, {
				show_me: '10'
			});
			expect(formData.show_me).toBe('0');
		});

		it('When you are authenticated and you provide a valid default value it should default to the provided value', () => {
			const formData = new FormData('tv', 'top-rated', true, {
				show_me: '1'
			});
			expect(formData.show_me).toBe('1');
		});
	});

	describe('with_ott_monetization_types', () => {
		it('When an invalid value is provided it should default to all', () => {
			const formData = new FormData('tv', 'top-rated', true, {
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

			const formData = new FormData('tv', 'top-rated', true, {
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

			const formData = new FormData('tv', 'top-rated', true, {
				with_ott_monetization_types: [...availabilityOptionsFormData]
			});

			// Remove (destructure) the first element ('all') and then get the rest via the spread operator
			const [all, ...rest] = availabilityOptionsFormData;

			expect(formData.with_ott_monetization_types).toStrictEqual([...rest]);
		});
	});

	describe('with_genres', () => {});

	describe('certification', () => {});

	describe('with_release_type', () => {
		it('When an invalid value is provided it should default to all', () => {
			const formData = new FormData('tv', 'top-rated', true, {
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

			const formData = new FormData('tv', 'top-rated', true, {
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

			const formData = new FormData('tv', 'top-rated', true, {
				with_release_type: [...availabilityOptionsFormData]
			});

			// Remove (destructure) the first element ('all') and then get the rest via the spread operator
			const [all, ...rest] = availabilityOptionsFormData;

			expect(formData.with_release_type).toStrictEqual([...rest]);
		});
	});

	describe('vote_count_gte', () => {
		it.each`
			mediaType  | vote_count_gte
			${'movie'} | ${300}
			${'tv'}    | ${150}
		`(
			"When the resourceType is 'top-rated' the vote_count_gte should be $vote_count_gte",
			({ mediaType, vote_count_gte }) => {
				const formData = new FormData(mediaType, 'top-rated', false, {});
				expect(formData.vote_count_gte).toBe(vote_count_gte);
			}
		);
	});

	describe('ott_region and with_ott_providers', () => {
		it("By default the ott_region should be 'US'", () => {
			const formData = new FormData('movie', 'top-rated', false, {});
			expect(formData.ott_region).toBe('US');
		});

		it('By default the with_ott_providers should be an empty array', () => {
			const formData = new FormData('movie', 'top-rated', false, {});
			expect(formData.with_ott_providers).toStrictEqual([]);
		});

		it('When a custom ottProvider is provided it should set the ott_region to the provided value', () => {
			const formData = new FormData('movie', 'top-rated', false, {});

			formData.setWhereToWatchFormData('GB', []);

			expect(formData.ott_region).toBe('GB');
		});

		it("When custom 'providers' are provided it should set the with_ott_providers to the provided values", () => {
			const formData = new FormData('movie', 'top-rated', false, {});

			formData.setWhereToWatchFormData('GB', ['8', '7', '9']);

			expect(formData.with_ott_providers).toStrictEqual(['8', '7', '9']);
		});
	});

	describe('sort_by', () => {
		it.each`
			resourceType     | expectedSortBy
			${'top-rated'}   | ${'popularity.desc'}
			${'now-playing'} | ${'vote_average.desc'}
		`(
			'When the resourceType is $resourceType the sort_by should be $expectedSortBy',
			({ resourceType, expectedSortBy }) => {
				const formData = new FormData('movie', resourceType, false, {});
				expect(formData.sort_by).toBe(expectedSortBy);
			}
		);
	});

	describe('release_dates and air_dates', () => {
		// mediaType 'movie' release_date value setting
		it.each`
			field                 | expectedDate    | mediaType  | resourceType
			${'release_date_gte'} | ${''}           | ${'movie'} | ${'popular'}
			${'release_date_lte'} | ${'2023-05-07'} | ${'movie'} | ${'popular'}
			${'release_date_gte'} | ${'2022-09-28'} | ${'movie'} | ${'now-playing'}
			${'release_date_lte'} | ${'2022-11-09'} | ${'movie'} | ${'now-playing'}
			${'release_date_gte'} | ${'2022-11-09'} | ${'movie'} | ${'upcoming'}
			${'release_date_lte'} | ${'2022-11-30'} | ${'movie'} | ${'upcoming'}
			${'release_date_gte'} | ${''}           | ${'movie'} | ${'top-rated'}
			${'release_date_lte'} | ${'2023-07-05'} | ${'movie'} | ${'top-rated'}
		`(
			'When the resourceType is $resourceType and the mediaType is $mediaType the $field should be $expectedDate',
			({ field, expectedDate, mediaType, resourceType }) => {
				const formData = new FormData(mediaType, resourceType, false, {});
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
				const formData = new FormData(mediaType, resourceType, false, {
					search_first_air_date: searchByFirstAirDate
				});
				expect(formData[field]).toBe(expectedDate);
			}
		);
	});

	describe('vote_average', () => {
		it.each`
			field                 | expectedValue | defaultValue
			${'vote_average_gte'} | ${0}          | ${0}
			${'vote_average_lte'} | ${10}         | ${10}
			${'vote_average_gte'} | ${0}          | ${-100}
			${'vote_average_gte'} | ${0}          | ${null}
			${'vote_average_gte'} | ${0}          | ${true}
		`('When $field is $defaultValue it should be $expectedValue', ({ field, expectedValue }) => {
			const formData = new FormData('tv', 'top-rated', false, {});
			expect(formData[field]).toBe(expectedValue);
		});

		it("When the 'defaultValue.vote_average_gte' (20) is greater than the 'defaultValue.vote_average_lte' (10) it should be set to 'defaultValue.vote-average_gte' (20)", () => {
			const formData = new FormData('tv', 'top-rated', false, {
				vote_average_gte: 20,
				vote_average_lte: 10
			});

			// Check the From value is set correctly
			expect(formData.vote_average_gte).toBe(20);

			// Since the "From" (20) is greater than the "To" (10) then the vote_average_gte should be the value from the vote_average_gte
			expect(formData.vote_average_lte).toBe(20);
		});
	});
});
