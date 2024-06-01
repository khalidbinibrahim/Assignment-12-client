import { Outlet } from "react-router-dom";
import Navigation from "../pages/Shared/Navigation/Navigation";

const Main = () => {
    return (
        <div>
            <Navigation />
            <Outlet />
        </div>
    );
};

export default Main;