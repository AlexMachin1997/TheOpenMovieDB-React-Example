import { Disclosure, Transition } from '@headlessui/react';
import classNames from 'classnames';

import Icon from '../Icon/Icon';

type AccordionProps = {
	children: React.ReactNode;
	title: React.ReactNode | string;
	defaultIsOpen?: boolean;
	isDisabled?: boolean;
	className?: string;
	contentClassName?: string;
	unmount?: boolean;
	containerClassName?: string;
};

const Accordion = ({
	children,
	title,
	defaultIsOpen = false,
	isDisabled,
	className = 'p-4',
	contentClassName = 'p-4',
	unmount = false,
	containerClassName = ''
}: AccordionProps) => (
	<Disclosure defaultOpen={defaultIsOpen}>
		{({ open }) => (
			<div className={classNames('rounded-lg shadow-lg', containerClassName)}>
				<Disclosure.Button
					className={classNames(
						className,
						'flex w-full items-center justify-between border border-solid border-gray-300',
						{
							'rounded-tl-lg rounded-tr-lg': open === true,
							'rounded-lg': open === false,
							'bg-slate-300': isDisabled === true,
							'disabled:cursor-not-allowed': isDisabled === true
						}
					)}
					disabled={isDisabled}
				>
					<>
						{title}

						<Icon
							className={classNames('fa-solid', {
								'fa-arrow-right': open === false,
								'fa-arrow-down': open === true
							})}
						/>
					</>
				</Disclosure.Button>

				<Transition
					enter='transition duration-100 ease-out'
					enterFrom='transform scale-95 opacity-0'
					enterTo='transform scale-100 opacity-100'
					leave='transition duration-75 ease-out'
					leaveFrom='transform scale-100 opacity-100'
					leaveTo='transform scale-95 opacity-0'
					unmount={unmount} // Prevent's unmounting of children contents, causes component values to not be lost e.g. when using an uncontrolled form
				>
					<Disclosure.Panel
						unmount={unmount}
						className={classNames(
							contentClassName,
							'rounded-b-lg border-x-[1px] border-b-[1px] border-solid border-gray-300'
						)}
					>
						{children}
					</Disclosure.Panel>
				</Transition>
			</div>
		)}
	</Disclosure>
);

export default Accordion;
