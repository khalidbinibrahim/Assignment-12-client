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
import UpdateAddedPet from "../pages/Dashboard/AddedPets/UpdateAddedPet";
import CreateDonationCampaign from "../pages/Dashboard/CreateDonationCampaign/CreateDonationCampaign"
import AdoptionRequest from "../pages/Dashboard/AdoptionRequest/AdoptionRequest";
import AdminRoute from "./AdminRoute";
import AdminUsers from "../pages/Dashboard/Admin/AdminUsers/AdminUsers";
import MyDonationCampaigns from "../pages/Dashboard/MyDonationCampaigns/MyDonationCampaigns";
import CampaignDetails from "../components/CampaignDetails";
import MyDonations from "../pages/Dashboard/MyDonations/MyDonations";

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
            },

            {
                path: '/campaigns/:id',
                element: <PrivateRoute><CampaignDetails /></PrivateRoute>
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
            },

            {
                path: "/dashboard/update_pet/:petId",
                element: <PrivateRoute><UpdateAddedPet /></PrivateRoute>
            },

            {
                path: "/dashboard/create_donation_campaign",
                element: <PrivateRoute><CreateDonationCampaign /></PrivateRoute>
            },

            {
                path: "/dashboard/adoption_request",
                element: <PrivateRoute><AdoptionRequest /></PrivateRoute>
            },

            {
                path: "/dashboard/my_donation_campaigns",
                element: <PrivateRoute><MyDonationCampaigns /></PrivateRoute>
            },

            {
                path: "/dashboard/my_donations",
                element: <PrivateRoute><MyDonations /></PrivateRoute>
            },

            // Admin-specific routes
            {
                path: "/dashboard/admin/users",
                element: <AdminRoute><AdminUsers /></AdminRoute>
            }
        ]
    }
])

export default router;