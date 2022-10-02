const SORT_BY_OPTIONS = [
	{
		label: 'Popularity Descending',
		id: 'popularity.desc',
		value: ' popularity.desc',
		order: 1
	},
	{
		label: 'Popularity Ascending',
		id: 'popularity.asc',
		value: ' popularity.asc',
		order: 2
	},
	{
		label: 'Rating Descending',
		id: 'vote_average.desc',
		value: 'vote_average.desc',
		order: 3
	},
	{
		label: 'Rating Ascending',
		id: 'vote_average.asc',
		value: 'vote_average.asc',
		order: 4
	},
	{
		label: 'Release Date Descending',
		id: 'primary_release_date.desc',
		value: ' primary_release_date.desc',
		order: 5
	},
	{
		label: 'Release Date Ascending',
		id: 'primary_release_date.asc',
		value: ' primary_release_date.asc',
		order: 6
	},
	{
		label: 'Title (Z-A)',
		id: 'original_title.desc',
		value: 'original_title.desc',
		order: 7
	},
	{
		label: 'Title (A-Z)',
		id: 'original_title.asc',
		value: 'original_title.asc',
		order: 8
	},
	{
		label: 'Revenue Descending',
		id: ' revenue.desc',
		value: ' revenue.desc',
		order: 9
	},
	{
		label: 'Revenue Ascending',
		id: ' revenue.asc',
		value: ' revenue.asc',
		order: 10
	},
	{
		label: 'Vote Count Descending',
		id: 'vote_count.desc',
		value: 'vote_count.desc',
		order: 11
	},
	{
		label: 'Vote Count Ascending',
		id: 'vote_count.asc',
		value: 'vote_count.asc',
		order: 12
	}
];

const SHOW_ME_OPTIONS = [
	{
		label: 'Everything',
		id: 'Everything-Option',
		value: '0',
		order: 1
	},
	{
		label: "Movies I haven't Seen",
		id: "Movies-I-Haven't-Seen-Option",
		value: '1',
		order: 2
	},
	{
		label: 'Movies I have Seen',
		id: 'Movies-I-Have-Seen-Option',
		value: '2',
		order: 3
	}
];

const AVAILABILITY_OPTIONS = [
	{
		label: 'Search all availabilities',
		id: 'Search-All-Availabilities-Option',
		value: 'all', // Special value, this just takes all the existing values
		order: 1,
		name: 'all'
	},
	{
		label: 'Stream',
		id: 'Stream-Option',
		value: 'flatrate',
		order: 2,
		name: 'stream'
	},
	{
		label: 'Free',
		id: 'Free-Option',
		value: 'free',
		order: 3,
		name: 'free'
	},
	{
		label: 'Ads',
		id: 'Ads-Option',
		value: 'ads',
		order: 4,
		name: 'ads'
	},
	{
		label: 'Rent',
		id: 'Rent-Option',
		value: 'rent',
		order: 5,
		name: 'rent'
	},
	{
		label: 'Buy',
		id: 'Buy-Option',
		value: 'buy',
		order: 6,
		name: 'buy'
	}
];

