import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AdoptModal from "./AdoptModal";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { LuPencil } from "react-icons/lu";
import { LuUsers2 } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { MdPets } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";

const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchPet = async () => {
            const res = await axiosSecure.get(`/pets/${id}`);
            setPet(res.data[0]);
        };
        fetchPet();
    }, [id, axiosSecure]);

    const handleAdoptClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container py-28 font-sourceSans3">
            {pet && (
                <>
                    <div className="min-h-screen">
                        <div className="container mx-auto px-4 py-8">
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-white rounded-lg overflow-hidden shadow-xl">
                                    <img src={pet.petImage} alt={pet.petName} className="w-full h-64 object-cover object-center" />
                                    <div className="p-6">
                                        <h1 className="text-3xl font-bold font-workSans text-black mb-6">{pet.petName}</h1>
                                        <div className="flex items-center mb-4">
                                            <span className="flex items-center gap-2 text-gray-600 font-semibold mr-2"><LuPencil className='text-2xl' /> Review:</span>
                                            <span className="text-gray-700 text-lg font-poppins">{pet.longDescription}</span>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <span className="flex items-center gap-2 text-gray-600 font-semibold mr-2"><BiCategory className='text-2xl' /> Category:</span>
                                            <span className="text-gray-800 font-montserrat text-xl font-medium">{pet.petCategory}</span>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <span className="flex items-center gap-2 text-gray-600 font-semibold mr-2"><IoLocationOutline className='text-2xl' /> Location:</span>
                                            <span className="text-gray-800 font-montserrat text-xl font-medium">{pet.petLocation}</span>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <span className="flex items-center gap-2 text-gray-600 font-semibold mr-2"><LuUsers2 className='text-2xl' /> Age:</span>
                                            <span className="text-gray-800 font-montserrat text-xl font-medium">{pet.petAge}</span>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <span className="flex items-center gap-2 text-gray-600 font-semibold mr-2"><CiCalendar className='text-2xl' /> Date:</span>
                                            <span className="text-gray-800 font-montserrat text-xl font-medium">{new Date(pet.dateAdded).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <span className="flex items-center gap-2 text-gray-600 font-semibold mr-2"><MdPets className='text-2xl' /> Adopted:</span>
                                            <span className="text-gray-800 font-montserrat text-xl font-medium">{pet.adopted === false ? 'No' : 'Yes'}</span>
                                        </div>
                                        <div className="mt-6">
                                            {
                                                pet.adopted === true ?
                                                    <span className='px-4 py-2 rounded bg-green-100 text-green-800'>
                                                        Adopted
                                                    </span> :
                                                    <button onClick={handleAdoptClick} className="btn hover:bg-[#F7A582] bg-white text-[#F7A582] border border-[#F7A582] hover:text-white font-semibold text-base font-sourceSans3 rounded-md px-7">
                                                        Adopt
                                                    </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isModalOpen && (
                            <AdoptModal pet={pet} onClose={handleModalClose} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default PetDetails;