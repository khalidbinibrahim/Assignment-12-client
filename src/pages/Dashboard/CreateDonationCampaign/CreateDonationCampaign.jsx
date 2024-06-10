import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CreateDonationCampaign = () => {
    const [petName, setPetName] = useState('');
    const [petPicture, setPetPicture] = useState(null);
    const [maxDonationAmount, setMaxDonationAmount] = useState('');
    const [lastDateOfDonation, setLastDateOfDonation] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

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
                petName,
                petPicture,
                maxDonationAmount,
                lastDateOfDonation,
                shortDescription,
                longDescription,
                createdAt: new Date(),
                userEmail: user?.email
            });
            if (response.data.campaignId) {
                Swal.fire({
                    title: "Success",
                    text: "Your donation campaign has been successfully created",
                    icon: "success"
                });
                setPetName('');
                setPetPicture(null);
                setMaxDonationAmount('');
                setLastDateOfDonation('');
                setShortDescription('');
                setLongDescription('');
            }
        } catch (error) {
            console.error('Error creating donation campaign:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg font-sourceSans3">
            <h1 className="text-2xl font-bold mb-6 text-center">Create Donation Campaign</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="petName" className="block font-medium mb-1">Pet Name</label>
                    <input type="text" id="petName" value={petName} onChange={(e) => setPetName(e.target.value)} className="w-full border border-gray-300 rounded p-2" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="petPicture" className="block font-medium mb-1">Pet Picture</label>
                    <input type="file" id="petPicture" onChange={handleImageUpload} className="w-full border border-gray-300 rounded p-2" accept="image/*" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="maxDonationAmount" className="block font-medium mb-1">Maximum Donation Amount</label>
                    <input type="number" id="maxDonationAmount" value={maxDonationAmount} onChange={(e) => setMaxDonationAmount(e.target.value)} className="w-full border border-gray-300 rounded p-2" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastDateOfDonation" className="block font-medium mb-1">Last Date of Donation</label>
                    <input type="date" id="lastDateOfDonation" value={lastDateOfDonation} onChange={(e) => setLastDateOfDonation(e.target.value)} className="w-full border border-gray-300 rounded p-2" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="shortDescription" className="block font-medium mb-1">Short Description</label>
                    <input id="shortDescription" type='text' value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className="w-full border border-gray-300 rounded p-2" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="longDescription" className="block font-medium mb-1">Long Description</label>
                    <textarea id="longDescription" value={longDescription} onChange={(e) => setLongDescription(e.target.value)} className="w-full border border-gray-300 rounded p-2" required />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>Submit</button>
            </form>
        </div>
    );
};

export default CreateDonationCampaign;