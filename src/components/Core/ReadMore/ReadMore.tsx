import * as React from 'react';
import './ReadMore.scss';
import classNames from 'classnames';

const ReadMore = ({
	children,
	initialMaximumHeight = 215
}: {
	children: React.ReactNode;
	initialMaximumHeight?: number;
}) => {
	const [isExpanded, setIsExpanded] = React.useState(false);
	const [isOverflowing, setIsOverflowing] = React.useState(false);
	const contentRef = React.useRef<HTMLDivElement>(null);
	const [contentHeight, setContentHeight] = React.useState(0);

	// Setup the Read More functionality
	React.useEffect(() => {
		if (contentRef.current) {
			// Get the height of the text element provided outside of the ReadMore component (Passed in via children props)
			const paragraphHeight = contentRef.current.children[0].scrollHeight;

			// The content is overflowing if the children content exceeds the initial maximum height
			setIsOverflowing(paragraphHeight > initialMaximumHeight);

			// Store the children maximum height ie the size of the <p></p> content without a maximum height applied
			setContentHeight(contentRef.current.children[0].scrollHeight);
		}
	}, [initialMaximumHeight]);

	return (
		<>
			<div
				ref={contentRef}
				style={{ maxHeight: isExpanded ? `${contentHeight}px` : `${initialMaximumHeight}px` }}
				className={classNames(' overflow-hidden transition-max-height duration-1000 ease-in-out', {
					'read-more': isOverflowing === true
				})}
			>
				{children}
			</div>

			{isOverflowing && (
				<button
					type='button'
					onClick={() => {
						setIsExpanded((prevState) => !prevState);
					}}
					className='absolute bottom-0 right-0 bg-white text-base font-semibold text-blue-500 hover:text-blue-700 focus:outline-none'
				>
					{isExpanded ? 'Read Less' : 'Read More'}
				</button>
			)}
		</>
	);
};

export default ReadMore;
