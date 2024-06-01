import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../pages/Shared/Navigation/Navigation";
import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
    const location = useLocation();
    
    const noHeaderFooter = location.pathname.includes('/signin') || location.pathname.includes('/signup');

    return (
        <div>
            { noHeaderFooter || <Navigation />}
            <Outlet />
            { noHeaderFooter || <Footer />}
        </div>
    );
};

export default Main;