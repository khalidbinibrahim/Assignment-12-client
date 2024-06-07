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

    const handleUpdateRequest = async (requestId, status) => {
        try {
            await axiosSecure.patch(`/adoption_requests/${requestId}`, { status });
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
        <div className="mx-auto p-8 bg-white shadow-lg rounded-lg font-sourceSans3">
            <h1 className="text-2xl font-bold mb-6 text-center">Adoption Requests</h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Pet Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Requester Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((request) => (
                        <tr key={request._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{request.petName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{request.userName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{request.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{request.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{request.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
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
                                            onClick={() => handleUpdateRequest(request._id, 'accepted')}
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleUpdateRequest(request._id, 'rejected')}
                                            className="bg-red-500 text-white px-4 py-2 rounded"
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