import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useAuth } from '../../../providers/AuthProvider';

const EditDonationCampaign = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const { loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCampaignDetails = async () => {
            setLoading(true);
            try {
                const response = await axiosSecure.get(`/campaigns/${id}`);
                setCampaign(response.data);
            } catch (error) {
                console.error('Error fetching campaign details', error);
                Swal.fire('Error', 'Failed to fetch campaign details', 'error');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCampaignDetails();
        }
    }, [axiosSecure, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaign({
            ...campaign,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosSecure.patch(`/campaigns/${id}`, campaign);
            navigate('/dashboard/my_donation_campaigns')
            Swal.fire('Updated!', 'The campaign details have been updated.', 'success');
        } catch (error) {
            console.error('Error updating campaign', error);
            Swal.fire('Error', 'Failed to update campaign details', 'error');
        }
    };

    if (loading || authLoading) {
        return <span className="loading loading-infinity loading-lg mx-auto flex justify-center my-20"></span>;
    }

    if (!campaign) {
        return <div>No campaign found</div>;
    }

    return (
        <div className="mx-auto p-8 bg-white shadow-lg rounded-lg font-sourceSans3">
            <h1 className="text-2xl font-bold mb-6 text-center">Edit Donation Campaign</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Pet Name</label>
                    <input
                        type="text"
                        name="petName"
                        value={campaign.petName}
                        onChange={handleChange}
                        className="form-input mt-1 block w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Max Donation Amount</label>
                    <input
                        type="number"
                        name="maxDonationAmount"
                        value={campaign.maxDonationAmount}
                        onChange={handleChange}
                        className="form-input mt-1 block w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Last Date of Donation</label>
                    <input
                        type="date"
                        name="lastDateOfDonation"
                        value={campaign.lastDateOfDonation}
                        onChange={handleChange}
                        className="form-input mt-1 block w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Short Description</label>
                    <textarea
                        name="shortDescription"
                        value={campaign.shortDescription}
                        onChange={handleChange}
                        className="form-textarea mt-1 block w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Long Description</label>
                    <textarea
                        name="longDescription"
                        value={campaign.longDescription}
                        onChange={handleChange}
                        className="form-textarea mt-1 block w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={campaign.imageUrl}
                        onChange={handleChange}
                        className="form-input mt-1 block w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="hover:bg-blue-500 bg-white border border-blue-500 text-blue-500 hover:text-white px-4 py-2 rounded"
                >
                    Edit Campaign
                </button>
            </form>
        </div>
    );
};

export default EditDonationCampaign;