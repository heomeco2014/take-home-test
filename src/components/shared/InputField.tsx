import {ComponentType} from 'react';

export type InputFieldProps = {
	type: 'text' | 'email' | 'number';
	placeholder: string;
	icon: ComponentType;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField = ({type, placeholder, icon: Icon, value, onChange}: InputFieldProps) => (
	<div className='relative flex items-center'>
		<input type={type} placeholder={placeholder} value={value} onChange={onChange} className='px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none' />
		<Icon />
	</div>
);
