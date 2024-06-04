import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

const DonationCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const campaignsPerPage = 9;

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/campaigns?page=${page}&limit=${campaignsPerPage}`);
            const newCampaigns = response.data;

            setCampaigns((prevCampaigns) => [...prevCampaigns, ...newCampaigns]);
            setHasMore(newCampaigns.length === campaignsPerPage);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    };

    return (
        <div className="container px-20 py-40 font-sourceSans3">
            <h1 className="text-3xl font-bold text-center my-12">Donation Campaigns</h1>
            <InfiniteScroll
                dataLength={campaigns.length}
                next={fetchCampaigns}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p className="text-center text-xl mt-8">No more campaigns to show.</p>}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((campaign) => (
                        <div key={campaign._id} className="border p-4 rounded shadow">
                            <img src={campaign.image} alt={campaign.petName} className="w-full h-48 object-cover rounded" />
                            <h2 className="text-2xl font-semibold mt-4">{campaign.petName}</h2>
                            <p className="text-gray-600">Max Donation: ${campaign.maxDonation}</p>
                            <p className="text-gray-600">Donated Amount: ${campaign.donatedAmount}</p>
                            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default DonationCampaigns;