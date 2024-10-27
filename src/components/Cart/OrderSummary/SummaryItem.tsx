import {currencyFormatter} from '../../../utils/helperFunctions';

type SummaryItemProps = {
	label: string;
	amount: number;
	isBold?: boolean;
};

export const SummaryItem = ({label, amount, isBold = false}: SummaryItemProps) => (
	<li className={`flex flex-wrap gap-4 text-sm ${isBold ? 'font-bold' : ''}`}>
		{label} <span className='ml-auto font-bold'>{currencyFormatter(amount)}</span>
	</li>
);
