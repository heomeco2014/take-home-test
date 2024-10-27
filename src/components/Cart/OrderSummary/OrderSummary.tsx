import {useNavigate} from 'react-router-dom';
import {useCartStore} from '../../../store/useCartStore';
import {useState} from 'react';
import ActionButton from '../../shared/ActionButton';
import {SummaryItem} from './SummaryItem';
import {CustomerForm, CustomerFormData} from './CustomerForm';

const OrderSummary = () => {
	const {totalPrice, shippingPrice} = useCartStore();
	const navigate = useNavigate();
	const tax = totalPrice * 0.1;
	const subtotal = totalPrice - tax;

	const [formData, setFormData] = useState<CustomerFormData>({
		fullName: '',
		email: '',
		phone: '',
	});

	const handleFormChange = (field: keyof CustomerFormData, value: string) => {
		setFormData(prev => ({...prev, [field]: value}));
	};

	const isFormValid = formData.fullName && formData.email && formData.phone;

	const handleCheckout = () => {
		if (isFormValid) {
			console.log('Checkout with form data:', formData);
		}
	};

	return (
		<div className='p-4 bg-gray-100 rounded-md h-max'>
			<h3 className='pb-2 text-lg font-bold text-gray-800 border-b border-gray-300 max-sm:text-base'>Order Summary</h3>

			<form className='mt-6' onSubmit={e => e.preventDefault()}>
				<CustomerForm formData={formData} onFormChange={handleFormChange} />
			</form>

			<PriceSummary subtotal={subtotal} tax={tax} shippingPrice={shippingPrice} totalPrice={totalPrice} />

			<div className='mt-6 space-y-3'>
				<ActionButton onClick={handleCheckout} disabled={!isFormValid}>
					Checkout
				</ActionButton>
				<ActionButton variant='secondary' onClick={() => navigate('/')}>
					Continue Shopping
				</ActionButton>
			</div>
		</div>
	);
};
export default OrderSummary;

type PriceSummaryProps = {
	subtotal: number;
	tax: number;
	shippingPrice: number;
	totalPrice: number;
};

const PriceSummary = ({subtotal, tax, shippingPrice, totalPrice}: PriceSummaryProps) => (
	<ul className='mt-6 space-y-3 text-gray-800'>
		<SummaryItem label='Subtotal' amount={subtotal} />
		<SummaryItem label='Shipping' amount={shippingPrice} />
		<SummaryItem label='Tax' amount={tax} />
		<hr className='border-gray-300' />
		<SummaryItem label='Total' amount={totalPrice + shippingPrice} isBold />
	</ul>
);
