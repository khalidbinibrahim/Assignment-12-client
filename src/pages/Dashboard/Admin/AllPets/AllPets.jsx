import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAdmin from '../../../../hooks/useAdmin';

const AllPets = () => {
    const [pets, setPets] = useState([]);
    const axiosSecure = useAxiosSecure();
    const isAdmin = useAdmin();

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            const response = await axiosSecure.get('/admin/all_pets');
            setPets(response.data);
        } catch (error) {
            console.error('Error fetching pets:', error);
        }
    };

    const handleDelete = async (petId) => {
        try {
            await axiosSecure.delete(`/admin/pets/${petId}`);
            setPets(pets.filter((pet) => pet._id !== petId));
        } catch (error) {
            console.error('Error deleting pet:', error);
        }
    };

    const handleUpdateStatus = async (petId, adoptedStatus) => {
        try {
            await axiosSecure.patch(
                `/admin/pets/${petId}`,
                { adopted: adoptedStatus }
            );
            fetchPets();
        } catch (error) {
            console.error('Error updating pet status:', error);
        }
    };

    return (
        <div className="mx-auto p-8 bg-white shadow-lg rounded-lg font-sourceSans3">
            <h1 className="text-2xl font-bold mb-6 text-center">All Pets</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg shadow-md">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Age</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            {isAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet) => (
                            <tr key={pet._id} className="border-t">
                                <td className="py-2 px-4">
                                    <img
                                        src={pet.petImage}
                                        alt={pet.petName}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                </td>
                                <td className="py-2 px-4 text-gray-800">{pet.petName}</td>
                                <td className="py-2 px-4 text-gray-800">{pet.petAge}</td>
                                <td className="py-2 px-4 text-gray-800">{pet.petCategory}</td>
                                <td className="py-2 px-4 text-gray-800">{pet.petLocation}</td>
                                <td className="py-2 px-4 text-gray-800">{pet.adopted ? 'Adopted' : 'Not Adopted'}</td>
                                {isAdmin && (
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleDelete(pet._id)}
                                            className="hover:bg-red-500 bg-white border border-red-500 text-red-500 hover:text-white px-4 py-2 rounded mr-2"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(pet._id, !pet.adopted)}
                                            className={`px-4 py-2 rounded ${pet.adopted ? 'hover:bg-green-500 bg-white border border-green-500 text-green-500 hover:text-white' : 'hover:bg-yellow-500 bg-white border border-yellow-500 text-yellow-500 hover:text-white'}`}
                                        >
                                            {pet.adopted ? 'Mark as Not Adopted' : 'Mark as Adopted'}
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllPets;