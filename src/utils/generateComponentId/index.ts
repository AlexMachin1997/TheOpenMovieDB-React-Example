const generateComponentId = (field = '', additionalInfo = '') =>
	`${field.replace(/\s+/g, '-')}-${additionalInfo}`.toLowerCase();

export default generateComponentId;
