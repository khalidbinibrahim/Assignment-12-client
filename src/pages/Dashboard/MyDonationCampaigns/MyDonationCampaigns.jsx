import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyDonationCampaigns = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [donators, setDonators] = useState([]);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await axiosSecure.get('/user_campaigns');
                setDonations(response.data.campaigns);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, [axiosSecure]);

    const handlePauseDonation = async (donationId) => {
        try {
            await axiosSecure.patch(`/donations/pause/${donationId}`);
            setDonations(donations.map(donation =>
                donation._id === donationId ? { ...donation, paused: !donation.paused } : donation));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEditDonation = (donationId) => {
        navigate(`/edit_donation/${donationId}`);
    };

    const handleViewDonators = async (donationId) => {
        try {
            const response = await axiosSecure.get(`/donations/donators/${donationId}`);
            setDonators(response.data);
            setSelectedDonation(donationId);
            setShowModal(true);
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="mx-auto p-8 bg-white shadow-lg rounded-lg font-sourceSans3">
            <h1 className="text-2xl font-bold mb-6 text-center">My Donation Campaigns</h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className='bg-gray-50'>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Pet Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Max Donation Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Donation Progress
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {donations.map(donation => (
                        <tr key={donation._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{donation.petName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{donation.maxDonationAmount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${(donation.currentDonationAmount / donation.maxDonationAmount) * 100}%` }}></div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    className={`bg-${donation.paused ? 'green' : 'red'}-500 text-white py-1 px-2 rounded mr-2`}
                                    onClick={() => handlePauseDonation(donation._id)}
                                >
                                    {donation.paused ? 'Unpause' : 'Pause'}
                                </button>
                                <button
                                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                                    onClick={() => handleEditDonation(donation._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-blue-500 text-white py-1 px-2 rounded"
                                    onClick={() => handleViewDonators(donation._id)}
                                >
                                    View Donators
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded">
                        <h2 className="text-xl font-bold mb-4">Donators</h2>
                        <button className="bg-red-500 text-white py-1 px-2 rounded mb-4" onClick={() => setShowModal(false)}>Close</button>
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Donator</th>
                                    <th className="py-2 px-4 border-b">Amount Donated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donators.map(donator => (
                                    <tr key={donator._id}>
                                        <td className="py-2 px-4 border-b">{donator.name}</td>
                                        <td className="py-2 px-4 border-b">{donator.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyDonationCampaigns;