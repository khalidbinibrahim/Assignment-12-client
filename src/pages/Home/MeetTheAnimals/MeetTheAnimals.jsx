import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PetCard from "../../../components/PetCard";

const MeetTheAnimals = () => {
    const axiosPublic = useAxiosPublic();
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axiosPublic.get('/all_pets')
            .then(res => {
                setPets(res.data);
            })
    }, [axiosPublic])

    return (
        <div className="font-sourceSans3 mb-12">
            <div className="mb-12 text-center">
                <h3 className="text-2xl font-bold text-[#F7A582] mb-1">Meet the animals</h3>
                <h1 className="text-5xl font-bold text-[#07332F] mb-6">Puppies Waiting for Adoption</h1>
                <p className="text-lg font-normal text-[#3B3A3A]">The best overall dog DNA test is Embark Breed & Health Kit (view at Chewy), which <br /> provides you with a breed brwn and information Most dogs</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-32">
                {pets.map(pet => <PetCard key={pet._id} pet={pet} />)}
            </div>
        </div>
    );
};

export default MeetTheAnimals;