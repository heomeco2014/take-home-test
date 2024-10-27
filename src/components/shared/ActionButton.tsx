import React from 'react';

type ActionButtonProps = {
	onClick?: () => void;
	variant?: 'primary' | 'secondary';
	children: React.ReactNode;
	disabled?: boolean;
};

const ActionButton = ({onClick, variant = 'primary', children, disabled = false}: ActionButtonProps) => {
	const baseStyles = 'text-sm px-4 py-2.5 w-full font-semibold tracking-wide rounded-md';
	const variants = {
		primary: 'bg-gray-800 hover:bg-gray-900 text-white disabled:bg-gray-400',
		secondary: 'bg-transparent text-gray-800 border border-gray-300 disabled:text-gray-400 disabled:border-gray-200',
	};

	return (
		<button type='button' className={`${baseStyles} ${variants[variant]}`} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};

export default ActionButton;
