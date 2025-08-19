import type { Meta, StoryObj } from '@storybook/react';
import { UserIcon, BotIcon, HeartIcon, SettingsIcon } from 'lucide-react';

import { Avatar, AvatarImage, AvatarFallback } from './avatar';

const meta: Meta<typeof Avatar> = {
	title: 'Components/Avatar',
	component: Avatar,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		className: {
			control: 'text'
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Avatar>
			<AvatarImage
				src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=150&h=150&fit=crop&crop=face'
				alt='User'
				title='User'
			/>
			<AvatarFallback>JD</AvatarFallback>
		</Avatar>
	)
};

export const WithFallback: Story = {
	render: () => (
		<Avatar>
			<AvatarImage src='/broken-image.jpg' alt='User' title='User' />
			<AvatarFallback>JD</AvatarFallback>
		</Avatar>
	)
};

export const Large: Story = {
	render: () => (
		<Avatar className='size-16'>
			<AvatarImage
				src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=150&h=150&fit=crop&crop=face'
				alt='User'
				title='User'
			/>
			<AvatarFallback>JD</AvatarFallback>
		</Avatar>
	)
};

export const Small: Story = {
	render: () => (
		<Avatar className='size-6'>
			<AvatarImage
				src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=150&h=150&fit=crop&crop=face'
				alt='User'
				title='User'
			/>
			<AvatarFallback>JD</AvatarFallback>
		</Avatar>
	)
};

export const WithHoverScale: Story = {
	render: () => (
		<Avatar className='size-12 transition-transform duration-200 hover:scale-110 cursor-pointer'>
			<AvatarImage
				src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=150&h=150&fit=crop&crop=face'
				alt='User'
				title='User'
			/>
			<AvatarFallback>JD</AvatarFallback>
		</Avatar>
	)
};

export const WithHoverRotate: Story = {
	render: () => (
		<Avatar className='size-12 transition-transform duration-300 hover:rotate-12 cursor-pointer'>
			<AvatarImage
				src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=150&h=150&fit=crop&crop=face'
				alt='User'
				title='User'
			/>
			<AvatarFallback>JD</AvatarFallback>
		</Avatar>
	)
};

export const WithHoverGlow: Story = {
	render: () => (
		<Avatar className='size-12 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer'>
			<AvatarImage
				src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=150&h=150&fit=crop&crop=face'
				alt='User'
				title='User'
			/>
			<AvatarFallback>JD</AvatarFallback>
		</Avatar>
	)
};

export const WithUserIcon: Story = {
	render: () => (
		<Avatar>
			<AvatarImage
				src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=150&h=150&fit=crop&crop=face'
				alt='User'
				title='User'
			/>
			<AvatarFallback asChild>
				<UserIcon className='size-4' />
			</AvatarFallback>
		</Avatar>
	)
};

export const WithHeartIcon: Story = {
	render: () => (
		<Avatar>
			<AvatarImage src='/broken-image.jpg' alt='Heart' title='Heart' />
			<AvatarFallback asChild>
				<HeartIcon className='size-4 hover:text-red-500 transition-colors duration-200' />
			</AvatarFallback>
		</Avatar>
	)
};

export const SingleFallback: Story = {
	render: () => (
		<Avatar>
			<AvatarImage src='/broken-image.jpg' alt='User' title='User' />
			<AvatarFallback>JD</AvatarFallback>
		</Avatar>
	)
};

export const MultipleFallbacks: Story = {
	render: () => (
		<div className='flex gap-4'>
			<Avatar>
				<AvatarImage src='/broken-image.jpg' alt='User 1' title='User 1' />
				<AvatarFallback>JD</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarImage src='/broken-image.jpg' alt='User 2' title='User 2' />
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarImage src='/broken-image.jpg' alt='User 3' title='User 3' />
				<AvatarFallback>CD</AvatarFallback>
			</Avatar>
		</div>
	)
};

