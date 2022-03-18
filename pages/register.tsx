import { m } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import firebaseApp, { auth } from "../firebase";

const Footer = dynamic(() => import("../components/Footer"));
const Header = dynamic(() => import("../components/Header"));

const Register: React.FC = () => {
    const [
        createUserWithEmailAndPassword,
        loading,

    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile] = useUpdateProfile(auth);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPass, setConfirmPassword] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [preferredSubjs, setPreferredSubjs] = useState<string>();
    const [mathsSubj, setMathsSubj] = useState<boolean>(false);
    const [physicsSubj, setPhysicsSubj] = useState<boolean>(false);
    const [biologySubj, setBiologySubj] = useState<boolean>(false);
    const [financeSubj, setFinanceSubj] = useState<boolean>(false);
    const [csSubj, setCsSubj] = useState<boolean>(false);

    const handleRegister = async () => {
        if (email && password && confirmPass && username) {
            setPreferredSubjs(
                `${mathsSubj} ${physicsSubj} ${biologySubj} ${financeSubj} ${csSubj}`
            );
            if (preferredSubjs === "" || preferredSubjs === undefined) {
                alert("Choose atleast one subject");
                return;
            } else if (confirmPass !== password) {
                alert("Password does not match with confirm password");
                return;
            } else {
                await createUserWithEmailAndPassword(email, password).then(async () => {
                    
                    await updateProfile({displayName: username}).then(() => {
console.log("registration done with username");
                    Router.push("/")
                    }).catch(() => {alert("username not set, use email to login")
                    Router.push("/")                
                })
                    
                }).catch(() => console.log("regisstration failed"))
                
            }
        } else {
            alert("Fill all fields");
            return;
        }
    };


    return (
        <m.div
            className="md:flex"
            initial={{
                opacity: 0,
                y: -50,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: 50,
            }}
        >
            <Header />
            <main>
                <div>
                    <Link href="/login">
                        <a className="text-black w-max mt-5 xl:mt-10 flex items-center border border-black px-6 py-2 mx-8 my-4 rounded-full">
                            <svg
                                className="mr-2"
                                width="36"
                                height="35"
                                viewBox="0 0 36 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.4562 27.4459C14.1791 27.4459 13.9021 27.3438 13.6833 27.125L4.83123 18.273C4.40831 17.85 4.40831 17.15 4.83123 16.7271L13.6833 7.87505C14.1062 7.45213 14.8062 7.45213 15.2291 7.87505C15.6521 8.29797 15.6521 8.99797 15.2291 9.42088L7.14998 17.5L15.2291 25.5792C15.6521 26.0021 15.6521 26.7021 15.2291 27.125C15.025 27.3438 14.7333 27.4459 14.4562 27.4459Z"
                                    fill="#292D32"
                                />
                                <path
                                    d="M30.3958 18.5938H5.85205C5.25413 18.5938 4.7583 18.0979 4.7583 17.5C4.7583 16.9021 5.25413 16.4062 5.85205 16.4062H30.3958C30.9937 16.4062 31.4896 16.9021 31.4896 17.5C31.4896 18.0979 30.9937 18.5938 30.3958 18.5938Z"
                                    fill="#292D32"
                                />
                            </svg>
                            Go Back
                        </a>
                    </Link>
                    <div className="lg:flex xl:mx-8 flex-row-reverse ">
                        <img
                            className="xl:w-2/5 xl:mb-72 w-4/5 mx-auto lg:w-1/2"
                            src="/register_hero.svg"
                            alt="register hero"
                        />
                        <div className="lg:w-1/2 md:w-3/4 md:mx-auto">
                            <h1 className="md:mb-8 text-4xl font-bold mx-8 mt-5">
                                Registration
                            </h1>
                            <form className="w-4/5 mx-auto">
                                <div className="mt-4">
                                    <label
                                        className="block font-bold mb-2 text-2xl"
                                        htmlFor="Email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="appearance-none rounded-lg focus:outline-none focus:shadow-outline bg-secondary w-4/5  h-12 pl-4 placeholder:text-black "
                                        id="Email"
                                        type="Email"
                                        placeholder="Enter Email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mt-4">
                                    <label
                                        className="block font-bold mb-2 text-2xl"
                                        htmlFor="Username"
                                    >
                                        Username
                                    </label>
                                    <input
                                        className="appearance-none rounded-lg focus:outline-none focus:shadow-outline bg-secondary w-4/5 h-12 pl-4 placeholder:text-black "
                                        id="Email"
                                        type="Email"
                                        placeholder="Enter Username"
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="justify-center">
                                    <h1 className="mt-4 block font-bold mb-2 text-2xl">
                                        Preferred Subjects
                                    </h1>
                                    <div className="flex flex-wrap gap-x-3">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-md bg-white checked:bg-primary checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="checkbox"
                                                value="math cond-mat mtrl-sci stats"
                                                id="flexCheckDefault"
                                                onChange={(e) =>
                                                    setMathsSubj(!mathsSubj)
                                                }
                                            />
                                            <label
                                                className="form-check-label inline-block text-gray-800"
                                                htmlFor="flexCheckDefault"
                                            >
                                                Maths
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-md bg-white checked:bg-primary checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="checkbox"
                                                value="astro-ph hep-ph quant-ph hep-ex"
                                                id="flexCheckDefault"
                                                onChange={(e) =>
                                                    setPhysicsSubj(!physicsSubj)
                                                }
                                            />
                                            <label
                                                className="form-check-label inline-block text-gray-800"
                                                htmlFor="flexCheckDefault"
                                            >
                                                Physics
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-md bg-white checked:bg-primary checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="checkbox"
                                                value="q-bio"
                                                id="flexCheckDefault"
                                                onChange={(e) =>
                                                    setBiologySubj(!biologySubj)
                                                }
                                            />
                                            <label
                                                className="form-check-label inline-block text-gray-800"
                                                htmlFor="flexCheckDefault"
                                            >
                                                Biology
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-md bg-white checked:bg-primary checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="checkbox"
                                                value="q-fin"
                                                id="flexCheckDefault"
                                                onChange={(e) =>
                                                    setFinanceSubj(!financeSubj)
                                                }
                                            />
                                            <label
                                                className="form-check-label inline-block text-gray-800"
                                                htmlFor="flexCheckDefault"
                                            >
                                                Finance
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-md bg-white checked:bg-primary checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="checkbox"
                                                value="cs.math"
                                                id="flexCheckDefault"
                                                onChange={(e) =>
                                                    setCsSubj(!csSubj)
                                                }
                                            />
                                            <label
                                                className="form-check-label inline-block text-gray-800"
                                                htmlFor="flexCheckDefault"
                                            >
                                                CS
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label
                                        className="block font-bold mb-2 text-2xl"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        className="appearance-none rounded-lg focus:outline-none focus:shadow-outline bg-secondary w-4/5 h-12 pl-4 placeholder:text-black "
                                        id="password"
                                        type="password"
                                        placeholder="Enter Password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mt-4">
                                    <label
                                        className="block font-bold mb-2 text-2xl"
                                        htmlFor="confirmpassword"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        className="appearance-none rounded-lg focus:outline-none focus:shadow-outline bg-secondary w-4/5 h-12 pl-4 placeholder:text-black "
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="flex items-center mt-8 space-x-8">
                                    <button
                                        className=" font-bold  rounded-xl focus:outline-none focus:shadow-outline bg-primary px-6 py-2 disabled:bg-opacity-20 disabled:cursor-not-allowed"
                                        type="button"
                                        disabled={!!loading}
                                        onClick={() => handleRegister()}
                                    >
                                        Register
                                    </button>
                                    <Link href="/login">
                                        <a className="font-bold border-2 border-primary px-6 py-2 rounded-xl">
                                            Login
                                        </a>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </m.div>
    );
};

export default Register;
