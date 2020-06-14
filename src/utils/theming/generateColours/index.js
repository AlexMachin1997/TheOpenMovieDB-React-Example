const generateColours = (theme, key, colour) => {
	switch (key) {
		case 'primary': {
			return theme.primary;
		}

		case 'secondary': {
			return theme.secondary;
		}

		case 'tertiary': {
			return theme.tertiary;
		}

		default: {
			return colour;
		}
	}
};

export default generateColours;
