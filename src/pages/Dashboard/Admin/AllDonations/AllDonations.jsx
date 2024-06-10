import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AllDonations = ({ accessToken }) => {
    const [donationCampaigns, setDonationCampaigns] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchAllDonationCampaigns();
    }, []);

    // Function to fetch all donation campaigns
    const fetchAllDonationCampaigns = async () => {
        try {
            const response = await axiosSecure.get('/admin/all_campaigns');
            setDonationCampaigns(response.data);
        } catch (error) {
            console.error('Error fetching donation campaigns:', error);
        }
    };

    // Function to delete a donation campaign
    const deleteDonationCampaign = async (campaignId) => {
        try {
            const response = await axiosSecure.delete(`/admin/campaigns/${campaignId}`);
            if (response.status === 204) {
                setDonationCampaigns(donationCampaigns.filter(campaign => campaign._id !== campaignId));
            } else {
                console.error('Failed to delete donation campaign:', response.status);
            }
        } catch (error) {
            console.error('Error deleting donation campaign:', error);
        }
    };

    // Function to pause/unpause a donation campaign
    const togglePauseCampaign = async (campaignId, paused) => {
        try {
            const response = await axiosSecure.patch(`/admin/campaigns/pause/${campaignId}`, { paused });
            if (response.status === 200) {
                setDonationCampaigns(donationCampaigns.map(campaign =>
                    campaign._id === campaignId ? { ...campaign, paused } : campaign
                ));
            } else {
                console.error('Failed to pause/unpause donation campaign:', response.status);
            }
        } catch (error) {
            console.error('Error pausing/unpausing donation campaign:', error);
        }
    };

    return (
        <div className="mx-auto p-8 bg-white shadow-lg rounded-lg font-sourceSans3">
            <h1 className="text-2xl font-bold mb-6 text-center">All Donations</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Donation Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Date of Donation</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donationCampaigns.map(campaign => (
                            <tr key={campaign._id} className="text-center">
                                <td className="px-6 py-4 whitespace-nowrap">{campaign.petName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{campaign.maxDonationAmount}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{campaign.lastDateOfDonation}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{campaign.shortDescription}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        className="px-4 py-2 rounded bg-white hover:bg-red-500 border border-red-500 text-red-500 hover:text-white mr-2"
                                        onClick={() => deleteDonationCampaign(campaign._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className={`${campaign.paused ? 'bg-white hover:bg-green-500 border border-green-500 text-green-500 hover:text-white' : 'bg-white hover:bg-yellow-500 border border-yellow-500 text-yellow-500 hover:text-white'
                                            } px-4 py-2 rounded`}
                                        onClick={() => togglePauseCampaign(campaign._id, !campaign.paused)}
                                    >
                                        {campaign.paused ? 'Unpause' : 'Pause'}
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

export default AllDonations;