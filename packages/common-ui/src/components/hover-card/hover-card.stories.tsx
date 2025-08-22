import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarIcon, GitForkIcon, InfoIcon, StarIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/avatar/avatar';
import { Badge } from '~/components/badge/badge';
import { Button } from '~/components/button/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/hover-card/hover-card';

const meta: Meta = {
	title: 'Components/HoverCard',
	component: HoverCard,
	subcomponents: { HoverCardTrigger, HoverCardContent },
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A hover card component that displays rich content when hovering over a trigger element. Built on Radix UI primitives with automatic positioning and collision detection.'
			}
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default hover card with user profile (based on shadcn/ui example)
export const Default: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button variant='link'>@nextjs</Button>
			</HoverCardTrigger>
			<HoverCardContent className='w-80'>
				<div className='flex justify-between space-x-4'>
					<Avatar>
						<AvatarImage src='https://github.com/vercel.png' alt='Vercel' />
						<AvatarFallback>VC</AvatarFallback>
					</Avatar>
					<div className='space-y-1'>
						<h4 className='text-sm font-semibold'>@nextjs</h4>
						<p className='text-sm'>The React Framework – created and maintained by @vercel.</p>
						<div className='flex items-center pt-2'>
							<CalendarIcon className='mr-2 h-4 w-4 opacity-70' />
							<span className='text-xs text-muted-foreground'>Joined December 2021</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
};

// User profile hover card
export const UserProfile: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button variant='link' className='p-0 h-auto'>
					<Avatar className='h-8 w-8 mr-2'>
						<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<span>@shadcn</span>
				</Button>
			</HoverCardTrigger>
			<HoverCardContent className='w-80'>
				<div className='flex justify-between space-x-4'>
					<Avatar>
						<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className='space-y-1'>
						<h4 className='text-sm font-semibold'>@shadcn</h4>
						<p className='text-sm'>
							The React component library and design system that&apos;s taking the web by storm.
						</p>
						<div className='flex items-center pt-2'>
							<CalendarIcon className='mr-2 h-4 w-4 opacity-70' />
							<span className='text-xs text-muted-foreground'>Joined March 2022</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
};

// Repository hover card
export const RepositoryInfo: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button variant='link'>shadcn/ui</Button>
			</HoverCardTrigger>
			<HoverCardContent className='w-96'>
				<div className='space-y-3'>
					<div className='flex items-start justify-between'>
						<div>
							<h4 className='text-sm font-semibold'>shadcn/ui</h4>
							<p className='text-sm text-muted-foreground'>
								Beautifully designed components that you can copy and paste into your apps.
							</p>
						</div>
						<Badge variant='secondary'>Public</Badge>
					</div>
					<div className='flex items-center space-x-4 text-sm text-muted-foreground'>
						<div className='flex items-center'>
							<div className='w-3 h-3 rounded-full bg-blue-500 mr-1'></div>
							<span>TypeScript</span>
						</div>
						<div className='flex items-center'>
							<StarIcon className='mr-1 h-4 w-4' />
							<span>54.2k</span>
						</div>
						<div className='flex items-center'>
							<GitForkIcon className='mr-1 h-4 w-4' />
							<span>3.1k</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
};

// Simple info hover card
export const InfoCard: Story = {
	render: () => (
		<div className='flex items-center space-x-2'>
			<span>Hover for more information</span>
			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='ghost' size='icon' className='h-5 w-5'>
						<InfoIcon className='h-4 w-4' />
						<span className='sr-only'>More info</span>
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className='w-72'>
					<div className='space-y-2'>
						<h4 className='text-sm font-semibold'>Additional Information</h4>
						<p className='text-sm text-muted-foreground'>
							This is a simple hover card that provides additional context or help information when
							you hover over the info icon.
						</p>
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
	)
};

// Product card
export const ProductCard: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button variant='outline' className='h-auto p-4 flex flex-col items-start'>
					<div className='text-sm font-medium'>MacBook Pro</div>
					<div className='text-xs text-muted-foreground'>Hover for details</div>
				</Button>
			</HoverCardTrigger>
			<HoverCardContent className='w-80'>
				<div className='space-y-3'>
					<div className='aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center'>
						<span className='text-sm text-muted-foreground'>Product Image</span>
					</div>
					<div>
						<h4 className='text-sm font-semibold'>MacBook Pro 14&quot;</h4>
						<p className='text-sm text-muted-foreground mt-1'>
							Supercharged by M3 Pro and M3 Max chips. Built for all types of creatives, including
							developers, photographers, filmmakers, 3D artists, music producers, and more.
						</p>
						<div className='flex items-center justify-between mt-3'>
							<span className='text-lg font-bold'>$1,999</span>
							<Button size='sm'>View Details</Button>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
};

