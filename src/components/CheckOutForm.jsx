import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CheckOutForm = ({ onClose, donationId }) => {
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
            if(data.success) {
                Swal.fire('Success', 'Your payment successfully done', 'success');
            }

            onClose();
        } catch (error) {
            console.error('Error making donation:', error);
            Swal.fire('Error', 'There was an issue to pay', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Donation Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <CardElement />
            </div>
            <button type="submit" disabled={!stripe}>Donate</button>
        </form>
    );
};

export default CheckOutForm;