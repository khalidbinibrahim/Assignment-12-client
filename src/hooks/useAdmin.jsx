import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['isAdmin'],
        enabled: !!user && !loading,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/admin/${user?.email}`);
                return res.data?.admin;
            } catch (error) {
                console.error("Error fetching admin status:", error);
                throw error;
            }
        }
    });

    const isAdmin = data !== undefined ? data : null;

    return { isAdmin, isLoading, isError };
};

export default useAdmin;