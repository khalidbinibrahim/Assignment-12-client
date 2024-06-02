import { useState, useEffect } from 'react';
import PetCard from "../../components/PetCard";

const PetListing = () => {
    const [pets, setPets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        fetch('https://assignment-12-server-mu-fawn.vercel.app/pets')
            .then(res => res.json())
            .then(data => setPets(data))
            .catch(error => console.error('Error fetching pets:', error));
    }, []);

    const filteredPets = pets
        .filter(pet =>
            pet.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (category ? pet.category === category : true)
        );

    return (
        <div className="container px-20 py-32">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <input
                    type="text"
                    placeholder="Search pets by name"
                    className="block w-72 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="select select-bordered"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredPets.map(pet => (
                    <PetCard key={pet._id} pet={pet} />
                ))}
            </div>
        </div>
    );
};

export default PetListing;
