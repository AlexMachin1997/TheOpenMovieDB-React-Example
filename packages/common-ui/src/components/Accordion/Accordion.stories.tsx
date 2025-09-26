import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '~/components/Accordion/Accordion';

const meta: Meta<typeof Accordion> = {
	title: 'Components/Accordion',
	component: Accordion,
	parameters: {
		layout: 'centered'
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
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const trigger = canvas.getByRole('button', { name: /what is refund your refund policy/i });
		await expect(trigger).toBeVisible();
		await userEvent.click(trigger);

		const content = canvas.getByText('Will only show when the Accordion is open');
		await expect(content).toBeVisible();
		await userEvent.click(trigger);

		await waitFor(() => {
			expect(content).not.toBeVisible();
		});
	}
};

export const IsDisabled: Story = {
	render: () => (
		<Accordion type='single' collapsible className='w-full max-w-md'>
			<AccordionItem value='item-1'>
				<AccordionTrigger disabled>What is refund your refund policy</AccordionTrigger>
				<AccordionContent>Will only show when the Accordion is open</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const content = canvas.queryByText('Will only show when the Accordion is open');

		const trigger = canvas.queryByRole('button', {
			name: /what is refund your refund policy/i
		});

		await expect(trigger).toBeDisabled();
		await expect(content).not.toBeInTheDocument();
	}
};

