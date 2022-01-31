import replaceSpacesWith from '../replaceSpacesWith';

const generateComponentId = (field, additionalInfo) => {
	try {
		const id = `${replaceSpacesWith(field, '-')}-${additionalInfo}`.toLowerCase();

		if (typeof field !== 'string' || typeof additionalInfo !== 'string') {
			throw Error('The field provided is not a string');
		}

		return id;
	} catch (err) {
		console.log(`[generateComponentId failed], ${err.message}`);
		return '';
	}
};

export default generateComponentId;
