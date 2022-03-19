import {  m } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Footer = dynamic(() => import("../components/Footer"));
const Header = dynamic(() => import("../components/Header"));

const Login: React.FC = () => {

    
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [
        signInWithEmailAndPassword,
        loading,
      ] = useSignInWithEmailAndPassword(auth);

    const handleLogin = async () => {
        if(email && password) {
            await signInWithEmailAndPassword(email, password).then(() => {
                Router.push("/")
            }).catch((e) => {
                alert("Error: " + e.message)
            })
        } else {
            alert("Fill all fields")
        }
    }
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
                    <Link href="/">
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
                            className="md:w-3/5 py-4 xl:w-2/5 xl:mb-72 w-4/5 mx-auto lg:w-2/5"
                            src="/login_hero.svg"
                            alt="login hero"
                        />
                        <div className="lg:w-1/2 md:w-10/12 md:mx-auto">
                            <h1 className="md:mb-8 text-4xl font-bold mx-8 mt-5">
                                Log In
                            </h1>
                            <form className="w-4/5 mx-auto">
                                <div className="mt-4">
                                    <label
                                        className="block font-bold mb-2 text-2xl"
                                        htmlFor="Username"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="appearance-none rounded-lg focus:outline-none focus:shadow-outline bg-secondary w-4/5 h-12 pl-4 placeholder:text-black "
                                        id="Email"
                                        type="Email"
                                        placeholder="Enter email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
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
                                        id="Email"
                                        type="password"
                                        placeholder="Enter Password"
                                        onChange={(e) => setPassword(e.target.value)}

                                    />
                                </div>

                                <div className="flex flex-wrap gap-y-2 items-center mt-8 space-x-8">
                                    <button
                                        className=" font-bold  rounded-xl focus:outline-none focus:shadow-outline
                            bg-primary px-6 py-2"
                                        type="button"
                                        disabled={!!loading}
                                        onClick={() => handleLogin()}
                                    >
                                        Login
                                    </button>
                                    <Link href="/register">
                                    <a
                                        className=" font-bold border-2 border-primary px-6 py-2 rounded-xl"
                                    >
                                        Register
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

export default Login;
