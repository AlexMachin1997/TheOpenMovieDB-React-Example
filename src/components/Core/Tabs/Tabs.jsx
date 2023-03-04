import * as React from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

export const TabPanel = ({ children }) => (
	<Tab.Panel
		className={classNames(
			'rounded-xl bg-white',
			'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
		)}
	>
		{children}
	</Tab.Panel>
);

TabPanel.propTypes = {
	children: PropTypes.node.isRequired
};

const Tabs = ({ tabs, children, tabClassName, activeTabClassName }) => (
	<div className='w-full'>
		<Tab.Group as='nav' className=''>
			<Tab.List className='flex space-x-4' as='ul'>
				{tabs.map((tab) => (
					<Tab key={tab.id} as='li'>
						{({ selected }) => (
							<>
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
										{/* When provided render an Icon via the font-awesome className */}
										{(tab?.icon?.length ?? 0) > 0 && (
											<Icon className={classNames(tab.icon, 'mr-2')} />
										)}

										{/* Tab section label */}
										{tab?.label ?? ''}
									</>
								</Button>
								{tab?.children ?? null}
							</>
						)}
					</Tab>
				))}
			</Tab.List>

			<Tab.Panels className='mt-2'>{children}</Tab.Panels>
		</Tab.Group>
	</div>
);

Tabs.propTypes = {
	tabs: PropTypes.array.isRequired,
	children: PropTypes.node.isRequired,
	tabClassName: PropTypes.string,
	activeTabClassName: PropTypes.string
};

Tabs.defaultProps = {
	tabClassName: 'text-gray-500 hover:text-gray-700',
	activeTabClassName: 'bg-gray-100 text-gray-700'
};

export default Tabs;
