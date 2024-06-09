import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyDonations = () => {
    const [donations, setDonations] = useState([])
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const response = await axiosSecure.get('/user_donations');
            setDonations(response.data);
        } catch (error) {
            console.error('Error fetching donations:', error);
        }
    };

    const handleRefund = async (donationId) => {
        try {
            await axiosSecure.delete(`/donations/${donationId}`);
            setDonations(donations.filter(donation => donation._id !== donationId));
        } catch (error) {
            console.error('Error refunding donation:', error);
        }
    };

    return (
        <div className="mx-auto p-8 bg-white shadow-lg rounded-lg font-sourceSans3">
            <h1 className="text-2xl font-bold mb-6 text-center">My Donations</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border shadow-md">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donated Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation) => (
                            <tr key={donation._id} className="border-t">
                                <td className="py-2 px-4">
                                    <img
                                        src={donation.pet_image}
                                        alt={donation.pet_name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                </td>
                                <td className="py-2 px-4 text-gray-800">{donation.pet_name}</td>
                                <td className="py-2 px-4 text-gray-800">${donation.amount / 100}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleRefund(donation._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                    >
                                        Ask for Refund
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDonations;