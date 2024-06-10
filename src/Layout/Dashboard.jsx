import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const isAdmin = useAdmin();

    return (
        <div className="flex font-sourceSans3">
            <div className="w-72 min-h-full bg-[#07332F] flex justify-center flex-col items-center px-2">
                <div className="flex gap-4 items-center text-3xl mb-6">
                    <img className="w-16 h-16 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGOLHOTFPFlHnHAmFfe8_Z-ZeFDfWgnJhBgA&s" alt="Logo" />
                    <h1 className="text-[#F7A582] text-3xl font-bold font-sourceSans3">PET<span className="text-white">CO`</span></h1>
                </div>
                <div>
                    <ul>
                        <li className="mb-3"><NavLink to="/dashboard/add_pet" className='text-[#F3F3F3] hover:text-[#F7A582] focus:text-[#F7A582] focus:font-medium font-semibold text-xl py-2 px-3'>Add a pet</NavLink></li>
                        <li className="mb-3"><NavLink to="/dashboard/my_added_pets" className="text-[#F3F3F3] hover:text-[#F7A582] focus:text-[#F7A582] focus:font-medium font-semibold text-xl py-2 px-3">My added pets</NavLink></li>
                        <li className="mb-3"><NavLink to="/dashboard/adoption_request" className="text-[#F3F3F3] hover:text-[#F7A582] focus:text-[#F7A582] focus:font-medium font-semibold text-xl py-2 px-3">Adoption Request</NavLink></li>
                        <li className="mb-3"><NavLink to="/dashboard/create_donation_campaign" className="text-[#F3F3F3] hover:text-[#F7A582] focus:text-[#F7A582] focus:font-medium font-semibold text-xl py-2 px-3">Create Donation Campaign</NavLink></li>
                        <li className="mb-3"><NavLink to="/dashboard/my_donation_campaigns" className="text-[#F3F3F3] hover:text-[#F7A582] focus:text-[#F7A582] focus:font-medium font-semibold text-xl py-2 px-3">My Donation Campaigns</NavLink></li>
                        <li className="mb-6"><NavLink to="/dashboard/my_donations" className="text-[#F3F3F3] hover:text-[#F7A582] focus:text-[#F7A582] focus:font-medium font-semibold text-xl py-2 px-3">My Donations</NavLink></li>
                        
                        {isAdmin && (
                            <>
                                <hr />
                                <li className="mb-3 mt-6"><NavLink to="/dashboard/admin/users" className="text-[#F3F3F3] hover:text-[#F7A582] focus:text-[#F7A582] focus:font-medium font-semibold text-xl py-2 px-3">Admin Users</NavLink></li>
                                <li className="mb-3"><NavLink to="/dashboard/admin/all_pets" className="text-[#F3F3F3] hover:text-[#F7A582] focus:text-[#F7A582] focus:font-medium font-semibold text-xl py-2 px-3">All Pets</NavLink></li>
                                <li className="mb-6"><NavLink to="/dashboard/admin/all_donations" className="text-[#F3F3F3] hover:text-[#F7A582] focus:text-[#F7A582] focus:font-medium font-semibold text-xl py-2 px-3">All Donations</NavLink></li>
                            </>
                        )}
                    </ul>
                    <hr />
                    <ul>
                        <li className="mb-3 mt-6"><NavLink to="/" className="text-[#F3F3F3] hover:text-[#F7A582] focus:text-[#F7A582] focus:font-medium font-semibold text-xl py-2 px-3">Home</NavLink></li>
                        <li className="mb-3"><NavLink to="/signin" className="text-[#F3F3F3] hover:text-[#F7A582] focus:text-[#F7A582] focus:font-medium font-semibold text-xl py-2 px-3">Sign In</NavLink></li>
                        <li className="mb-10"><NavLink to="/update_profile" className="text-[#F3F3F3] hover:text-[#F7A582] focus:text-[#F7A582] focus:font-medium font-semibold text-xl py-2 px-3">Update Profile</NavLink></li>
                    </ul>
                    <div className="flex items-center gap-2">
                        <img id="userPhoto" alt="" src={user?.photoURL ? user.photoURL : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} className="w-14 h-14 rounded-full" />
                        <h3 className="text-[#F3F3F3] font-semibold">{user.displayName ? user?.displayName : 'John Doe'}</h3>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;