import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Label } from '@repo/ui-core';
import {
	Dialog,
	DialogContent,
	DialogContentArea,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@repo/ui-overlays';

import { Input } from '@repo/ui-forms';

const meta: Meta<typeof Dialog> = {
	title: 'Components/Dialog',
	component: Dialog,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		open: {
			control: 'boolean',
			description: 'Controls the open state of the dialog'
		},
		onOpenChange: {
			action: 'onOpenChange',
			description: 'Called when the dialog open state changes'
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledDialogWithFormComponent = () => {
	const [open, setOpen] = React.useState(false);
	const [formData, setFormData] = React.useState({ name: '', email: '' });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form submitted:', formData);
		setOpen(false);
		// Reset form
		setFormData({ name: '', email: '' });
	};

	return (
		<div className='space-y-4'>
			<Button onClick={() => setOpen(true)}>Open Form Dialog</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Controlled Form Dialog</DialogTitle>
						<DialogDescription>
							This form dialog is controlled by React state and handles form submission.
						</DialogDescription>
					</DialogHeader>
					<DialogContentArea>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div className='grid gap-2'>
								<Label htmlFor='controlled-name'>Name</Label>
								<Input
									id='controlled-name'
									value={formData.name}
									onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
									required
								/>
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='controlled-email'>Email</Label>
								<Input
									id='controlled-email'
									type='email'
									value={formData.email}
									onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
									required
								/>
							</div>
						</form>
					</DialogContentArea>
					<DialogFooter>
						<Button variant='outline' onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSubmit}>Submit</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export const ControlledDialogWithForm: Story = {
	render: () => <ControlledDialogWithFormComponent />
};
