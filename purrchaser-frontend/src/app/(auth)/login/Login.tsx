"use client"

import React, {useEffect, useLayoutEffect, useState} from "react";
import Image from "next/image";
import clsx from "clsx";
import {useRouter} from "next/navigation";
import {getCurrentUser, LoginRequest, useLoginMutation} from "@/store/services/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const LogIn = () => {
    const router = useRouter();

    const [login, {isLoading}] = useLoginMutation();

    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enableCreateAccountButton, setEnableCreateAccountButton] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useLayoutEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            setIsAuthenticated(true);
            router.replace('/');
        }
        setIsCheckingAuth(false);
    }, [router]);


    useEffect(() => {
        setEnteredEmail("");
        setEnteredPassword("");
        setEnableCreateAccountButton(false);
    }, []);

    useEffect(() => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
        const enteredEmailIsValid = emailPattern.test(enteredEmail);
        const enteredPasswordIsValid = enteredPassword.trim().length > 5;

        if (enteredEmailIsValid && enteredPasswordIsValid) {
            setEnableCreateAccountButton(true);
        } else {
            setEnableCreateAccountButton(false);
        }
    }, [enteredEmail, enteredPassword]);

    if (isCheckingAuth || isAuthenticated) {
        return <LoadingSpinner/>;
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredEmail(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredPassword(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userCredentials: LoginRequest = {
            email: enteredEmail,
            password: enteredPassword
        };

        try {
            const loginResponse = await login(userCredentials).unwrap();
            if (!!loginResponse.user) {
                // console.log("User logged in successfully!\nUser Info:", loginResponse.user);
                router.push('/');
            }

        } catch (userLoginError) {
            console.error("An error occurred while attempting to Login user. userLoginError: ", userLoginError);
        }

    }

    return (
        <div className="pt-10 sm:pt-0 bg-white flex sm:min-h-full flex-row items-center ">
            <div className="relative items-center hidden lg:flex w-[40%] min-h-full">
                <Image
                    src="/assets/images/ND_Dome_Sketch.png"
                    alt="Notre Dame football helmet raised up"
                    className="opacity-90 object-cover object-center"
                    fill={true}
                    sizes="100%"
                    placeholder="blur"
                    blurDataURL={'/assets/images/ND_Dome_Sketch.png'}
                />

                <Image
                    src="/assets/images/HeroPattern.jpg"
                    alt="Dots pattern overlay"
                    className="opacity-10 bg-slate-500 object-cover object-top"
                    fill={true}
                    sizes="100%"
                />
            </div>

            <div className="bg-white flex flex-1 flex-col  min-h-full justify-center mb-12 py-5 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-center md:text-left text-2xl font-bold leading-9 tracking-tight text-gray-800">
                        <span className="relative whitespace-nowrap text-indigo-700 outline-1 outline-amber-50 mr-2">
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 418 42"
                                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-indigo-700/70"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"/>
                            </svg>
                            <span className="relative">XO Clutch!</span>
                        </span>Log in to your account
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto w-full sm:max-w-[580px]">
                    <div className="bg-white px-6 py-8 rounded-lg sm:px-12">
                        <form className="space-y-7" onSubmit={handleSubmit} method="POST" autoComplete="off">
                            <div>
                                <label htmlFor="user_email"
                                       className="block text-sm font-medium leading-6 text-left text-gray-800">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="user_email"
                                        name="user_email"
                                        type="email"
                                        autoComplete="new-email"
                                        required
                                        onChange={handleEmailChange}
                                        placeholder={"Enter your school email"}
                                        value={enteredEmail}
                                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="user_password"
                                       className="block text-sm font-medium leading-6 text-left text-gray-800">
                                    Account password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="user_password"
                                        name="user_password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        onChange={handlePasswordChange}
                                        placeholder={"Enter your password"}
                                        value={enteredPassword}
                                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pb-4">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-800">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm leading-6">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={!enableCreateAccountButton || isLoading}
                                    className={clsx(
                                        enableCreateAccountButton ? " bg-indigo-700 hover:bg-indigo-600" : " bg-gray-400 hover:bg-gray-400",
                                        "flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600")}
                                >
                                    {isLoading && <div role="status">
                                        <svg aria-hidden="true"
                                             className="mt-1 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-200"
                                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"/>
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"/>
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>}

                                    <span>Log in</span>
                                </button>
                            </div>
                        </form>

                        <div>
                            <div className="relative mt-10">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200"/>
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-black">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 w-full">

                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center gap-1.5 rounded-md bg-white border px-3 py-2 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                                >
                                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 32 32">
                                        <path
                                            d="M 16.003906 14.0625 L 16.003906 18.265625 L 21.992188 18.265625 C 21.210938 20.8125 19.082031 22.636719 16.003906 22.636719 C 12.339844 22.636719 9.367188 19.664063 9.367188 16 C 9.367188 12.335938 12.335938 9.363281 16.003906 9.363281 C 17.652344 9.363281 19.15625 9.96875 20.316406 10.964844 L 23.410156 7.867188 C 21.457031 6.085938 18.855469 5 16.003906 5 C 9.925781 5 5 9.925781 5 16 C 5 22.074219 9.925781 27 16.003906 27 C 25.238281 27 27.277344 18.363281 26.371094 14.078125 Z"></path>
                                    </svg>
                                    <span className="text-sm font-semibold leading-6">Google Account</span>
                                </a>
                            </div>
                        </div>

                        <p className="mt-5 text-center text-sm text-gray-500">
                            Don&apos;t have an account?{' '}
                            <a href="/register"
                               className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Sign up
                            </a>
                        </p>

                        <p className="mt-5 text-center text-sm text-gray-500">
                            <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Return home
                            </a>
                        </p>
                    </div>


                </div>
            </div>
        </div>

    );
}

export default LogIn;