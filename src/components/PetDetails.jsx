import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AdoptModal from "./AdoptModal";

const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchPet = async () => {
            const res = await axios.get(`https://assignment-12-server-mu-fawn.vercel.app/pets/${id}`);
            setPet(res.data[0]);
        };
        fetchPet();
    }, [id]);

    const handleAdoptClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto p-4">
            {pet && (
                <>
                    <h1 className="text-4xl font-bold mb-4">{pet.name}</h1>
                    <img src={pet.image} alt={pet.name} className="w-full h-64 object-cover mb-4" />
                    <p className="text-xl mb-2">Age: {pet.age}</p>
                    <p className="text-xl mb-2">Location: {pet.location}</p>
                    <p className="text-xl mb-2">Category: {pet.category}</p>
                    <button onClick={handleAdoptClick} className="btn btn-primary mt-4">
                        Adopt
                    </button>
                    {isModalOpen && (
                        <AdoptModal pet={pet} onClose={handleModalClose} />
                    )}
                </>
            )}
        </div>
    );
};

export default PetDetails;