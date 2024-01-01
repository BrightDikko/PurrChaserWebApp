"use client"

import React, {useEffect, useState} from "react";
import Image from "next/image";
import clsx from "clsx";
import {useAppDispatch} from "@/hooks/store";
import {useRouter} from "next/navigation";
import {
    AllSchools,
    getCurrentUser,
    RegisterRequest,
    School,
    useGetAllSchoolsQuery,
    useRegisterMutation
} from "@/store/services/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import {logoutUser} from "@/store/slices/authSlice";

// Function to validate email
const validateEmail = (enteredEmail: string, allSchools: AllSchools, selectedSchoolId: number) => {
    const school: School | undefined = allSchools.find(school => school.schoolId === selectedSchoolId);

    if (!school) return false;

    const emailPattern = new RegExp(`^[a-zA-Z0-9._-]+${escapeRegExp(school.emailFormat)}$`);

    return emailPattern.test(enteredEmail);
};

// Helper function to escape special characters in the email format for regex
function escapeRegExp(emailFormat: string) {
    return emailFormat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const SignUp = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {data: allSchools, isLoading: isLoadingSchools, error: errorWhileFetchingSchools} = useGetAllSchoolsQuery();

    const [register, {isLoading}] = useRegisterMutation();

    const [enteredFirstName, setEnteredFirstName] = useState("");
    const [enteredLastName, setEnteredLastName] = useState("");
    const [selectedSchoolId, setSelectedSchoolId] = useState<number | "DEFAULT">("DEFAULT");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enableCreateAccountButton, setEnableCreateAccountButton] = useState(false);

    useEffect(() => {
        setEnteredFirstName("");
        setEnteredLastName("");
        setSelectedSchoolId("DEFAULT");
        setEnteredEmail("");
        setEnteredPassword("");
        setEnableCreateAccountButton(false);
    }, []);

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            dispatch(logoutUser());
        }
    }, [router, dispatch]);

    useEffect(() => {
        const enteredFirstNameIsValid = enteredFirstName.trim().length > 1;
        const enteredLastNameIsValid = enteredLastName.trim().length > 1;
        const selectedSchoolIsValid = selectedSchoolId !== "DEFAULT";

        let enteredEmailIsValid = false;
        if (allSchools && selectedSchoolId !== "DEFAULT") {
            enteredEmailIsValid = validateEmail(enteredEmail, allSchools, selectedSchoolId);
        }

        const enteredPasswordIsValid = enteredPassword.trim().length > 5;

        if (enteredPasswordIsValid && enteredEmailIsValid && selectedSchoolIsValid && enteredFirstNameIsValid && enteredLastNameIsValid) {
            setEnableCreateAccountButton(true);
        } else {
            setEnableCreateAccountButton(false);
        }
    }, [enteredFirstName, enteredLastName, selectedSchoolId, enteredEmail, enteredPassword, allSchools]);

    if (isLoadingSchools) {
        return (<LoadingSpinner/>);
    }

    if (errorWhileFetchingSchools) {
        console.error("An error occurred while fetching schools. Error: ", errorWhileFetchingSchools);
    }

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredFirstName(event.target.value);
    }

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredLastName(event.target.value);
    }

    const handleSchoolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const schoolId = event.target.value;
        setSelectedSchoolId(parseInt(schoolId));
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredEmail(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredPassword(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (selectedSchoolId === "DEFAULT") {
            return;
        }

        const userCredentials: RegisterRequest = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            schoolId: selectedSchoolId,
            email: enteredEmail,
            password: enteredPassword
        };

        try {
            await register(userCredentials).unwrap();
            router.push('/login'); // REDIRECT TO LOGIN PAGE FOLLOWING SUCCESSFUL REGISTRATION
        } catch (userRegistrationError) {
            console.error("An error occurred while attempting to register user. userRegistrationError: ", userRegistrationError);
        }
    }

    return (
        <div className="pt-10 sm:pt-0 relative bg-white flex sm:min-h-full flex-row items-center ">
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

                <div className=" sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-center md:text-left text-2xl font-bold leading-9 tracking-tight text-gray-800">
                       <span className="relative whitespace-nowrap text-indigo-700 outline-1 outline-amber-50 mr-1">
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
                        </span> Create your account
                    </h2>
                </div>

                <div className="mt-2 sm:mt-8 sm:mx-auto w-full sm:max-w-[580px]">
                    <div className="bg-white px-6 py-2 rounded-lg sm:px-12">
                        <form className="space-y-4" onSubmit={handleSubmit} method="POST" autoComplete="off">

                            <div>
                                <label htmlFor="first_name"
                                       className="block text-sm font-medium leading-6 text-left text-black">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        placeholder="Enter your first name"
                                        value={enteredFirstName}
                                        onChange={handleFirstNameChange}
                                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="last_name"
                                       className="block text-sm font-medium leading-6 text-left text-black">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        placeholder="Enter your last name"
                                        value={enteredLastName}
                                        onChange={handleLastNameChange}
                                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="user_school"
                                       className="block text-sm font-medium leading-6 text-left text-black">
                                    Select your School
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="user_school"
                                        name="user_school"
                                        required
                                        value={selectedSchoolId}
                                        onChange={handleSchoolChange}
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="DEFAULT" disabled>Choose your College / University</option>
                                        {allSchools?.map((school: School) => (
                                            <option key={school.schoolId} value={school.schoolId}>{school.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="user_email"
                                       className="block text-sm font-medium leading-6 text-left text-black">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="user_email"
                                        name="user_email"
                                        type="email"
                                        autoComplete="new-email"
                                        required
                                        value={enteredEmail}
                                        placeholder={"Enter your school email"}
                                        onChange={handleEmailChange}
                                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="user_password"
                                       className="block text-sm font-medium leading-6 text-left text-black">
                                    Password
                                </label>
                                <div className="mt-2 pb-2">
                                    <input
                                        id="user_password"
                                        name="user_password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={enteredPassword}
                                        placeholder={"Enter your password"}
                                        onChange={handlePasswordChange}
                                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={!enableCreateAccountButton}
                                    className={clsx(
                                        enableCreateAccountButton ? " bg-indigo-700 hover:bg-indigo-600" : " bg-gray-500 hover:bg-gray-500",
                                        "flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    )}
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

                                    <span>Create account</span>
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
                            Have an account?{' '}
                            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Log in
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

export default SignUp;