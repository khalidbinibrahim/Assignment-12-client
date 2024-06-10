import { useState, useEffect, useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';

const AdoptionRequest = () => {
    const [requests, setRequests] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axiosSecure.get('/user_adoption_requests');
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching adoption requests:', error);
                setRequests([]);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, [axiosSecure]);

    const handleUpdateRequest = async (requestId, status, petId) => {
        try {
            await axiosSecure.patch(`/adoption_requests/${requestId}?petId=${petId}`, { status });
            setRequests((prevRequests) =>
                prevRequests.map((req) => (req._id === requestId ? { ...req, status } : req))
            );
            Swal.fire('Success', `Request has been ${status}.`, 'success');
        } catch (error) {
            console.error(`Error updating request status to ${status}`, error);
            Swal.fire('Error', 'There was an issue updating the request status.', 'error');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-8 mx-auto bg-white shadow-lg rounded-lg font-sourceSans3">
            <h1 className="text-2xl font-bold mb-6 text-center">Adoption Requests</h1>
            <table className="divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Pet Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Requester Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Phone Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="w-1/2 bg-white divide-y divide-gray-200">
                    {requests.map((request) => (
                        <tr key={request._id}>
                            <td className="px-6 py-4">{request.petName}</td>
                            <td className="px-6 py-4">{request.userName}</td>
                            <td className="px-6 py-4">{request.email}</td>
                            <td className="px-6 py-4">{request.phone}</td>
                            <td className="px-6 py-4">{request.address}</td>
                            <td className="px-6 py-4">
                                {request.status ? (
                                    <span className={`px-4 py-2 rounded ${request.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                    </span>
                                ) : (
                                    'Pending'
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {request.status === 'pending' && (
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => handleUpdateRequest(request._id, 'accepted', request.petId)}
                                            className="px-4 py-2 rounded bg-white hover:bg-green-500 border border-green-500 text-green-500 hover:text-white"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleUpdateRequest(request._id, 'rejected', request.petId)}
                                            className="px-4 py-2 rounded bg-white hover:bg-red-500 border border-red-500 text-red-500 hover:text-white"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                                {request.status !== 'pending' && request.status && (
                                    <span className={`px-4 py-2 rounded ${request.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdoptionRequest;