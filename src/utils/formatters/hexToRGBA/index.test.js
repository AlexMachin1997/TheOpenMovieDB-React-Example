import hexToRGBA from './index';

describe('hexToRGBA', () => {
	it('Should return rgba(255, 0, 0, 1) with an opacity of 1', () => {
		// Arrange and act
		const response = hexToRGBA('#FF0000');

		// Assert
		expect(response).toBe('rgba(255, 0, 0, 1)');
	});

	it('Should return', () => {
		const response = hexToRGBA('#8B0000', '0.6');

		expect(response).toBe('rgba(139, 0, 0, 0.6)');
	});
});
