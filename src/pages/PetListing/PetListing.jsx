import { useState, useEffect } from 'react';
import PetCard from "../../components/PetCard";
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

const fetchPets = async ({ pageParam = 1 }) => {
    const res = await axios.get(`http://localhost:5000/pets?page=${pageParam}`);
    return res.data;
};

const PetListing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const { ref, inView } = useInView();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['pets', searchTerm, category],
        queryFn: fetchPets,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    const filteredPets = (pages) =>
        pages
            .flatMap(page => page.pets)
            .filter(pet =>
                pet.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (category ? pet.category === category : true)
            );

    return (
        <div className="container px-20 py-40 font-sourceSans3">
            <h1 className="text-3xl font-bold text-center my-12">Pet Listing</h1>
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <input
                    type="text"
                    placeholder="Search pets by name"
                    className="block w-80 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                {data?.pages && filteredPets(data.pages).map(pet => (
                    <PetCard key={pet._id} pet={pet} />
                ))}
            </div>
            <div ref={ref} className="loading loading-infinity loading-lg mx-auto flex justify-center my-20">
                {isFetchingNextPage && <p>Loading more pets...</p>}
            </div>
        </div>
    );
};

export default PetListing;