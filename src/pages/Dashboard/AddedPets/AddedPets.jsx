import { useState, useEffect, useMemo } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddedPets = () => {
    const [pets, setPets] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axiosSecure.get('/pets');
                console.log('Fetched pets data:', response.data);
                setPets(Array.isArray(response.data.pets) ? response.data.pets : []);
            } catch (error) {
                console.error('Error fetching pets', error);
                setPets([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPets();
    }, [axiosSecure]);

    const handleDelete = async (petId) => {
        try {
            await axiosSecure.delete(`/pets/${petId}`);
            setPets((prevPets) => prevPets.filter((pet) => pet._id !== petId));
            Swal.fire('Deleted!', 'Your pet has been deleted.', 'success');
        } catch (error) {
            console.error('Error deleting pet', error);
            Swal.fire('Error!', 'There was an issue deleting the pet.', 'error');
        }
    };

    const handleAdopt = async (petId) => {
        try {
            await axiosSecure.patch(`/pets/${petId}`, { adopted: true });
            setPets((prevPets) =>
                prevPets.map((pet) => (pet._id === petId ? { ...pet, adopted: true } : pet))
            );
        } catch (error) {
            console.error('Error updating adoption status', error);
        }
    };

    const columns = useMemo(
        () => [
            {
                Header: 'Serial Number',
                accessor: (row, index) => index + 1,
                id: 'serial',
            },
            {
                Header: 'Pet Name',
                accessor: 'petName',
            },
            {
                Header: 'Pet Category',
                accessor: 'petCategory',
            },
            {
                Header: 'Pet Image',
                accessor: 'petImage',
                Cell: ({ value }) => (
                    <img
                        src={value}
                        alt="Pet"
                        className="w-16 h-16 object-cover"
                    />
                ),
            },
            {
                Header: 'Adoption Status',
                accessor: 'adopted',
                Cell: ({ value }) => (value ? 'Adopted' : 'Not Adopted'),
            },
            {
                Header: 'Actions',
                accessor: '_id',
                Cell: ({ value }) => (
                    <div className="space-x-2">
                        <button
                            onClick={() => navigate(`/update_pet/${value}`)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => handleDelete(value)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => handleAdopt(value)}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Adopted
                        </button>
                    </div>
                ),
            },
        ],
        [navigate]
    );

    const data = useMemo(() => {
        console.log('Pets data:', pets);
        return pets;
    }, [pets]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize: setTablePageSize,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize },
        },
        useSortBy,
        usePagination
    );

    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setTablePageSize(size);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-8">
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    key={column.id}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody
                    {...getTableBodyProps()}
                    className="bg-white divide-y divide-gray-200"
                >
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.id}>
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                        className="px-6 py-4 whitespace-nowrap"
                                        key={cell.column.id}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                    {'<<'}
                </button>
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                    {'<'}
                </button>
                <span className="text-sm text-gray-700">
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                    {'>'}
                </button>
                <button
                    onClick={() => gotoPage(pageOptions.length - 1)}
                    disabled={!canNextPage}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                    {'>>'}
                </button>
                <select
                    value={pageSize}
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                    {[10, 20, 30, 40, 50].map(size => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default AddedPets;