import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import { IoMdEye } from "react-icons/io";
import { PiEyeClosedBold } from "react-icons/pi";

const SignIn = () => {
    const { register, handleSubmit, reset } = useForm();
    const { signInUser, gitHubLogin, googleLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = data => {
        const { email, password } = data;
        signInUser(email, password)
            .then(res => {
                const loggedUser = res.user;
                console.log(loggedUser);
                navigate(location?.state ? location.state : '/');
                reset();
            })
            .catch(error => {
                console.error(error);
                toast.error("Error logging in user. Please try again.");
            })
    }

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
            <div>
                <div className='mb-10'>
                    <div className='flex items-center'>
                        <div className='mx-8 lg:mx-auto my-10 px-14 py-8 border rounded-md border-gray-400 font-montserrat'>
                            <h1 className='mb-6 font-bold text-black text-2xl'>Login</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='mb-4'>
                                    <TextField id="standard-basic" label="Email" variant="standard" className='w-full' type="email" {...register("email", { required: true })} />
                                </div>

                                <div className='mb-6 flex items-center'>
                                    <TextField id="standard-basic" label="Password" variant="standard" className='w-full' type={showPassword ? "text" : "password"} {...register("password", { required: true })} />
                                    <span onClick={togglePasswordVisibility} className='relative right-8 text-xl'>{showPassword ? <IoMdEye /> : <PiEyeClosedBold />}</span>
                                </div>

                                <div className='flex justify-between my-6'>
                                    <div className='flex gap-2'>
                                        <input type="checkbox" placeholder="Remember Me" {...register} />
                                        <p className='text-black font-bold'>Remember Me</p>
                                    </div>
                                    <a className="text-[#606c38] hover:border-b hover:border-[#606c38] font-semibold">Forgot Password</a>
                                </div>

                                <div className='my-4'>
                                    <button type="submit" className="btn w-full bg-[#dda15e] font-montserrat text-black font-bold px-7 text-center rounded-md border-none">Sign In</button>
                                </div>
                            </form>
                            <p className='text-black font-bold text-center'>Do not have an account? <NavLink to="/signup" className="text-[#606c38] hover:border-b hover:border-[#606c38] font-semibold">SIGN UP</NavLink></p>
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
        </div>
    );
};

export default SignIn;