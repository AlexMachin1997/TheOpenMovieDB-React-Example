import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '~/components/accordion/accordion';

const meta: Meta<typeof Accordion> = {
	title: 'Components/Accordion',
	component: Accordion,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'A vertically collapsible accordion component built with Radix UI primitives.'
			}
		}
	}
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const DefaultIsOpen: Story = {
	render: () => (
		<Accordion type='single' collapsible className='w-full max-w-md'>
			<AccordionItem value='item-1'>
				<AccordionTrigger>What is refund your refund policy</AccordionTrigger>
				<AccordionContent>Will only show when the Accordion is open</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
};

export const IsDisabled: Story = {
	render: () => (
		<Accordion type='single' collapsible className='w-full max-w-md'>
			<AccordionItem value='item-1'>
				<AccordionTrigger disabled>What is refund your refund policy</AccordionTrigger>
				<AccordionContent>Will only show when the Accordion is open</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
};

export const FullExample: Story = {
	render: () => (
		<Accordion type='single' collapsible className='w-full max-w-md'>
			<AccordionItem value='item-1'>
				<AccordionTrigger>What is refund your refund policy</AccordionTrigger>
				<AccordionContent>Will only show when the Accordion is open</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
};

export const SingleCollapsible: Story = {
	render: () => (
		<Accordion type='single' collapsible className='w-full max-w-md'>
			<AccordionItem value='item-1'>
				<AccordionTrigger>Product Information</AccordionTrigger>
				<AccordionContent>
					<p>
						Our flagship product combines cutting-edge technology with sleek design. Built with
						premium materials, it offers unparalleled performance and reliability.
					</p>
					<p>
						Key features include advanced processing capabilities and an intuitive user interface
						designed for both beginners and experts.
					</p>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2'>
				<AccordionTrigger>Shipping Details</AccordionTrigger>
				<AccordionContent>
					<p>
						We offer worldwide shipping through trusted courier partners. Standard delivery takes
						3-5 business days, while express shipping ensures delivery within 1-2 business days.
					</p>
					<p>
						All orders are carefully packaged and fully insured. Track your shipment in real-time
						through our dedicated tracking portal.
					</p>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-3'>
				<AccordionTrigger>Return Policy</AccordionTrigger>
				<AccordionContent>
					<p>
						We stand behind our products with a comprehensive 30-day return policy. If you&apos;re
						not completely satisfied, simply return the item in its original condition.
					</p>
					<p>
						Our hassle-free return process includes free return shipping and full refunds processed
						within 48 hours of receiving the returned item.
					</p>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
};

export const MultipleNonCollapsible: Story = {
	render: () => (
		<Accordion type='multiple' className='w-full max-w-md'>
			<AccordionItem value='item-1'>
				<AccordionTrigger>Getting Started</AccordionTrigger>
				<AccordionContent>
					<div className='space-y-2'>
						<h4 className='font-medium'>Installation</h4>
						<code className='block bg-muted p-2 rounded text-sm'>
							npm install @radix-ui/react-accordion
						</code>
						<p>Follow the installation guide to get started with our component library.</p>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2'>
				<AccordionTrigger>Configuration</AccordionTrigger>
				<AccordionContent>
					<div className='space-y-2'>
						<h4 className='font-medium'>Basic Setup</h4>
						<p>Configure your project with the necessary dependencies and styling.</p>
						<ul className='list-disc list-inside space-y-1'>
							<li>Install required packages</li>
							<li>Import components</li>
							<li>Add CSS variables</li>
						</ul>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-3'>
				<AccordionTrigger>Advanced Usage</AccordionTrigger>
				<AccordionContent>
					<div className='space-y-2'>
						<h4 className='font-medium'>Customization</h4>
						<p>Learn how to customize the accordion to match your design system.</p>
						<div className='bg-muted p-2 rounded'>
							<p className='text-sm'>Custom styling and theming options available.</p>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
};

export const MultipleOpen: Story = {
	render: () => (
		<Accordion type='multiple' className='w-full max-w-md'>
			<AccordionItem value='item-1'>
				<AccordionTrigger>📚 Documentation</AccordionTrigger>
				<AccordionContent>
					<div className='space-y-2'>
						<p>This accordion allows multiple items to be open at the same time.</p>
						<p>
							Try opening this section and then opening another one below - both will remain open!
						</p>
						<ul className='list-disc list-inside space-y-1 text-sm'>
							<li>Multiple sections can be expanded</li>
							<li>Each section operates independently</li>
							<li>Great for FAQ pages or documentation</li>
						</ul>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2'>
				<AccordionTrigger>⚙️ Settings</AccordionTrigger>
				<AccordionContent>
					<div className='space-y-2'>
						<p>This is another section that can be open alongside the first one.</p>
						<div className='bg-blue-50 p-3 rounded'>
							<p className='text-sm text-blue-800'>
								<strong>Note:</strong> Notice how both sections can be expanded simultaneously when
								you click on them.
							</p>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-3'>
				<AccordionTrigger>🔧 Configuration</AccordionTrigger>
				<AccordionContent>
					<div className='space-y-2'>
						<p>
							This behavior is achieved by setting{' '}
							<code className='bg-muted px-1 rounded'>type=&quot;multiple&quot;</code> on the
							Accordion component.
						</p>
						<div className='grid grid-cols-2 gap-2 text-sm'>
							<div>
								<strong>Single:</strong> Only one item open at a time
							</div>
							<div>
								<strong>Multiple:</strong> Multiple items can be open
							</div>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
};

export const SingleNonCollapsible: Story = {
	render: () => (
		<Accordion type='single' className='w-full max-w-md'>
			<AccordionItem value='item-1'>
				<AccordionTrigger>What is your refund policy?</AccordionTrigger>
				<AccordionContent>
					<p>
						We offer a 30-day money-back guarantee on all purchases. If you&apos;re not satisfied
						with your purchase, you can return it for a full refund within 30 days of the purchase
						date.
					</p>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2'>
				<AccordionTrigger>How do I track my order?</AccordionTrigger>
				<AccordionContent>
					<p>
						Once your order ships, you&apos;ll receive a tracking number via email. You can also
						track your order through your account dashboard or by contacting our customer service
						team.
					</p>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-3'>
				<AccordionTrigger>Do you ship internationally?</AccordionTrigger>
				<AccordionContent>
					<p>
						Yes, we ship to most countries worldwide. International shipping rates and delivery
						times vary by location. You can check shipping options during checkout.
					</p>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
};

export const RichContent: Story = {
	render: () => (
		<Accordion type='single' collapsible className='w-full max-w-2xl'>
			<AccordionItem value='item-1'>
				<AccordionTrigger>Technical Specifications</AccordionTrigger>
				<AccordionContent>
					<div className='space-y-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<h4 className='font-medium mb-2'>Dimensions</h4>
								<ul className='text-sm space-y-1'>
									<li>Height: 12.5 inches</li>
									<li>Width: 8.7 inches</li>
									<li>Depth: 0.3 inches</li>
									<li>Weight: 1.4 pounds</li>
								</ul>
							</div>
							<div>
								<h4 className='font-medium mb-2'>Performance</h4>
								<ul className='text-sm space-y-1'>
									<li>Processor: 2.4GHz quad-core</li>
									<li>Memory: 8GB RAM</li>
									<li>Storage: 256GB SSD</li>
									<li>Battery: Up to 10 hours</li>
								</ul>
							</div>
						</div>
						<div className='bg-muted p-3 rounded'>
							<p className='text-sm'>
								<strong>Note:</strong> Specifications may vary by model and region. Please check the
								product page for the most accurate information.
							</p>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2'>
				<AccordionTrigger>Customer Reviews</AccordionTrigger>
				<AccordionContent>
					<div className='space-y-3'>
						<div className='border-b pb-3'>
							<div className='flex items-center gap-2 mb-1'>
								<span className='font-medium'>Sarah M.</span>
								<span className='text-yellow-500'>★★★★★</span>
							</div>
							<p className='text-sm'>Excellent product! Exceeded my expectations in every way.</p>
						</div>
						<div className='border-b pb-3'>
							<div className='flex items-center gap-2 mb-1'>
								<span className='font-medium'>John D.</span>
								<span className='text-yellow-500'>★★★★☆</span>
							</div>
							<p className='text-sm'>Great quality and fast shipping. Highly recommend!</p>
						</div>
						<div>
							<div className='flex items-center gap-2 mb-1'>
								<span className='font-medium'>Emily R.</span>
								<span className='text-yellow-500'>★★★★★</span>
							</div>
							<p className='text-sm'>
								Perfect for my needs. Customer service was also very helpful.
							</p>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
};

export const CustomStyling: Story = {
	render: () => (
		<Accordion type='single' collapsible className='w-full max-w-md'>
			<AccordionItem value='item-1' className='border-2 border-blue-200 rounded-lg mb-2'>
				<AccordionTrigger className='px-4 py-3 text-blue-900 hover:text-blue-700'>
					<span className='flex items-center gap-2'>
						<span className='w-2 h-2 bg-blue-500 rounded-full'></span>
						Premium Features
					</span>
				</AccordionTrigger>
				<AccordionContent className='px-4 pb-4'>
					<div className='bg-blue-50 p-3 rounded'>
						<p className='text-blue-800'>
							Access to premium features including advanced analytics, priority support, and
							exclusive content.
						</p>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2' className='border-2 border-green-200 rounded-lg mb-2'>
				<AccordionTrigger className='px-4 py-3 text-green-900 hover:text-green-700'>
					<span className='flex items-center gap-2'>
						<span className='w-2 h-2 bg-green-500 rounded-full'></span>
						Free Tier
					</span>
				</AccordionTrigger>
				<AccordionContent className='px-4 pb-4'>
					<div className='bg-green-50 p-3 rounded'>
						<p className='text-green-800'>
							Basic features available for free users with limited access to core functionality.
						</p>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
};

export const WithFormElements: Story = {
	render: () => (
		<Accordion type='single' collapsible className='w-full max-w-lg'>
			<AccordionItem value='item-1'>
				<AccordionTrigger>Personal Information</AccordionTrigger>
				<AccordionContent>
					<form className='space-y-4'>
						<div>
							<label htmlFor='name' className='block text-sm font-medium mb-1'>
								Full Name
							</label>
							<input
								type='text'
								id='name'
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								placeholder='Enter your full name'
							/>
						</div>
						<div>
							<label htmlFor='email' className='block text-sm font-medium mb-1'>
								Email Address
							</label>
							<input
								type='email'
								id='email'
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								placeholder='Enter your email'
							/>
						</div>
						<button
							type='submit'
							className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors'
						>
							Save Information
						</button>
					</form>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2'>
				<AccordionTrigger>Preferences</AccordionTrigger>
				<AccordionContent>
					<div className='space-y-3'>
						<div className='flex items-center gap-2'>
							<input type='checkbox' id='newsletter' className='rounded' />
							<label htmlFor='newsletter' className='text-sm'>
								Subscribe to newsletter
							</label>
						</div>
						<div className='flex items-center gap-2'>
							<input type='checkbox' id='notifications' className='rounded' />
							<label htmlFor='notifications' className='text-sm'>
								Enable push notifications
							</label>
						</div>
						<div>
							<label htmlFor='theme' className='block text-sm font-medium mb-1'>
								Theme Preference
							</label>
							<select
								id='theme'
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							>
								<option value='light'>Light</option>
								<option value='dark'>Dark</option>
								<option value='system'>System</option>
							</select>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
};

export const WithIconsAndBadges: Story = {
	render: () => (
		<Accordion type='multiple' className='w-full max-w-md'>
			<AccordionItem value='item-1'>
				<AccordionTrigger className='flex items-center justify-between'>
					<span className='flex items-center gap-2'>
						<span className='text-green-500'>●</span>
						Active Projects
					</span>
					<span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full'>3</span>
				</AccordionTrigger>
				<AccordionContent>
					<div className='space-y-2'>
						<div className='flex items-center justify-between p-2 bg-gray-50 rounded'>
							<span>Project Alpha</span>
							<span className='text-xs text-gray-500'>Due: Dec 15</span>
						</div>
						<div className='flex items-center justify-between p-2 bg-gray-50 rounded'>
							<span>Project Beta</span>
							<span className='text-xs text-gray-500'>Due: Dec 20</span>
						</div>
						<div className='flex items-center justify-between p-2 bg-gray-50 rounded'>
							<span>Project Gamma</span>
							<span className='text-xs text-gray-500'>Due: Dec 25</span>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2'>
				<AccordionTrigger className='flex items-center justify-between'>
					<span className='flex items-center gap-2'>
						<span className='text-yellow-500'>●</span>
						Pending Reviews
					</span>
					<span className='bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full'>2</span>
				</AccordionTrigger>
				<AccordionContent>
					<div className='space-y-2'>
						<div className='flex items-center justify-between p-2 bg-gray-50 rounded'>
							<span>Code Review #123</span>
							<span className='text-xs text-gray-500'>2 days ago</span>
						</div>
						<div className='flex items-center justify-between p-2 bg-gray-50 rounded'>
							<span>Design Review #456</span>
							<span className='text-xs text-gray-500'>1 day ago</span>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-3'>
				<AccordionTrigger className='flex items-center justify-between'>
					<span className='flex items-center gap-2'>
						<span className='text-red-500'>●</span>
						Completed Tasks
					</span>
					<span className='bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full'>12</span>
				</AccordionTrigger>
				<AccordionContent>
					<p className='text-sm text-gray-600'>
						All tasks have been completed successfully. Great work team!
					</p>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
};
