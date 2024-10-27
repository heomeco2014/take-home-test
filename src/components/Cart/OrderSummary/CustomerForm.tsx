import React from 'react';
import {InputField} from '../../shared/InputField';
import PersonIcon from '../../../assets/icons/PersonIcon';
import EmailIcon from '../../../assets/icons/EmailIcon';
import PhoneIcon from '../../../assets/icons/PhoneIcon';

export type CustomerFormData = {
	fullName: string;
	email: string;
	phone: string;
};

type CustomerFormProps = {
	formData: CustomerFormData;
	onFormChange: (field: keyof CustomerFormData, value: string) => void;
};

export const CustomerForm = ({formData, onFormChange}: CustomerFormProps) => (
	<div>
		<h3 className='mb-4 text-base font-semibold text-gray-800'>Enter Details</h3>
		<div className='space-y-3'>
			<InputField type='text' placeholder='Full Name' icon={PersonIcon} value={formData.fullName} onChange={e => onFormChange('fullName', e.target.value)} />
			<InputField type='email' placeholder='Email' icon={EmailIcon} value={formData.email} onChange={e => onFormChange('email', e.target.value)} />
			<InputField type='number' placeholder='Phone No.' icon={PhoneIcon} value={formData.phone} onChange={e => onFormChange('phone', e.target.value)} />
		</div>
	</div>
);
