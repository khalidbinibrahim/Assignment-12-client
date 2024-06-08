import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosSecure.get('/admin/users');
                setUsers(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [axiosSecure]);

    const handleMakeAdmin = async (userId) => {
        try {
            await axiosSecure.patch(`/admin/make_admin/${userId}`);
            setUsers(users.map(user => user._id === userId ? { ...user, role: 'admin' } : user));
            Swal.fire('Success', 'You successfully make the users role to admin', 'success');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleBanUser = async (userId) => {
        try {
            await axiosSecure.patch(`/admin/ban_user/${userId}`);
            const res = await axiosSecure.delete(`/admin/delete_user/${userId}`);
            const data = res.data;
            console.log(data);
            setUsers(users.filter(user => user._id !== userId));
            Swal.fire('Success', 'User deleted successfully', 'success');
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="mx-auto p-8 bg-white shadow-lg rounded-lg font-sourceSans3">
            <h1 className="text-2xl font-bold mb-6 text-center">My Added Pets</h1>
            <table className="w-full border-collapse">
                <thead>
                    <tr className='bg-gray-50'>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Picture</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="">
                            <td className="p-3">{user.name}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3"><img src={user.profilePicture} alt="Profile" className="w-12 h-12 object-cover rounded-full" /></td>
                            <td className="p-3">{user?.role}</td>
                            <td className="p-3">
                                <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleMakeAdmin(user._id)}>Make Admin</button>
                                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleBanUser(user._id)}>Ban User</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;