export const FullExample: Story = {
	render: () => (
		<Accordion type='single' collapsible className='w-full max-w-md'>
			<AccordionItem value='item-1'>
				<AccordionTrigger>What is refund your refund policy</AccordionTrigger>
				<AccordionContent>Will only show when the Accordion is open</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const trigger = canvas.getByRole('button', { name: /what is refund your refund policy/i });
		await expect(trigger).toBeVisible();
		await userEvent.click(trigger);

		const content = canvas.getByText('Will only show when the Accordion is open');
		await expect(content).toBeVisible();
		await userEvent.click(trigger);

		await waitFor(() => {
			expect(content).not.toBeVisible();
		});
	}
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
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const productTrigger = canvas.getByRole('button', { name: /product information/i });
		const shippingTrigger = canvas.getByRole('button', { name: /shipping details/i });
		const returnTrigger = canvas.getByRole('button', { name: /return policy/i });

		await userEvent.click(productTrigger);

		await waitFor(async () => {
			const productContent = canvas.getByText(/our flagship product combines/i);
			await expect(productContent).toBeVisible();
			await expect(canvas.queryByText(/we offer worldwide shipping/i)).not.toBeInTheDocument();
			await expect(canvas.queryByText(/we stand behind our products/i)).not.toBeInTheDocument();
		});

		await userEvent.click(shippingTrigger);

		await waitFor(async () => {
			const shippingContent = canvas.getByText(/we offer worldwide shipping/i);
			await expect(shippingContent).toBeVisible();
			await expect(canvas.queryByText(/our flagship product combines/i)).not.toBeInTheDocument();
			await expect(canvas.queryByText(/we stand behind our products/i)).not.toBeInTheDocument();
		});

		await userEvent.click(returnTrigger);

		await waitFor(async () => {
			const returnContent = canvas.getByText(/we stand behind our products/i);
			await expect(returnContent).toBeVisible();
			await expect(canvas.queryByText(/our flagship product combines/i)).not.toBeInTheDocument();
			await expect(canvas.queryByText(/we offer worldwide shipping/i)).not.toBeInTheDocument();
		});
	}
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
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const gettingStartedTrigger = canvas.getByRole('button', { name: /getting started/i });
		const configurationTrigger = canvas.getByRole('button', { name: /configuration/i });
		const advancedUsageTrigger = canvas.getByRole('button', { name: /advanced usage/i });

		// Open first item
		await userEvent.click(gettingStartedTrigger);

		await waitFor(async () => {
			const gettingStartedContent = canvas.getByText(/follow the installation guide/i);
			await expect(gettingStartedContent).toBeVisible();
			await expect(canvas.queryByText(/configure your project/i)).not.toBeInTheDocument();
			await expect(canvas.queryByText(/learn how to customize/i)).not.toBeInTheDocument();
		});

		// Open second item - should keep first open (multiple mode)
		await userEvent.click(configurationTrigger);

		await waitFor(async () => {
			const configurationContent = canvas.getByText(/configure your project/i);
			await expect(configurationContent).toBeVisible();
			// First item should still be open
			const gettingStartedContent = canvas.getByText(/follow the installation guide/i);
			await expect(gettingStartedContent).toBeVisible();
			await expect(canvas.queryByText(/learn how to customize/i)).not.toBeInTheDocument();
		});

		// Open third item - should keep both previous open
		await userEvent.click(advancedUsageTrigger);

		await waitFor(async () => {
			const advancedUsageContent = canvas.getByText(/learn how to customize/i);
			await expect(advancedUsageContent).toBeVisible();
			// Both previous items should still be open
			const gettingStartedContent = canvas.getByText(/follow the installation guide/i);
			await expect(gettingStartedContent).toBeVisible();
			const configurationContent = canvas.getByText(/configure your project/i);
			await expect(configurationContent).toBeVisible();
		});

		// Close first item - others should remain open
		await userEvent.click(gettingStartedTrigger);

		await waitFor(async () => {
			await expect(canvas.queryByText(/follow the installation guide/i)).not.toBeInTheDocument();
			// Other items should still be open
			const configurationContent = canvas.getByText(/configure your project/i);
			await expect(configurationContent).toBeVisible();
			const advancedUsageContent = canvas.getByText(/learn how to customize/i);
			await expect(advancedUsageContent).toBeVisible();
		});
	}
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
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const documentationTrigger = canvas.getByRole('button', { name: /📚 documentation/i });
		const settingsTrigger = canvas.getByRole('button', { name: /⚙️ settings/i });
		const configurationTrigger = canvas.getByRole('button', { name: /🔧 configuration/i });

		// Open first item
		await userEvent.click(documentationTrigger);

		await waitFor(async () => {
			const documentationContent = canvas.getByText(/this accordion allows multiple items/i);
			await expect(documentationContent).toBeVisible();
			await expect(canvas.queryByText(/this is another section/i)).not.toBeInTheDocument();
			await expect(canvas.queryByText(/this behavior is achieved/i)).not.toBeInTheDocument();
		});

		// Open second item - should keep first open (multiple mode)
		await userEvent.click(settingsTrigger);

		await waitFor(async () => {
			const settingsContent = canvas.getByText(/this is another section/i);
			await expect(settingsContent).toBeVisible();
			// First item should still be open
			const documentationContent = canvas.getByText(/this accordion allows multiple items/i);
			await expect(documentationContent).toBeVisible();
			await expect(canvas.queryByText(/this behavior is achieved/i)).not.toBeInTheDocument();
		});

		// Open third item - should keep both previous open
		await userEvent.click(configurationTrigger);

		await waitFor(async () => {
			const configurationContent = canvas.getByText(/this behavior is achieved/i);
			await expect(configurationContent).toBeVisible();
			// Both previous items should still be open
			const documentationContent = canvas.getByText(/this accordion allows multiple items/i);
			await expect(documentationContent).toBeVisible();
			const settingsContent = canvas.getByText(/this is another section/i);
			await expect(settingsContent).toBeVisible();
		});

		// Close first item - others should remain open
		await userEvent.click(documentationTrigger);

		await waitFor(async () => {
			await expect(
				canvas.queryByText(/this accordion allows multiple items/i)
			).not.toBeInTheDocument();
			// Other items should still be open
			const settingsContent = canvas.getByText(/this is another section/i);
			await expect(settingsContent).toBeVisible();
			const configurationContent = canvas.getByText(/this behavior is achieved/i);
			await expect(configurationContent).toBeVisible();
		});
	}
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
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const refundTrigger = canvas.getByRole('button', { name: /what is your refund policy/i });
		const trackingTrigger = canvas.getByRole('button', { name: /how do i track my order/i });

		// Open first item
		await userEvent.click(refundTrigger);

		await waitFor(async () => {
			const refundContent = canvas.getByText(/we offer a 30-day money-back guarantee/i);
			await expect(refundContent).toBeVisible();
			await expect(canvas.queryByText(/once your order ships/i)).not.toBeInTheDocument();
			await expect(canvas.queryByText(/yes, we ship to most countries/i)).not.toBeInTheDocument();
		});

		// Click same item again - should NOT close it (non-collapsible)
		await userEvent.click(refundTrigger);

		await waitFor(async () => {
			const refundContent = canvas.getByText(/we offer a 30-day money-back guarantee/i);
			await expect(refundContent).toBeVisible();
			await expect(canvas.queryByText(/once your order ships/i)).not.toBeInTheDocument();
			await expect(canvas.queryByText(/yes, we ship to most countries/i)).not.toBeInTheDocument();
		});

		// Click second item - should close first and open second (single mode)
		await userEvent.click(trackingTrigger);

		await waitFor(async () => {
			const trackingContent = canvas.getByText(/once your order ships/i);
			await expect(trackingContent).toBeVisible();
			await expect(
				canvas.queryByText(/we offer a 30-day money-back guarantee/i)
			).not.toBeInTheDocument();
			await expect(canvas.queryByText(/yes, we ship to most countries/i)).not.toBeInTheDocument();
		});

		// Click same item again - should NOT close it (non-collapsible)
		await userEvent.click(trackingTrigger);

		await waitFor(async () => {
			const trackingContent = canvas.getByText(/once your order ships/i);
			await expect(trackingContent).toBeVisible();
			await expect(
				canvas.queryByText(/we offer a 30-day money-back guarantee/i)
			).not.toBeInTheDocument();
			await expect(canvas.queryByText(/yes, we ship to most countries/i)).not.toBeInTheDocument();
		});
	}
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
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const technicalSpecsTrigger = canvas.getByRole('button', { name: /technical specifications/i });
		const customerReviewsTrigger = canvas.getByRole('button', { name: /customer reviews/i });

		// Open technical specifications
		await userEvent.click(technicalSpecsTrigger);

		await waitFor(async () => {
			const dimensions = canvas.getByText(/height: 12.5 inches/i);
			await expect(dimensions).toBeVisible();
			await expect(canvas.queryByText(/excellent product/i)).not.toBeInTheDocument();
		});

		// Switch to customer reviews
		await userEvent.click(customerReviewsTrigger);

		await waitFor(async () => {
			const sarahReview = canvas.getByText(/excellent product/i);
			await expect(sarahReview).toBeVisible();
			await expect(canvas.queryByText(/height: 12.5 inches/i)).not.toBeInTheDocument();
		});

		// Switch back to technical specs
		await userEvent.click(technicalSpecsTrigger);

		await waitFor(async () => {
			const dimensions = canvas.getByText(/height: 12.5 inches/i);
			await expect(dimensions).toBeVisible();
			await expect(canvas.queryByText(/excellent product/i)).not.toBeInTheDocument();
		});
	}
};

