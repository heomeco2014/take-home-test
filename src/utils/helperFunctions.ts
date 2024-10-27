export const formatTextCount = (count: number, text: string): string => {
	return count > 1 ? `${text}s` : `${text}`;
};

export const currencyFormatter = (num: number) => {
	return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
