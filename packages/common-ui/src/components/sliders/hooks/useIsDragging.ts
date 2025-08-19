import React from 'react';

export const useIsDragging = () => {
	const [isDragging, setIsDragging] = React.useState(false);

	const handleDragStart = React.useCallback(() => {
		setIsDragging(true);
	}, []);

	const handleDragLeave = React.useCallback(() => {
		setIsDragging(false);
	}, []);

	const handleDragEnd = React.useCallback(() => {
		setIsDragging(false);
	}, []);

	return {
		isDragging,
		handleDragStart,
		handleDragLeave,
		handleDragEnd
	};
};
