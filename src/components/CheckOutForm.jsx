import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CheckOutForm = ({ onClose, donationId, amountNeeded }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState('');
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error);
            return;
        }

        try {
            const res = await axiosSecure.post(`/donations/donators/${donationId}`, {
                amount: parseFloat(amount),
                paymentMethodId: paymentMethod.id,
            });
            const data = res.data;
            // console.log(data);
            if (data.success) {
                Swal.fire('Success', 'Your payment successfully done', 'success');
            }

            onClose();
        } catch (error) {
            console.error('Error making donation:', error);
            Swal.fire('Error', 'There was an issue to pay', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Donation Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </label>
            </div>
            <div className="mb-4">
                <CardElement className="p-2 border border-gray-300 rounded" />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={!stripe}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                >
                    Donate
                </button>
            </div>
        </form>
    );
};

export default CheckOutForm;