import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { IoMdEye } from "react-icons/io";
import { PiEyeClosedBold } from "react-icons/pi";
import Swal from "sweetalert2";
import axios from "axios";

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
                const user = { email };
                
                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                .then(res => {
                    console.log(res.data);
                    if(res.data.message) {
                        Swal.fire({
                            title: "Success",
                            text: "User sign in Successfully",
                            icon: "success"
                        });
                        navigate(location?.state ? location.state : '/');
                        reset();
                    }
                })
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error to create User"
                });
            })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleGithubLogin = () => {
        gitHubLogin()
            .then(res => {
                console.log(res.user);
                Swal.fire({
                    title: "Success",
                    text: "Logged in with GitHub successfully",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error logging in with GitHub. Please try again."
                });
            });
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                console.log(res.user);
                Swal.fire({
                    title: "Success",
                    text: "Logged in with Google successfully",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error logging in with Google. Please try again."
                });
            });
    }

    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className='w-1/2'>
                    <img src="https://i.pinimg.com/1200x/6b/2e/ed/6b2eed54e2a15ee922127f5e6f6d40a7.jpg" alt="" />
                </div>

                <div className='mb-10 font-sourceSans3 w-1/2'>
                    <div className='flex items-center'>
                        <div className='mx-8 lg:mx-auto my-10 p-12 border rounded-md border-gray-300 font-montserrat'>
                            <h1 className='mb-8 mx-20 font-bold text-black text-center text-2xl'>Sign in to  <span className="text-[#F7A582] text-3xl font-bold font-sourceSans3">PETCO`</span></h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='mb-6'>
                                    <h4 className='text-[#0A0808] font-semibold text-lg mb-2'>Email Address</h4>
                                    <input placeholder='Enter your email address' className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="email" {...register("email", { required: true })} />
                                </div>

                                <div>
                                    <div className='flex justify-between'>
                                        <h4 className='text-[#0A0808] font-semibold text-lg mb-2'>Password</h4>
                                        <a className="text-[#F7A582] font-normal">Forgot password?</a>
                                    </div>

                                    <div className='mb-6 flex items-center'>
                                        <input placeholder='Enter your password' className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type={showPassword ? "text" : "password"} {...register("password", { required: true })} />
                                        <span onClick={togglePasswordVisibility} className='relative right-8 text-xl'>{showPassword ? <IoMdEye /> : <PiEyeClosedBold />}</span>
                                    </div>
                                </div>

                                <div className='my-4'>
                                    <button type="submit" className="btn w-full bg-[#F7A582] border-none text-white font-semibold text-base font-sourceSans3 rounded-md px-7">Sign In</button>
                                </div>
                            </form>
                            <p className='text-[#6C6B6B] font-normal text-center'>Please register at first. Go to <NavLink to="/signup" className="text-[#F7A582] hover:border-b hover:border-[#F7A582] font-semibold">SIGN UP</NavLink></p>
                        </div>
                    </div>

                    <div className='mb-6 font-montserrat'>
                        <div className="divider w-[520px] mx-auto">Or</div>
                    </div>

                    <div className='flex flex-col items-center justify-center gap-4 font-montserrat'>
                        <a onClick={handleGithubLogin} className="btn btn-outline text-black bg-white rounded-3xl border-gray-400 px-10 py-auto font-semibold text-base w-[460px]"><FaGithub className='text-2xl' /> Continue with Github</a>
                        <a onClick={handleGoogleLogin} className="btn btn-outline text-black bg-white rounded-3xl border-gray-400 px-10 py-auto font-semibold text-base w-[460px]"><FcGoogle className='text-2xl' /> Continue with Google</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;