export const AvatarGroup: Story = {
	render: () => (
		<div className='flex -space-x-2'>
			<Avatar className='border-2 border-white'>
				<AvatarImage
					src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=150&h=150&fit=crop&crop=face'
					alt='User 1'
					title='User 1'
				/>
				<AvatarFallback>JD</AvatarFallback>
			</Avatar>
			<Avatar className='border-2 border-white'>
				<AvatarImage
					src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?&w=150&h=150&fit=crop&crop=face'
					alt='User 2'
					title='User 2'
				/>
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>
			<Avatar className='border-2 border-white'>
				<AvatarImage
					src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=150&h=150&fit=crop&crop=face'
					alt='User 3'
					title='User 3'
				/>
				<AvatarFallback>CD</AvatarFallback>
			</Avatar>
			<Avatar className='border-2 border-white'>
				<AvatarImage src='/broken-image.jpg' alt='User 4' title='User 4' />
				<AvatarFallback>EF</AvatarFallback>
			</Avatar>
		</div>
	)
};

export const AvatarGroupWithHover: Story = {
	render: () => (
		<div className='flex -space-x-2'>
			<Avatar className='border-2 border-white transition-transform duration-200 hover:scale-110 hover:z-10 cursor-pointer'>
				<AvatarImage
					src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=150&h=150&fit=crop&crop=face'
					alt='User 1'
					title='User 1'
				/>
				<AvatarFallback>JD</AvatarFallback>
			</Avatar>
			<Avatar className='border-2 border-white transition-transform duration-200 hover:scale-110 hover:z-10 cursor-pointer'>
				<AvatarImage
					src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?&w=150&h=150&fit=crop&crop=face'
					alt='User 2'
					title='User 2'
				/>
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>
			<Avatar className='border-2 border-white transition-transform duration-200 hover:scale-110 hover:z-10 cursor-pointer'>
				<AvatarImage
					src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=150&h=150&fit=crop&crop=face'
					alt='User 3'
					title='User 3'
				/>
				<AvatarFallback>CD</AvatarFallback>
			</Avatar>
			<Avatar className='border-2 border-white transition-transform duration-200 hover:scale-110 hover:z-10 cursor-pointer'>
				<AvatarImage src='/broken-image.jpg' alt='User 4' title='User 4' />
				<AvatarFallback>EF</AvatarFallback>
			</Avatar>
		</div>
	)
};

export const AvatarGroupWithIcons: Story = {
	render: () => (
		<div className='flex -space-x-2'>
			<Avatar className='border-2 border-white'>
				<AvatarImage
					src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=150&h=150&fit=crop&crop=face'
					alt='User 1'
					title='User 1'
				/>
				<AvatarFallback>JD</AvatarFallback>
			</Avatar>
			<Avatar className='border-2 border-white'>
				<AvatarImage src='/broken-image.jpg' alt='Bot' title='Bot' />
				<AvatarFallback asChild>
					<BotIcon className='size-4' />
				</AvatarFallback>
			</Avatar>
			<Avatar className='border-2 border-white'>
				<AvatarImage src='/broken-image.jpg' alt='Heart' title='Heart' />
				<AvatarFallback asChild>
					<HeartIcon className='size-4' />
				</AvatarFallback>
			</Avatar>
			<Avatar className='border-2 border-white'>
				<AvatarImage src='/broken-image.jpg' alt='Settings' />
				<AvatarFallback asChild>
					<SettingsIcon className='size-4' />
				</AvatarFallback>
			</Avatar>
		</div>
	)
};

export const StackedAvatars: Story = {
	render: () => (
		<div className='flex flex-col gap-2'>
			<Avatar>
				<AvatarImage
					src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=150&h=150&fit=crop&crop=face'
					alt='User 1'
					title='User 1'
				/>
				<AvatarFallback>JD</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarImage
					src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?&w=150&h=150&fit=crop&crop=face'
					alt='User 2'
					title='User 2'
				/>
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarImage
					src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=150&h=150&fit=crop&crop=face'
					alt='User 3'
					title='User 3'
				/>
				<AvatarFallback>CD</AvatarFallback>
			</Avatar>
		</div>
	)
};

export const InteractiveExample: Story = {
	render: () => (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center gap-4'>
				<Avatar className='size-12 transition-all duration-200 hover:scale-110 hover:shadow-lg cursor-pointer'>
					<AvatarImage
						src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=150&h=150&fit=crop&crop=face'
						alt='User'
						title='User'
					/>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
				<div>
					<p className='font-medium'>John Doe</p>
					<p className='text-sm text-muted-foreground'>Online</p>
				</div>
			</div>
		</div>
	)
};
