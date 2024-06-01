import { NavLink } from "react-router-dom";
import { LuSun, LuMoon } from "react-icons/lu";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-toastify";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

const Navigation = () => {
    const { user, logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    const handleLogOut = () => {
        logOut()
            .then(toast.success('User log out successfully'))
            .catch(error => {
                console.error(error);
            })
    }

    const navLinks = <>
        <NavLink to="/" className="mr-3 text-[#F3F3F3] hover:text-[#F7A582] focus:text-[#F7A582] focus:font-medium font-semibold rounded-lg py-2 px-3">Home</NavLink>
        <NavLink to="/pet_listing" className="mr-3 text-[#F3F3F3] hover:text-[#F7A582] focus:text-[#F7A582] focus:font-medium font-semibold rounded-lg py-2 px-3">Pet Listing</NavLink>
        <NavLink to="/donation_campaigns" className="mr-3 text-[#F3F3F3] hover:text-[#F7A582] focus:text-[#F7A582] focus:font-medium font-semibold rounded-lg py-2 px-3">Donation Campaigns</NavLink>
    </>

    return (
        <div className="navbar fixed z-10 bg-opacity-30 font-sourceSans3 bg-black text-white px-20">
            <div className=" navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <div className="flex gap-4 items-center mr-6 text-3xl">
                    <img className="w-16 h-16 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGOLHOTFPFlHnHAmFfe8_Z-ZeFDfWgnJhBgA&s" alt="" />
                    <h1 className="text-[#F7A582] text-3xl font-bold font-sourceSans3">PET<span className="text-white">CO`</span></h1>
                </div>
            </div>
            <div className="navbar-end">
                <div className="hidden lg:flex mr-4 ml-4">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="flex items-center gap-2">
                    <label className="swap swap-rotate">
                        <input onClick={toggleTheme} type="checkbox" />
                        <div className="swap-on text-3xl"><LuMoon /></div>
                        <div className="swap-off text-3xl"><LuSun /></div>
                    </label>

                    {
                        user ?
                            <div className="flex gap-2 items-center">
                                <button onClick={handleLogOut} className="btn bg-[#F7A582] border-none text-white font-semibold text-base font-sourceSans3 rounded-md px-7">Sign Out</button>
                                <NavLink to="/update_profile">
                                    <img id="userPhoto" alt="" src={user?.photoURL ? user.photoURL : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} className="w-14 h-14 rounded-full" />
                                </NavLink>
                                <Tooltip
                                    anchorId="userPhoto"
                                    place="top"
                                    content={user.displayName}
                                />
                            </div> :
                            <NavLink to="/signin" className="btn bg-[#F7A582] border-none text-white font-semibold text-base font-sourceSans3 rounded-md px-7">Sign In</NavLink>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navigation;