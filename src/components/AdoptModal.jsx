import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';

const AdoptModal = ({ pet, onClose }) => {
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adoptionData = {
            petId: pet._id,
            petName: pet.name,
            petImage: pet.image,
            userName: user?.displayName || 'John Doe', // Replace with actual user name from auth context or state
            email: user?.email, // Replace with actual email from auth context or state
            phone,
            address
        };

        console.log(adoptionData);

        try {
            const res = await axios.post('http://localhost:5000/adoptions', adoptionData);
            const data = res.data;
            console.log(data);
            if(res.data.insertedId) {
                Swal.fire({
                    title: "Success",
                    text: "You successfully adopted your pet",
                    icon: "success"
                });
            }
            onClose();
        } catch (error) {
            console.error('Error submitting adoption request', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg w-1/2">
                <h3 className="font-bold text-lg mb-4">Adopt {pet.name}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                        <label className="label">Phone Number</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Submit</button>
                </form>
                <button onClick={onClose} className="btn btn-secondary w-full mt-4">Close</button>
            </div>
        </div>
    );
};

export default AdoptModal;