const GENRE_OPTIONS = [
	{
		label: 'Action',
		id: 'Action-Option',
		value: '28',
		order: 1
	},
	{
		label: 'Adventure',
		id: 'Adventure-Option',
		value: '12',
		order: 2
	},
	{
		label: 'Animation',
		id: 'Animation-Option',
		value: '16',
		order: 3
	},
	{
		label: 'Comedy',
		id: 'Comedy-Option',
		value: '35',
		order: 4
	},
	{
		label: 'Crime',
		id: 'Crime-Option',
		value: '80',
		order: 5
	},
	{
		label: 'Documentary',
		id: 'Documentary-Option',
		value: '99',
		order: 6
	},
	{
		label: 'Drama',
		id: 'Drama-Option',
		value: '18',
		order: 7
	},
	{
		label: 'Family',
		id: 'Family-Option',
		value: '10751',
		order: 8
	},
	{
		label: 'Fantasy',
		id: 'Fantasy-Option',
		value: '14',
		order: 9
	},
	{
		label: 'History',
		id: 'History-Option',
		value: '36',
		order: 10
	},
	{
		label: 'Horror',
		id: 'Horror-Option',
		value: '27',
		order: 11
	},
	{
		label: 'Music',
		id: 'Music-Option',
		value: '10402',
		order: 12
	},
	{
		label: 'Mystery',
		id: 'Mystery-Option',
		value: '9648',
		order: 13
	},
	{
		label: 'Romance',
		id: 'Romance-Option',
		value: '10749',
		order: 14
	},
	{
		label: 'Science Fiction',
		id: 'Science-Fiction-Option',
		value: '878',
		order: 15
	},
	{
		label: 'TV Movie',
		id: 'TV-And-Movie-Option',
		value: '10770',
		order: 16
	},
	{
		label: 'Thriller',
		id: 'Thriller-Option',
		value: '53',
		order: 17
	},
	{
		label: 'War',
		id: 'War-Option',
		value: '10752',
		order: 18
	},
	{
		label: 'Western',
		id: 'Western-Option',
		value: '37',
		order: 19
	}
];

const CERTIFICATION_OPTIONS = [
	{
		label: 'NR',
		id: 'NR-Option',
		value: 'NR',
		order: 1
	},
	{
		label: 'G',
		id: 'G-Option',
		value: 'G',
		order: 2
	},
	{
		label: 'pg',
		id: 'PG-Option',
		value: 'PG',
		order: 3
	},
	{
		label: 'PG-13',
		id: 'PG-13-Option',
		value: 'PG-13',
		order: 4
	},
	{
		label: 'R',
		id: 'R-Option',
		value: 'R',
		order: 5
	},
	{
		label: 'NC-17',
		id: 'N17-Option',
		value: 'NC-17',
		order: 6
	}
];

const RELEASE_TYPE_OPTIONS = [
	{
		label: 'Search all releases',
		id: 'Search-All-Releases',
		value: 'all', // Special value, this just takes all the existing values
		order: 1,
		name: 'all'
	},
	{
		label: 'Premiere',
		id: 'Premiere-Option',
		value: '1',
		order: 2
	},
	{
		label: 'Theatrical (Limited)',
		id: 'Theatrical-Limited-Option',
		value: '2',
		order: 3
	},
	{
		label: 'Theatrical',
		id: 'Theatrical-Option',
		value: '3',
		order: 4
	},
	{
		label: 'Digital',
		id: 'Digital-Option',
		value: '4',
		order: 5
	},
	{
		label: 'Physical',
		id: 'Physical-Option',
		value: '5',
		order: 6
	},
	{
		label: 'TV',
		id: 'TV-Option',
		value: '6',
		order: 7
	}
];

