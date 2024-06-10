import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <div className="p-10 bg-[#F3F3F3] text-neutral-content font-sourceSans3">
            <footer className="footer mb-14 font-poppins flex items-center justify-between">
                <div className="flex flex-col">
                    <div className="flex gap-4 items-center text-3xl mb-2">
                        <img className="w-16 h-16 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGOLHOTFPFlHnHAmFfe8_Z-ZeFDfWgnJhBgA&s" alt="" />
                        <h1 className="text-[#F7A582] text-3xl font-bold font-sourceSans3">PET<span className="text-[#07332F]">CO`</span></h1>
                    </div>
                    <p className="font-montserrat text-[#3B3A3A] font-medium text-lg mb-6">Human Shampoo on Dogs After six days of delirat, the <br /> jury found Hernandez guilty of first-degree murder</p>
                </div>
                <nav>
                    <h4 className="font-bold text-[#0A0808] text-xl mb-3">Quick Links</h4>
                    <NavLink to="/" className="text-[#6C6B6B] hover:text-[#F7A582] font-semibold">Home</NavLink>
                    <NavLink to="/dashboard" className="text-[#6C6B6B] hover:text-[#F7A582] font-semibold">Dashboard</NavLink>
                    <NavLink to="/pet_listing" className="text-[#6C6B6B] hover:text-[#F7A582] font-semibold">Pet Listing</NavLink>
                    <NavLink to="/donation_campaigns" className="text-[#6C6B6B] hover:text-[#F7A582] font-semibold">Donation Campaigns</NavLink>
                    <NavLink to="/signin" className="text-[#6C6B6B] hover:text-[#F7A582] font-semibold">Sign In</NavLink>
                </nav>
                <div className="mb-4 lg:mb-0 text-[#3B3A3A]">
                    <h2 className="text-lg font-bold mb-2">Stay Connected</h2>
                    <p>Subscribe to our newsletter to get the latest updates and offers!</p>
                    <form className="mt-4 flex">
                        <input type="email" placeholder="Your email" className="bg-gray-700 text-white rounded-l-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300" />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Subscribe</button>
                    </form>
                </div>
            </footer>
            <div className="mt-8 border-t border-gray-600 pt-4 font-montserrat text-center text-[#3B3A3A]">
                <p>Copyright &copy; {new Date().getFullYear()} - All right reserved by PETCO`.</p>
            </div>
        </div>
    );
};

export default Footer;