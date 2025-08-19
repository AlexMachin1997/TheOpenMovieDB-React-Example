import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '~/components/skeleton/skeleton';
import { Avatar, AvatarFallback } from '~/components/avatar/avatar';

const meta: Meta<typeof Skeleton> = {
	title: 'Components/Skeleton',
	component: Skeleton,
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
	render: () => <Skeleton className='h-4 w-[250px]' />
};

export const Sizes: Story = {
	render: () => (
		<div className='flex flex-col gap-4'>
			<Skeleton className='h-2 w-[200px]' />
			<Skeleton className='h-4 w-[250px]' />
			<Skeleton className='h-6 w-[300px]' />
			<Skeleton className='h-8 w-[350px]' />
		</div>
	)
};

export const Shapes: Story = {
	render: () => (
		<div className='flex items-center gap-4'>
			<Skeleton className='h-12 w-12 rounded-full' />
			<Skeleton className='h-12 w-12 rounded-lg' />
			<Skeleton className='h-12 w-12 rounded-md' />
			<Skeleton className='h-12 w-12 rounded-none' />
		</div>
	)
};

export const AvatarSkeleton: Story = {
	render: () => (
		<div className='flex items-center gap-4'>
			<Skeleton className='h-10 w-10 rounded-full' />
			<div className='space-y-2'>
				<Skeleton className='h-4 w-[200px]' />
				<Skeleton className='h-4 w-[160px]' />
			</div>
		</div>
	)
};

export const CardSkeleton: Story = {
	render: () => (
		<div className='flex flex-col space-y-3'>
			<Skeleton className='h-[125px] w-[250px] rounded-xl' />
			<div className='space-y-2'>
				<Skeleton className='h-4 w-[250px]' />
				<Skeleton className='h-4 w-[200px]' />
			</div>
		</div>
	)
};

export const FormSkeleton: Story = {
	render: () => (
		<div className='w-[350px] space-y-4'>
			<div className='space-y-2'>
				<Skeleton className='h-4 w-[100px]' />
				<Skeleton className='h-10 w-full' />
			</div>
			<div className='space-y-2'>
				<Skeleton className='h-4 w-[100px]' />
				<Skeleton className='h-10 w-full' />
			</div>
			<div className='space-y-2'>
				<Skeleton className='h-4 w-[100px]' />
				<Skeleton className='h-20 w-full' />
			</div>
			<Skeleton className='h-10 w-[100px]' />
		</div>
	)
};

export const TableSkeleton: Story = {
	render: () => (
		<div className='w-full max-w-md space-y-3'>
			<Skeleton className='h-4 w-[250px]' />
			<div className='space-y-2'>
				<Skeleton className='h-12 w-full' />
				<Skeleton className='h-12 w-full' />
				<Skeleton className='h-12 w-full' />
			</div>
		</div>
	)
};

export const ListSkeleton: Story = {
	render: () => (
		<div className='w-full max-w-sm space-y-4'>
			{Array.from({ length: 4 }).map((_, i) => (
				<div key={i} className='flex items-center space-x-4'>
					<Skeleton className='h-12 w-12 rounded-full' />
					<div className='space-y-2'>
						<Skeleton className='h-4 w-[200px]' />
						<Skeleton className='h-4 w-[150px]' />
					</div>
				</div>
			))}
		</div>
	)
};

export const WithActualAvatar: Story = {
	render: () => (
		<div className='flex items-center space-x-4'>
			<Avatar>
				<AvatarFallback>
					<Skeleton className='h-full w-full rounded-full' />
				</AvatarFallback>
			</Avatar>
			<div className='space-y-2'>
				<Skeleton className='h-4 w-[200px]' />
				<Skeleton className='h-4 w-[160px]' />
			</div>
		</div>
	)
};

export const LoadingStates: Story = {
	render: () => (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'>
			{/* Profile Loading */}
			<div className='space-y-4'>
				<h3 className='text-sm font-medium'>Profile Loading</h3>
				<div className='flex items-center space-x-4'>
					<Skeleton className='h-16 w-16 rounded-full' />
					<div className='space-y-2'>
						<Skeleton className='h-4 w-[180px]' />
						<Skeleton className='h-4 w-[140px]' />
						<Skeleton className='h-3 w-[100px]' />
					</div>
				</div>
			</div>

			{/* Article Loading */}
			<div className='space-y-4'>
				<h3 className='text-sm font-medium'>Article Loading</h3>
				<div className='space-y-3'>
					<Skeleton className='h-6 w-[300px]' />
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-[250px]' />
				</div>
			</div>

			{/* Button Loading */}
			<div className='space-y-4'>
				<h3 className='text-sm font-medium'>Button Loading</h3>
				<div className='flex gap-3'>
					<Skeleton className='h-10 w-[100px]' />
					<Skeleton className='h-10 w-[120px]' />
					<Skeleton className='h-10 w-10 rounded-md' />
				</div>
			</div>

			{/* Input Loading */}
			<div className='space-y-4'>
				<h3 className='text-sm font-medium'>Form Loading</h3>
				<div className='space-y-3'>
					<Skeleton className='h-4 w-[80px]' />
					<Skeleton className='h-10 w-full' />
					<Skeleton className='h-4 w-[120px]' />
					<Skeleton className='h-10 w-full' />
				</div>
			</div>
		</div>
	)
};

export const AnimationSpeed: Story = {
	render: () => (
		<div className='space-y-4'>
			<div className='space-y-2'>
				<p className='text-sm text-muted-foreground'>Normal Speed</p>
				<Skeleton className='h-4 w-[250px]' />
			</div>
			<div className='space-y-2'>
				<p className='text-sm text-muted-foreground'>Slow Animation</p>
				<Skeleton className='h-4 w-[250px] [animation-duration:2s]' />
			</div>
			<div className='space-y-2'>
				<p className='text-sm text-muted-foreground'>Fast Animation</p>
				<Skeleton className='h-4 w-[250px] [animation-duration:0.5s]' />
			</div>
		</div>
	)
};