const LANGUAGE_OPTIONS = [
	{
		iso_639_1: 'bi',
		label: 'Bislama',
		name: ''
	},
	{
		iso_639_1: 'cs',
		label: 'Czech',
		name: 'Český'
	},
	{
		iso_639_1: 'ba',
		label: 'Bashkir',
		name: ''
	},
	{
		iso_639_1: 'ae',
		label: 'Avestan',
		name: ''
	},
	{
		iso_639_1: 'av',
		label: 'Avaric',
		name: ''
	},
	{
		iso_639_1: 'de',
		label: 'German',
		name: 'Deutsch'
	},
	{
		iso_639_1: 'mt',
		label: 'Maltese',
		name: 'Malti'
	},
	{
		iso_639_1: 'om',
		label: 'Oromo',
		name: ''
	},
	{
		iso_639_1: 'rm',
		label: 'Raeto-Romance',
		name: ''
	},
	{
		iso_639_1: 'so',
		label: 'Somali',
		name: 'Somali'
	},
	{
		iso_639_1: 'ts',
		label: 'Tsonga',
		name: ''
	},
	{
		iso_639_1: 'vi',
		label: 'Vietnamese',
		name: 'Tiếng Việt'
	},
	{
		iso_639_1: 'gn',
		label: 'Guarani',
		name: ''
	},
	{
		iso_639_1: 'ig',
		label: 'Igbo',
		name: ''
	},
	{
		iso_639_1: 'it',
		label: 'Italian',
		name: 'Italiano'
	},
	{
		iso_639_1: 'ki',
		label: 'Kikuyu',
		name: ''
	},
	{
		iso_639_1: 'ku',
		label: 'Kurdish',
		name: ''
	},
	{
		iso_639_1: 'la',
		label: 'Latin',
		name: 'Latin'
	},
	{
		iso_639_1: 'ln',
		label: 'Lingala',
		name: ''
	},
	{
		iso_639_1: 'lb',
		label: 'Letzeburgesch',
		name: ''
	},
	{
		iso_639_1: 'ny',
		label: 'Chichewa; Nyanja',
		name: ''
	},
	{
		iso_639_1: 'pl',
		label: 'Polish',
		name: 'Polski'
	},
	{
		iso_639_1: 'si',
		label: 'Sinhalese',
		name: 'සිංහල'
	},
	{
		iso_639_1: 'to',
		label: 'Tonga',
		name: ''
	},
	{
		iso_639_1: 'az',
		label: 'Azerbaijani',
		name: 'Azərbaycan'
	},
	{
		iso_639_1: 'ce',
		label: 'Chechen',
		name: ''
	},
	{
		iso_639_1: 'cu',
		label: 'Slavic',
		name: ''
	},
	{
		iso_639_1: 'da',
		label: 'Danish',
		name: 'Dansk'
	},
	{
		iso_639_1: 'hz',
		label: 'Herero',
		name: ''
	},
	{
		iso_639_1: 'ie',
		label: 'Interlingue',
		name: ''
	},
	{
		iso_639_1: 'rw',
		label: 'Kinyarwanda',
		name: 'Kinyarwanda'
	},
	{
		iso_639_1: 'mi',
		label: 'Maori',
		name: ''
	},
	{
		iso_639_1: 'no',
		label: 'Norwegian',
		name: 'Norsk'
	},
	{
		iso_639_1: 'pi',
		label: 'Pali',
		name: ''
	},
	{
		iso_639_1: 'sk',
		label: 'Slovak',
		name: 'Slovenčina'
	},
	{
		iso_639_1: 'se',
		label: 'Northern Sami',
		name: ''
	},
	{
		iso_639_1: 'sm',
		label: 'Samoan',
		name: ''
	},
	{
		iso_639_1: 'uk',
		label: 'Ukrainian',
		name: 'Український'
	},
	{
		iso_639_1: 'en',
		label: 'English',
		name: 'English'
	},
	{
		iso_639_1: 'ay',
		label: 'Aymara',
		name: ''
	},
	{
		iso_639_1: 'ca',
		label: 'Catalan',
		name: 'Català'
	},
	{
		iso_639_1: 'eo',
		label: 'Esperanto',
		name: 'Esperanto'
	},
	{
		iso_639_1: 'ha',
		label: 'Hausa',
		name: 'Hausa'
	},
	{
		iso_639_1: 'ho',
		label: 'Hiri Motu',
		name: ''
	},
	{
		iso_639_1: 'hu',
		label: 'Hungarian',
		name: 'Magyar'
	},
	{
		iso_639_1: 'io',
		label: 'Ido',
		name: ''
	},
	{
		iso_639_1: 'ii',
		label: 'Yi',
		name: ''
	},
	{
		iso_639_1: 'kn',
		label: 'Kannada',
		name: '?????'
	},
	{
		iso_639_1: 'kv',
		label: 'Komi',
		name: ''
	},
	{
		iso_639_1: 'li',
		label: 'Limburgish',
		name: ''
	},
	{
		iso_639_1: 'oj',
		label: 'Ojibwa',
		name: ''
	},
	{
		iso_639_1: 'ru',
		label: 'Russian',
		name: 'Pусский'
	},
	{
		iso_639_1: 'sr',
		label: 'Serbian',
		name: 'Srpski'
	},
	{
		iso_639_1: 'sv',
		label: 'Swedish',
		name: 'svenska'
	},
	{
		iso_639_1: 'ty',
		label: 'Tahitian',
		name: ''
	},
	{
		iso_639_1: 'zu',
		label: 'Zulu',
		name: 'isiZulu'
	},
	{
		iso_639_1: 'ka',
		label: 'Georgian',
		name: 'ქართული'
	},
	{
		iso_639_1: 'ch',
		label: 'Chamorro',
		name: "Finu' Chamorro"
	},
	{
		iso_639_1: 'be',
		label: 'Belarusian',
		name: 'беларуская мова'
	},
	{
		iso_639_1: 'br',
		label: 'Breton',
		name: ''
	},
	{
		iso_639_1: 'kw',
		label: 'Cornish',
		name: ''
	},
	{
		iso_639_1: 'fi',
		label: 'Finnish',
		name: 'suomi'
	},
	{
		iso_639_1: 'sh',
		label: 'Serbo-Croatian',
		name: ''
	},
	{
		iso_639_1: 'nn',
		label: 'Norwegian Nynorsk',
		name: ''
	},
	{
		iso_639_1: 'tt',
		label: 'Tatar',
		name: ''
	},
	{
		iso_639_1: 'tg',
		label: 'Tajik',
		name: ''
	},
	{
		iso_639_1: 'vo',
		label: 'Volapük',
		name: ''
	},
	{
		iso_639_1: 'ps',
		label: 'Pushto',
		name: 'پښتو'
	},
	{
		iso_639_1: 'mk',
		label: 'Macedonian',
		name: ''
	},
	{
		iso_639_1: 'fr',
		label: 'French',
		name: 'Français'
	},
	{
		iso_639_1: 'bm',
		label: 'Bambara',
		name: 'Bamanankan'
	},
	{
		iso_639_1: 'eu',
		label: 'Basque',
		name: 'euskera'
	},
	{
		iso_639_1: 'fj',
		label: 'Fijian',
		name: ''
	},
	{
		iso_639_1: 'id',
		label: 'Indonesian',
		name: 'Bahasa indonesia'
	},
	{
		iso_639_1: 'mg',
		label: 'Malagasy',
		name: ''
	},
	{
		iso_639_1: 'na',
		label: 'Nauru',
		name: ''
	},
	{
		iso_639_1: 'xx',
		label: 'No Language',
		name: 'No Language'
	},
	{
		iso_639_1: 'qu',
		label: 'Quechua',
		name: ''
	},
	{
		iso_639_1: 'sq',
		label: 'Albanian',
		name: 'shqip'
	},
	{
		iso_639_1: 'ti',
		label: 'Tigrinya',
		name: ''
	},
	{
		iso_639_1: 'tw',
		label: 'Twi',
		name: ''
	},
	{
		iso_639_1: 'wa',
		label: 'Walloon',
		name: ''
	},
	{
		iso_639_1: 'ab',
		label: 'Abkhazian',
		name: ''
	},
	{
		iso_639_1: 'bs',
		label: 'Bosnian',
		name: 'Bosanski'
	},
	{
		iso_639_1: 'af',
		label: 'Afrikaans',
		name: 'Afrikaans'
	},
	{
		iso_639_1: 'an',
		label: 'Aragonese',
		name: ''
	},
	{
		iso_639_1: 'fy',
		label: 'Frisian',
		name: ''
	},
	{
		iso_639_1: 'gu',
		label: 'Gujarati',
		name: ''
	},
	{
		iso_639_1: 'ik',
		label: 'Inupiaq',
		name: ''
	},
	{
		iso_639_1: 'ja',
		label: 'Japanese',
		name: '日本語'
	},
	{
		iso_639_1: 'ko',
		label: 'Korean',
		name: '한국어/조선말'
	},
	{
		iso_639_1: 'lg',
		label: 'Ganda',
		name: ''
	},
	{
		iso_639_1: 'nl',
		label: 'Dutch',
		name: 'Nederlands'
	},
	{
		iso_639_1: 'os',
		label: 'Ossetian; Ossetic',
		name: ''
	},
	{
		iso_639_1: 'el',
		label: 'Greek',
		name: 'ελληνικά'
	},
	{
		iso_639_1: 'bn',
		label: 'Bengali',
		name: 'বাংলা'
	},
	{
		iso_639_1: 'cr',
		label: 'Cree',
		name: ''
	},
	{
		iso_639_1: 'km',
		label: 'Khmer',
		name: ''
	},
	{
		iso_639_1: 'lo',
		label: 'Lao',
		name: ''
	},
	{
		iso_639_1: 'nd',
		label: 'Ndebele',
		name: ''
	},
	{
		iso_639_1: 'ne',
		label: 'Nepali',
		name: ''
	},
	{
		iso_639_1: 'sc',
		label: 'Sardinian',
		name: ''
	},
	{
		iso_639_1: 'sw',
		label: 'Swahili',
		name: 'Kiswahili'
	},
	{
		iso_639_1: 'tl',
		label: 'Tagalog',
		name: ''
	},
	{
		iso_639_1: 'ur',
		label: 'Urdu',
		name: 'اردو'
	},
	{
		iso_639_1: 'ee',
		label: 'Ewe',
		name: 'Èʋegbe'
	},
	{
		iso_639_1: 'aa',
		label: 'Afar',
		name: ''
	},
	{
		iso_639_1: 'co',
		label: 'Corsican',
		name: ''
	},
	{
		iso_639_1: 'et',
		label: 'Estonian',
		name: 'Eesti'
	},
	{
		iso_639_1: 'is',
		label: 'Icelandic',
		name: 'Íslenska'
	},
	{
		iso_639_1: 'ks',
		label: 'Kashmiri',
		name: ''
	},
	{
		iso_639_1: 'kr',
		label: 'Kanuri',
		name: ''
	},
	{
		iso_639_1: 'ky',
		label: 'Kirghiz',
		name: '??????'
	},
	{
		iso_639_1: 'kj',
		label: 'Kuanyama',
		name: ''
	},
	{
		iso_639_1: 'nr',
		label: 'Ndebele',
		name: ''
	},
	{
		iso_639_1: 'or',
		label: 'Oriya',
		name: ''
	},
	{
		iso_639_1: 'wo',
		label: 'Wolof',
		name: 'Wolof'
	},
	{
		iso_639_1: 'za',
		label: 'Zhuang',
		name: ''
	},
	{
		iso_639_1: 'ar',
		label: 'Arabic',
		name: 'العربية'
	},
	{
		iso_639_1: 'cv',
		label: 'Chuvash',
		name: ''
	},
	{
		iso_639_1: 'fo',
		label: 'Faroese',
		name: ''
	},
	{
		iso_639_1: 'hr',
		label: 'Croatian',
		name: 'Hrvatski'
	},
	{
		iso_639_1: 'ms',
		label: 'Malay',
		name: 'Bahasa melayu'
	},
	{
		iso_639_1: 'nb',
		label: 'Norwegian Bokmål',
		name: 'Bokmål'
	},
	{
		iso_639_1: 'rn',
		label: 'Rundi',
		name: 'Kirundi'
	},
	{
		iso_639_1: 'sn',
		label: 'Shona',
		name: ''
	},
	{
		iso_639_1: 'st',
		label: 'Sotho',
		name: ''
	},
	{
		iso_639_1: 'tr',
		label: 'Turkish',
		name: 'Türkçe'
	},
	{
		iso_639_1: 'am',
		label: 'Amharic',
		name: ''
	},
	{
		iso_639_1: 'fa',
		label: 'Persian',
		name: 'فارسی'
	},
	{
		iso_639_1: 'hy',
		label: 'Armenian',
		name: ''
	},
	{
		iso_639_1: 'pa',
		label: 'Punjabi',
		name: 'ਪੰਜਾਬੀ'
	},
	{
		iso_639_1: 'as',
		label: 'Assamese',
		name: ''
	},
	{
		iso_639_1: 'ia',
		label: 'Interlingua',
		name: ''
	},
	{
		iso_639_1: 'lv',
		label: 'Latvian',
		name: 'Latviešu'
	},
	{
		iso_639_1: 'lu',
		label: 'Luba-Katanga',
		name: ''
	},
	{
		iso_639_1: 'mr',
		label: 'Marathi',
		name: ''
	},
	{
		iso_639_1: 'mn',
		label: 'Mongolian',
		name: ''
	},
	{
		iso_639_1: 'pt',
		label: 'Portuguese',
		name: 'Português'
	},
	{
		iso_639_1: 'th',
		label: 'Thai',
		name: 'ภาษาไทย'
	},
	{
		iso_639_1: 'tk',
		label: 'Turkmen',
		name: ''
	},
	{
		iso_639_1: 've',
		label: 'Venda',
		name: ''
	},
	{
		iso_639_1: 'dv',
		label: 'Divehi',
		name: ''
	},
	{
		iso_639_1: 'gv',
		label: 'Manx',
		name: ''
	},
	{
		iso_639_1: 'kl',
		label: 'Kalaallisut',
		name: ''
	},
	{
		iso_639_1: 'kk',
		label: 'Kazakh',
		name: 'қазақ'
	},
	{
		iso_639_1: 'lt',
		label: 'Lithuanian',
		name: 'Lietuvių'
	},
	{
		iso_639_1: 'my',
		label: 'Burmese',
		name: ''
	},
	{
		iso_639_1: 'sl',
		label: 'Slovenian',
		name: 'Slovenščina'
	},
	{
		iso_639_1: 'sd',
		label: 'Sindhi',
		name: ''
	},
	{
		iso_639_1: 'cn',
		label: 'Cantonese',
		name: '广州话 / 廣州話'
	},
	{
		iso_639_1: 'hi',
		label: 'Hindi',
		name: 'हिन्दी'
	},
	{
		iso_639_1: 'cy',
		label: 'Welsh',
		name: 'Cymraeg'
	},
	{
		iso_639_1: 'ht',
		label: 'Haitian; Haitian Creole',
		name: ''
	},
	{
		iso_639_1: 'iu',
		label: 'Inuktitut',
		name: ''
	},
	{
		iso_639_1: 'jv',
		label: 'Javanese',
		name: ''
	},
	{
		iso_639_1: 'mh',
		label: 'Marshall',
		name: ''
	},
	{
		iso_639_1: 'sa',
		label: 'Sanskrit',
		name: ''
	},
	{
		iso_639_1: 'ss',
		label: 'Swati',
		name: ''
	},
	{
		iso_639_1: 'te',
		label: 'Telugu',
		name: 'తెలుగు'
	},
	{
		iso_639_1: 'kg',
		label: 'Kongo',
		name: ''
	},
	{
		iso_639_1: 'ml',
		label: 'Malayalam',
		name: ''
	},
	{
		iso_639_1: 'uz',
		label: 'Uzbek',
		name: 'ozbek'
	},
	{
		iso_639_1: 'sg',
		label: 'Sango',
		name: ''
	},
	{
		iso_639_1: 'xh',
		label: 'Xhosa',
		name: ''
	},
	{
		iso_639_1: 'es',
		label: 'Spanish',
		name: 'Español'
	},
	{
		iso_639_1: 'su',
		label: 'Sundanese',
		name: ''
	},
	{
		iso_639_1: 'ug',
		label: 'Uighur',
		name: ''
	},
	{
		iso_639_1: 'yi',
		label: 'Yiddish',
		name: ''
	},
	{
		iso_639_1: 'yo',
		label: 'Yoruba',
		name: 'Èdè Yorùbá'
	},
	{
		iso_639_1: 'zh',
		label: 'Mandarin',
		name: '普通话'
	},
	{
		iso_639_1: 'he',
		label: 'Hebrew',
		name: 'עִבְרִית'
	},
	{
		iso_639_1: 'bo',
		label: 'Tibetan',
		name: ''
	},
	{
		iso_639_1: 'ak',
		label: 'Akan',
		name: ''
	},
	{
		iso_639_1: 'mo',
		label: 'Moldavian',
		name: ''
	},
	{
		iso_639_1: 'ng',
		label: 'Ndonga',
		name: ''
	},
	{
		iso_639_1: 'dz',
		label: 'Dzongkha',
		name: ''
	},
	{
		iso_639_1: 'ff',
		label: 'Fulah',
		name: 'Fulfulde'
	},
	{
		iso_639_1: 'gd',
		label: 'Gaelic',
		name: ''
	},
	{
		iso_639_1: 'ga',
		label: 'Irish',
		name: 'Gaeilge'
	},
	{
		iso_639_1: 'gl',
		label: 'Galician',
		name: 'Galego'
	},
	{
		iso_639_1: 'nv',
		label: 'Navajo',
		name: ''
	},
	{
		iso_639_1: 'oc',
		label: 'Occitan',
		name: ''
	},
	{
		iso_639_1: 'ro',
		label: 'Romanian',
		name: 'Română'
	},
	{
		iso_639_1: 'ta',
		label: 'Tamil',
		name: 'தமிழ்'
	},
	{
		iso_639_1: 'tn',
		label: 'Tswana',
		name: ''
	},
	{
		iso_639_1: 'bg',
		label: 'Bulgarian',
		name: 'български език'
	}
].map((languageOption) => ({
	...languageOption,
	value: languageOption?.iso_639_1 ?? ''
}));

