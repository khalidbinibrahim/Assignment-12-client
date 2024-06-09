import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useAxiosSecure from '../hooks/useAxiosSecure';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CampaignDetails = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [recommendedCampaigns, setRecommendedCampaigns] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchCampaignDetails = async () => {
            try {
                const response = await axiosSecure.get(`/campaigns/${id}`);
                setCampaign(response.data);
            } catch (error) {
                console.error('Error fetching campaign details:', error);
            }
        };

        fetchCampaignDetails();
    }, [id, axiosSecure]);

    useEffect(() => {
        const fetchRecommendedCampaigns = async () => {
            try {
                const response = await axiosSecure.get('/recommended_campaigns');
                setRecommendedCampaigns(response.data);
            } catch (error) {
                console.error('Error fetching recommended campaigns:', error);
            }
        };
        fetchRecommendedCampaigns();
    }, [axiosSecure]);

    const handleDonateNow = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (!campaign) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Donation Details</h1>
            <p className="text-xl mb-2">Campaign: {campaign.petName}</p>
            <p className="text-xl mb-4">Amount: ${campaign.maxDonationAmount}</p>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={handleDonateNow}
            >
                Donate Now
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Make a Donation</h2>
                        <Elements stripe={stripePromise}>
                            <CheckOutForm onClose={handleCloseModal} donationId={campaign._id} />
                        </Elements>
                    </div>
                </div>
            )}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Recommended Donations</h2>
                <ul>
                    {recommendedCampaigns.map((recommended) => (
                        <li key={recommended.id} className="mb-2">
                            <p className="text-xl">{recommended.name}</p>
                            <p className="text-gray-700">Goal: ${recommended.goal}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CampaignDetails;