// Statistics hover card
export const StatsCard: Story = {
	render: () => (
		<div className='p-4 border rounded-lg'>
			<div className='flex items-center justify-between'>
				<span className='text-sm font-medium'>Monthly Revenue</span>
				<HoverCard>
					<HoverCardTrigger asChild>
						<Button variant='ghost' size='icon' className='h-5 w-5'>
							<InfoIcon className='h-4 w-4' />
						</Button>
					</HoverCardTrigger>
					<HoverCardContent className='w-72'>
						<div className='space-y-3'>
							<h4 className='text-sm font-semibold'>Revenue Breakdown</h4>
							<div className='space-y-2'>
								<div className='flex justify-between text-sm'>
									<span>Subscriptions</span>
									<span className='font-medium'>$12,400</span>
								</div>
								<div className='flex justify-between text-sm'>
									<span>One-time purchases</span>
									<span className='font-medium'>$3,200</span>
								</div>
								<div className='flex justify-between text-sm'>
									<span>Partnerships</span>
									<span className='font-medium'>$1,800</span>
								</div>
								<hr className='my-2' />
								<div className='flex justify-between text-sm font-semibold'>
									<span>Total</span>
									<span>$17,400</span>
								</div>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
			</div>
			<div className='text-2xl font-bold mt-2'>$17,400</div>
			<div className='text-sm text-green-600 mt-1'>+12.5% from last month</div>
		</div>
	)
};

// Team member hover card
export const TeamMember: Story = {
	render: () => (
		<div className='flex gap-4'>
			{[
				{ name: 'Alice Johnson', role: 'Designer', avatar: 'AJ', color: 'bg-red-500' },
				{ name: 'Bob Smith', role: 'Developer', avatar: 'BS', color: 'bg-blue-500' },
				{ name: 'Carol Davis', role: 'Manager', avatar: 'CD', color: 'bg-green-500' }
			].map((member, index) => (
				<HoverCard key={index}>
					<HoverCardTrigger asChild>
						<Button
							variant='ghost'
							className='relative h-10 w-10 rounded-full p-0 border-2 border-background'
						>
							<Avatar className='h-8 w-8'>
								<AvatarFallback className={member.color + ' text-white'}>
									{member.avatar}
								</AvatarFallback>
							</Avatar>
						</Button>
					</HoverCardTrigger>
					<HoverCardContent className='w-64'>
						<div className='flex items-center space-x-3'>
							<Avatar>
								<AvatarFallback className={member.color + ' text-white'}>
									{member.avatar}
								</AvatarFallback>
							</Avatar>
							<div>
								<h4 className='text-sm font-semibold'>{member.name}</h4>
								<p className='text-sm text-muted-foreground'>{member.role}</p>
								<div className='flex items-center mt-2'>
									<div className='w-2 h-2 bg-green-500 rounded-full mr-2'></div>
									<span className='text-xs text-muted-foreground'>Online</span>
								</div>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
			))}
		</div>
	)
};

// Link preview hover card
export const LinkPreview: Story = {
	render: () => (
		<div className='max-w-lg p-4'>
			<p className='text-sm'>
				Check out this amazing article about{' '}
				<HoverCard>
					<HoverCardTrigger asChild>
						<Button variant='link' className='p-0 h-auto text-blue-600 underline'>
							React Server Components
						</Button>
					</HoverCardTrigger>
					<HoverCardContent className='w-96'>
						<div className='space-y-3'>
							<div className='aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-md flex items-center justify-center'>
								<span className='text-sm text-muted-foreground'>Article Preview</span>
							</div>
							<div>
								<h4 className='text-sm font-semibold'>Understanding React Server Components</h4>
								<p className='text-sm text-muted-foreground mt-1'>
									A comprehensive guide to React Server Components, how they work, and why
									they&apos;re game-changing for React applications.
								</p>
								<div className='flex items-center mt-3 text-xs text-muted-foreground'>
									<span>react.dev</span>
									<span className='mx-2'>•</span>
									<span>5 min read</span>
									<span className='mx-2'>•</span>
									<span>Dec 2023</span>
								</div>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>{' '}
				and how they can improve your application&apos;s performance.
			</p>
		</div>
	)
};

// Custom delays
export const CustomDelays: Story = {
	render: () => (
		<div className='flex gap-4'>
			<HoverCard openDelay={0} closeDelay={0}>
				<HoverCardTrigger asChild>
					<Button variant='outline'>Instant (0ms)</Button>
				</HoverCardTrigger>
				<HoverCardContent className='w-64'>
					<div className='space-y-2'>
						<h4 className='text-sm font-semibold'>Instant Hover</h4>
						<p className='text-sm text-muted-foreground'>
							This hover card appears and disappears instantly with no delay.
						</p>
					</div>
				</HoverCardContent>
			</HoverCard>

			<HoverCard openDelay={500} closeDelay={300}>
				<HoverCardTrigger asChild>
					<Button variant='outline'>Delayed (500ms)</Button>
				</HoverCardTrigger>
				<HoverCardContent className='w-64'>
					<div className='space-y-2'>
						<h4 className='text-sm font-semibold'>Delayed Hover</h4>
						<p className='text-sm text-muted-foreground'>
							This hover card has a 500ms open delay and 300ms close delay.
						</p>
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
	)
};

// Different alignments and sides
export const Positioning: Story = {
	render: () => (
		<div className='grid grid-cols-3 gap-4 p-8'>
			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>Top</Button>
				</HoverCardTrigger>
				<HoverCardContent side='top' className='w-48'>
					<div className='text-center'>
						<h4 className='text-sm font-semibold'>Top Position</h4>
						<p className='text-sm text-muted-foreground'>Appears above the trigger</p>
					</div>
				</HoverCardContent>
			</HoverCard>

			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>Right</Button>
				</HoverCardTrigger>
				<HoverCardContent side='right' className='w-48'>
					<div className='text-center'>
						<h4 className='text-sm font-semibold'>Right Position</h4>
						<p className='text-sm text-muted-foreground'>Appears to the right</p>
					</div>
				</HoverCardContent>
			</HoverCard>

			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>Bottom</Button>
				</HoverCardTrigger>
				<HoverCardContent side='bottom' className='w-48'>
					<div className='text-center'>
						<h4 className='text-sm font-semibold'>Bottom Position</h4>
						<p className='text-sm text-muted-foreground'>Appears below the trigger</p>
					</div>
				</HoverCardContent>
			</HoverCard>

			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>Left</Button>
				</HoverCardTrigger>
				<HoverCardContent side='left' className='w-48'>
					<div className='text-center'>
						<h4 className='text-sm font-semibold'>Left Position</h4>
						<p className='text-sm text-muted-foreground'>Appears to the left</p>
					</div>
				</HoverCardContent>
			</HoverCard>

			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>Start Align</Button>
				</HoverCardTrigger>
				<HoverCardContent align='start' className='w-48'>
					<div className='text-center'>
						<h4 className='text-sm font-semibold'>Start Aligned</h4>
						<p className='text-sm text-muted-foreground'>Aligned to the start</p>
					</div>
				</HoverCardContent>
			</HoverCard>

			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>End Align</Button>
				</HoverCardTrigger>
				<HoverCardContent align='end' className='w-48'>
					<div className='text-center'>
						<h4 className='text-sm font-semibold'>End Aligned</h4>
						<p className='text-sm text-muted-foreground'>Aligned to the end</p>
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
	)
};

// Arrow indicators showcase
export const WithArrows: Story = {
	render: () => (
		<div className='grid grid-cols-2 gap-8 p-8'>
			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>With Arrow (Top)</Button>
				</HoverCardTrigger>
				<HoverCardContent side='top' className='w-64'>
					<div className='space-y-2'>
						<h4 className='text-sm font-semibold'>Arrow Indicator</h4>
						<p className='text-sm text-muted-foreground'>
							This hover card has an arrow pointing to the trigger element for better visual
							connection.
						</p>
					</div>
				</HoverCardContent>
			</HoverCard>

			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>With Arrow (Bottom)</Button>
				</HoverCardTrigger>
				<HoverCardContent side='bottom' className='w-64'>
					<div className='space-y-2'>
						<h4 className='text-sm font-semibold'>Arrow Indicator</h4>
						<p className='text-sm text-muted-foreground'>
							The arrow automatically adjusts its position based on the hover card placement.
						</p>
					</div>
				</HoverCardContent>
			</HoverCard>

			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>With Arrow (Left)</Button>
				</HoverCardTrigger>
				<HoverCardContent side='left' className='w-64'>
					<div className='space-y-2'>
						<h4 className='text-sm font-semibold'>Arrow Indicator</h4>
						<p className='text-sm text-muted-foreground'>
							Arrows work on all sides: top, bottom, left, and right.
						</p>
					</div>
				</HoverCardContent>
			</HoverCard>

			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>With Arrow (Right)</Button>
				</HoverCardTrigger>
				<HoverCardContent side='right' className='w-64'>
					<div className='space-y-2'>
						<h4 className='text-sm font-semibold'>Arrow Indicator</h4>
						<p className='text-sm text-muted-foreground'>
							The arrow includes proper border styling to match the hover card design.
						</p>
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
	)
};

// Custom styling examples
export const CustomStyling: Story = {
	render: () => (
		<div className='flex flex-wrap gap-6 p-8'>
			{/* Dark theme */}
			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>Dark Theme</Button>
				</HoverCardTrigger>
				<HoverCardContent className='bg-slate-900 text-slate-100 border-slate-700 [--hover-card-bg:theme(colors.slate.900)] [--hover-card-border:theme(colors.slate.700)]'>
					<div className='space-y-2'>
						<h4 className='text-sm font-semibold text-slate-100'>Dark Theme Card</h4>
						<p className='text-sm text-slate-300'>
							Custom dark background with matching arrow colors using CSS custom properties.
						</p>
					</div>
				</HoverCardContent>
			</HoverCard>

			{/* Blue theme */}
			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>Blue Theme</Button>
				</HoverCardTrigger>
				<HoverCardContent className='bg-blue-950 text-blue-50 border-blue-800 [--hover-card-bg:theme(colors.blue.950)] [--hover-card-border:theme(colors.blue.800)]'>
					<div className='space-y-2'>
						<h4 className='text-sm font-semibold text-blue-50'>Blue Theme Card</h4>
						<p className='text-sm text-blue-200'>
							Beautiful blue gradient with custom arrow styling that matches perfectly.
						</p>
					</div>
				</HoverCardContent>
			</HoverCard>

			{/* Green theme */}
			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>Green Theme</Button>
				</HoverCardTrigger>
				<HoverCardContent className='bg-emerald-950 text-emerald-50 border-emerald-800 [--hover-card-bg:theme(colors.emerald.950)] [--hover-card-border:theme(colors.emerald.800)]'>
					<div className='space-y-2'>
						<h4 className='text-sm font-semibold text-emerald-50'>Green Theme Card</h4>
						<p className='text-sm text-emerald-200'>
							Fresh emerald styling with arrows that automatically inherit the background color.
						</p>
					</div>
				</HoverCardContent>
			</HoverCard>

			{/* Gradient theme */}
			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>Gradient Theme</Button>
				</HoverCardTrigger>
				<HoverCardContent className='bg-gradient-to-br from-purple-900 to-pink-900 text-white border-purple-700 [--hover-card-bg:theme(colors.purple.900)] [--hover-card-border:theme(colors.purple.700)]'>
					<div className='space-y-2'>
						<h4 className='text-sm font-semibold text-white'>Gradient Theme Card</h4>
						<p className='text-sm text-purple-100'>
							Stunning gradient background with custom arrow positioning and colors.
						</p>
					</div>
				</HoverCardContent>
			</HoverCard>

			{/* Warning theme */}
			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>Warning Theme</Button>
				</HoverCardTrigger>
				<HoverCardContent className='bg-amber-50 text-amber-900 border-amber-200 [--hover-card-bg:theme(colors.amber.50)] [--hover-card-border:theme(colors.amber.200)]'>
					<div className='space-y-2'>
						<h4 className='text-sm font-semibold text-amber-900'>Warning Theme Card</h4>
						<p className='text-sm text-amber-700'>
							Light warning colors with subtle borders and perfectly matched arrow styling.
						</p>
					</div>
				</HoverCardContent>
			</HoverCard>

			{/* Success theme */}
			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant='outline'>Success Theme</Button>
				</HoverCardTrigger>
				<HoverCardContent className='bg-green-50 text-green-900 border-green-200 [--hover-card-bg:theme(colors.green.50)] [--hover-card-border:theme(colors.green.200)]'>
					<div className='space-y-2'>
						<h4 className='text-sm font-semibold text-green-900'>Success Theme Card</h4>
						<p className='text-sm text-green-700'>
							Clean success styling with light backgrounds and custom arrow integration.
						</p>
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
	)
};