// Exports all the application configuration
export default {
	// Stores all the 'Sort By' dropdown options (Ordered based on the order property)
	SORT_BY_OPTIONS: SORT_BY_OPTIONS.sort((a, b) => a.order - b.order),

	// Stores all the 'Show Me' radio options (Ordered based on the order property)
	SHOW_ME_RADIO_OPTIONS: SHOW_ME_OPTIONS.sort((a, b) => a.order - b.order),

	// Stores all the 'Availabilities' checkbox options (Ordered based on the order property)
	AVAILABILITY_OPTIONS: AVAILABILITY_OPTIONS.sort((a, b) => a.order - b.order),

	// Stores all the 'Availabilities' dropdown options (Ordered based on the order property)
	GENRE_OPTIONS: GENRE_OPTIONS.sort((a, b) => a.order - b.order),

	// Stores all the 'Availabilities' dropdown options (Ordered based on the order property)
	CERTIFICATION_OPTIONS: CERTIFICATION_OPTIONS.sort((a, b) => a.order - b.order),

	// Stores all the 'Release types' checkbox options (Ordered based on the order property)
	RELEASE_TYPE_OPTIONS: RELEASE_TYPE_OPTIONS.sort((a, b) => a.order - b.order),

	// Store all the 'Language' dropdown options, too many options to have anual options so just sort the languages in alphabetical order
	LANGUAGE_OPTIONS: LANGUAGE_OPTIONS.sort((a, b) => a.label.localeCompare(b.label)),

	// Stores the application url's
	GRAPHQL_ENDPOINT_URI: 'http://localhost:4000/graphql'
};
