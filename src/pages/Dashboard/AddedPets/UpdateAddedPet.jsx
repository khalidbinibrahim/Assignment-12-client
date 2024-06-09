import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useAuth } from '../../../providers/AuthProvider';

const UpdateAddedPet = () => {
    const { petId } = useParams();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        const fetchPet = async () => {
            setLoading(true);
            try {
                const response = await axiosSecure.get(`/pets/${petId}`);
                setPet(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching pet details', error);
                Swal.fire('Error', 'Failed to fetch pet details', 'error');
            } finally {
                setLoading(false);
            }
        };

        if (petId) {
            fetchPet();
        }
    }, [axiosSecure, petId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axiosSecure.patch(`/update_pets/${petId}`, pet);
            console.log(res.data);
            if(res.data.message) {
                Swal.fire('Updated!', 'The pet details have been updated.', 'success');
            }
        } catch (error) {
            console.error('Error updating pet', error);
            Swal.fire('Error', 'Failed to update pet details', 'error');
        }
    };

    if (loading || authLoading) {
        return <span className="loading loading-infinity loading-lg mx-auto flex justify-center my-20"></span>;
    }

    if (!pet) {
        return <div>No pet found</div>;
    }

    return (
        <div className="mx-auto p-8 bg-white shadow-lg rounded-lg font-sourceSans3">
            <h1 className="text-2xl font-bold mb-6 text-center">Update Pet</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Pet Name</label>
                    <input
                        type="text"
                        value={pet.petName}
                        onChange={(e) => setPet({ ...pet, petName: e.target.value })}
                        className="form-input mt-1 block w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Pet Category</label>
                    <input
                        type="text"
                        value={pet.petCategory}
                        onChange={(e) => setPet({ ...pet, petCategory: e.target.value })}
                        className="form-input mt-1 block w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Pet Image URL</label>
                    <input
                        type="text"
                        value={pet.petImage}
                        onChange={(e) => setPet({ ...pet, petImage: e.target.value })}
                        className="form-input mt-1 block w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">User Email</label>
                    <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="form-input mt-1 block w-full bg-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Adoption Status</label>
                    <select
                        value={pet.adopted}
                        onChange={(e) => setPet({ ...pet, adopted: e.target.value === 'true' })}
                        className="form-select mt-1 block w-full"
                    >
                        <option value="false">Not Adopted</option>
                        <option value="true">Adopted</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="hover:bg-blue-500 bg-white border border-blue-500 text-blue-500 hover:text-white px-4 py-2 rounded"
                >
                    Update Pet
                </button>
            </form>
        </div>
    );
};

export default UpdateAddedPet;