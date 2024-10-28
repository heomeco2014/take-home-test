import {useState, useEffect, useRef, ChangeEvent, MouseEvent} from 'react';

interface MultiSelectDropdownProps {
	formFieldName: string;
	options: string[];
	onChange: (selectedOptions: string[]) => void;
	prompt?: string;
}

export default function MultiSelectDropdown({formFieldName, options, onChange, prompt = 'Select one or more options'}: MultiSelectDropdownProps) {
	const [isJsEnabled, setIsJsEnabled] = useState<boolean>(false);
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const optionsListRef = useRef<HTMLUListElement | null>(null);

	useEffect(() => {
		setIsJsEnabled(true);
	}, []);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const isChecked = e.target.checked;
		const option = e.target.value;

		const selectedOptionSet = new Set(selectedOptions);

		if (isChecked) {
			selectedOptionSet.add(option);
		} else {
			selectedOptionSet.delete(option);
		}

		const newSelectedOptions = Array.from(selectedOptionSet);

		setSelectedOptions(newSelectedOptions);
		onChange(newSelectedOptions);
	};

	const isSelectAllEnabled = selectedOptions.length < options.length;

	const handleSelectAllClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const optionsInputs = optionsListRef.current?.querySelectorAll<HTMLInputElement>('input');
		optionsInputs?.forEach(input => {
			input.checked = true;
		});

		setSelectedOptions([...options]);
		onChange([...options]);
	};

	const isClearSelectionEnabled = selectedOptions.length > 0;

	const handleClearSelectionClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const optionsInputs = optionsListRef.current?.querySelectorAll<HTMLInputElement>('input');
		optionsInputs?.forEach(input => {
			input.checked = false;
		});

		setSelectedOptions([]);
		onChange([]);
	};

	return (
		<label className='relative z-[2]'>
			<input type='checkbox' className='hidden peer' />

			<div className="cursor-pointer after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform inline-flex border rounded px-5 py-2">
				{prompt}
				{isJsEnabled && selectedOptions.length > 0 && <span className='ml-1 text-blue-500'>{`(${selectedOptions.length} selected)`}</span>}
			</div>

			<div className='absolute overflow-y-auto transition-opacity bg-white border opacity-0 pointer-events-none max-w-max peer-checked:opacity-100 peer-checked:pointer-events-auto max-h-60'>
				{isJsEnabled && (
					<ul>
						<li>
							<button onClick={handleSelectAllClick} disabled={!isSelectAllEnabled} className='w-full px-2 py-1 text-left text-blue-600 disabled:opacity-50'>
								{'Select All'}
							</button>
						</li>
						<li>
							<button onClick={handleClearSelectionClick} disabled={!isClearSelectionEnabled} className='w-full px-2 py-1 text-left text-blue-600 disabled:opacity-50'>
								{'Clear selection'}
							</button>
						</li>
					</ul>
				)}
				<ul ref={optionsListRef}>
					{options.map(option => (
						<li key={option}>
							<label className={`flex whitespace-nowrap capitalize cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200`}>
								<input type='checkbox' name={formFieldName} value={option} className='cursor-pointer' onChange={handleChange} />
								<span className='ml-1'>{option}</span>
							</label>
						</li>
					))}
				</ul>
			</div>
		</label>
	);
}