export const CustomStyling: Story = {
	render: () => (
		<Accordion type='single' collapsible className='w-full max-w-md'>
			<AccordionItem value='item-1' className='border-2 border-blue-200 rounded-lg'>
				<AccordionTrigger className='px-4 py-3 text-blue-900 hover:text-blue-700'>
					<span className='flex items-center gap-2'>
						<span className='w-2 h-2 bg-blue-500 rounded-full'></span>
						Premium Features
					</span>
				</AccordionTrigger>
				<AccordionContent className='px-4'>
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
				<AccordionContent className='px-4'>
					<div className='bg-green-50 p-3 rounded'>
						<p className='text-green-800'>
							Basic features available for free users with limited access to core functionality.
						</p>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const premiumFeaturesTrigger = canvas.getByRole('button', { name: /premium features/i });
		const freeTierTrigger = canvas.getByRole('button', { name: /free tier/i });

		// Open premium features
		await userEvent.click(premiumFeaturesTrigger);

		await waitFor(async () => {
			const premiumContent = canvas.getByText(/access to premium features/i);
			await expect(premiumContent).toBeVisible();
			await expect(canvas.queryByText(/basic features available/i)).not.toBeInTheDocument();
		});

		// Switch to free tier
		await userEvent.click(freeTierTrigger);

		await waitFor(async () => {
			const freeTierContent = canvas.getByText(/basic features available/i);
			await expect(freeTierContent).toBeVisible();
			await expect(canvas.queryByText(/access to premium features/i)).not.toBeInTheDocument();
		});

		// Switch back to premium features
		await userEvent.click(premiumFeaturesTrigger);

		await waitFor(async () => {
			const premiumContent = canvas.getByText(/access to premium features/i);
			await expect(premiumContent).toBeVisible();
			await expect(canvas.queryByText(/basic features available/i)).not.toBeInTheDocument();
		});
	}
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
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const personalInfoTrigger = canvas.getByRole('button', { name: /personal information/i });
		const preferencesTrigger = canvas.getByRole('button', { name: /preferences/i });

		// Open personal information section
		await userEvent.click(personalInfoTrigger);

		await waitFor(async () => {
			// Test form interactions within accordion
			const nameInput = canvas.getByPlaceholderText(/enter your full name/i);
			const emailInput = canvas.getByPlaceholderText(/enter your email/i);

			// Type in form fields
			await userEvent.type(nameInput, 'John Doe');
			await userEvent.type(emailInput, 'john@example.com');

			// Verify form values
			await expect(nameInput).toHaveValue('John Doe');
			await expect(emailInput).toHaveValue('john@example.com');
		});

		// Switch to preferences section
		await userEvent.click(preferencesTrigger);

		await waitFor(async () => {
			// Test checkbox interactions
			const newsletterCheckbox = canvas.getByRole('checkbox', { name: /subscribe to newsletter/i });
			const notificationsCheckbox = canvas.getByRole('checkbox', {
				name: /enable push notifications/i
			});
			const themeSelect = canvas.getByRole('combobox', { name: /theme preference/i });

			// Check checkboxes
			await userEvent.click(newsletterCheckbox);
			await userEvent.click(notificationsCheckbox);

			await expect(newsletterCheckbox).toBeChecked();
			await expect(notificationsCheckbox).toBeChecked();

			// Test select dropdown
			await userEvent.selectOptions(themeSelect, 'dark');
			await expect(themeSelect).toHaveValue('dark');
		});

		// Switch back to personal info - form should retain values
		await userEvent.click(personalInfoTrigger);

		await waitFor(async () => {
			const nameInput = canvas.getByPlaceholderText(/enter your full name/i);
			const emailInput = canvas.getByPlaceholderText(/enter your email/i);
			await expect(nameInput).toHaveValue('John Doe');
			await expect(emailInput).toHaveValue('john@example.com');
		});
	}
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
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const activeProjectsTrigger = canvas.getByRole('button', { name: /active projects/i });
		const pendingReviewsTrigger = canvas.getByRole('button', { name: /pending reviews/i });
		const completedTasksTrigger = canvas.getByRole('button', { name: /completed tasks/i });

		// Open first item
		await userEvent.click(activeProjectsTrigger);

		await waitFor(async () => {
			const projectAlpha = canvas.getByText(/project alpha/i);
			await expect(projectAlpha).toBeVisible();
			await expect(canvas.queryByText(/code review #123/i)).not.toBeInTheDocument();
			await expect(canvas.queryByText(/all tasks have been completed/i)).not.toBeInTheDocument();
		});

		// Open second item - should keep first open (multiple mode)
		await userEvent.click(pendingReviewsTrigger);

		await waitFor(async () => {
			const codeReview = canvas.getByText(/code review #123/i);
			await expect(codeReview).toBeVisible();
			// First item should still be open
			const projectAlpha = canvas.getByText(/project alpha/i);
			await expect(projectAlpha).toBeVisible();
			await expect(canvas.queryByText(/all tasks have been completed/i)).not.toBeInTheDocument();
		});

		// Open third item - should keep both previous open
		await userEvent.click(completedTasksTrigger);

		await waitFor(async () => {
			const completedTasks = canvas.getByText(/all tasks have been completed/i);
			await expect(completedTasks).toBeVisible();
			// Both previous items should still be open
			const projectAlpha = canvas.getByText(/project alpha/i);
			await expect(projectAlpha).toBeVisible();
			const codeReview = canvas.getByText(/code review #123/i);
			await expect(codeReview).toBeVisible();
		});

		// Close first item - others should remain open
		await userEvent.click(activeProjectsTrigger);

		await waitFor(async () => {
			await expect(canvas.queryByText(/project alpha/i)).not.toBeInTheDocument();
			// Other items should still be open
			const codeReview = canvas.getByText(/code review #123/i);
			await expect(codeReview).toBeVisible();
			const completedTasks = canvas.getByText(/all tasks have been completed/i);
			await expect(completedTasks).toBeVisible();
		});
	}
};
