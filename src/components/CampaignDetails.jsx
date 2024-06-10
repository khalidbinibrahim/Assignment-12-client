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
        return <span className="loading loading-infinity loading-lg mx-auto flex justify-center my-20"></span>;
    }

    return (
        <div className="container mx-auto p-4 font-sourceSans3 py-24">
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4 text-center">Donation Details</h1>
                <div className="text-center mb-6">
                    <p className="text-2xl font-semibold">{campaign.petName}</p>
                    <p className="text-xl text-gray-700">Amount: ${campaign.maxDonationAmount}</p>
                </div>
                <div className="text-center">
                    <button
                        className="btn hover:bg-[#F7A582] bg-white text-[#F7A582] border border-[#F7A582] hover:text-white font-semibold text-base font-sourceSans3 rounded-md px-7"
                        onClick={handleDonateNow}
                    >
                        Donate Now
                    </button>
                </div>
            </div>

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendedCampaigns.map((recommended) => (
                        <div key={recommended.id} className="bg-white p-4 rounded-lg shadow">
                            <p className="text-xl font-semibold">{recommended.name}</p>
                            <p className="text-gray-700">Goal: ${recommended.goal}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;