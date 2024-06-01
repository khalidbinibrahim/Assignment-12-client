import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { FaGithub } from 'react-icons/fa';
import { IoMdEye } from "react-icons/io";
import { PiEyeClosedBold } from "react-icons/pi";

const SignUp = () => {
    const { register, handleSubmit, reset } = useForm();
    const { createUser, gitHubLogin, googleLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = data => {
        console.log(data);
        const firstName = data.firstName;
        const lastName = data.lastName;
        const fullName = firstName + ' ' + lastName;
        const email = data.email;
        const PhotoUrl = data.PhotoUrl;
        const password = data.password;
        console.log(fullName, lastName, email, PhotoUrl);

        createUser(email, password)
            .then(res => {
                res.user.photoURL = PhotoUrl;
                res.user.displayName = fullName;
                const loggedUser = res.user;
                console.log(loggedUser);
                navigate(location?.state ? location.state : '/');
                reset();
            })
            .catch(error => {
                console.error(error);
                toast.error("Error creating account. Please try again.");
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleGithubLogin = () => {
        gitHubLogin()
            .then(res => {
                console.log(res.user);
                toast.success("Logged in with GitHub successfully");
            })
            .catch(error => {
                console.error(error);
                toast.error("Error logging in with GitHub. Please try again.");
            });
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                console.log(res.user);
                toast.success("Logged in with Google successfully");
            })
            .catch(error => {
                console.error(error);
                toast.error("Error logging in with Google. Please try again.");
            });
    }

    return (
        <div>
            <div className='mb-10'>
                <div className='flex items-center'>
                    <div className='mx-8 lg:mx-auto my-10 px-14 py-8 border rounded-md border-gray-400 font-montserrat w-4/12'>
                        <h1 className='mb-6 font-bold text-black text-2xl'>Create an Account</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-4'>
                                <TextField id="standard-basic" label="First Name" variant="standard" className='w-full' type="text" {...register("firstName", { required: true })} />
                            </div>

                            <div className='mb-4'>
                                <TextField id="standard-basic" label="Last Name" variant="standard" className='w-full' type="text" {...register("lastName", { required: true })} />
                            </div>

                            <div className='mb-4'>
                                <TextField id="standard-basic" label="Photo Url" variant="standard" className='w-full' type="url" {...register("PhotoUrl", { required: true })} />
                            </div>

                            <div className='mb-4'>
                                <TextField id="standard-basic" label="Email" variant="standard" className='w-full' type="email" {...register("email", { required: true })} />
                            </div>

                            <div className='mb-4 flex items-center'>
                                <TextField id="standard-basic" label="Password" variant="standard" className='w-full' type={showPassword ? "text" : "password"} {...register("password", { required: true })} />
                                <span onClick={togglePasswordVisibility} className='relative right-8 text-xl'>{showPassword ? <IoMdEye /> : <PiEyeClosedBold />}</span>
                            </div>

                            <div className='my-4'>
                                <button type="submit" className="btn w-full bg-[#dda15e] font-montserrat text-black font-bold px-7 text-center rounded-md border-none">Sign Up</button>
                            </div>
                        </form>
                        <p className='text-black font-bold text-center'>Already have an account? <NavLink to="/signin" className="text-[#606c38] hover:border-b hover:border-[#606c38] font-semibold">SIGN IN</NavLink></p>
                    </div>
                </div>

                <div className='mb-6 font-montserrat'>
                    <p className='text-black text-center font-bold'>Or</p>
                </div>

                <div className='flex flex-col items-center justify-center gap-4 font-montserrat'>
                    <a onClick={handleGithubLogin} className="btn btn-outline text-black bg-white rounded-3xl border-gray-400 px-10 py-auto font-bold w-[460px]"><FaGithub className='text-2xl' /> Continue with Github</a>
                    <a onClick={handleGoogleLogin} className="btn btn-outline text-black bg-white rounded-3xl border-gray-400 px-10 py-auto font-bold w-[460px]"><FcGoogle className='text-2xl' /> Continue with Google</a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;