import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AdoptModal from "./AdoptModal";
import { IoMdTime } from "react-icons/io";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    
    useEffect(() => {
        const fetchPet = async () => {
            const res = await axiosSecure.get(`/pets/${id}`);
            setPet(res.data);
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
        <div className="container px-20 py-40 font-sourceSans3">
            {pet && (
                <div>
                    <h1 className="text-4xl text-black font-bold mb-4">{pet?.petName}</h1>
                    <img src={pet?.petImage} alt={pet?.petName} className="w-full h-80 rounded-lg object-cover mb-4" />
                    <p className="text-[#6C6B6B] font-semibold flex items-center gap-3 text-xl mb-2"><BiCategory className="text-2xl" /> Category: <span className="font-normal">{pet?.petCategory}</span></p>
                    <p className="text-[#6C6B6B] font-semibold flex items-center gap-3 text-xl mb-2"><CiLocationOn className="text-2xl" /> Location: <span className="font-normal">{pet?.petLocation}</span></p>
                    <p className="text-[#6C6B6B] font-semibold flex items-center gap-3 text-xl mb-2"><CiCalendar className="text-2xl" /> Birth: <span className="font-normal">{pet?.dateAdded}</span></p>
                    <p className="text-[#6C6B6B] font-semibold flex items-center gap-3 text-xl mb-2"><IoMdTime className="text-2xl" /> Age: <span className="font-normal">{pet?.petAge}</span></p>
                    <button onClick={handleAdoptClick} className="btn hover:bg-[#F7A582] bg-white text-[#F7A582] border border-[#F7A582] hover:text-white font-semibold text-base font-sourceSans3 rounded-md px-7">
                        Adopt
                    </button>
                    {isModalOpen && (
                        <AdoptModal pet={pet} onClose={handleModalClose} />
                    )}
                </div>
            )}
        </div>
    );
};

export default PetDetails;