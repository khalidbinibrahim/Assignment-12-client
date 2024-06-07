import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home"
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import ErrorPage from "../pages/Error/ErrorPage"
import PetListing from "../pages/PetListing/PetListing";
import DonationCampaigns from "../pages/DonationCampaigns/DonationCampaigns";
import PetDetails from "../components/PetDetails";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AddPet from "../pages/Dashboard/AddPet/AddPet";
import AddedPets from "../pages/Dashboard/AddedPets/AddedPets";

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
                element: <PrivateRoute><PetDetails /></PrivateRoute>
            },

            {
                path: '/donation_campaigns',
                element: <DonationCampaigns />
            }
        ]
    },

    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: "/dashboard/add_pet",
                element: <PrivateRoute><AddPet /></PrivateRoute>
            },

            {
                path: "/dashboard/my_added_pets",
                element: <PrivateRoute><AddedPets /></PrivateRoute>
            }
        ]
    }
])

export default router;