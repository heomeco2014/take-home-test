import React, {useState, useCallback, useEffect, useRef} from 'react';

interface PriceRangeSliderProps {
	min?: number;
	max?: number;
	step?: number;
	onChange?: (values: {min: number; max: number}) => void;
	className?: string;
}

const formatPrice = (price: number) =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price);

export default function PriceRangeSlider({min = 0, max = 1000, step = 20, onChange, className = ''}: PriceRangeSliderProps) {
	const [minValue, setMinValue] = useState(min);
	const [maxValue, setMaxValue] = useState(max);
	const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
	const [inputValues, setInputValues] = useState({min: min.toString(), max: max.toString()});
	const callbackRef = useRef(onChange);
	// Calculate slider percentages
	const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

	// Handle slider change
	const handleSliderChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>, isMin: boolean) => {
			const value = Number(e.target.value);

			if (isMin) {
				const newValue = Math.min(value, maxValue - step);
				setMinValue(newValue);
				setInputValues(prev => ({...prev, min: newValue.toString()}));
			} else {
				const newValue = Math.max(value, minValue + step);
				setMaxValue(newValue);
				setInputValues(prev => ({...prev, max: newValue.toString()}));
			}
		},
		[maxValue, minValue, step]
	);

	// Handle input change
	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, isMin: boolean) => {
		const value = e.target.value.replace(/\D/g, ''); // Allow only numbers
		setInputValues(prev => ({
			...prev,
			[isMin ? 'min' : 'max']: value,
		}));
	}, []);

	// Handle input blur
	const handleInputBlur = useCallback(
		(isMin: boolean) => {
			const value = Number(inputValues[isMin ? 'min' : 'max']);
			const validValue = Math.min(Math.max(value, min), max);

			if (isMin) {
				const newMin = Math.min(validValue, maxValue - step);
				setMinValue(newMin);
				setInputValues(prev => ({...prev, min: newMin.toString()}));
			} else {
				const newMax = Math.max(validValue, minValue + step);
				setMaxValue(newMax);
				setInputValues(prev => ({...prev, max: newMax.toString()}));
			}
		},
		[inputValues, max, maxValue, min, minValue, step]
	);

	// Notify parent of changes
	useEffect(() => {
		callbackRef.current?.({min: minValue, max: maxValue});
	}, [minValue, maxValue]);

	return (
		<div className={`space-y-6 ${className}`}>
			{/* Input Fields */}
			<div className='flex justify-between gap-4'>
				<div className='space-y-1'>
					<label htmlFor='min-price' className='block text-sm font-medium text-gray-700'>
						Min Price
					</label>
					<div className='relative'>
						<span className='absolute inset-y-0 flex items-center text-gray-500 left-3'>$</span>
						<input id='min-price' type='text' value={inputValues.min} onChange={e => handleInputChange(e, true)} onBlur={() => handleInputBlur(true)} className='w-24 pl-7 pr-3 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500' />
					</div>
				</div>
				<div className='space-y-1'>
					<label htmlFor='max-price' className='block text-sm font-medium text-gray-700'>
						Max Price
					</label>
					<div className='relative'>
						<span className='absolute inset-y-0 flex items-center text-gray-500 left-3'>$</span>
						<input id='max-price' type='text' value={inputValues.max} onChange={e => handleInputChange(e, false)} onBlur={() => handleInputBlur(false)} className='w-24 pl-7 pr-3 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500' />
					</div>
				</div>
			</div>

			{/* Slider Container */}
			<div className='relative pt-2 pb-8'>
				<div className='relative h-2'>
					{/* Min Range Input */}
					<input type='range' value={minValue} min={min} max={max} step={step} onChange={e => handleSliderChange(e, true)} onMouseDown={() => setIsDragging('min')} onMouseUp={() => setIsDragging(null)} onTouchStart={() => setIsDragging('min')} onTouchEnd={() => setIsDragging(null)} className='track-thumb' aria-label='Minimum price' />

					{/* Max Range Input */}
					<input type='range' value={maxValue} min={min} max={max} step={step} onChange={e => handleSliderChange(e, false)} onMouseDown={() => setIsDragging('max')} onMouseUp={() => setIsDragging(null)} onTouchStart={() => setIsDragging('max')} onTouchEnd={() => setIsDragging(null)} className='track-thumb' aria-label='Maximum price' />

					{/* Track and Progress Bar */}
					<div className='absolute w-full h-2 bg-gray-200 rounded-full '>
						<div
							className='absolute h-full transition-all duration-150 bg-blue-500 rounded-full '
							style={{
								left: `${getPercent(minValue)}%`,
								right: `${100 - getPercent(maxValue)}%`,
							}}
						/>
					</div>
				</div>

				{/* Price Labels */}
				<div className='relative mt-6'>
					<div
						className={`absolute text-sm font-medium text-blue-500 transition-transform duration-150 ${isDragging === 'min' ? 'scale-110' : ''}`}
						style={{
							left: `${getPercent(minValue)}%`,
							transform: 'translateX(-50%)',
						}}>
						{formatPrice(minValue)}
					</div>
					<div
						className={`absolute text-sm font-medium text-blue-500 transition-transform duration-150 ${isDragging === 'max' ? 'scale-110' : ''}`}
						style={{
							left: `${getPercent(maxValue)}%`,
							transform: 'translateX(-50%)',
						}}>
						{formatPrice(maxValue)}
					</div>
				</div>
			</div>
		</div>
	);
}
