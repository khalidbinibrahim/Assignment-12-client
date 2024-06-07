import { useContext, useState } from 'react';
import axios from 'axios'; // You may need to install axios for HTTP requests
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';

const DonationCampaignForm = () => {
    const [petPicture, setPetPicture] = useState(null);
    const [maxDonationAmount, setMaxDonationAmount] = useState('');
    const [lastDateOfDonation, setLastDateOfDonation] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'pet_images');
        const response = await axios.post('https://api.cloudinary.com/v1_1/drfwpb4lu/image/upload', formData);
        setPetPicture(response.data.secure_url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosSecure.post('/donation_campaigns', {
                petPicture,
                maxDonationAmount,
                lastDateOfDonation,
                shortDescription,
                longDescription,
                createdAt: new Date(),
                userEmail: user?.email
            });
            console.log('Donation campaign created:', response.data);
            setPetPicture(null);
            setMaxDonationAmount('');
            setLastDateOfDonation('');
            setShortDescription('');
            setLongDescription('');
        } catch (error) {
            console.error('Error creating donation campaign:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="petPicture" className="block font-medium mb-1">Pet Picture</label>
                <input type="file" id="petPicture" onChange={handleImageUpload} className="w-full" accept="image/*" required />
            </div>
            <div className="mb-4">
                <label htmlFor="maxDonationAmount" className="block font-medium mb-1">Maximum Donation Amount</label>
                <input type="number" id="maxDonationAmount" value={maxDonationAmount} onChange={(e) => setMaxDonationAmount(e.target.value)} className="w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="lastDateOfDonation" className="block font-medium mb-1">Last Date of Donation</label>
                <input type="date" id="lastDateOfDonation" value={lastDateOfDonation} onChange={(e) => setLastDateOfDonation(e.target.value)} className="w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="shortDescription" className="block font-medium mb-1">Short Description</label>
                <textarea id="shortDescription" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className="w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="longDescription" className="block font-medium mb-1">Long Description</label>
                <textarea id="longDescription" value={longDescription} onChange={(e) => setLongDescription(e.target.value)} className="w-full" required />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>Submit</button>
        </form>
    );
};

export default DonationCampaignForm;