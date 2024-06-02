import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home"
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import ErrorPage from "../pages/Error/ErrorPage"
import PetListing from "../pages/PetListing/PetListing";
import DonationCampaigns from "../pages/DonationCampaigns/DonationCampaigns";
import PetDetails from "../components/PetDetails";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            
            {
                path: '/signin',
                element: <SignIn />
            },

            {
                path: '/signup',
                element: <SignUp />
            },

            {
                path: '/pet_listing',
                element: <PetListing />
            },

            {
                path: '/pets/:id',
                element: <PetDetails />
            },

            {
                path: '/donation_campaigns',
                element: <DonationCampaigns />
            }
        ]
    }
])

export default router;