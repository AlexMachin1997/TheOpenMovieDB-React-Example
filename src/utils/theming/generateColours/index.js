const generateColours = (theme, colour) => {
	switch (colour) {
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
