import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { FaGithub } from 'react-icons/fa';
import { IoMdEye } from "react-icons/io";
import { PiEyeClosedBold } from "react-icons/pi";
import Swal from "sweetalert2";

const SignUp = () => {
    const { register, handleSubmit, reset } = useForm();
    const { createUser, gitHubLogin, googleLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = data => {
        console.log(data);
        const fullName = data.fullName;
        const email = data.email;
        const PhotoUrl = data.PhotoUrl;
        const password = data.password;
        console.log(fullName, email, PhotoUrl);

        createUser(email, password)
            .then(res => {
                res.user.photoURL = PhotoUrl;
                res.user.displayName = fullName;
                const loggedUser = res.user;
                console.log(loggedUser);
                Swal.fire({
                    title: "Success",
                    text: "User Created Successfully",
                    icon: "success"
                });
                navigate(location?.state ? location.state : '/');
                reset();
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error to create User"
                });
            });
    };

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
        <div className='flex justify-between items-center'>
            <div className='w-1/2'>
                <img src="https://i.pinimg.com/1200x/6b/2e/ed/6b2eed54e2a15ee922127f5e6f6d40a7.jpg" alt="" />
            </div>

            <div className='mb-10 font-sourceSans3 w-1/2'>
                <div className='flex items-center'>
                    <div className='mx-8 lg:mx-auto my-10 p-12 border rounded-md border-gray-300 font-montserrat'>
                        <h1 className='mb-8 mx-20 font-bold text-black text-center text-2xl'>Sign Up to  <span className="text-[#F7A582] text-3xl font-bold font-sourceSans3">PETCO`</span></h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-4'>
                                <h4 className='text-[#0A0808] font-semibold text-lg mb-2'>Name</h4>
                                <input placeholder="Enter your name" className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" {...register("fullName", { required: true })} />
                            </div>

                            <div className='mb-4'>
                                <h4 className='text-[#0A0808] font-semibold text-lg mb-2'>Photo URL</h4>
                                <input placeholder="Enter your photoURL" className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="url" {...register("PhotoUrl", { required: true })} />
                            </div>

                            <div className='mb-4'>
                                <h4 className='text-[#0A0808] font-semibold text-lg mb-2'>Email Address</h4>
                                <input placeholder="Enter your email" className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="email" {...register("email", { required: true })} />
                            </div>

                            <div>
                                <h4 className='text-[#0A0808] font-semibold text-lg mb-2'>Password</h4>
                                <div className='mb-4 flex items-center'>
                                    <input placeholder="Enter your password" className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type={showPassword ? "text" : "password"} {...register("password", { required: true })} />
                                    <span onClick={togglePasswordVisibility} className='relative right-8 text-xl'>{showPassword ? <IoMdEye /> : <PiEyeClosedBold />}</span>
                                </div>
                            </div>

                            <div className='my-4'>
                                <button type="submit" className="btn w-full bg-[#F7A582] border-none text-white font-semibold text-base font-sourceSans3 rounded-md px-7">Create Account</button>
                            </div>
                        </form>
                        <p className='text-[#6C6B6B] font-normal text-center'>Already registered? Go to <NavLink to="/signin" className="text-[#F7A582] hover:border-b hover:border-[#F7A582] font-semibold">SIGN IN</NavLink></p>
                    </div>
                </div>

                <div className='mb-6 font-montserrat'>
                    <div className="divider w-[460px] mx-auto">Or</div>
                </div>

                <div className='flex flex-col items-center justify-center gap-4 font-montserrat'>
                    <a onClick={handleGithubLogin} className="btn btn-outline text-black bg-white rounded-3xl border-gray-400 px-10 py-auto font-semibold text-base w-[460px]"><FaGithub className='text-2xl' /> Continue with Github</a>
                    <a onClick={handleGoogleLogin} className="btn btn-outline text-black bg-white rounded-3xl border-gray-400 px-10 py-auto font-semibold text-base w-[460px]"><FcGoogle className='text-2xl' /> Continue with Google</a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;