interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	labelClassName?: string;
	containerClassName?: string;
}

const Input = ({
	type = 'text',
	label = '',
	id = '',
	placeholder = '',
	labelClassName = '',
	containerClassName = '',
	...props
}: Props) => (
	<div className={containerClassName}>
		<label htmlFor={id} className={labelClassName}>
			{label}
		</label>
		<input
			type={type}
			id={id}
			className='block w-full appearance-none rounded-lg border-2 border-solid border-gray-300 bg-white bg-clip-padding p-2 text-base font-light leading-[1.5] text-black outline-none transition-transform focus:border-secondary'
			placeholder={placeholder}
			{...props}
		/>
	</div>
);

export default Input;
