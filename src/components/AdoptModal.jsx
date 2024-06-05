import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AdoptModal = ({ pet, onClose }) => {
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adoptionData = {
            petId: pet._id,
            petName: pet.name,
            petImage: pet.image,
            phone,
            address,
            userName: user?.displayName || 'John Doe',
            email: user?.email,
        };

        console.log(adoptionData);

        try {
            const res = await axiosSecure.post('/adoptions', adoptionData);
            const data = res.data;
            console.log(data);
            if (res.data.insertedId) {
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 font-sourceSans3">
            <div className="bg-white p-8 rounded-lg w-1/2">
                <div className='flex justify-between items-center mb-6'>
                    <h3 className="font-bold text-black text-center text-2xl">Adopt {pet.name}</h3>
                    <button onClick={onClose} className="btn btn-circle btn-ghost text-xl">✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                        <label className="text-[#0A0808] font-semibold text-lg mb-2">Phone Number</label>
                        <input
                            type="text"
                            value={phone}
                            placeholder='Enter your phone number'
                            onChange={(e) => setPhone(e.target.value)}
                            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="form-control mb-6">
                        <label className="text-[#0A0808] font-semibold text-lg mb-2">Address</label>
                        <input
                            type="text"
                            value={address}
                            placeholder='Enter your home address'
                            onChange={(e) => setAddress(e.target.value)}
                            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <button type="submit" className="btn w-full bg-[#F7A582] text-white font-semibold text-base font-sourceSans3 rounded-md px-7">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AdoptModal;