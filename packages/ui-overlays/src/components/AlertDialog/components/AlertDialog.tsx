import { Dialog } from '~/components/Dialog/components/Dialog';

import type { IAlertDialog } from '~/components/AlertDialog/AlertDialog.types';

/**
 * Root of an alert dialog: a modal that asks one question and carries exactly two answers.
 *
 * Reach for this over `Dialog` when the confirming action destroys something. It differs from a
 * `Dialog` in four ways, none of them configurable: it is announced as `alertdialog`, it has no
 * close button, a backdrop click will not dismiss it, and focus lands on the cancelling action so a
 * reflexive Enter backs out.
 *
 * Open state is `Dialog`'s, unchanged — controlled `open`, uncontrolled `defaultOpen`, or the
 * imperative handle — because nothing about an alert dialog changes how it is driven.
 *
 * @example
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger asChild>
 *     <Button variant='destructive'>Delete project</Button>
 *   </AlertDialogTrigger>
 *   <AlertDialogContent
 *     title='Delete this project?'
 *     description='Everything in it goes too. This cannot be undone.'
 *     cancel={<Button variant='outline'>Keep it</Button>}
 *     confirm={
 *       <AlertDialogClose asChild>
 *         <Button variant='destructive' onClick={() => deleteProject(id)}>Delete</Button>
 *       </AlertDialogClose>
 *     }
 *   />
 * </AlertDialog>
 * ```
 */
export const AlertDialog = (props: IAlertDialog) => {
	return <Dialog {...props} />;
};

AlertDialog.displayName = 'AlertDialog';
