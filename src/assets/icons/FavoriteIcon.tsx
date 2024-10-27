import * as React from 'react';
import {JSX} from 'react/jsx-runtime';
const FavIcon = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2} {...props}>
		<path strokeLinecap='round' strokeLinejoin='round' d='M5.121 20.364L12 14.486l6.879 5.878c.705.603 1.798.077 1.798-.825V8.486c0-1.104-.896-2-2-2H6c-1.104 0-2 .896-2 2v11.054c0 .902 1.093 1.428 1.798.824z' />
	</svg>
);
export default FavIcon;
