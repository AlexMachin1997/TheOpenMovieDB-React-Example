import * as React from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@headlessui/react';
import classNames from 'classnames';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';

const Tabs = ({ tabs, tabClassName, activeTabClassName }) => {
	// Only show the tabs which are enabled and has content
	const enabledTabs = React.useMemo(
		() => tabs.filter((tab) => (tab?.enabled ?? true) === true && tab.content !== undefined),
		[tabs]
	);

	return (
		<div className='w-full'>
			<Tab.Group as='nav' className=''>
				<Tab.List className='flex space-x-4' as='ul'>
					{enabledTabs.map((tab) => (
						<Tab key={`${tab.id}-tab`} as='li'>
							{({ selected }) => (
								<Button
									className={classNames(
										tabClassName,
										'list-none rounded-lg py-2 pr-3 text-center text-sm font-medium outline-none',
										{
											[activeTabClassName]: selected === true
										}
									)}
								>
									<>
										{/* When provided render an tabIcon via the font-awesome className */}
										{(tab?.tabIcon?.length ?? 0) > 0 && (
											<Icon className={classNames(tab.tabIcon, 'mr-2')} />
										)}

										{/* Tab section tabLabel */}
										{tab?.tabLabel ?? ''}
									</>
								</Button>
							)}
						</Tab>
					))}
				</Tab.List>

				{/* For each of the tabs generation a section */}
				<Tab.Panels className='mt-2'>
					{enabledTabs.map((tab) => (
						<Tab.Panel
							className={classNames(
								'rounded-xl bg-white',
								'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
							)}
							key={`${tab.id}-section`}
						>
							{tab.content}
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
};

Tabs.propTypes = {
	tabs: PropTypes.array.isRequired,
	tabClassName: PropTypes.string,
	activeTabClassName: PropTypes.string
};

Tabs.defaultProps = {
	tabClassName: 'text-gray-500 hover:text-gray-700',
	activeTabClassName: 'bg-gray-100 text-gray-700'
};

export default Tabs;
